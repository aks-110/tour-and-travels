const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const Refund = require('../models/Refund');
const BookingSettings = require('../models/BookingSettings');
const { notifyBookingConfirmed, notifyBookingCancelled } = require('../services/notificationService');

let razorpay;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
  });
} catch (error) {
  console.warn("Razorpay SDK initialization failed, check env variables.");
}

// Helper to calculate advance percentage dynamically
const getAdvancePercentage = async (travelDate) => {
  let settings = await BookingSettings.findOne();
  if (!settings) {
    settings = await BookingSettings.create({}); // Default settings
  }
  
  const tripDate = new Date(travelDate);
  const today = new Date();
  const diffTime = Math.abs(tripDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return settings.advancePercentages.sameDay;
  if (diffDays <= 7) return settings.advancePercentages.lessThan7Days;
  if (diffDays <= 30) return settings.advancePercentages.fifteenTo30Days;
  if (diffDays > 30) return settings.advancePercentages.moreThan30Days;
  
  return settings.advancePercentages.default;
};

exports.createOrder = async (req, res) => {
  try {
    const { 
      customerDetails, 
      packageDetails, 
      travelDate, 
      travelers, 
      basePrice,
      paymentMode 
    } = req.body;

    let settings = await BookingSettings.findOne() || new BookingSettings();

    // Financial calculations
    const taxes = (basePrice * settings.taxPercentage) / 100;
    const convenienceFee = (basePrice * settings.convenienceFeePercentage) / 100;
    const totalAmount = basePrice + taxes + convenienceFee;

    const advancePercentage = await getAdvancePercentage(travelDate);
    const advanceAmount = Math.ceil((totalAmount * advancePercentage) / 100);
    const remainingAmount = totalAmount - advanceAmount;

    // Create unique booking ID
    const bookingIdString = `SNV${Math.floor(1000 + Math.random() * 9000)}${Date.now().toString().slice(-4)}`;

    let order = null;
    let options = {};
    if (paymentMode !== 'withoutAdvance') {
      // Create Razorpay Order for Advance Amount (Razorpay expects paise)
      options = {
        amount: advanceAmount * 100, 
        currency: "INR",
        receipt: bookingIdString
      };

      order = await razorpay.orders.create(options);
    }

    // For without-advance bookings, advance = 0 and remaining = full total
    const finalAdvanceAmount = paymentMode === 'withoutAdvance' ? 0 : advanceAmount;
    const finalRemainingAmount = paymentMode === 'withoutAdvance' ? totalAmount : remainingAmount;

    // Create Booking Record
    const booking = new Booking({
      bookingId: bookingIdString,
      clerkUserId: req.auth?.claims?.sub || null,
      customerDetails,
      packageDetails,
      travelDate,
      travelers,
      paymentMode: paymentMode || 'advance',
      financials: {
        basePrice, taxes, convenienceFee, totalAmount,
        advanceAmount: finalAdvanceAmount,
        remainingAmount: finalRemainingAmount
      },
      status: paymentMode === 'withoutAdvance' ? 'PENDING_CONFIRMATION' : 'PAYMENT_PENDING'
    });
    await booking.save();

    if (paymentMode !== 'withoutAdvance') {
      // Create initial Payment log
      const payment = new Payment({
        bookingId: booking._id,
        razorpayOrderId: order.id,
        amount: advanceAmount,
        status: 'CREATED'
      });
      await payment.save();
    }

    res.status(200).json({
      success: true,
      orderId: order ? order.id : null,
      amount: options.amount || 0,
      currency: options.currency || "INR",
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        advanceAmount: finalAdvanceAmount,
        totalAmount
      }
    });

  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }

    // Update Payment record
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature, status: 'CAPTURED' },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment record not found!" });
    }

    // Update Booking status
    const booking = await Booking.findByIdAndUpdate(
      payment.bookingId,
      { status: 'PENDING_CONFIRMATION' },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      bookingId: booking.bookingId
    });

  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ======================= ADMIN ACTIONS =========================

exports.adminGetBookings = async (req, res) => {
  try {
    const { tab } = req.query;
    let filter = {};

    if (tab === 'confirmed') {
      // Confirmed tab: advance bookings that are pending review OR confirmed
      filter = {
        paymentMode: { $ne: 'withoutAdvance' },
        status: { $in: ['CONFIRMED', 'PENDING_CONFIRMATION'] }
      };
    } else if (tab === 'pending_payment') {
      // Pending payment tab: without-advance bookings (full payment still pending)
      // + any advance payment that hasn't been verified yet (PAYMENT_PENDING)
      filter = {
        $or: [
          { paymentMode: 'withoutAdvance', status: { $nin: ['CANCELLED', 'REFUNDED'] } },
          { paymentMode: { $ne: 'withoutAdvance' }, status: 'PAYMENT_PENDING' }
        ]
      };
    } else {
      // Default: exclude fully cancelled/refunded bookings
      filter = { status: { $nin: ['CANCELLED', 'REFUNDED'] } };
    }

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

exports.adminConfirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, 
      { status: 'CONFIRMED' }, 
      { new: true }
    );
    
    // Trigger Email / SMS notification asynchronously (no await) to avoid lag
    if (booking) {
      notifyBookingConfirmed(booking);
    }
    
    res.status(200).json({ message: "Booking confirmed successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to confirm booking", error: error.message });
  }
};

exports.adminCancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Lock booking to prevent race conditions
    if (['CANCELLED', 'REFUNDED', 'REFUND_INITIATED'].includes(booking.status)) {
      return res.status(400).json({ message: "Booking is already cancelled or refund is in progress." });
    }

    // Find the captured payment (advance paid)
    const payment = await Payment.findOne({ bookingId: booking._id, status: 'CAPTURED' });

    if (payment && razorpay) {
      try {
        // Trigger Razorpay refund immediately
        const refundResponse = await razorpay.payments.refund(payment.razorpayPaymentId, {
          amount: payment.amount * 100, // Razorpay expects paise
          speed: 'normal',
          notes: {
            reason: 'Booking cancelled by admin',
            bookingId: booking.bookingId
          }
        });

        // Log the refund
        const existingRefund = await Refund.findOne({ paymentId: payment._id });
        if (!existingRefund) {
          const refund = new Refund({
            bookingId: booking._id,
            paymentId: payment._id,
            razorpayRefundId: refundResponse.id,
            amount: payment.amount,
            status: 'PROCESSED'
          });
          await refund.save();
        }

        // Update payment record
        await Payment.findByIdAndUpdate(payment._id, { status: 'REFUNDED' });

        // Mark booking as REFUNDED — will auto-disappear from the list
        booking.status = 'REFUNDED';
        await booking.save();

        // Fire and forget cancellation notification
        notifyBookingCancelled(booking);

        return res.status(200).json({ 
          message: "Booking cancelled & ₹" + payment.amount + " refund processed successfully.", 
          booking,
          refundId: refundResponse.id
        });
      } catch (refundError) {
        console.error("Razorpay refund failed:", refundError);
        // Fallback: queue refund for manual processing
        booking.status = 'REFUND_INITIATED';
        await booking.save();

        const existingRefund = await Refund.findOne({ paymentId: payment._id });
        if (!existingRefund) {
          const refund = new Refund({
            bookingId: booking._id,
            paymentId: payment._id,
            amount: payment.amount,
            status: 'QUEUED'
          });
          await refund.save();
        }

        notifyBookingCancelled(booking);

        return res.status(200).json({
          message: "Booking cancelled. Refund queued for manual processing.",
          booking
        });
      }
    } else {
      // No payment captured (cash booking or no advance), cancel directly
      booking.status = 'CANCELLED';
      await booking.save();

      notifyBookingCancelled(booking);

      return res.status(200).json({
        message: "Booking cancelled successfully. No payment to refund.",
        booking
      });
    }
  } catch (error) {
    console.error("Cancellation Error:", error);
    res.status(500).json({ message: "Failed to cancel booking", error: error.message });
  }
};

exports.adminGetSettings = async (req, res) => {
  try {
    let settings = await BookingSettings.findOne();
    if (!settings) settings = await BookingSettings.create({});
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings", error: error.message });
  }
};

exports.adminUpdateSettings = async (req, res) => {
  try {
    const settings = await BookingSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error updating settings", error: error.message });
  }
};

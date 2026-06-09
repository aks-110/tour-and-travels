const cron = require('node-cron');
const Razorpay = require('razorpay');
const Refund = require('../models/Refund');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

let razorpay;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
  });
} catch (error) {
  console.warn("Razorpay not initialized in refund worker.");
}

// Runs every 2 minutes
const startRefundWorker = () => {
  cron.schedule('*/2 * * * *', async () => {
    try {
      // Find all queued refunds
      const pendingRefunds = await Refund.find({ status: 'QUEUED' }).limit(10);
      
      for (const refund of pendingRefunds) {
        try {
          // Lock the record
          refund.status = 'PROCESSING';
          await refund.save();

          const payment = await Payment.findById(refund.paymentId);
          if (!payment || !payment.razorpayPaymentId) {
            throw new Error('Valid payment ID not found');
          }

          // Trigger Razorpay Refund API
          const rzpRefund = await razorpay.payments.refund(payment.razorpayPaymentId, {
            amount: refund.amount * 100, // convert to paise
            speed: "normal",
            receipt: refund._id.toString()
          });

          refund.gatewayRefundId = rzpRefund.id;
          // We don't mark it COMPLETED yet. The webhook will mark it completed.
          // But we can mark it as waiting for webhook.
          refund.status = 'PROCESSING'; 
          await refund.save();

        } catch (error) {
          console.error(`Refund failed for ID ${refund._id}:`, error);
          
          refund.retryCount += 1;
          refund.lastError = error.message;
          if (refund.retryCount >= 3) {
            refund.status = 'FAILED';
            await Booking.findByIdAndUpdate(refund.bookingId, { status: 'REFUND_FAILED' });
          } else {
            refund.status = 'QUEUED'; // Re-queue for next run
          }
          await refund.save();
        }
      }
    } catch (err) {
      console.error("Refund Worker global error:", err);
    }
  });
  console.log("Refund Queue Worker Started");
};

module.exports = startRefundWorker;

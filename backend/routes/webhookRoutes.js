const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Refund = require('../models/Refund');
const Booking = require('../models/Booking');

// Razorpay sends webhooks as JSON
router.post('/razorpay', async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  
  if (!secret) {
    console.warn("Webhook secret not configured");
    return res.status(200).send("OK");
  }

  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest !== req.headers['x-razorpay-signature']) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  const event = req.body.event;
  const payload = req.body.payload;

  try {
    if (event === 'payment.captured') {
      const paymentEntity = payload.payment.entity;
      await Payment.findOneAndUpdate(
        { razorpayOrderId: paymentEntity.order_id },
        { status: 'CAPTURED', razorpayPaymentId: paymentEntity.id }
      );
    } 
    else if (event === 'payment.failed') {
      const paymentEntity = payload.payment.entity;
      await Payment.findOneAndUpdate(
        { razorpayOrderId: paymentEntity.order_id },
        { status: 'FAILED', errorDetails: paymentEntity.error_description }
      );
    }
    else if (event === 'refund.processed') {
      const refundEntity = payload.refund.entity;
      const paymentId = refundEntity.payment_id;
      
      const payment = await Payment.findOne({ razorpayPaymentId: paymentId });
      if (payment) {
        await Refund.findOneAndUpdate(
          { paymentId: payment._id },
          { status: 'COMPLETED', gatewayRefundId: refundEntity.id, processedAt: new Date() }
        );
        
        // Finalize booking cancellation status
        await Booking.findByIdAndUpdate(payment.bookingId, { status: 'REFUNDED' });
      }
    }
    else if (event === 'refund.failed') {
      const refundEntity = payload.refund.entity;
      const paymentId = refundEntity.payment_id;
      
      const payment = await Payment.findOne({ razorpayPaymentId: paymentId });
      if (payment) {
        await Refund.findOneAndUpdate(
          { paymentId: payment._id },
          { status: 'FAILED', lastError: 'Webhook reported failure' }
        );
        await Booking.findByIdAndUpdate(payment.bookingId, { status: 'REFUND_FAILED' });
      }
    }

    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("Webhook processing error:", err);
    res.status(500).send("Webhook Error");
  }
});

module.exports = router;

const mongoose = require('mongoose');

const RefundSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
  
  amount: { type: Number, required: true }, // Amount in INR to refund
  
  gatewayRefundId: { type: String }, // Populated when refund succeeds
  razorpayRefundId: { type: String }, // Same as above for direct Razorpay refunds
  
  status: {
    type: String,
    enum: ['QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'PROCESSED'],
    default: 'QUEUED'
  },
  
  retryCount: { type: Number, default: 0 },
  lastError: { type: String },
  processedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Refund', RefundSchema);

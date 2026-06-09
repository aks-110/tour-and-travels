const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  
  amount: { type: Number, required: true }, // Amount in INR
  currency: { type: String, default: 'INR' },
  
  status: {
    type: String,
    enum: ['CREATED', 'CAPTURED', 'FAILED', 'REFUNDED'],
    default: 'CREATED'
  },
  
  errorDetails: {
    code: String,
    description: String,
    source: String,
    step: String,
    reason: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);

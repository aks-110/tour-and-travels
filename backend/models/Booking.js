const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true }, // e.g. SNV1234
  clerkUserId: { type: String }, // Optional, for logged-in users

  customerDetails: {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    pickupLocation: { type: String, required: true }
  },

  packageDetails: {
    sourceCity: { type: String },
    destinationCity: { type: String },
    distanceKm: { type: Number },
    vehicleName: { type: String },
    vehicleCategory: { type: String },
    acType: { type: String, enum: ['AC', 'Non-AC'] }
  },

  travelDate: { type: Date, required: true },
  travelers: { type: Number, required: true, min: 1 },

  financials: {
    basePrice: { type: Number, required: true },
    taxes: { type: Number, required: true },
    convenienceFee: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    advanceAmount: { type: Number, required: true },
    remainingAmount: { type: Number, required: true }
  },

  status: {
    type: String,
    enum: [
      'PAYMENT_PENDING',
      'PAYMENT_FAILED',
      'PENDING_CONFIRMATION',
      'CONFIRMED',
      'CANCELLED',
      'REFUND_INITIATED',
      'REFUNDED',
      'REFUND_FAILED'
    ],
    default: 'PAYMENT_PENDING'
  },

  paymentMode: {
    type: String,
    enum: ['advance', 'withoutAdvance'],
    default: 'advance'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);

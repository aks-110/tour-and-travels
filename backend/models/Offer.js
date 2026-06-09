const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  discountPercentage: { type: Number, required: true, min: 0, max: 100 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Offer', OfferSchema);

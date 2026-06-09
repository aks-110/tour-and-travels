const mongoose = require('mongoose');

const PricingVehicleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VehicleCategory',
    required: true
  },
  minTravellers: { type: Number, default: 1, min: 1 },
  maxTravellers: { type: Number, required: true, min: 1 },
  minSeats: { type: Number, default: 1, min: 1 },
  maxSeats: { type: Number, required: true, min: 1 },
  supportsAC: { type: Boolean, default: true },
  supportsNonAC: { type: Boolean, default: true },
  imageUrl: { type: String, default: '' },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PricingVehicle', PricingVehicleSchema);

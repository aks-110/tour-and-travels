const mongoose = require('mongoose');

const TravelRouteSchema = new mongoose.Schema({
  sourceCity: { type: String, required: true, trim: true },
  destinationCity: { type: String, required: true, trim: true },
  distanceKm: { type: Number, required: true, min: 1 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

// Compound index for uniqueness
TravelRouteSchema.index({ sourceCity: 1, destinationCity: 1 }, { unique: true });

module.exports = mongoose.model('TravelRoute', TravelRouteSchema);

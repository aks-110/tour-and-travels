const mongoose = require('mongoose');

const PricingRuleSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PricingVehicle',
    required: true
  },
  basePricePerKm: { type: Number, required: true, min: 0 },
  acSurchargePerKm: { type: Number, default: 0, min: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

// One active pricing rule per vehicle
PricingRuleSchema.index({ vehicleId: 1 });

module.exports = mongoose.model('PricingRule', PricingRuleSchema);

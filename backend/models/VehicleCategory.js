const mongoose = require('mongoose');

const VehicleCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  displayOrder: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('VehicleCategory', VehicleCategorySchema);

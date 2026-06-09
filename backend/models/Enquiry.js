const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  city: { type: String },
  travelDate: { type: String },
  adults: { type: Number, default: 2 },
  children: { type: Number, default: 0 },
  budget: { type: String },
  package: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved'], default: 'New' },
  enquiryType: { type: String, enum: ['generic', 'fare_calculator'], default: 'generic' },
  fareData: {
    sourceCity: { type: String },
    destinationCity: { type: String },
    distanceKm: { type: Number },
    vehicleName: { type: String },
    vehicleCategory: { type: String },
    travellers: { type: Number },
    seats: { type: Number },
    acType: { type: String, enum: ['AC', 'Non-AC'] },
    estimatedFare: { type: Number },
    marketFare: { type: Number },
    discount: { type: Number },
    savings: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);

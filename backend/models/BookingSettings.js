const mongoose = require('mongoose');

const BookingSettingsSchema = new mongoose.Schema({
  advancePercentages: {
    moreThan30Days: { type: Number, default: 4 },
    fifteenTo30Days: { type: Number, default: 10 },
    lessThan7Days: { type: Number, default: 15 },
    sameDay: { type: Number, default: 25 },
    default: { type: Number, default: 15 }
  },
  convenienceFeePercentage: { type: Number, default: 2 },
  taxPercentage: { type: Number, default: 5 } // Standard GST
}, { timestamps: true });

module.exports = mongoose.model('BookingSettings', BookingSettingsSchema);

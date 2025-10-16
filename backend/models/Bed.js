const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
  code: String, // رمز QR أو رقم السرير
  room: String,
  department: String,
  status: String,
  patient_mrn: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bed', bedSchema);
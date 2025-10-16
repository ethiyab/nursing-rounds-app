const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  mrn: { type: String, required: true }, // رقم الملف الطبي
  name: String,
  age: Number,
  gender: String,
  department: String,
  room: String,
  bed: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);
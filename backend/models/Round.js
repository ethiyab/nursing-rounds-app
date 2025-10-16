const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  nurse: String,
  mrn: String,
  patient: String,
  department: String,
  room: String,
  bed: String,
  date: String,
  time: String,
  pain: String,
  position: String,
  potty: String,
  possessions: String,
  pump: String,
  extra: String,
  else: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Round', roundSchema);
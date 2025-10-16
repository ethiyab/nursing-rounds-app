const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// الحصول على كل المرضى
router.get('/', async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

// إضافة مريض جديد
router.post('/', async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.json(patient);
});

// تعديل بيانات مريض
router.put('/:id', async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(patient);
});

// حذف مريض
router.delete('/:id', async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
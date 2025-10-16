const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital'); // نموذج المستشفى من قاعدة البيانات

// عرض جميع المستشفيات
router.get('/', async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
});

// إضافة مستشفى جديد
router.post('/', async (req, res) => {
  const hospital = new Hospital({ name: req.body.name });
  await hospital.save();
  res.json(hospital);
});

// تعديل اسم مستشفى
router.put('/:id', async (req, res) => {
  const hospital = await Hospital.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(hospital);
});

// حذف مستشفى
router.delete('/:id', async (req, res) => {
  await Hospital.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
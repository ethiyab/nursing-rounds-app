const express = require('express');
const router = express.Router();
const Round = require('../models/Round');
const Patient = require('../models/Patient');

// تقرير عدد الجولات
router.get('/rounds-count', async (req, res) => {
  const count = await Round.countDocuments();
  res.json({ count });
});

// تقرير عدد المرضى
router.get('/patients-count', async (req, res) => {
  const count = await Patient.countDocuments();
  res.json({ count });
});

module.exports = router;
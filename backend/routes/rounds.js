const express = require('express');
const router = express.Router();
const Round = require('../models/Round');

// الحصول على كل الجولات
router.get('/', async (req, res) => {
  const rounds = await Round.find();
  res.json(rounds);
});

// إضافة جولة جديدة
router.post('/', async (req, res) => {
  const round = new Round(req.body);
  await round.save();
  res.json(round);
});

module.exports = router;
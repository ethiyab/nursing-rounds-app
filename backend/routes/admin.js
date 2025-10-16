const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const Bed = require('../models/Bed');

// الحصول على كل الأقسام
router.get('/departments', async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
});

// إضافة قسم جديد
router.post('/departments', async (req, res) => {
  const department = new Department(req.body);
  await department.save();
  res.json(department);
});

// الحصول على كل الأسرة
router.get('/beds', async (req, res) => {
  const beds = await Bed.find();
  res.json(beds);
});

// إضافة سرير جديد
router.post('/beds', async (req, res) => {
  const bed = new Bed(req.body);
  await bed.save();
  res.json(bed);
});

module.exports = router;
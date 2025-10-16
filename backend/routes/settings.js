const express = require('express');
const router = express.Router();

// إعدادات وهمية (يمكنك تعديلها وإضافة قاعدة بيانات أو ملف إعدادات)
let settings = {
  language: "ar",
  logo: "/static/salman-logo.png"
};

// الحصول على الإعدادات
router.get('/', (req, res) => {
  res.json(settings);
});

// تعديل الإعدادات
router.put('/', (req, res) => {
  settings = { ...settings, ...req.body };
  res.json(settings);
});

module.exports = router;
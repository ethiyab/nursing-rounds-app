const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// الحصول على كل الإشعارات
router.get('/', async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
});

// إضافة إشعار جديد
router.post('/', async (req, res) => {
  const notification = new Notification(req.body);
  await notification.save();
  res.json(notification);
});

// حذف إشعار
router.delete('/:id', async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
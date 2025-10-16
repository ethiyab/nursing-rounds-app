const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const notifSchema = new mongoose.Schema({
    text: String,
    type: String,
    to: String,
    time: String
});
const Notification = mongoose.model('Notification', notifSchema);

// عرض كل الإشعارات
router.get('/', async (req, res) => {
    const notifs = await Notification.find().sort({time:-1});
    res.json(notifs);
});

// إضافة إشعار
router.post('/', async (req, res) => {
    const notif = new Notification(req.body);
    await notif.save();
    res.json(notif);
});

// حذف إشعار
router.delete('/:id', async (req, res) => {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({success:true});
});

module.exports = router;
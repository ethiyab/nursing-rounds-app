const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// المستخدمين
const userSchema = new mongoose.Schema({
    name: String,
    role: String
});
const User = mongoose.model('User', userSchema);

// نموذج الـ 5P's
const psSchema = new mongoose.Schema({
    painLabel: String,
    positionLabel: String,
    pottyLabel: String,
    possessionsLabel: String,
    pumpLabel: String
});
const P5 = mongoose.model('P5', psSchema);

// إعدادات التذكيرات
const reminderSchema = new mongoose.Schema({
    interval: Number
});
const Reminder = mongoose.model('Reminder', reminderSchema);

// API المستخدمين
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});
router.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({success:true});
});

// API نموذج الـ 5P's
router.get('/p5', async (req, res) => {
    let p = await P5.findOne();
    if(!p) p = new P5();
    res.json(p);
});
router.put('/p5', async (req, res) => {
    let p = await P5.findOne();
    if(!p) p = new P5();
    Object.assign(p, req.body);
    await p.save();
    res.json(p);
});

// API إعدادات التذكيرات
router.get('/reminder', async (req, res) => {
    let setting = await Reminder.findOne();
    if(!setting) setting = new Reminder({interval:60});
    res.json(setting);
});
router.put('/reminder', async (req, res) => {
    let setting = await Reminder.findOne();
    if(!setting) setting = new Reminder();
    setting.interval = req.body.interval;
    await setting.save();
    res.json(setting);
});

module.exports = router;
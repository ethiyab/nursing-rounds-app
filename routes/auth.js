const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// تسجيل الدخول
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ error: "مستخدم غير موجود" });
    const valid = await user.comparePassword(req.body.password);
    if (!valid) return res.status(401).json({ error: "كلمة مرور خاطئة" });
    const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token, role: user.role });
});

// تسجيل مستخدم جديد (للمسؤولين فقط)
router.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});

module.exports = router;
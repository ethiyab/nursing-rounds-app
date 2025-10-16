// routes/rounds.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
    nurse: String,
    mrn: String,
    patient: String,
    department: String,
    room: String,
    bed: String,
    date: String,
    time: String,
    pain: String,
    position: String,
    potty: String,
    possessions: String,
    pump: String,
    extra: String,
    else: String,
    status: String // مكتمل، يحتاج متابعة، حرجة
});
const Round = mongoose.model('Round', roundSchema);

// البحث وعرض كل الجولات
router.get('/', async (req, res) => {
    const search = req.query.search ? req.query.search.trim() : "";
    let query = {};
    if(search) {
        query = {
            $or: [
                {nurse: {$regex: search, $options:'i'}},
                {patient: {$regex: search, $options:'i'}},
                {mrn: {$regex: search, $options:'i'}},
                {department: {$regex: search, $options:'i'}},
                {room: {$regex: search, $options:'i'}},
                {bed: {$regex: search, $options:'i'}},
                {date: {$regex: search, $options:'i'}},
                {time: {$regex: search, $options:'i'}}
            ]
        };
    }
    const rounds = await Round.find(query).sort({date:-1, time:-1});
    res.json(rounds);
});

// عرض جولة واحدة
router.get('/:id', async (req, res) => {
    const round = await Round.findById(req.params.id);
    res.json(round);
});

// إضافة جولة
router.post('/', async (req, res) => {
    const round = new Round(req.body);
    await round.save();
    res.json(round);
});

// تعديل جولة
router.put('/:id', async (req, res) => {
    const round = await Round.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(round);
});

// حذف جولة
router.delete('/:id', async (req, res) => {
    await Round.findByIdAndDelete(req.params.id);
    res.json({success:true});
});

module.exports = router;
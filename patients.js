// مثال كود backend Express/Node.js لمرضى المستشفى
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    mrn: String,
    name: String,
    department: String,
    room: String,
    bed: String,
    hospital: String
});
const Patient = mongoose.model('Patient', patientSchema);

// البحث وعرض كل المرضى
router.get('/', async (req, res) => {
    const search = req.query.search ? req.query.search.trim() : "";
    let query = {};
    if(search) {
        query = {
            $or: [
                {mrn: {$regex: search, $options:'i'}},
                {name: {$regex: search, $options:'i'}},
                {department: {$regex: search, $options:'i'}}
            ]
        };
    }
    const patients = await Patient.find(query).sort({name:1});
    res.json(patients);
});

// عرض مريض واحد
router.get('/:id', async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
});

// إضافة مريض
router.post('/', async (req, res) => {
    const patient = new Patient(req.body);
    await patient.save();
    res.json(patient);
});

// تعديل مريض
router.put('/:id', async (req, res) => {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(patient);
});

// حذف مريض
router.delete('/:id', async (req, res) => {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({success:true});
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Program = require('../models/program');

// @route   POST /api/programs
// @desc    Create a new program
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Check if program already exists
    const existingProgram = await Program.findOne({ name });
    if (existingProgram) {
      return res.status(400).json({ error: 'Program already exists' });
    }

    const program = new Program({ name, description });
    await program.save();
    
    res.status(201).json(program);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/programs
// @desc    Get all programs
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
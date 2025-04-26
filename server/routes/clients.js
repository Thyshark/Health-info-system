const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const Program = require('../models/program');
// @route   POST /api/clients
// @desc    Register a new client
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, contactInfo } = req.body;
    
    // Basic validation
    if (!firstName || !lastName || !dateOfBirth || !gender) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = new Client({
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      contactInfo
    });

    await client.save();
    
    // Populate programs if any
    const populatedClient = await Client.findById(client._id).populate('programs');
    
    res.status(201).json(populatedClient);
  } catch (err) {
    console.error(err);
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(el => el.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/clients
// @desc    Get all clients
router.get('/api/clients/', async (req, res) => {
  try {
    const clients = await Client.find().populate('programs').sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/clients/:id/enroll
// @desc    Enroll client in programs
router.put('/api/clients/:id/enroll', async (req, res) => {
  try {
    const { programIds } = req.body;
    
    if (!programIds || !Array.isArray(programIds)) {
      return res.status(400).json({ error: 'Invalid program IDs' });
    }

    // Verify programs exist
    const programs = await Program.find({ _id: { $in: programIds } });
    if (programs.length !== programIds.length) {
      return res.status(400).json({ error: 'One or more programs not found' });
    }

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { programs: { $each: programIds } } },
      { new: true }
    ).populate('programs');

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
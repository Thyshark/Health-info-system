const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Program = require('../models/Program');

// Enroll client in program
router.post('/:clientId/enroll', async (req, res) => {
  try {
    const { programId } = req.body;
    
    // Validate input
    if (!programId) {
      return res.status(400).json({ error: 'Program ID is required' });
    }

    // Check if client and program exist
    const [client, program] = await Promise.all([
      Client.findById(req.params.clientId),
      Program.findById(programId)
    ]);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    // Check if already enrolled
    if (client.programs.includes(programId)) {
      return res.status(400).json({ error: 'Client already enrolled in this program' });
    }

    // Add program to client
    client.programs.push(programId);
    await client.save();

    // Return updated client with populated programs
    const updatedClient = await Client.findById(client._id).populate('programs');

    res.json({
      success: true,
      message: 'Client enrolled successfully',
      client: updatedClient
    });

  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ error: 'Server error during enrollment' });
  }
});

module.exports = router;
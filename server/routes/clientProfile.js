const express = require('express');
const router = express.Router();
const Client = require('../models/client');

/**
 * @route   GET /api/clients/:id
 * @desc    Get client profile with enrolled programs
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate('programs', 'name description') // Only include name and description from programs
      .select('-__v'); // Exclude version key

    if (!client) {
      return res.status(404).json({ 
        success: false,
        error: 'Client not found' 
      });
    }

    // Format the response to match frontend expectations
    const response = {
      success: true,
      data: {
        ...client.toObject(),
        age: calculateAge(client.dateOfBirth) // Add calculated age
      }
    };

    res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching client:', err);
    res.status(500).json({ 
      success: false,
      error: 'Server error while fetching client profile' 
    });
  }
});

// Helper function to calculate age
function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = router;
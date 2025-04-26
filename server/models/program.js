const mongoose = require('mongoose');

// Check if model already exists before defining it
const Program = mongoose.models.Program || 
  mongoose.model('Program', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }));

module.exports = Program;
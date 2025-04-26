const ProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  enrolledClients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
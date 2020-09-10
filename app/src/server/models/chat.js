const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  // .... attributes here
  userid: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chat', ChatSchema);

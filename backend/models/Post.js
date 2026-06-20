const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  caption: {
    type: String,
    required: true
  },

  image: {
    type: String
  },

  scheduledTime: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    default: "pending"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Post", postSchema);
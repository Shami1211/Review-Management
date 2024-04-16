const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
});

module.exports = mongoose.model("Complaint", ComplaintSchema);

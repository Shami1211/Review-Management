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
});

module.exports = mongoose.model("Complaint", ComplaintSchema);

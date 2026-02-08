const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  assignmentId: String,
  volunteerAddress: String,
  donorAddress: String,
  consumerAddress: String,
  status: String
});

module.exports = mongoose.model("Assignment", AssignmentSchema);

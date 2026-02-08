const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  donationLocation: {
    lat: Number,
    lng: Number
  },
  ngoLocation: {
    lat: Number,
    lng: Number
  },
  volunteerLocation: {
    lat: Number,
    lng: Number
  },
  status: String
});

module.exports = mongoose.model("Assignment", AssignmentSchema);

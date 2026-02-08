const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/foodshare")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// 🔹 Schema
const AssignmentSchema = new mongoose.Schema({
  donationLocation: {
    lat: Number,
    lng: Number,
  },
  ngoLocation: {
    lat: Number,
    lng: Number,
  },
  volunteerLocation: {
    lat: Number,
    lng: Number,
  },
  status: String,
});

const Assignment = mongoose.model("Assignment", AssignmentSchema);

// 🔹 API using MongoDB
app.get("/api/map-data", async (req, res) => {
  try {
    const assignment = await Assignment.findOne();

    if (!assignment) {
      return res.status(404).json({ message: "No assignment found" });
    }

    res.json({
      source: assignment.donationLocation,
      destination: assignment.ngoLocation,
      volunteer: assignment.volunteerLocation,
      status: assignment.status,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

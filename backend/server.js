const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Assignment = require("./models/Assignment");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/foodshare")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/assignment/:id", async (req, res) => {
  const assignment = await Assignment.findOne({
    assignmentId: req.params.id
  });

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  res.json(assignment);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

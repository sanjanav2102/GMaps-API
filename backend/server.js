const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 TEMP DATA (later this comes from MongoDB)
/*app.get("/api/map-data", (req, res) => {
  res.json({
    source: {
      lat: 12.9716,
      lng: 77.5946,
      name: "Community Kitchen (Donor)"
    },
    destination: {
      lat: 12.9352,
      lng: 77.6245,
      name: "Hope Shelter (NGO)"
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});*/

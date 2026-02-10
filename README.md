# 🍃 FoodShare – Volunteer Live Navigation System
The Live Map feature of the app, the core of the delivery system was tried implementing seperately.
This is a real-time volunteer navigation and tracking module for a food redistribution platform.
This module visualizes a volunteer’s journey from 
**volunteer → donor → consumer**
using free & open-source mapping services, with animated movement, route visualization and status alerts.


# Key Features
## Volunteer Navigation

Animated vehicle movement on map
Two-phase routing:
- Volunteer → Donor (Pickup)
- Donor → Consumer (Delivery)

### Visual Markers

- S (Source / Donor) – Red marker
- D (Destination / Consumer) – Red marker
- Volunteer Vehicle – Moving vehicle icon



## Smart Alerts

Modal popup when:
Volunteer reaches donor → “Pick up food”
Volunteer reaches consumer → “Hand over food”
Volunteer moves to next phase only after confirmation

## Route Information Panel

- Current status (Pickup / Delivery / Completed)
- Approximate distance
- Simple, clear directions


# Tech Stack
Frontend - React.js, React Leaflet (for maps), Leaflet
Custom CSS (dark UI theme)
Backend - Node.js, Express.js, MongoDB, Mongoose

### Mapping & Routing 
OpenStreetMap – Map tiles
Nominatim – Address → Latitude/Longitude
OSRM (Open Source Routing Machine) – Route calculation


# Project Structure
frontend/
 ├─ src/
 │  ├─ VolunteerMap.js
 │  ├─ VolunteerMap.css
 │  ├─ icons.js
 │  └─ App.js

backend/
 ├─ server.js
 └─ models/
    └─ Assignment.js


# Data Model (MongoDB)
Collection: assignments
{
  "_id": ObjectId("..."),
  "assignmentId": "demo1",
  "volunteerAddress": "Velachery Chennai",
  "donorAddress": "IIT Madras",
  "consumerAddress": "Adyar Chennai",
  "status": "accepted"
}

# Backend Setup
1️. Install dependencies
npm install express cors mongoose

2️. Start MongoDB
mongod

3️. Run backend server
node server.js

Backend Endpoint
GET http://localhost:5000/api/assignment/:id


Example:
http://localhost:5000/api/assignment/demo1

# Frontend Setup
1️. Install dependencies
npm install react-leaflet leaflet

2️. Import Leaflet CSS (important)

Add in index.js or App.js:
import "leaflet/dist/leaflet.css";

3.Run frontend
npm start

# Working of the Navigation 
**Phase 1 – Volunteer → Donor**
Volunteer location fetched from DB
Donor address geocoded
Route fetched using OSRM
Vehicle animates along route
Popup: “Reached Source – Pick up food”

**Phase 2 – Donor → Consumer**
Route recalculated
Route color changes
Vehicle continues animation
Popup: “Reached Destination – Hand over food”
Assignment marked completed

# Animation Logic

Route converted to coordinate path
Vehicle position updated every few milliseconds
Speed adjustable via interval timing
Vehicle snaps exactly to source/destination when reached



# Conclusion

This module demonstrates:
Real-world logistics flow
Cost-efficient system design
Clean UI/UX
Practical backend–frontend integration

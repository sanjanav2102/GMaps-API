import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { useEffect, useState } from "react";
import { vehicleIcon,sourceIcon,destinationIcon } from "./icons";
import "./VolunteerMap.css";


// Address → lat/lng 
async function geocode(address) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  );
  const data = await res.json();
  return { lat: +data[0].lat, lng: +data[0].lon };
}

// Routing 
async function getRoute(start, end) {
  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/` +
    `${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
  );
  const data = await res.json();
  return data.routes[0].geometry.coordinates.map(
    ([lng, lat]) => ({ lat, lng })
  );
}

function VolunteerMap() {
  const [volunteerPos, setVolunteerPos] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [path, setPath] = useState([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("to_source");
  const [showModal, setShowModal] = useState(false);
  const [completed, setCompleted] = useState(false);



  // Fetch addresses from backend
  useEffect(() => {
    async function load() {
     const res = await fetch("http://localhost:5000/api/assignment/demo1");

      const data = await res.json();

      const volunteer = await geocode(data.volunteerAddress);
      const donor = await geocode(data.donorAddress);
      const consumer = await geocode(data.consumerAddress);
      

    const route =
    phase === "to_source"
        ? await getRoute(volunteer, donor)
        : await getRoute(donor, consumer);


      setVolunteerPos(volunteer);
      setSource(donor);
      setDestination(consumer);
      setPath(route);
    }
    load();
  }, []);

  // Animate volunteer
useEffect(() => {
  if (!path.length) return;

  const interval = setInterval(() => {
    if (index < path.length) {
      setVolunteerPos(path[index]);
      setIndex(i => i + 1);
    } else {
      clearInterval(interval);

      // Phase switch
      if (phase === "to_source") {
        setShowModal(true);
        setPhase("waiting_pickup");
      } else if (phase === "to_destination") {
        setShowModal(true);
        setPhase("completed");
      }
    }
  }, 1000);

  return () => clearInterval(interval);
}, [index, path, phase]);

function handleModalOk() {
  setShowModal(false);
  setIndex(0);

  if (phase === "waiting_pickup") {
    setPhase("to_destination");
    getRoute(source, destination).then(setPath);
  }
}


  if (!volunteerPos || !source || !destination) {
    return <p>Loading map...</p>;
  }

  return (
  <div style={{ position: "relative" }}>
    
    <MapContainer
      center={volunteerPos}
      zoom={14}
      style={{ height: "450px", width: "100%" }}
    >
     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Source (Donor) */}
      <Marker position={source} icon={sourceIcon} />

      {/* Destination (Consumer) */}
      <Marker position={destination} icon={destinationIcon} />

      {/* Moving Volunteer Vehicle */}
      <Marker position={volunteerPos} icon={vehicleIcon} />

      {/* Route */}
      <Polyline
        positions={path}
        pathOptions={{
          color: phase === "to_source" ? "#1abc9c" : "#ff6b6b",
          weight: 5
        }}
      />
    </MapContainer>

    {/*  MODAL OVERLAY */}
    {showModal && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>
            {phase === "waiting_pickup"
              ? "Reached Source"
              : "Reached Destination"}
          </h3>

          <p>
            {phase === "waiting_pickup"
              ? "Pick up the food from donor."
              : "Hand over food to consumer."}
          </p>

          <button onClick={handleModalOk}>OK</button>
        </div>
      </div>
    )}

  </div>
);

}

export default VolunteerMap;

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  });

  const [locations, setLocations] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/map-data")
      .then(res => res.json())
      .then(data => setLocations(data));
  }, []);

  useEffect(() => {
    if (!isLoaded || !locations) return;

    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin: locations.source,
        destination: locations.destination,
        volunteer: locations.volunteer,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === "OK") setDirections(result);
      }
    );
  }, [isLoaded, locations]);

  if (!isLoaded || !locations) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Google Maps Test (Backend Data)</h2>

      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={locations.source}
        zoom={13}
      >
        <Marker position={locations.source} label="S" />
        <Marker position={locations.volunteer} label="V" />
        <Marker position={locations.destination} label="D" />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}

export default App;

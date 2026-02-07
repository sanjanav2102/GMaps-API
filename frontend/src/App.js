import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px"
};

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
    
  });

  // Example locations (you can later fetch from DB)
  const source = { lat: 12.9716, lng: 77.5946 };      // Donor
  const destination = { lat: 12.9352, lng: 77.6245 }; // NGO

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;

    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin: source,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        }
      }
    );
  }, [isLoaded]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    
    <div style={{ padding: "20px" }}>
      <h2>Google Maps Test (CRA)</h2>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={source}
        zoom={13}
      >
        <Marker position={source} label="S" />
        <Marker position={destination} label="D" />

        {directions && (
          <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>
    </div>
  );
}

console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
export default App;

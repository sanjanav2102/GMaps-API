import L from "leaflet";

export const vehicleIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// 🔴 Source marker (S)
export const sourceIcon = L.divIcon({
  html: `
    <div style="
      background:#d32f2f;
      color:white;
      width:30px;
      height:30px;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      font-weight:bold;
      font-size:14px;
      box-shadow:0 0 5px rgba(0,0,0,0.5);
    ">S</div>
  `,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

// 🔴 Destination marker (D)
export const destinationIcon = L.divIcon({
  html: `
    <div style="
      background:#d32f2f;
      color:white;
      width:30px;
      height:30px;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      font-weight:bold;
      font-size:14px;
      box-shadow:0 0 5px rgba(0,0,0,0.5);
    ">D</div>
  `,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

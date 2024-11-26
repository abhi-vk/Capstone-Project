import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./map.module.css"; // Import your CSS module
import L from "leaflet";
import "leaflet-defaulticon-compatibility";

// Custom marker icon with round background
// Custom marker with a label (icon + "Mysore" text)
const customIconWithLabel = L.divIcon({
  className: "", // No default class
  html: `
        <div class="${styles.customMarker}">
            <div class="${styles.roundIcon}">
                <img src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732625858/foodapp-images/ir5qvnmzyfvj3aelft4o.png" alt="marker-icon" />
            </div>
            <span class="${styles.markerLabel}">Mysore</span>
        </div>
    `,
  iconSize: [50, 70], // Adjust size to account for the icon and label
  iconAnchor: [25, 55], // Center the icon and align the label
});

const Map = () => {
  const position = [12.2958, 76.6394]; // Mysore coordinates

  return (
    <div className={styles.mapContainer}>
      {/* Floating Info Card */}
      <div className={styles.infoCard}>
        <h3>McDonald's</h3>
        <p>
          <strong>South Mysore</strong>
        </p>
        <p>Tooley St, Mysore Bridge, SE1 2TF</p>
        <p>Phone: +934443-43</p>
        <a
          href="http://mcdonalds.uk/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Website
        </a>
      </div>

      {/* Leaflet Map */}
      <MapContainer center={position} zoom={14} className={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIconWithLabel}>
          <Popup>
            <strong>McDonald's</strong> <br />
            Tooley St, Mysore Bridge, SE1 2TF.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;

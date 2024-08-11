"use client";

import { GeoCache } from "../../../types.js";
import "../../../envConfig.ts";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const defaults = {
  zoom: 12,
};

interface LeafletMapProps {
  geocaches: GeoCache[] | null | undefined;
  count: number;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ geocaches, count }) => {
  // random point in mexico as center if nothing is found
  let posix: LatLngExpression = [5.0, -75.0];

  if (count > 0 && geocaches) {
    posix = [
      geocaches[0].location.coordinates[1],
      geocaches[0].location.coordinates[0],
    ];
  }

  return (
    <MapContainer
      center={posix}
      zoom={defaults.zoom}
      scrollWheelZoom={false}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "1.25rem",
        overflow: "hidden",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geocaches?.map((gc) => (
        <Marker
          position={[gc.location.coordinates[1], gc.location.coordinates[0]]}
          draggable={false}
        >
          <Popup>
            {gc.name}: {gc.place}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;

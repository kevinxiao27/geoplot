"use client";

import { GeoCache } from "../../../types.js";
import "../../../envConfig.ts";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 19,
};

interface LeafletMapProps {
  geocaches: GeoCache[] | null | undefined;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ geocaches }) => {
  const posix: LatLngExpression = [4.79029, -75.69003];
  return (
    <MapContainer
      center={posix}
      zoom={19}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={posix} draggable={false}>
        <Popup>Hey ! I study here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;

"use client";

import { GeoCache } from "../../../types.js";
import "../../../envConfig.js";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Map } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { SetStateAction, Dispatch } from "react";
import Image from "next/image.js";
import { ImageOff } from "lucide-react";

const defaults = {
  zoom: 12
};

interface LeafletMapProps {
  geocaches: GeoCache[] | null | undefined;
  count: number;
  setMap: Dispatch<SetStateAction<Map | null>>;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ geocaches, count, setMap }) => {
  let posix: LatLngExpression = [0.0, 0.0];

  if (count > 0 && geocaches) {
    posix = [geocaches[count - 1].location.coordinates[1], geocaches[count - 1].location.coordinates[0]];
  }

  return (
    <MapContainer
      id='map-container'
      center={posix}
      zoom={defaults.zoom}
      scrollWheelZoom={false}
      ref={setMap}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "1.25rem",
        overflow: "hidden"
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {geocaches?.map((gc) => (
        <Marker position={[gc.location.coordinates[1], gc.location.coordinates[0]]} key={gc._id} draggable={false}>
          <Popup>
            <div className='flex flex-col h-[400px] w-[300px] items-center justify-center p-3 border-2 rounded-[1.25rem] border-black'>
              <div className='py-3 font-[600]'>{gc.name.toLocaleUpperCase()}</div>
              <div className='relative py-5 rounded-[1.25rem] overflow-hidden h-[200px] w-[267.5px]'>
                {gc.avatar && <Image fill src={`${gc.avatar}`} style={{ objectFit: "cover" }} alt='avatar' />}
                <ImageOff className='object-cover h-[200px] w-[267.5px]' />
              </div>
              <div className='text-xs p-3'>Description: {gc.desc}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;

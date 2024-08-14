"use client";
import { SideBar } from "@/components/SideBar/SideBar";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { GeoCache } from "../../../types";
import { Map } from "leaflet";

interface MapProps {
  geocaches: GeoCache[] | null | undefined;
  count: number;
  error: String | null | undefined;
}

export const MapView: React.FC<MapProps> = ({ geocaches, count, error }) => {
  const [map, setMap] = useState<Map | null>(null);
  const [key, setKey] = useState("nice");
  const LeafletMap = useMemo(
    () =>
      dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <>
      <div className="absolute bg-white-700 px-5 my-5 w-[100vw] h-[80%]">
        <LeafletMap geocaches={geocaches} count={count} setMap={setMap} key={key} />
      </div>
      <div className="p-5 flex justify-end">
        <SideBar geocaches={geocaches} error={error} map={map} refreshMap={setKey} />
      </div>
    </>
  );
};

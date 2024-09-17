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
        loading: () => <div className='h-full w-full rounded-[1.25] bg-slate-500'></div>,
        ssr: false
      }),
    []
  );
  return (
    <div className='grid lg:flex grid-rows-2 gap-3'>
      <div className='relative lg:block'>
        <div className='absolute bg-white-700 px-5 my-5 w-[100vw] h-[100%]' key={key}>
          <LeafletMap geocaches={geocaches} count={count} setMap={setMap} />
        </div>
      </div>
      <div className='p-5 row-start-2 flex flex-row justify-center w-full lg:justify-end'>
        <SideBar geocaches={geocaches} error={error} map={map} refreshMap={setKey} />
      </div>
    </div>
  );
};

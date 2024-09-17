import { Map } from "leaflet";
import { GeoCache } from "../../../types";
import Image from "next/image";
import { LocateFixedIcon, ImageOff, LucideTrash2 } from "lucide-react";
import fetchBackend from "@/utils/fetchData";
import { Dispatch, SetStateAction, useState } from "react";
import { revalidate } from "@/utils/actions";

interface EntryDisplayProps {
  geocaches: GeoCache[] | null | undefined;
  error: String | null | undefined;
  map: Map | null;
  refreshMap: Dispatch<SetStateAction<any>>;
}

export const EntryDisplay: React.FC<EntryDisplayProps> = ({ geocaches, error, map, refreshMap }) => {
  const [msg, setMsg] = useState("");
  return (
    <div className='flex flex-col'>
      {geocaches && (
        <div
          className={`relative z-[500] w-full lg:w-[30vw] h-[60vh] bg-white flex flex-col rounded-b-xl overflow-y-auto overflow-x-hidden border-white border-2`}
        >
          <div className={`bg-primary-color text-red-600 text-xs text-center ${msg === "" ? "" : "p-3"}`}>{msg}</div>
          {geocaches.toReversed().map((gc, i) => {
            const date = new Date(gc.createdAt);
            return (
              <>
                <div
                  key={gc._id + new Date()}
                  className='flex flex-row space-x-3 justify-between p-8 rounded-md border-white border-2 bg-primary-color py-5'
                >
                  <div className='flex flex-col justify-center space-y-3 pr-2'>
                    <div
                      className={`relative w-[100px] h-[100px] rounded-full bg-white-blue items-center ${
                        !gc.avatar ? "overflow-visible" : "overflow-hidden"
                      }`}
                    >
                      {gc.avatar && <Image fill src={`${gc.avatar}`} style={{ objectFit: "cover" }} alt='avatar' />}

                      <ImageOff width={80} height={80} />
                    </div>
                    <div
                      className='flex flex-row space-x-1 items-center'
                      onClick={() => {
                        map?.setView([gc.location.coordinates[1], gc.location.coordinates[0]]);
                        setMsg("");
                      }}
                    >
                      <p className='text-white text-[11px] cursor-pointer'>View on Map</p>
                      <LocateFixedIcon width={20} height={20} />
                    </div>
                  </div>
                  <div className='flex flex-col w-[600px] overflow-x-auto'>
                    <p className='text-white font-700'>{gc.name.toUpperCase()}</p>

                    <p className='text-[9px]'>Location: {gc.place}</p>
                    <p className='text-[9px] pb-2'>
                      {date.toLocaleDateString("en-US")} {date.toLocaleTimeString("en-US")}
                    </p>

                    <p className='text-[10px]'>Description: {gc.desc}</p>
                  </div>
                  <LucideTrash2
                    width={100}
                    height={100}
                    className='pt-5 cursor-pointer size-[40px] md:size-[80px]'
                    onClick={async () => {
                      const { data, error } = await fetchBackend({ method: "DELETE", endpoint: gc._id });
                      if (!error && data) {
                        revalidate("geocache");
                        geocaches.splice(i, 1);
                        setMsg(`Deleted post: ${gc.name}`);
                      } else {
                        setMsg(`Failed to delete: ${error}`);
                      }
                    }}
                  />
                </div>
              </>
            );
          })}
          {error && (
            <div
              className={`relative z-[500] lg:w-[30vw] h-[60vh] bg-white flex flex-col rounded-b-xl overflow-y-auto overflow-x-hidden border-white border-2`}
            >
              <h2>{error}</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import { Map } from "leaflet";
import { GeoCache } from "../../../types";
import Image from "next/image";
import { LocateFixedIcon, ImageOff, Trash2Icon, LucideTrash2 } from "lucide-react";
import FETCH from "@/utils/fetchData";
import { Dispatch, SetStateAction, useState } from "react";

interface EntryDisplayProps {
  geocaches: GeoCache[] | null | undefined;
  error: String | null | undefined;
  map: Map | null;
  refreshMap: Dispatch<SetStateAction<any>>;
}

export const EntryDisplay: React.FC<EntryDisplayProps> = ({ geocaches, error, map, refreshMap }) => {
  return (
    <div className="flex flex-col">
      {geocaches && (
        <div
          className={`relative z-[500] lg:w-[30vw] h-[60vh] space-y-5 bg-[#000000] flex flex-col rounded-b-xl overflow-y-auto overflow-x-hidden border-white border-2`}
        >
          {geocaches.toReversed().map((gc) => {
            const date = new Date(gc.createdAt);
            const [display, setDisplay] = useState(true);
            const [msg, setMsg] = useState("");
            return (
              <>
                {display && (
                  <div
                    key={gc._id}
                    className="flex flex-row space-x-3 justify-between p-8 rounded-md border-black border-2 bg-primary-color"
                  >
                    <div className="flex flex-col justify-center space-y-3 pr-2">
                      <div
                        className={`relative w-[100px] h-[100px] rounded-full bg-white-blue items-center ${
                          !gc.avatar ? "overflow-visible" : "overflow-hidden"
                        }`}
                      >
                        {gc.avatar && <Image fill src={`${gc.avatar}`} style={{ objectFit: "cover" }} alt="avatar" />}

                        <ImageOff width={80} height={80} />
                      </div>
                      <div
                        className="flex flex-row space-x-1 items-center"
                        onClick={() => {
                          map?.setView([gc.location.coordinates[1], gc.location.coordinates[0]]);
                        }}
                      >
                        <p className="text-white text-[11px] cursor-pointer">View on Map</p>
                        <LocateFixedIcon width={20} height={20} />
                      </div>
                    </div>
                    <div className="flex flex-col w-[600px] overflow-x-auto">
                      <p className="text-white font-700">{gc.name.toUpperCase()}</p>

                      <p className="text-[9px]">Location: {gc.place}</p>
                      <p className="text-[9px] pb-2">
                        {date.toLocaleDateString("en-US")} {date.toLocaleTimeString("en-US")}
                      </p>

                      <p className="text-[10px]">Description: {gc.desc}</p>
                      <p className="text-red-600 text-[9px] pt-3">{msg}</p>
                    </div>
                    <LucideTrash2
                      width={100}
                      height={100}
                      className="p-1 translate-y-[-30px] cursor-pointer"
                      onClick={async () => {
                        const { data, error } = await FETCH("DELETE", undefined, "geocache", gc._id);
                        if (!error && data) {
                          setDisplay(false);
                          refreshMap(new Date());
                        } else {
                          setMsg(`Failed to delete: ${error}`);
                        }
                      }}
                    />
                  </div>
                )}
              </>
            );
          })}
          {!geocaches && (
            <div className="w-[40vw] h-full space-y-5 bg-navbar-tab-hover-bg p-5 flex flex-col rounded-lg">
              <h2>{error}</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

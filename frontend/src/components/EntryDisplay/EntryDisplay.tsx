import { Map } from "leaflet";
import { GeoCache } from "../../../types";
import Image from "next/image";
import { LocateFixedIcon } from "lucide-react";

interface EntryDisplayProps {
  geocaches: GeoCache[] | null | undefined;
  error: String | null | undefined;
  map: Map | null;
}

export const EntryDisplay: React.FC<EntryDisplayProps> = ({
  geocaches,
  error,
  map,
}) => {
  return (
    <div className="flex flex-col">
      {geocaches && (
        <div
          className={`relative z-[500] lg:w-[30vw] h-[60vh] space-y-5 bg-[#000000] flex flex-col rounded-b-xl overflow-y-auto overflow-x-hidden border-white border-2`}
        >
          {geocaches.map((gc) => {
            const date = new Date(gc.createdAt);
            return (
              <div
                key={gc._id}
                className="flex flex-row space-x-5 justify-between p-8 rounded-md border-black border-2 bg-primary-color"
              >
                <div className="flex flex-col justify-center space-y-3">
                  <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden bg-white-blue">
                    <Image
                      fill
                      src={`${gc.avatar}`}
                      style={{ objectFit: "cover" }}
                      alt="avatar"
                    />
                  </div>
                  <div
                    className="flex flex-row space-x-1 items-center"
                    onClick={() => {
                      map?.setView([
                        gc.location.coordinates[1],
                        gc.location.coordinates[0],
                      ]);
                    }}
                  >
                    <p className="text-white text-[11px]">View on Map</p>
                    <LocateFixedIcon width={20} height={20} />
                  </div>
                </div>
                <div className="flex flex-col w-[600px] overflow-x-auto">
                  <p className="text-white font-700">{gc.name.toUpperCase()}</p>

                  <p className="text-[9px]">Location: {gc.place}</p>
                  <p className="text-[9px] pb-2">
                    {date.toLocaleDateString("en-US")}{" "}
                    {date.toLocaleTimeString("en-US")}
                  </p>

                  <p className="text-[10px]">Description: {gc.desc}</p>
                </div>
              </div>
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

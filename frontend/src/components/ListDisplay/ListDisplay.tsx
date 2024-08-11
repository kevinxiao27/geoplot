import Image from "next/image";
import { GeoCache } from "../../../types";

interface ListDisplayProps {
  geocaches: GeoCache[] | null | undefined;
  error: String | null | undefined;
}

export const ListDisplay: React.FC<ListDisplayProps> = ({
  geocaches,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <div className="relative z-[500] lg:w-[30vw] bg-primary-color p-3 border-white border-2 rounded-t-xl border-b-0">
        <h3 className="text-white">All Entries</h3>
      </div>
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
                <div className="flex flex-col justify-center">
                  <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden bg-white-blue">
                    <Image
                      fill
                      src={`${gc.avatar}`}
                      style={{ objectFit: "cover" }}
                      alt="avatar"
                    />
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

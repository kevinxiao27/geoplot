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
      <div className="relative z-[500] lg:w-[30vw] bg-primary-color p-3 border-pale-blue border-2 rounded-t-xl border-b-0">
        <h3 className="text-white">All Entries</h3>
      </div>
      {geocaches && (
        <div
          className={`relative z-[500] lg:w-[30vw] h-[60vh] space-y-5 bg-navbar-tab-hover-bg flex flex-col rounded-b-xl overflow-y-auto overflow-x-hidden border-pale-blue border-2`}
        >
          {geocaches.map((gc) => (
            <div
              key={gc._id}
              className="flex flex-row space-x-5 justify-between p-8 rounded-md border-black border-2 bg-primary-color"
            >
              <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden bg-white-blue">
                <Image
                  fill
                  src={`${gc.avatar}`}
                  style={{ objectFit: "cover" }}
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col space-y-2 w-[600px] overflow-x-auto">
                <h3 className="text-white pb-3">{gc.name.toUpperCase()}</h3>
                <p className="text-white">Description: {gc.desc}</p>
                <p>Location: {gc.place}</p>
                <p>
                  Coordinates: {`${gc.location.coordinates[0]}`},{" "}
                  {`${gc.location.coordinates[1]}`}
                </p>
              </div>
            </div>
          ))}
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

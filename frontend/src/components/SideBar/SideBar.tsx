import { GeoCache } from "../../../types";
import { Map } from "leaflet";
import { PlusSquare, ViewIcon } from "lucide-react";
import { EntryDisplay } from "../EntryDisplay/EntryDisplay";
import { useState } from "react";
import { GeocacheForm } from "../GeocacheForm/GeocacheForm";

interface SideBarProps {
  geocaches: GeoCache[] | null | undefined;
  error: String | null | undefined;
  map: Map | null;
}

export const SideBar: React.FC<SideBarProps> = ({ geocaches, error, map }) => {
  const [SideBarState, setSideBarState] = useState("All Entries");
  const activeSideBarComponent = (state: string) => {
    switch (state) {
      case "All Entries":
        return <EntryDisplay geocaches={geocaches} error={error} map={map} />;

      case "Create Geocache":
        return <GeocacheForm />;

      default:
        return <EntryDisplay geocaches={geocaches} error={error} map={map} />;
    }
  };
  return (
    <div className="flex flex-col">
      <div className="relative z-[500] lg:w-[30vw] bg-primary-color p-5 border-white border-2 rounded-t-xl border-b-0 flex flex-row items-center">
        <h3 className="text-white flex-grow">{SideBarState}</h3>
        <ViewIcon
          width={60}
          height={60}
          className="flex-none px-2 cursor-pointer"
          onClick={() => {
            setSideBarState("All Entries");
          }}
        />
        <PlusSquare
          width={60}
          height={60}
          className="flex-none px-2 cursor-pointer"
          onClick={() => {
            setSideBarState("Create Geocache");
          }}
        />
      </div>
      {activeSideBarComponent(SideBarState)}
    </div>
  );
};

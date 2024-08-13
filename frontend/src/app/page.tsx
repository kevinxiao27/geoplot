import { SideBar } from "@/components/SideBar/SideBar";
import { apiResponse, apiError, GeoCache } from "../../types";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default async function Page() {
  const LeafletMap = useMemo(
    () =>
      dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  const { geocaches, error } = await fetchData();
  return (
    <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
      <LeafletMap geocaches={geocaches} />
    </div>
  );
}

export const fetchData = async () => {
  const response = await fetch("https://geoplotapi.vercel.app/api/geocaches", {
    method: "GET",
  });

  try {
    const data: apiResponse<GeoCache[]> | apiError = await response.json();
    if ("error" in data) {
      return {
        geocaches: null,
        error: data?.error,
      };
    }

    return {
      geocaches: data.data,
      error: null,
    };
  } catch (error) {
    return {
      geocaches: null,
      error: "Unable to parse response",
    };
  }
};

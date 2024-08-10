import { ListDisplay } from "@/components/ListDisplay/ListDisplay";
import { apiResponse, apiError, GeoCache } from "../../../types";
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
    <>
      <div className="flex flex-row items-center justify-center text-white p-3 font-700 text-3xl">
        GeoPlots
      </div>
      <div className="absolute bg-white-700 px-5 my-5 w-[100vw] h-[80%]">
        <LeafletMap geocaches={geocaches} />
      </div>
      <div className="p-5 flex justify-end">
        <ListDisplay geocaches={geocaches} error={error} />
      </div>
    </>
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

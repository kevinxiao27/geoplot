"use server";
import { apiError, apiResponse, GeoCache } from "../../types";

interface response {
  geocaches: null | undefined | GeoCache[];
  count: number;
  error: string | null;
}

async function fetchData(method: string, body?: Body): Promise<response> {
  try {
    const response = await fetch(
      "https://geoplotapi.vercel.app/api/geocaches",
      {
        method: `${method}`,
        body: JSON.stringify(body),
      }
    );
    const data: apiResponse<GeoCache[]> | apiError = await response.json();
    if ("error" in data) {
      return {
        geocaches: null,
        count: 0,
        error: data?.error,
      };
    }

    return {
      geocaches: data.data,
      count: data.count,
      error: null,
    };
  } catch (error) {
    return {
      geocaches: null,
      count: 0,
      error: "Unable to parse response",
    };
  }
}

export default fetchData;

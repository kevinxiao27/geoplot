"use server";
import { apiError, apiResponse, GeoCache } from "../../types";
import "../../envConfig";

interface response {
  data: null | undefined | GeoCache[];
  count: number;
  error: string | null;
}

async function FETCH(method: string, body?: Object): Promise<response> {
  try {
    console.log(JSON.stringify(body));
    const response = await fetch(`${process.env.API_DOMAIN}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data: apiResponse<GeoCache[]> | apiError = await response.json();
    console.log(data);
    if ("error" in data) {
      return {
        data: null,
        count: 0,
        error: data?.error,
      };
    }

    return {
      data: data.data,
      count: data.count || 0,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      count: 0,
      error: "Unable to parse response",
    };
  }
}

export default FETCH;

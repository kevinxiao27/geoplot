"use server";
import { apiError, apiResponse, GeoCache } from "../../types";
import "../../envConfig";

interface response {
  data: null | undefined | GeoCache[];
  count: number;
  error: string | null;
}

async function FETCH(method: string, body?: Object, collection?: string, id?: string): Promise<response> {
  try {
    console.log(`${process.env.API_DOMAIN}/${id ? id : ""}`);
    const response = await fetch(`${process.env.API_DOMAIN}/${id ? id : ""}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body && { body: JSON.stringify(body) }),
      ...(collection && { next: { tags: [collection] } }),
    });
    const data: apiResponse<GeoCache[]> | apiError = await response.json();
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
    console.error(error);
    return {
      data: null,
      count: 0,
      error: "Unable to parse response",
    };
  }
}

export default FETCH;

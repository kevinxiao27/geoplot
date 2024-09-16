"use server";
import { ApiError, ApiResponse, GeoCache } from "../../types";
import "../../envConfig.js";

interface response {
  data: null | undefined | GeoCache[];
  count: number;
  error: string | null;
}

interface FetchBackendOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, unknown>;
  collection?: string;
  endpoint?: string;
}

async function fetchBackend({ method, body, collection, endpoint }: FetchBackendOptions): Promise<response> {
  try {
    const headers: Record<string, string> = {};
    if (method === "POST" || method === "PUT") {
      headers["Content-Type"] = "application/json";
      headers["Accept"] = "application/json";
    }
    const response = await fetch(`${process.env.API_DOMAIN}/${endpoint ? endpoint : ""}`, {
      method: `${method}`,
      headers,
      ...(body && { body: JSON.stringify(body) }),
      ...(collection && { next: { tags: [collection] } })
    });
    const data: ApiResponse<GeoCache[]> | ApiError = await response.json();
    if ("error" in data) {
      return {
        data: null,
        count: 0,
        error: data?.error
      };
    }

    return {
      data: data.data,
      count: data.count || 0,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      count: 0,
      error: `Unable to parse response ${error}`
    };
  }
}

export default fetchBackend;

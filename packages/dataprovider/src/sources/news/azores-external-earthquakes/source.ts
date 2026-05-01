import { registerSource, type Source } from "@azores/core";

export type EarthquakeParams = {
  // ISO-8601, e.g. "2026-04-24". Defaults to the last 24h on the server when omitted.
  starttime?: string;
  endtime?: string;
  minmagnitude?: number;
  maxmagnitude?: number;
  limit?: number;
  // Bounding box (decimal degrees). All four required when used.
  minlatitude?: number;
  maxlatitude?: number;
  minlongitude?: number;
  maxlongitude?: number;
  orderby?: "time" | "time-asc" | "magnitude" | "magnitude-asc";
};

export type EarthquakeFeature = {
  type: "Feature";
  id: string;
  properties: {
    mag: number | null;
    place: string | null;
    time: number;
    updated: number;
    url: string;
    detail: string;
    felt: number | null;
    tsunami: 0 | 1;
    sig: number;
    type: string;
    title: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number, number]; // [lng, lat, depth-km]
  };
};

export type EarthquakeData = {
  type: "FeatureCollection";
  metadata: {
    generated: number;
    url: string;
    title: string;
    count: number;
    status: number;
  };
  features: EarthquakeFeature[];
};

export const EARTHQUAKES_SOURCE_NAME = "azores-external-earthquakes";

export const earthquakesSource: Source<EarthquakeParams, EarthquakeData> = {
  name: EARTHQUAKES_SOURCE_NAME,
  ttlMs: 5 * 60 * 1000,
  build: (params = {}) => {
    const qs = new URLSearchParams({ format: "geojson" });
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) qs.set(key, String(value));
    }
    return `https://earthquake.usgs.gov/fdsnws/event/1/query?${qs.toString()}`;
  },
};

registerSource(earthquakesSource);

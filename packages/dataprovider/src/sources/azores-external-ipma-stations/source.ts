import { registerSource, type Source } from "@azores/core";

// IPMA station metadata (Portugal mainland + Azores + Madeira). GeoJSON
// FeatureCollection. Stations rarely change — long TTL.

export type IpmaStationFeature = {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] }; // [lng, lat]
  properties: {
    idEstacao: number;
    localEstacao: string;
  };
};

export type IpmaStations = {
  type: "FeatureCollection";
  features: IpmaStationFeature[];
};

export const IPMA_STATIONS_SOURCE_NAME = "azores-external-ipma-stations";

// IPMA's stations.json sometimes returns a plain array of features and
// sometimes a wrapped FeatureCollection. Normalise to the wrapped shape so
// callers can rely on `.features` existing.
const normaliseStations = (raw: unknown): IpmaStations => {
  if (Array.isArray(raw)) {
    return { type: "FeatureCollection", features: raw as IpmaStationFeature[] };
  }
  if (raw && typeof raw === "object" && Array.isArray((raw as { features?: unknown }).features)) {
    return raw as IpmaStations;
  }
  return { type: "FeatureCollection", features: [] };
};

export const ipmaStationsSource: Source<undefined, IpmaStations> = {
  name: IPMA_STATIONS_SOURCE_NAME,
  ttlMs: 24 * 60 * 60 * 1000,
  build: () =>
    "https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json",
  parse: normaliseStations,
};

registerSource(ipmaStationsSource);

import { registerSource, type Source } from "@azores/core";

export type IssParams = Record<string, never>;

export type IssData = {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: string;
  timestamp: number;
};

export const ISS_SOURCE_NAME = "azores-external-iss";

export const issSource: Source<IssParams, IssData> = {
  name: ISS_SOURCE_NAME,
  ttlMs: 15 * 1000,
  build: () => "https://api.wheretheiss.at/v1/satellites/25544",
};

registerSource(issSource);

import { registerSource, type Source } from "@azores/core";

// SWPC most commonly returns array-of-arrays (header row first, then
// [time_tag, kp, a_running, station_count]) but has also been seen
// returning array-of-objects. The widget normalises both.
export type AuroraParams = Record<string, never>;
export type AuroraRow = unknown;
export type AuroraData = AuroraRow[];

export const AURORA_SOURCE_NAME = "azores-external-aurora";

export const auroraSource: Source<AuroraParams, AuroraData> = {
  name: AURORA_SOURCE_NAME,
  ttlMs: 30 * 60 * 1000,
  build: () =>
    "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json",
};

registerSource(auroraSource);

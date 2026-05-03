import { registerSource, type Source } from "@azores/core";

export type AirQualityParams = { lat?: number; lon?: number };

export type AirQualityData = {
  latitude: number;
  longitude: number;
  current: {
    time: string;
    european_aqi: number;
    pm10: number;
    pm2_5: number;
  };
};

export const AIRQUALITY_SOURCE_NAME = "azores-external-airquality";

// Default coords: Ponta Delgada (Azores) — same anchor as the Weather widget.
export const airQualitySource: Source<AirQualityParams, AirQualityData> = {
  name: AIRQUALITY_SOURCE_NAME,
  ttlMs: 30 * 60 * 1000,
  build: ({ lat = 37.7412, lon = -25.6756 } = {}) =>
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=european_aqi,pm10,pm2_5`,
};

registerSource(airQualitySource);

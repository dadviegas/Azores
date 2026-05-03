import { registerSource, type Source } from "@azores/core";

export type SunriseParams = { lat?: number; lon?: number };

export type SunriseData = {
  results: {
    sunrise: string; // ISO UTC (formatted=0)
    sunset: string;
    solar_noon: string;
    // With formatted=0 the API returns day_length as a number of seconds.
    // With formatted=1 (default) it would be a string like "11:42:13" — we
    // accept both so the widget doesn't blow up if someone changes the URL.
    day_length: number | string;
    civil_twilight_begin: string;
    civil_twilight_end: string;
  };
  status: string;
};

export const SUNRISE_SOURCE_NAME = "azores-external-sunrise";

// Default to Ponta Delgada — same anchor as Weather/AirQuality.
export const sunriseSource: Source<SunriseParams, SunriseData> = {
  name: SUNRISE_SOURCE_NAME,
  ttlMs: 6 * 60 * 60 * 1000,
  build: ({ lat = 37.7412, lon = -25.6756 } = {}) =>
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`,
};

registerSource(sunriseSource);

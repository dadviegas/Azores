import { registerSource, type Source } from "@azores/core";

export type ApodParams = Record<string, never>;

export type ApodData = {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  copyright?: string;
};

export const APOD_SOURCE_NAME = "azores-external-apod";

// DEMO_KEY is NASA's shared, unauthenticated key — rate-limited but
// adequate for a low-volume widget. Not a secret.
export const apodSource: Source<ApodParams, ApodData> = {
  name: APOD_SOURCE_NAME,
  ttlMs: 6 * 60 * 60 * 1000,
  build: () => "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
};

registerSource(apodSource);

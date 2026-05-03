import { registerSource, type Source } from "@azores/core";

export type NpmParams = { pkg?: string; period?: "last-day" | "last-week" | "last-month" };

export type NpmData = {
  downloads: number;
  start: string;
  end: string;
  package: string;
};

export const NPM_SOURCE_NAME = "azores-external-npm";

export const npmSource: Source<NpmParams, NpmData> = {
  name: NPM_SOURCE_NAME,
  ttlMs: 6 * 60 * 60 * 1000,
  build: ({ pkg = "react", period = "last-week" } = {}) =>
    `https://api.npmjs.org/downloads/point/${period}/${encodeURIComponent(pkg)}`,
};

registerSource(npmSource);

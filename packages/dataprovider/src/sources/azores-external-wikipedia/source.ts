import { registerSource, type Source } from "@azores/core";

export type WikipediaParams = { title: string };
export type WikipediaSummary = {
  title: string;
  extract: string;
  description?: string;
  thumbnail?: { source: string; width: number; height: number };
  content_urls?: { desktop: { page: string } };
};

export const WIKIPEDIA_SOURCE_NAME = "azores-external-wikipedia";

export const wikipediaSource: Source<WikipediaParams, WikipediaSummary> = {
  name: WIKIPEDIA_SOURCE_NAME,
  ttlMs: 60 * 60 * 1000,
  build: ({ title }) =>
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
};

registerSource(wikipediaSource);

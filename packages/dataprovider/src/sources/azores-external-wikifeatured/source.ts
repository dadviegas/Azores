import { registerSource, type Source } from "@azores/core";

export type WikiFeaturedParams = Record<string, never>;

export type WikiFeaturedSummary = {
  type: string;
  title: string;
  description?: string;
  extract: string;
  thumbnail?: { source: string };
  content_urls?: { desktop: { page: string } };
};

// We only render the "tfa" (today's featured article) field.
export type WikiFeaturedData = {
  tfa?: WikiFeaturedSummary;
};

export const WIKIFEATURED_SOURCE_NAME = "azores-external-wikifeatured";

const pad2 = (n: number): string => String(n).padStart(2, "0");

export const wikiFeaturedSource: Source<WikiFeaturedParams, WikiFeaturedData> = {
  name: WIKIFEATURED_SOURCE_NAME,
  ttlMs: 12 * 60 * 60 * 1000,
  build: () => {
    const d = new Date();
    return (
      `https://en.wikipedia.org/api/rest_v1/feed/featured/` +
      `${d.getFullYear()}/${pad2(d.getMonth() + 1)}/${pad2(d.getDate())}`
    );
  },
};

registerSource(wikiFeaturedSource);

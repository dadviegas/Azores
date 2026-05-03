import { registerSource, type Source } from "@azores/core";

export type HackerNewsParams = { tag?: "front_page" | "story"; hits?: number };

export type HackerNewsHit = {
  objectID: string;
  title: string;
  url: string | null;
  points: number;
  author: string;
  num_comments: number;
  created_at: string;
};

export type HackerNewsData = { hits: HackerNewsHit[] };

export const HACKERNEWS_SOURCE_NAME = "azores-external-hackernews";

export const hackerNewsSource: Source<HackerNewsParams, HackerNewsData> = {
  name: HACKERNEWS_SOURCE_NAME,
  ttlMs: 10 * 60 * 1000,
  build: ({ tag = "front_page", hits = 15 } = {}) =>
    `https://hn.algolia.com/api/v1/search?tags=${tag}&hitsPerPage=${hits}`,
};

registerSource(hackerNewsSource);

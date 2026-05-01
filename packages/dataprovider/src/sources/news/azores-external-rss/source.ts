import { registerSource, type Source } from "@azores/core";

import { parseRss, type RssFeed } from "../../../rss.js";

export type RssParams = { url: string };

export const RSS_SOURCE_NAME = "azores-external-rss";

export const rssSource: Source<RssParams, RssFeed> = {
  name: RSS_SOURCE_NAME,
  ttlMs: 10 * 60 * 1000,
  responseType: "text",
  build: ({ url }) => url,
  parse: (raw) => {
    if (typeof raw !== "string") {
      throw new Error("rssSource: expected text body");
    }
    return parseRss(raw);
  },
};

registerSource(rssSource);

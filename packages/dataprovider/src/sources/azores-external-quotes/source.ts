import { registerSource, type Source } from "@azores/core";

export type QuoteParams = { tags?: string };

export type QuoteData = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  length: number;
};

export const QUOTES_SOURCE_NAME = "azores-external-quotes";

export const quotesSource: Source<QuoteParams, QuoteData> = {
  name: QUOTES_SOURCE_NAME,
  ttlMs: 30 * 60 * 1000,
  build: ({ tags } = {}) => {
    const q = tags ? `?tags=${encodeURIComponent(tags)}` : "";
    return `https://api.quotable.io/random${q}`;
  },
};

registerSource(quotesSource);

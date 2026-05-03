import { registerSource, type Source } from "@azores/core";

export type OnThisDayParams = { month?: number; day?: number };

export type OnThisDayPage = {
  title: string;
  extract?: string;
  content_urls?: { desktop: { page: string } };
  thumbnail?: { source: string };
};

export type OnThisDayEvent = {
  text: string;
  year: number;
  pages?: OnThisDayPage[];
};

export type OnThisDayData = {
  events: OnThisDayEvent[];
};

export const ONTHISDAY_SOURCE_NAME = "azores-external-onthisday";

const pad2 = (n: number): string => String(n).padStart(2, "0");

export const onThisDaySource: Source<OnThisDayParams, OnThisDayData> = {
  name: ONTHISDAY_SOURCE_NAME,
  ttlMs: 12 * 60 * 60 * 1000,
  build: ({ month, day } = {}) => {
    const now = new Date();
    const m = month ?? now.getMonth() + 1;
    const d = day ?? now.getDate();
    return `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${pad2(m)}/${pad2(d)}`;
  },
};

registerSource(onThisDaySource);

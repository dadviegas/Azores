import { registerSource, type Source } from "@azores/core";

export type HolidaysParams = { year?: number; country?: string };

export type Holiday = {
  date: string; // YYYY-MM-DD
  localName: string;
  name: string;
  countryCode: string;
  global: boolean;
  types: string[];
};

export type HolidaysData = Holiday[];

export const HOLIDAYS_SOURCE_NAME = "azores-external-holidays";

export const holidaysSource: Source<HolidaysParams, HolidaysData> = {
  name: HOLIDAYS_SOURCE_NAME,
  ttlMs: 24 * 60 * 60 * 1000,
  build: ({ year, country = "PT" } = {}) => {
    const y = year ?? new Date().getFullYear();
    return `https://date.nager.at/api/v3/PublicHolidays/${y}/${country.toUpperCase()}`;
  },
};

registerSource(holidaysSource);

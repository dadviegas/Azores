import { registerSource, type Source } from "@azores/core";

export type WorldBankParams = {
  // ISO-2 or ISO-3 country code, or "all". Defaults to "PT" (Portugal).
  country?: string;
  // World Bank indicator code, e.g. "NY.GDP.MKTP.CD". Required.
  indicator: string;
  // Year range, e.g. "2015:2024". Optional.
  date?: string;
  // Page size; the API caps at ~32500.
  perPage?: number;
};

export type WorldBankRow = {
  indicator: { id: string; value: string };
  country: { id: string; value: string };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
};

export type WorldBankMeta = {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  sourceid?: string;
  lastupdated?: string;
};

export type WorldBankSeries = {
  meta: WorldBankMeta;
  rows: WorldBankRow[];
};

export const WORLDBANK_SOURCE_NAME = "azores-external-worldbank";

export const worldBankSource: Source<WorldBankParams, WorldBankSeries> = {
  name: WORLDBANK_SOURCE_NAME,
  ttlMs: 24 * 60 * 60 * 1000,
  build: ({ country = "PT", indicator, date, perPage = 60 }) => {
    const qs = new URLSearchParams({
      format: "json",
      per_page: String(perPage),
    });
    if (date) qs.set("date", date);
    return `https://api.worldbank.org/v2/country/${encodeURIComponent(
      country,
    )}/indicator/${encodeURIComponent(indicator)}?${qs.toString()}`;
  },
  parse: (raw) => {
    if (!Array.isArray(raw) || raw.length < 2) {
      throw new Error("worldBankSource: unexpected response shape");
    }
    const [meta, rows] = raw as [WorldBankMeta, WorldBankRow[] | null];
    return { meta, rows: rows ?? [] };
  },
};

registerSource(worldBankSource);

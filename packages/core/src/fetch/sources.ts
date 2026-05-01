// Registry of named data sources. A "source" is a typed contract:
//   - a URL builder taking the caller's params,
//   - an optional TTL override (some sources change faster than the 10-min
//     default; some rarely change at all),
//   - an optional response transformer.
//
// Apps and widgets request data by source name + params via the Fetcher. The
// Fetcher checks the source name against its allowlist, builds the URL,
// hits the cache (keyed by source + params), and falls through to fetch.
//
// All sources here are public, no-key, CORS-open APIs. See docs/plan.md §7.

import { DEFAULT_TTL_MS } from "./cache.js";

export type Source<TParams = unknown, TData = unknown> = {
  name: string;
  ttlMs?: number;
  build: (params: TParams) => string;
  parse?: (raw: unknown) => TData;
};

const registry = new Map<string, Source<unknown, unknown>>();

export const registerSource = <TParams, TData>(s: Source<TParams, TData>): void => {
  registry.set(s.name, s as unknown as Source<unknown, unknown>);
};

export const getSource = (name: string): Source<unknown, unknown> | undefined =>
  registry.get(name);

export const listSources = (): string[] => Array.from(registry.keys());

// ---------- Built-in sources ----------

export type WeatherParams = { lat: number; lng: number };
export type WeatherData = {
  current_weather?: { temperature: number; weathercode: number; windspeed: number };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
};

registerSource<WeatherParams, WeatherData>({
  name: "weather",
  ttlMs: 10 * 60 * 1000,
  build: ({ lat, lng }) =>
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
    `&current_weather=true` +
    `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
    `&timezone=auto`,
});

export type CountriesParams = void;
export type Country = {
  name: { common: string; official: string };
  cca2: string;
  capital?: string[];
  population: number;
  flag: string;
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
};

registerSource<CountriesParams, Country[]>({
  name: "countries",
  ttlMs: 24 * 60 * 60 * 1000,
  build: () =>
    "https://restcountries.com/v3.1/all?fields=name,cca2,capital,population,flag,currencies,languages",
});

export type WikipediaParams = { title: string };
export type WikipediaSummary = {
  title: string;
  extract: string;
  description?: string;
  thumbnail?: { source: string; width: number; height: number };
  content_urls?: { desktop: { page: string } };
};

registerSource<WikipediaParams, WikipediaSummary>({
  name: "wikipedia",
  ttlMs: 60 * 60 * 1000,
  build: ({ title }) =>
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
});

export type FxParams = { base?: string; symbols?: string[] };
export type FxRates = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};

registerSource<FxParams, FxRates>({
  name: "fx",
  ttlMs: 5 * 60 * 1000,
  build: ({ base = "EUR", symbols = ["USD", "GBP", "JPY", "BRL"] }) =>
    `https://api.frankfurter.app/latest?from=${base}&to=${symbols.join(",")}`,
});

// Fallback for sources that don't override the default — keeps types tight.
export const DEFAULT_SOURCE_TTL_MS = DEFAULT_TTL_MS;

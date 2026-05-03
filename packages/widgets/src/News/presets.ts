// Curated free news feeds grouped by region. Used by the News widget when
// the user picks from a catalog rather than typing a URL.
//
// Only feeds that serve `Access-Control-Allow-Origin: *` (or equivalent)
// belong here — anything else is unreachable from page JS. The registry
// filters this list with `.filter((p) => p.corsFriendly)` before surfacing
// it, so a `false` entry is dead weight. Add a feed only after confirming
// the response carries the CORS header from the browser.

export type NewsRegion = "world" | "europe" | "americas" | "tech";

export type NewsPreset = {
  id: string;
  label: string;
  url: string;
  region: NewsRegion;
  // Source category — `rss` covers RSS 2.0 and Atom (the rss source parses
  // both). `api` is reserved for future JSON-API-backed presets.
  kind: "rss" | "api";
  corsFriendly: boolean;
  // Short note: language, license, or caveat worth surfacing in the picker.
  note?: string;
};

export const NEWS_PRESETS: ReadonlyArray<NewsPreset> = [
  // Empty until a CORS-friendly feed is added. The user can still drop a
  // generic `News feed` widget and paste any URL — the catalog presets are
  // for one-click adds only.
];

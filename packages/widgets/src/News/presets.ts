// Curated free news feeds grouped by region. Used by the News widget when
// the user picks from a catalog rather than typing a URL.
//
// `corsFriendly: true` means the upstream serves
// `Access-Control-Allow-Origin: *` (or equivalent), so the browser can fetch
// it directly. Most major outlets (BBC, Reuters, AP, NYT, Le Monde, Al
// Jazeera, NPR, …) publish RSS but do NOT set CORS — they're useless from
// page JS without a proxy. The registry filters this list with
// `.filter((p) => p.corsFriendly)` before exposing it to the widget
// library, so non-CORS entries here are dead weight. Keep this list to
// genuinely browser-fetchable feeds; route everything else through a proxy
// when one exists.

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

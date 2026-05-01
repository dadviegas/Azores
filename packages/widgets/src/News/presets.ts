// Curated free news feeds grouped by region. Used by the News widget when
// the user picks from a catalog rather than typing a URL.
//
// `corsFriendly: true` means the upstream serves
// `Access-Control-Allow-Origin: *` (or equivalent), so the browser can fetch
// it directly. Most major outlets (BBC, Reuters, AP, NYT, Le Monde, …)
// publish RSS but do NOT set CORS — they're listed here as `false` so a
// future picker UI can disable them, or route them through a proxy when one
// exists. Don't promote a non-CORS feed to the default.

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
  // ── World ──────────────────────────────────────────────────────────────
  {
    id: "reddit-worldnews",
    label: "Reddit · r/worldnews",
    url: "https://www.reddit.com/r/worldnews/.rss",
    region: "world",
    kind: "rss",
    corsFriendly: true,
  },
  {
    id: "wikinews-en",
    label: "Wikinews (English)",
    url: "https://en.wikinews.org/w/index.php?title=Special:NewsFeed&feed=atom&categories=Published&notcategories=No%20publish%7CArchived%7CAutoArchived%7Cdisputed&namespace=0&count=30&hourcount=124&ordermethod=categoryadd&stablepages=only",
    region: "world",
    kind: "rss",
    corsFriendly: true,
    note: "Wikimedia · CC BY 2.5",
  },
  {
    id: "aljazeera-world",
    label: "Al Jazeera · World",
    url: "https://www.aljazeera.com/xml/rss/all.xml",
    region: "world",
    kind: "rss",
    corsFriendly: false,
    note: "Needs CORS proxy",
  },
  {
    id: "bbc-world",
    label: "BBC News · World",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    region: "world",
    kind: "rss",
    corsFriendly: false,
    note: "Needs CORS proxy",
  },
  {
    id: "reuters-world",
    label: "Reuters · World",
    url: "https://www.reutersagency.com/feed/?best-regions=world&post_type=best",
    region: "world",
    kind: "rss",
    corsFriendly: false,
    note: "Needs CORS proxy",
  },

  // ── Europe ─────────────────────────────────────────────────────────────
  {
    id: "reddit-europe",
    label: "Reddit · r/europe",
    url: "https://www.reddit.com/r/europe/.rss",
    region: "europe",
    kind: "rss",
    corsFriendly: true,
  },
  {
    id: "euronews-en",
    label: "Euronews (English)",
    url: "https://www.euronews.com/rss?level=theme&name=news",
    region: "europe",
    kind: "rss",
    corsFriendly: false,
    note: "Needs CORS proxy",
  },
  {
    id: "politico-eu",
    label: "Politico Europe",
    url: "https://www.politico.eu/feed/",
    region: "europe",
    kind: "rss",
    corsFriendly: false,
    note: "Needs CORS proxy",
  },
  {
    id: "dw-en-top",
    label: "Deutsche Welle · Top stories (EN)",
    url: "https://rss.dw.com/rdf/rss-en-top",
    region: "europe",
    kind: "rss",
    corsFriendly: false,
    note: "Needs CORS proxy",
  },

  // ── Americas ───────────────────────────────────────────────────────────
  {
    id: "reddit-news",
    label: "Reddit · r/news",
    url: "https://www.reddit.com/r/news/.rss",
    region: "americas",
    kind: "rss",
    corsFriendly: true,
  },
  {
    id: "reddit-canada",
    label: "Reddit · r/canada",
    url: "https://www.reddit.com/r/canada/.rss",
    region: "americas",
    kind: "rss",
    corsFriendly: true,
  },
  {
    id: "npr-news",
    label: "NPR · News",
    url: "https://feeds.npr.org/1001/rss.xml",
    region: "americas",
    kind: "rss",
    corsFriendly: false,
    note: "Needs CORS proxy",
  },
  {
    id: "propublica",
    label: "ProPublica",
    url: "https://www.propublica.org/feeds/propublica/main",
    region: "americas",
    kind: "rss",
    corsFriendly: false,
    note: "Needs CORS proxy",
  },
  {
    id: "cbc-topstories",
    label: "CBC · Top stories",
    url: "https://www.cbc.ca/webfeed/rss/rss-topstories",
    region: "americas",
    kind: "rss",
    corsFriendly: false,
    note: "Needs CORS proxy",
  },

  // ── Tech (CORS-clean, useful out of the box) ───────────────────────────
  {
    id: "hn-frontpage",
    label: "Hacker News · Front page",
    url: "https://hnrss.org/frontpage",
    region: "tech",
    kind: "rss",
    corsFriendly: true,
  },
  {
    id: "hn-best",
    label: "Hacker News · Best",
    url: "https://hnrss.org/best",
    region: "tech",
    kind: "rss",
    corsFriendly: true,
  },
  {
    id: "lobsters",
    label: "Lobste.rs",
    url: "https://lobste.rs/rss",
    region: "tech",
    kind: "rss",
    corsFriendly: true,
  },
];

export const presetsByRegion = (
  region: NewsRegion,
): ReadonlyArray<NewsPreset> => NEWS_PRESETS.filter((p) => p.region === region);

export const findPreset = (id: string): NewsPreset | undefined =>
  NEWS_PRESETS.find((p) => p.id === id);

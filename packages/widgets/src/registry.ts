// Registry of every widget @azores/widgets ships. The manifest.yaml of each
// widget is bundled at build time (rspack yaml-loader), validated through
// `parseWidgetManifest`, and paired with a `React.lazy` thunk so the widget
// component itself is fetched on first mount.

import type { ComponentType, LazyExoticComponent } from "react";
import { lazy } from "react";
import {
  parseDurationMs,
  parseWidgetManifest,
  type WidgetManifest,
} from "@azores/dataprovider";
import type { WidgetProps } from "./widget.js";
import { NEWS_PRESETS } from "./News/presets.js";

import atlasManifestRaw from "./Atlas/manifest.yaml";
import earthquakesManifestRaw from "./Earthquakes/manifest.yaml";
import fxManifestRaw from "./Fx/manifest.yaml";
import newsManifestRaw from "./News/manifest.yaml";
import weatherManifestRaw from "./Weather/manifest.yaml";
import wikipediaManifestRaw from "./Wikipedia/manifest.yaml";
import worldBankManifestRaw from "./WorldBank/manifest.yaml";

export type WidgetEntry = {
  manifest: WidgetManifest;
  // Resolved manifest TTL in ms, or null if unset (widgets fall back to the
  // source default).
  ttlMs: number | null;
  Component: LazyExoticComponent<ComponentType<WidgetProps>>;
};

const make = (
  raw: unknown,
  load: () => Promise<{ default: ComponentType<WidgetProps> }>,
): WidgetEntry => {
  const manifest = parseWidgetManifest(raw);
  return {
    manifest,
    ttlMs: manifest.ttl != null ? parseDurationMs(manifest.ttl) : null,
    Component: lazy(load),
  };
};

export const widgetRegistry: Readonly<Record<string, WidgetEntry>> = {
  weather: make(weatherManifestRaw, () => import("./Weather/Weather.js")),
  atlas: make(atlasManifestRaw, () => import("./Atlas/Atlas.js")),
  wikipedia: make(wikipediaManifestRaw, () => import("./Wikipedia/Wikipedia.js")),
  fx: make(fxManifestRaw, () => import("./Fx/Fx.js")),
  earthquakes: make(earthquakesManifestRaw, () => import("./Earthquakes/Earthquakes.js")),
  news: make(newsManifestRaw, () => import("./News/News.js")),
  worldbank: make(worldBankManifestRaw, () => import("./WorldBank/WorldBank.js")),
};

// One entry per row in the dashboard widget library. Most map 1:1 to a
// `widgetRegistry` key, but configurable widgets (e.g. News) expose
// multiple presets that all render through the same Component with
// different `data` payloads. The library uses `id` as its key and as the
// "already added" check, so two news presets can coexist on a dashboard.
export type CatalogEntry = {
  id: string;
  type: string;
  title: string;
  description?: string;
  icon?: string;
  defaultSize: { w: number; h: number };
  ttlMs: number | null;
  sources: ReadonlyArray<string>;
  // Default per-instance config seeded into `DashboardWidget.data` when the
  // user adds this entry from the library. Undefined for non-configurable
  // widgets.
  data?: unknown;
};

const baseCatalog: CatalogEntry[] = Object.entries(widgetRegistry).map(
  ([id, entry]) => ({
    id,
    type: id,
    title: entry.manifest.title,
    description: entry.manifest.description,
    icon: entry.manifest.icon,
    defaultSize: entry.manifest.defaultSize,
    ttlMs: entry.ttlMs,
    sources: entry.manifest.sources,
  }),
);

const newsEntry = widgetRegistry.news!;
const newsPresetCatalog: CatalogEntry[] = NEWS_PRESETS.filter(
  (p) => p.corsFriendly,
).map((p) => ({
  id: `news-${p.id}`,
  type: "news",
  title: p.label,
  description: p.note ?? `${p.region.toUpperCase()} · RSS`,
  icon: newsEntry.manifest.icon,
  defaultSize: newsEntry.manifest.defaultSize,
  ttlMs: newsEntry.ttlMs,
  sources: newsEntry.manifest.sources,
  data: { url: p.url, title: p.label },
}));

export const widgetCatalog: ReadonlyArray<CatalogEntry> = [
  ...baseCatalog,
  ...newsPresetCatalog,
];

// Union of every source any registered widget needs. Pass this straight to
// <DataProvider sources={…}> so the Fetcher's allowlist matches the
// widgets that may mount underneath it.
export const collectAllowedSources = (
  registry: Readonly<Record<string, WidgetEntry>> = widgetRegistry,
): string[] => {
  const set = new Set<string>();
  for (const entry of Object.values(registry)) {
    for (const s of entry.manifest.sources) set.add(s);
  }
  return [...set];
};

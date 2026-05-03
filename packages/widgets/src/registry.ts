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
import hackerNewsManifestRaw from "./HackerNews/manifest.yaml";
import cryptoManifestRaw from "./Crypto/manifest.yaml";
import gitHubManifestRaw from "./GitHub/manifest.yaml";
import quoteManifestRaw from "./Quote/manifest.yaml";
import issManifestRaw from "./ISS/manifest.yaml";
import clockManifestRaw from "./Clock/manifest.yaml";
import countdownManifestRaw from "./Countdown/manifest.yaml";
import scratchpadManifestRaw from "./Scratchpad/manifest.yaml";
import onThisDayManifestRaw from "./OnThisDay/manifest.yaml";
import airQualityManifestRaw from "./AirQuality/manifest.yaml";
import holidaysManifestRaw from "./Holidays/manifest.yaml";
import pomodoroManifestRaw from "./Pomodoro/manifest.yaml";
import moonPhaseManifestRaw from "./MoonPhase/manifest.yaml";
import sunriseManifestRaw from "./Sunrise/manifest.yaml";
import catFactManifestRaw from "./CatFact/manifest.yaml";
import jokeManifestRaw from "./Joke/manifest.yaml";
import npmDownloadsManifestRaw from "./NpmDownloads/manifest.yaml";
import worldClocksManifestRaw from "./WorldClocks/manifest.yaml";
import auroraManifestRaw from "./Aurora/manifest.yaml";
import bitcoinManifestRaw from "./Bitcoin/manifest.yaml";
import wikiFeaturedManifestRaw from "./WikiFeatured/manifest.yaml";
import adviceManifestRaw from "./Advice/manifest.yaml";
import gitHubRepoManifestRaw from "./GitHubRepo/manifest.yaml";
import ipInfoManifestRaw from "./IpInfo/manifest.yaml";
import gitHubStatusManifestRaw from "./GitHubStatus/manifest.yaml";
import apodManifestRaw from "./Apod/manifest.yaml";
import cocktailManifestRaw from "./Cocktail/manifest.yaml";
import mealManifestRaw from "./Meal/manifest.yaml";
import dogManifestRaw from "./Dog/manifest.yaml";
import triviaManifestRaw from "./Trivia/manifest.yaml";
import todoManifestRaw from "./Todo/manifest.yaml";
import bookmarksManifestRaw from "./Bookmarks/manifest.yaml";
import calculatorManifestRaw from "./Calculator/manifest.yaml";
import calendarMonthManifestRaw from "./CalendarMonth/manifest.yaml";
import unitConverterManifestRaw from "./UnitConverter/manifest.yaml";
import stopwatchManifestRaw from "./Stopwatch/manifest.yaml";
import diceManifestRaw from "./Dice/manifest.yaml";
import coinFlipManifestRaw from "./CoinFlip/manifest.yaml";

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
  hackernews: make(hackerNewsManifestRaw, () => import("./HackerNews/HackerNews.js")),
  crypto: make(cryptoManifestRaw, () => import("./Crypto/Crypto.js")),
  github: make(gitHubManifestRaw, () => import("./GitHub/GitHub.js")),
  quote: make(quoteManifestRaw, () => import("./Quote/Quote.js")),
  iss: make(issManifestRaw, () => import("./ISS/ISS.js")),
  clock: make(clockManifestRaw, () => import("./Clock/Clock.js")),
  countdown: make(countdownManifestRaw, () => import("./Countdown/Countdown.js")),
  scratchpad: make(scratchpadManifestRaw, () => import("./Scratchpad/Scratchpad.js")),
  onthisday: make(onThisDayManifestRaw, () => import("./OnThisDay/OnThisDay.js")),
  airquality: make(airQualityManifestRaw, () => import("./AirQuality/AirQuality.js")),
  holidays: make(holidaysManifestRaw, () => import("./Holidays/Holidays.js")),
  pomodoro: make(pomodoroManifestRaw, () => import("./Pomodoro/Pomodoro.js")),
  moonphase: make(moonPhaseManifestRaw, () => import("./MoonPhase/MoonPhase.js")),
  sunrise: make(sunriseManifestRaw, () => import("./Sunrise/Sunrise.js")),
  catfact: make(catFactManifestRaw, () => import("./CatFact/CatFact.js")),
  joke: make(jokeManifestRaw, () => import("./Joke/Joke.js")),
  npmdownloads: make(npmDownloadsManifestRaw, () => import("./NpmDownloads/NpmDownloads.js")),
  worldclocks: make(worldClocksManifestRaw, () => import("./WorldClocks/WorldClocks.js")),
  aurora: make(auroraManifestRaw, () => import("./Aurora/Aurora.js")),
  bitcoin: make(bitcoinManifestRaw, () => import("./Bitcoin/Bitcoin.js")),
  wikifeatured: make(wikiFeaturedManifestRaw, () => import("./WikiFeatured/WikiFeatured.js")),
  advice: make(adviceManifestRaw, () => import("./Advice/Advice.js")),
  githubrepo: make(gitHubRepoManifestRaw, () => import("./GitHubRepo/GitHubRepo.js")),
  ipinfo: make(ipInfoManifestRaw, () => import("./IpInfo/IpInfo.js")),
  githubstatus: make(gitHubStatusManifestRaw, () => import("./GitHubStatus/GitHubStatus.js")),
  apod: make(apodManifestRaw, () => import("./Apod/Apod.js")),
  cocktail: make(cocktailManifestRaw, () => import("./Cocktail/Cocktail.js")),
  meal: make(mealManifestRaw, () => import("./Meal/Meal.js")),
  dog: make(dogManifestRaw, () => import("./Dog/Dog.js")),
  trivia: make(triviaManifestRaw, () => import("./Trivia/Trivia.js")),
  todo: make(todoManifestRaw, () => import("./Todo/Todo.js")),
  bookmarks: make(bookmarksManifestRaw, () => import("./Bookmarks/Bookmarks.js")),
  calculator: make(calculatorManifestRaw, () => import("./Calculator/Calculator.js")),
  calendarmonth: make(calendarMonthManifestRaw, () => import("./CalendarMonth/CalendarMonth.js")),
  unitconverter: make(unitConverterManifestRaw, () => import("./UnitConverter/UnitConverter.js")),
  stopwatch: make(stopwatchManifestRaw, () => import("./Stopwatch/Stopwatch.js")),
  dice: make(diceManifestRaw, () => import("./Dice/Dice.js")),
  coinflip: make(coinFlipManifestRaw, () => import("./CoinFlip/CoinFlip.js")),
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

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
import jsonFormatterManifestRaw from "./JsonFormatter/manifest.yaml";
import base64ManifestRaw from "./Base64/manifest.yaml";
import urlEncoderManifestRaw from "./UrlEncoder/manifest.yaml";
import jwtDecoderManifestRaw from "./JwtDecoder/manifest.yaml";
import regexTesterManifestRaw from "./RegexTester/manifest.yaml";
import hashGenManifestRaw from "./HashGen/manifest.yaml";
import uuidGenManifestRaw from "./UuidGen/manifest.yaml";
import numberBaseManifestRaw from "./NumberBase/manifest.yaml";
import colorToolsManifestRaw from "./ColorTools/manifest.yaml";
import httpStatusManifestRaw from "./HttpStatus/manifest.yaml";
import asciiTableManifestRaw from "./AsciiTable/manifest.yaml";
import htmlEntitiesManifestRaw from "./HtmlEntities/manifest.yaml";
import markdownPreviewManifestRaw from "./MarkdownPreview/manifest.yaml";
import slugifyManifestRaw from "./Slugify/manifest.yaml";
import caseConverterManifestRaw from "./CaseConverter/manifest.yaml";
import notesMultiManifestRaw from "./NotesMulti/manifest.yaml";
import kanbanManifestRaw from "./Kanban/manifest.yaml";
import wordCounterManifestRaw from "./WordCounter/manifest.yaml";
import passwordGenManifestRaw from "./PasswordGen/manifest.yaml";
import loremManifestRaw from "./Lorem/manifest.yaml";
import textStatsManifestRaw from "./TextStats/manifest.yaml";
import textSortManifestRaw from "./TextSort/manifest.yaml";
import csvViewerManifestRaw from "./CsvViewer/manifest.yaml";
import csvToJsonManifestRaw from "./CsvToJson/manifest.yaml";
import urlParserManifestRaw from "./UrlParser/manifest.yaml";
import waterTrackerManifestRaw from "./WaterTracker/manifest.yaml";
import workoutTimerManifestRaw from "./WorkoutTimer/manifest.yaml";
import breathingTimerManifestRaw from "./BreathingTimer/manifest.yaml";
import expenseLogManifestRaw from "./ExpenseLog/manifest.yaml";
import timeTrackerManifestRaw from "./TimeTracker/manifest.yaml";
import tipCalcManifestRaw from "./TipCalc/manifest.yaml";
import mortgageCalcManifestRaw from "./MortgageCalc/manifest.yaml";
import loanCalcManifestRaw from "./LoanCalc/manifest.yaml";
import compoundInterestManifestRaw from "./CompoundInterest/manifest.yaml";
import salaryCalcManifestRaw from "./SalaryCalc/manifest.yaml";
import taxCalcManifestRaw from "./TaxCalc/manifest.yaml";
import inflationCalcManifestRaw from "./InflationCalc/manifest.yaml";
import savingsGoalManifestRaw from "./SavingsGoal/manifest.yaml";
import roiCalcManifestRaw from "./RoiCalc/manifest.yaml";
import cryptoConverterManifestRaw from "./CryptoConverter/manifest.yaml";
import aiChatManifestRaw from "./AiChat/manifest.yaml";
import aiSummarizeManifestRaw from "./AiSummarize/manifest.yaml";
import aiTranslateManifestRaw from "./AiTranslate/manifest.yaml";
import aiRewriteManifestRaw from "./AiRewrite/manifest.yaml";
import aiCodeExplainManifestRaw from "./AiCodeExplain/manifest.yaml";
import aiPromptManifestRaw from "./AiPrompt/manifest.yaml";
import ticTacToeManifestRaw from "./TicTacToe/manifest.yaml";
import numberGuessManifestRaw from "./NumberGuess/manifest.yaml";
import rpsManifestRaw from "./RockPaperScissors/manifest.yaml";
import memoryManifestRaw from "./Memory/manifest.yaml";
import hangmanManifestRaw from "./Hangman/manifest.yaml";
import slide15ManifestRaw from "./Slide15/manifest.yaml";
import mastermindManifestRaw from "./Mastermind/manifest.yaml";
import reactionManifestRaw from "./Reaction/manifest.yaml";
import whackManifestRaw from "./Whack/manifest.yaml";
import highLowManifestRaw from "./HighLow/manifest.yaml";
import snakeManifestRaw from "./Snake/manifest.yaml";

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
  jsonformatter: make(jsonFormatterManifestRaw, () => import("./JsonFormatter/JsonFormatter.js")),
  base64: make(base64ManifestRaw, () => import("./Base64/Base64.js")),
  urlencoder: make(urlEncoderManifestRaw, () => import("./UrlEncoder/UrlEncoder.js")),
  jwtdecoder: make(jwtDecoderManifestRaw, () => import("./JwtDecoder/JwtDecoder.js")),
  regextester: make(regexTesterManifestRaw, () => import("./RegexTester/RegexTester.js")),
  hashgen: make(hashGenManifestRaw, () => import("./HashGen/HashGen.js")),
  uuidgen: make(uuidGenManifestRaw, () => import("./UuidGen/UuidGen.js")),
  numberbase: make(numberBaseManifestRaw, () => import("./NumberBase/NumberBase.js")),
  colortools: make(colorToolsManifestRaw, () => import("./ColorTools/ColorTools.js")),
  httpstatus: make(httpStatusManifestRaw, () => import("./HttpStatus/HttpStatus.js")),
  asciitable: make(asciiTableManifestRaw, () => import("./AsciiTable/AsciiTable.js")),
  htmlentities: make(htmlEntitiesManifestRaw, () => import("./HtmlEntities/HtmlEntities.js")),
  markdownpreview: make(markdownPreviewManifestRaw, () => import("./MarkdownPreview/MarkdownPreview.js")),
  slugify: make(slugifyManifestRaw, () => import("./Slugify/Slugify.js")),
  caseconverter: make(caseConverterManifestRaw, () => import("./CaseConverter/CaseConverter.js")),
  notesmulti: make(notesMultiManifestRaw, () => import("./NotesMulti/NotesMulti.js")),
  kanban: make(kanbanManifestRaw, () => import("./Kanban/Kanban.js")),
  wordcounter: make(wordCounterManifestRaw, () => import("./WordCounter/WordCounter.js")),
  passwordgen: make(passwordGenManifestRaw, () => import("./PasswordGen/PasswordGen.js")),
  lorem: make(loremManifestRaw, () => import("./Lorem/Lorem.js")),
  textstats: make(textStatsManifestRaw, () => import("./TextStats/TextStats.js")),
  textsort: make(textSortManifestRaw, () => import("./TextSort/TextSort.js")),
  csvviewer: make(csvViewerManifestRaw, () => import("./CsvViewer/CsvViewer.js")),
  csvtojson: make(csvToJsonManifestRaw, () => import("./CsvToJson/CsvToJson.js")),
  urlparser: make(urlParserManifestRaw, () => import("./UrlParser/UrlParser.js")),
  watertracker: make(waterTrackerManifestRaw, () => import("./WaterTracker/WaterTracker.js")),
  workouttimer: make(workoutTimerManifestRaw, () => import("./WorkoutTimer/WorkoutTimer.js")),
  breathingtimer: make(breathingTimerManifestRaw, () => import("./BreathingTimer/BreathingTimer.js")),
  expenselog: make(expenseLogManifestRaw, () => import("./ExpenseLog/ExpenseLog.js")),
  timetracker: make(timeTrackerManifestRaw, () => import("./TimeTracker/TimeTracker.js")),
  tipcalc: make(tipCalcManifestRaw, () => import("./TipCalc/TipCalc.js")),
  mortgagecalc: make(mortgageCalcManifestRaw, () => import("./MortgageCalc/MortgageCalc.js")),
  loancalc: make(loanCalcManifestRaw, () => import("./LoanCalc/LoanCalc.js")),
  compoundinterest: make(compoundInterestManifestRaw, () => import("./CompoundInterest/CompoundInterest.js")),
  salarycalc: make(salaryCalcManifestRaw, () => import("./SalaryCalc/SalaryCalc.js")),
  taxcalc: make(taxCalcManifestRaw, () => import("./TaxCalc/TaxCalc.js")),
  inflationcalc: make(inflationCalcManifestRaw, () => import("./InflationCalc/InflationCalc.js")),
  savingsgoal: make(savingsGoalManifestRaw, () => import("./SavingsGoal/SavingsGoal.js")),
  roicalc: make(roiCalcManifestRaw, () => import("./RoiCalc/RoiCalc.js")),
  cryptoconverter: make(cryptoConverterManifestRaw, () => import("./CryptoConverter/CryptoConverter.js")),
  aichat: make(aiChatManifestRaw, () => import("./AiChat/AiChat.js")),
  aisummarize: make(aiSummarizeManifestRaw, () => import("./AiSummarize/AiSummarize.js")),
  aitranslate: make(aiTranslateManifestRaw, () => import("./AiTranslate/AiTranslate.js")),
  airewrite: make(aiRewriteManifestRaw, () => import("./AiRewrite/AiRewrite.js")),
  aicodeexplain: make(aiCodeExplainManifestRaw, () => import("./AiCodeExplain/AiCodeExplain.js")),
  aiprompt: make(aiPromptManifestRaw, () => import("./AiPrompt/AiPrompt.js")),
  tictactoe: make(ticTacToeManifestRaw, () => import("./TicTacToe/TicTacToe.js")),
  numberguess: make(numberGuessManifestRaw, () => import("./NumberGuess/NumberGuess.js")),
  rps: make(rpsManifestRaw, () => import("./RockPaperScissors/RockPaperScissors.js")),
  memory: make(memoryManifestRaw, () => import("./Memory/Memory.js")),
  hangman: make(hangmanManifestRaw, () => import("./Hangman/Hangman.js")),
  slide15: make(slide15ManifestRaw, () => import("./Slide15/Slide15.js")),
  mastermind: make(mastermindManifestRaw, () => import("./Mastermind/Mastermind.js")),
  reaction: make(reactionManifestRaw, () => import("./Reaction/Reaction.js")),
  whack: make(whackManifestRaw, () => import("./Whack/Whack.js")),
  highlow: make(highLowManifestRaw, () => import("./HighLow/HighLow.js")),
  snake: make(snakeManifestRaw, () => import("./Snake/Snake.js")),
};

// One entry per row in the dashboard widget library. Most map 1:1 to a
// `widgetRegistry` key, but configurable widgets (e.g. News) expose
// multiple presets that all render through the same Component with
// different `data` payloads. The library uses `id` as its key and as the
// "already added" check, so two news presets can coexist on a dashboard.
export type WidgetCategory =
  | "AI"
  | "Time & Calendar"
  | "Weather & Sky"
  | "Finance"
  | "News & Reading"
  | "Developer"
  | "Earth & World"
  | "Productivity"
  | "Games"
  | "Fun & Random";

export const WIDGET_CATEGORY_ORDER: ReadonlyArray<WidgetCategory> = [
  "AI",
  "Time & Calendar",
  "Weather & Sky",
  "News & Reading",
  "Finance",
  "Earth & World",
  "Developer",
  "Productivity",
  "Games",
  "Fun & Random",
];

// Categorization is a library/UI concern, not part of the widget contract,
// so it lives here rather than in each manifest.yaml.
const WIDGET_CATEGORIES: Record<string, WidgetCategory> = {
  aichat: "AI",
  aisummarize: "AI",
  aitranslate: "AI",
  airewrite: "AI",
  aicodeexplain: "AI",
  aiprompt: "AI",
  clock: "Time & Calendar",
  worldclocks: "Time & Calendar",
  countdown: "Time & Calendar",
  calendarmonth: "Time & Calendar",
  pomodoro: "Time & Calendar",
  stopwatch: "Time & Calendar",
  holidays: "Time & Calendar",
  onthisday: "Time & Calendar",
  sunrise: "Time & Calendar",

  weather: "Weather & Sky",
  airquality: "Weather & Sky",
  aurora: "Weather & Sky",
  moonphase: "Weather & Sky",
  iss: "Weather & Sky",
  apod: "Weather & Sky",

  fx: "Finance",
  crypto: "Finance",
  bitcoin: "Finance",
  tipcalc: "Finance",
  mortgagecalc: "Finance",
  loancalc: "Finance",
  compoundinterest: "Finance",
  salarycalc: "Finance",
  taxcalc: "Finance",
  inflationcalc: "Finance",
  savingsgoal: "Finance",
  roicalc: "Finance",
  cryptoconverter: "Finance",

  news: "News & Reading",
  hackernews: "News & Reading",
  wikipedia: "News & Reading",
  wikifeatured: "News & Reading",

  github: "Developer",
  githubrepo: "Developer",
  githubstatus: "Developer",
  npmdownloads: "Developer",
  jsonformatter: "Developer",
  base64: "Developer",
  urlencoder: "Developer",
  jwtdecoder: "Developer",
  regextester: "Developer",
  hashgen: "Developer",
  uuidgen: "Developer",
  numberbase: "Developer",
  colortools: "Developer",
  httpstatus: "Developer",
  asciitable: "Developer",
  htmlentities: "Developer",
  markdownpreview: "Developer",
  slugify: "Developer",
  caseconverter: "Developer",

  atlas: "Earth & World",
  earthquakes: "Earth & World",
  worldbank: "Earth & World",
  ipinfo: "Earth & World",

  todo: "Productivity",
  scratchpad: "Productivity",
  bookmarks: "Productivity",
  calculator: "Productivity",
  unitconverter: "Productivity",
  notesmulti: "Productivity",
  kanban: "Productivity",
  wordcounter: "Productivity",
  passwordgen: "Productivity",
  lorem: "Productivity",
  textstats: "Productivity",
  textsort: "Productivity",
  csvviewer: "Productivity",
  csvtojson: "Productivity",
  watertracker: "Productivity",
  workouttimer: "Productivity",
  breathingtimer: "Productivity",
  expenselog: "Productivity",
  timetracker: "Productivity",
  urlparser: "Developer",

  coinflip: "Fun & Random",
  dice: "Fun & Random",
  trivia: "Fun & Random",

  tictactoe: "Games",
  numberguess: "Games",
  rps: "Games",
  memory: "Games",
  hangman: "Games",
  slide15: "Games",
  mastermind: "Games",
  reaction: "Games",
  whack: "Games",
  highlow: "Games",
  snake: "Games",
  joke: "Fun & Random",
  catfact: "Fun & Random",
  dog: "Fun & Random",
  quote: "Fun & Random",
  advice: "Fun & Random",
  cocktail: "Fun & Random",
  meal: "Fun & Random",
};

const DEFAULT_CATEGORY: WidgetCategory = "Fun & Random";

export type CatalogEntry = {
  id: string;
  type: string;
  title: string;
  description?: string;
  icon?: string;
  category: WidgetCategory;
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
    category: WIDGET_CATEGORIES[id] ?? DEFAULT_CATEGORY,
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
  category: "News & Reading",
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

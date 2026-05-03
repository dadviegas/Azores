# Changelog

All notable changes to this project are recorded here. Format loosely
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning is date-based until we ship a real release.

Newest entries on top. Each entry: a one-line summary, then bullets
under **Added / Changed / Removed / Fixed** as needed. Reference files
with relative links so the entry stays clickable.

## Unreleased

### Added
- **Five more AI widgets sharing one client.** Added
  [AiSummarize](packages/widgets/src/AiSummarize/) (short / medium /
  detailed bullet summaries),
  [AiTranslate](packages/widgets/src/AiTranslate/) (any source → 21
  target languages, auto-detect source),
  [AiRewrite](packages/widgets/src/AiRewrite/) (tone presets:
  formal / casual / shorter / clearer / more confident /
  friendlier / more concise / academic),
  [AiCodeExplain](packages/widgets/src/AiCodeExplain/) (modes:
  explain / review / improve / tests),
  [AiPrompt](packages/widgets/src/AiPrompt/) (saved system prompts
  with one-click run, persisted seed list).

  Extracted [`_ai/client.ts`](packages/widgets/src/_ai/client.ts) —
  shared `chat()` helper that reads settings via the
  `azores:ai-settings` `localStorage` contract, builds the
  `/v1/chat/completions` endpoint (auto-strips trailing slash, honors
  user-pasted full path), and includes the `ngrok-skip-browser-warning`
  header so free-tier ngrok tunnels don't return a splash page.
  `AiChat` was refactored to use the shared client.

- **AI chat widget + Tweaks → AI settings.** New
  [AiChat](packages/widgets/src/AiChat/) widget under a new **AI**
  category — sends an OpenAI-compatible
  `POST {apiUrl}/v1/chat/completions` request with `Authorization:
  Bearer {apiKey}` and `ngrok-skip-browser-warning: true` (so
  free-tier ngrok tunnels don't return the splash page). Works with
  OpenAI, OpenRouter, LM Studio, or any local LLM exposed via ngrok.
  Endpoint URL, API key, and model are configured in **Tweaks → AI**
  ([useAiSettings](packages/ux/src/TweaksPanel/useAiSettings.ts) +
  [TweaksPanel](packages/ux/src/TweaksPanel/TweaksPanel.tsx)) and
  persisted in `localStorage` under `azores:ai-settings` — the key
  never leaves the browser except in the request to the URL the user
  configured. Widget UI: chat-bubble log, error bubbles for HTTP
  failures, Enter-to-send / Shift+Enter for newline, auto-scroll, a
  Clear button, and a "not configured" empty state with setup
  instructions.

### Fixed
- **Dashboard widgets stacking on top of each other** when the
  catalog grew past ~60 occupied rows.
  [packWidgets](packages/ux/src/Dashboard/layout.ts) had a hard
  `ROWS_MAX = 60` cap on its first-fit search; widgets that didn't
  fit fell through to a fallback that placed them at `(0,
  occ.length)` *without* marking the cell, so every overflowing
  widget piled into the same coordinate. Bumped the cap to a
  practical-infinity value, added a `cols <= 0` guard, and the
  fallback now `mark()`s its cells too — duplicates can't pile up
  even if the cap is hit.

### Added
- **Batch 3 of 200-widget expansion — ten finance calculators.**
  All offline (no network):
  [TipCalc](packages/widgets/src/TipCalc/) (tip + bill split),
  [MortgageCalc](packages/widgets/src/MortgageCalc/) (monthly +
  interest total),
  [LoanCalc](packages/widgets/src/LoanCalc/) (APR-based monthly),
  [CompoundInterest](packages/widgets/src/CompoundInterest/) (yearly
  bar chart of growth with monthly contributions),
  [SalaryCalc](packages/widgets/src/SalaryCalc/) (hourly ↔ daily ↔
  weekly ↔ monthly ↔ annual, configurable hrs/wks),
  [TaxCalc](packages/widgets/src/TaxCalc/) (flat-rate take-home with
  monthly + hourly net),
  [InflationCalc](packages/widgets/src/InflationCalc/) (real value
  of an amount after N years),
  [SavingsGoal](packages/widgets/src/SavingsGoal/) (months to reach
  a target with deposits + interest),
  [RoiCalc](packages/widgets/src/RoiCalc/) (total return + CAGR with
  positive/negative tinting),
  [CryptoConverter](packages/widgets/src/CryptoConverter/) (BTC ↔
  USD ↔ sats with manually-entered rate — pair with the live
  `Bitcoin` widget).

- **Batch 2 of 200-widget expansion — fifteen productivity widgets.**
  Mostly offline + persisted via `@azores/core` storage:
  [NotesMulti](packages/widgets/src/NotesMulti/) (multiple notes,
  search, autosave),
  [Kanban](packages/widgets/src/Kanban/) (3-column board with
  drag-between-lanes, persisted),
  [WordCounter](packages/widgets/src/WordCounter/) (words / chars /
  sentences / read-time),
  [PasswordGen](packages/widgets/src/PasswordGen/) (CSPRNG via
  `crypto.getRandomValues`, set toggles, length 6-64),
  [Lorem](packages/widgets/src/Lorem/) (deterministic placeholder
  paragraphs),
  [TextStats](packages/widgets/src/TextStats/) (unique-words /
  longest / avg length),
  [TextSort](packages/widgets/src/TextSort/) (sort, reverse, dedupe,
  shuffle, trim — line-based),
  [CsvViewer](packages/widgets/src/CsvViewer/) (paste CSV → sortable
  table; quote-aware parser),
  [CsvToJson](packages/widgets/src/CsvToJson/) (round-trip CSV ↔
  JSON),
  [UrlParser](packages/widgets/src/UrlParser/) (break URL into
  protocol/host/path/query parts — Developer category),
  [WaterTracker](packages/widgets/src/WaterTracker/) (daily count
  + 7-day bar chart),
  [WorkoutTimer](packages/widgets/src/WorkoutTimer/) (work / rest /
  rounds — HIIT-style),
  [BreathingTimer](packages/widgets/src/BreathingTimer/) (animated
  4-4-4-4 box breathing),
  [ExpenseLog](packages/widgets/src/ExpenseLog/) (entries +
  running total),
  [TimeTracker](packages/widgets/src/TimeTracker/) (start/stop
  timers per task with persisted totals).

- **Batch 1 of 200-widget expansion — fifteen self-contained dev tools.**
  All offline (no network sources, no CORS surface), categorized under
  **Developer**, click-to-copy where useful:
  [JsonFormatter](packages/widgets/src/JsonFormatter/) (pretty/minify/validate),
  [Base64](packages/widgets/src/Base64/) (Unicode-safe encode/decode),
  [UrlEncoder](packages/widgets/src/UrlEncoder/) (encodeURIComponent / decode),
  [JwtDecoder](packages/widgets/src/JwtDecoder/) (header + payload, no
  signature check),
  [RegexTester](packages/widgets/src/RegexTester/) (pattern + flags + match
  list with capture groups),
  [HashGen](packages/widgets/src/HashGen/) (SHA-1/256/384/512 via
  SubtleCrypto),
  [UuidGen](packages/widgets/src/UuidGen/) (v4 batch generator + copy-all),
  [NumberBase](packages/widgets/src/NumberBase/) (BIN/OCT/DEC/HEX live
  conversion),
  [ColorTools](packages/widgets/src/ColorTools/) (HEX/RGB/HSL + WCAG
  contrast pill),
  [HttpStatus](packages/widgets/src/HttpStatus/) (searchable code reference),
  [AsciiTable](packages/widgets/src/AsciiTable/) (printable + control codes),
  [HtmlEntities](packages/widgets/src/HtmlEntities/) (encode/decode),
  [MarkdownPreview](packages/widgets/src/MarkdownPreview/) (live render —
  inline mini-parser, no marked.js dep),
  [Slugify](packages/widgets/src/Slugify/) (URL-safe slug),
  [CaseConverter](packages/widgets/src/CaseConverter/)
  (camel/Pascal/snake/kebab/CONSTANT/Title/sentence/dot/path).

- **Widget library: search, categories, bulk actions, live preview.**
  The Atlas library drawer
  ([AtlasPage.tsx](apps/atlas/src/AtlasPage.tsx)) now groups widgets
  into eight categories (Time & Calendar, Weather & Sky, News &
  Reading, Finance, Earth & World, Developer, Productivity, Fun &
  Random — defined in
  [registry.ts](packages/widgets/src/registry.ts)), with a search
  field that filters by title / description / category. Each row
  expands inline to render a live preview of the widget. Header
  actions: **Add all** (adds every visible non-duplicate entry,
  respecting the current filter), **Remove all** (clears the
  dashboard), **Reset** (back to seed). Drawer widened to 420px to
  fit previews. Public API: new `WIDGET_CATEGORY_ORDER` and
  `WidgetCategory` exports from `@azores/widgets`; `CatalogEntry`
  gains a `category` field.

- **Twenty more dashboard widgets** (fourth batch). Twelve external,
  eight local. External: Aurora forecast
  ([Aurora](packages/widgets/src/Aurora/) — NOAA SWPC planetary
  K-index with banded color), Bitcoin fees
  ([Bitcoin](packages/widgets/src/Bitcoin/) — mempool.space
  recommended sat/vB tiers, 1m TTL), Wikipedia featured
  ([WikiFeatured](packages/widgets/src/WikiFeatured/) — today's
  featured article via the REST feed API), Advice slip
  ([Advice](packages/widgets/src/Advice/) — adviceslip.com), GitHub
  repo stats ([GitHubRepo](packages/widgets/src/GitHubRepo/) —
  facebook/react stars/forks/issues), Your IP
  ([IpInfo](packages/widgets/src/IpInfo/) — ipapi.co), GitHub status
  ([GitHubStatus](packages/widgets/src/GitHubStatus/) — overall
  banner plus component breakdown), Astronomy picture
  ([Apod](packages/widgets/src/Apod/) — NASA APOD via shared
  DEMO_KEY), Random cocktail
  ([Cocktail](packages/widgets/src/Cocktail/) — TheCocktailDB),
  Random meal ([Meal](packages/widgets/src/Meal/) — TheMealDB), Dog
  photo ([Dog](packages/widgets/src/Dog/) — dog.ceo), and Trivia
  ([Trivia](packages/widgets/src/Trivia/) — Open Trivia DB with
  hidden answer reveal). Local: To-do
  ([Todo](packages/widgets/src/Todo/) — add/check/remove, persisted),
  Bookmarks ([Bookmarks](packages/widgets/src/Bookmarks/) — pinned
  links, persisted), Calculator
  ([Calculator](packages/widgets/src/Calculator/) — basic
  four-function), Calendar
  ([CalendarMonth](packages/widgets/src/CalendarMonth/) — current
  month with today highlighted, Monday-first), Unit converter
  ([UnitConverter](packages/widgets/src/UnitConverter/) — length,
  weight, temperature), Stopwatch
  ([Stopwatch](packages/widgets/src/Stopwatch/) — start / stop / lap
  / reset at 100ms granularity), Dice roller
  ([Dice](packages/widgets/src/Dice/) — 1-4 d6), and Coin flip
  ([CoinFlip](packages/widgets/src/CoinFlip/) — animated, with
  running heads/tails tally). All 20 registered in
  [packages/widgets/src/registry.ts](packages/widgets/src/registry.ts);
  twelve new sources self-register from
  [packages/dataprovider/src/sources/](packages/dataprovider/src/sources/)
  via the barrel.
- **Five more dashboard widgets** (third batch) — four external, one
  local. External: Sunrise & sunset
  ([Sunrise](packages/widgets/src/Sunrise/) via sunrise-sunset.org for
  the Azores, with day-length), Cat fact
  ([CatFact](packages/widgets/src/CatFact/) via catfact.ninja), Joke
  ([Joke](packages/widgets/src/Joke/) via official-joke-api, setup +
  punchline), and npm downloads
  ([NpmDownloads](packages/widgets/src/NpmDownloads/) — last-week
  count for `react`, hardcoded until per-instance edit lands). Local:
  World clocks ([WorldClocks](packages/widgets/src/WorldClocks/) —
  London, New York, Tokyo, São Paulo, ticking every 30s). Sources for
  externals under
  [packages/dataprovider/src/sources/](packages/dataprovider/src/sources/);
  all five registered in
  [packages/widgets/src/registry.ts](packages/widgets/src/registry.ts).
  [docs/WIDGETS_PLAN.md](docs/WIDGETS_PLAN.md) updated.
- **Five more dashboard widgets** — three external, two local.
  External: On this day
  ([OnThisDay](packages/widgets/src/OnThisDay/) via Wikipedia's
  `feed/onthisday/events` REST endpoint, 12h TTL), Air quality
  ([AirQuality](packages/widgets/src/AirQuality/) via
  Open-Meteo's air-quality API with banded European AQI), and Public
  holidays ([Holidays](packages/widgets/src/Holidays/) via
  date.nager.at, defaulting to PT, with days-away counter). Local:
  Pomodoro ([Pomodoro](packages/widgets/src/Pomodoro/) — 25/5 cycles,
  start/pause/reset, auto-flips phase) and Moon phase
  ([MoonPhase](packages/widgets/src/MoonPhase/) — pure JS
  illumination/cycle math, no network). Sources for the externals live
  under [packages/dataprovider/src/sources/](packages/dataprovider/src/sources/);
  all five registered in
  [packages/widgets/src/registry.ts](packages/widgets/src/registry.ts).
  [docs/WIDGETS_PLAN.md](docs/WIDGETS_PLAN.md) updated.
- **Eight new dashboard widgets** — five pulling from key-free public
  APIs and three local-only. External: Hacker News
  ([HackerNews](packages/widgets/src/HackerNews/) via Algolia HN API),
  Crypto ([Crypto](packages/widgets/src/Crypto/) via CoinGecko top
  coins + 24h change), GitHub trending
  ([GitHub](packages/widgets/src/GitHub/) via the Search API,
  last-7-days repos by stars), Quote of the day
  ([Quote](packages/widgets/src/Quote/) via Quotable), and ISS live
  position ([ISS](packages/widgets/src/ISS/) via wheretheiss.at, 15s
  TTL). Each registers its own source under
  [packages/dataprovider/src/sources/](packages/dataprovider/src/sources/)
  and is wired through the dataprovider barrel. Local-only (no
  network): Clock ([Clock](packages/widgets/src/Clock/), ticking
  HH:MM:SS), Countdown ([Countdown](packages/widgets/src/Countdown/)
  to next New Year), Scratchpad
  ([Scratchpad](packages/widgets/src/Scratchpad/), persisted via
  `getStorage()`). All eight registered in
  [packages/widgets/src/registry.ts](packages/widgets/src/registry.ts) so
  they appear in Atlas's widget library automatically. Remaining
  widget ideas tracked in [docs/WIDGETS_PLAN.md](docs/WIDGETS_PLAN.md).
- **Character preview page** at
  [docs/character-preview.html](docs/character-preview.html) — standalone
  HTML mock of three CSS-only animated SVG mascots (whale, volcano,
  seagull) themed to the Azores brand. Copied into the Pages artifact
  via [.github/workflows/pages.yml](.github/workflows/pages.yml) so it's
  reachable at `/<repo>/character-preview.html` for mobile previews.
  Static frame strips (PNG) for offline review live alongside in
  [docs/character-previews/](docs/character-previews/).
- **People preview page** at
  [docs/people-preview.html](docs/people-preview.html) — three
  full-body cartoon SVG humans (Sofia · designer, David · engineer,
  Kai · explorer) riggados (head/eyes/mouth/arm-r/body em grupos
  separados) com idle animations (respirar, piscar, bobblehead) e
  interação por toque: ao clicar acena com o braço direito + cicla
  formas de boca enquanto um balão de fala aparece. Também copiado
  para o artefacto Pages.

### Removed
- **Hacker News and Lobste.rs news presets** — `hnrss.org/frontpage`,
  `hnrss.org/best`, and `lobste.rs/rss` were flagged `corsFriendly:
  true` in [packages/widgets/src/News/presets.ts](packages/widgets/src/News/presets.ts)
  but all three respond 200 *without* `Access-Control-Allow-Origin`, so
  the browser blocks the body from page JS and `fetch()` rejects with
  `TypeError: Failed to fetch`. Same failure mode as the prior
  Reddit/Wikinews removal — surfaced as "Feed unavailable. Failed to
  fetch" tiles. Dropped from the preset list entirely (not just
  demoted) so they no longer seed via `widgetCatalog`. `LAYOUT_VERSION`
  bumped 2 → 3 in [apps/atlas/src/AtlasPage.tsx](apps/atlas/src/AtlasPage.tsx)
  so existing persisted dashboards re-seed instead of holding onto the
  dead URLs. Reintroduce behind a CORS proxy.

### Removed
- **Reddit and Wikinews news presets** — `*.rss` on Reddit started
  blocking unauthenticated cross-origin browser fetches (403 with no
  `Access-Control-Allow-Origin`) and Wikinews' `Special:NewsFeed` Atom
  feed rate-limits the same way. Both were flagged `corsFriendly: true`
  in [packages/widgets/src/News/presets.ts](packages/widgets/src/News/presets.ts)
  but failed at runtime, surfacing as "Feed unavailable. Load failed"
  tiles on every fresh Atlas dashboard. Dropped: `reddit-worldnews`,
  `reddit-europe`, `reddit-news`, `reddit-canada`, `wikinews-en`. The
  CORS-blocked outlets (BBC, Reuters, Al Jazeera, Euronews, Politico EU,
  DW, NPR, ProPublica, CBC) remain in the list flagged `corsFriendly:
  false` so a future proxy hop can reintroduce them. Bumped
  `LAYOUT_VERSION` 1 → 2 in
  [apps/atlas/src/AtlasPage.tsx](apps/atlas/src/AtlasPage.tsx) so
  persisted dashboards from before this change get re-seeded instead
  of holding onto the dead URLs.

### Fixed
- **Mobile layout broken on the Pages deploy** — the showcase chrome
  (`showcase.css`) and Atlas's body styles (`atlas.css`) were imported
  only from each app's standalone `bootstrap.tsx`. When the host
  ([apps/home](apps/home/)) loaded those apps as Module Federation
  remotes, `bootstrap.tsx` never ran, so neither stylesheet shipped —
  the showcase sidebar drawer and mobile breakpoints disappeared (nav
  rendered inline above the content) and Atlas's page body fell back
  to UA defaults. Moved the imports into the federated entry modules
  so the CSS travels with the remote in both standalone and federated
  loads. Verified `mf-manifest.json` now lists the chrome CSS under
  the exposed module's assets.
  - [apps/web/src/ShowcaseRoutes.tsx](apps/web/src/ShowcaseRoutes.tsx)
  - [apps/web/src/bootstrap.tsx](apps/web/src/bootstrap.tsx)
  - [apps/atlas/src/AtlasRoutes.tsx](apps/atlas/src/AtlasRoutes.tsx)
  - [apps/atlas/src/bootstrap.tsx](apps/atlas/src/bootstrap.tsx)
- **Atlas header overflowed the viewport on mobile** — the page header
  in [apps/atlas/src/AtlasPage.tsx](apps/atlas/src/AtlasPage.tsx) put a
  brand link plus 5 buttons in a non-wrapping flex row, forcing the
  page wider than the viewport on narrow screens (which clipped widget
  cards on the right). Header now wraps with `flexWrap: "wrap"` +
  `rowGap`, and content padding scales with viewport width via
  `clamp(16px, 4vw, 24px)`.

### Changed
- **Routing switched to `HashRouter` across all three apps** — `home`,
  `web` (showcase), and `atlas` standalone entries now wrap their
  routes in `HashRouter` instead of `BrowserRouter`. GitHub Pages
  doesn't fall back to `index.html` for unknown paths, so reloading on
  a deep link (e.g. `/Azores/foundations`) was 404'ing; the path now
  lives in the URL hash and the server only sees `/Azores/`. Drops the
  router `basename={__AZORES_BASE_PATH__}` since the hash is
  client-only. The `__AZORES_BASE_PATH__` define is retained for asset
  URLs.
  - [apps/home/src/App.tsx](apps/home/src/App.tsx)
  - [apps/web/src/App.tsx](apps/web/src/App.tsx)
  - [apps/atlas/src/App.tsx](apps/atlas/src/App.tsx)
- **Pages deploy now publishes the federated home shell** —
  [.github/workflows/pages.yml](.github/workflows/pages.yml) builds all
  three apps and assembles a single artifact tree:
  `dist/` (home), `dist/showcase/` (web), `dist/atlas/` (atlas). Sets
  `AZORES_SHOWCASE_MANIFEST=/<repo>/showcase/mf-manifest.json` and
  `AZORES_ATLAS_MANIFEST=/<repo>/atlas/mf-manifest.json` at build time
  so the host fetches remotes from sibling subpaths under the same
  Pages site (no separate origin needed). Home's `publicPath` is now
  driven by `PAGES_BASE` instead of being hardcoded to `/`.
  - [apps/home/rspack.config.mjs](apps/home/rspack.config.mjs)

### Added
- **Widget catalog + news preset tiles** — the dashboard library now
  iterates a `widgetCatalog` rather than the bare `widgetRegistry`. Each
  catalog row is one library entry; configurable widgets (manifest
  `configurable: true`) expose multiple rows that share a Component but
  ship distinct default `data` payloads. Atlas seeds one tile per CORS-
  friendly news preset (Reddit r/worldnews, r/europe, r/news, r/canada,
  Wikinews EN, Hacker News Front page, Hacker News Best, Lobste.rs) so
  the world / Europe / Americas / tech feeds all land on the dashboard
  out of the box.
  - [packages/widgets/src/registry.ts](packages/widgets/src/registry.ts) —
    `widgetCatalog` and `CatalogEntry` type.
  - [packages/widgets/src/News/presets.ts](packages/widgets/src/News/presets.ts) —
    grouped free RSS feeds with a `corsFriendly` flag. Major outlets that
    don't set CORS (BBC, Reuters, NPR, Euronews, DW, Politico EU,
    ProPublica, CBC, Al Jazeera) are listed but excluded from the seeded
    catalog until a proxy layer exists.
  - [apps/atlas/src/AtlasPage.tsx](apps/atlas/src/AtlasPage.tsx) — library
    + initial seed switch to the catalog; configurable widgets allow
    duplicates; tile chrome reads `data.title` so each news instance
    shows its source ("Reddit · r/worldnews") instead of the generic
    "News feed".
  - [packages/widgets/src/News/manifest.yaml](packages/widgets/src/News/manifest.yaml) —
    `configurable: true`, default tile bumped to 4×3 (h was 2, too short
    for a useful headline list).

### Changed
- **Square grid cells** — `<Dashboard>` in
  [packages/ux/src/Dashboard/Dashboard.tsx](packages/ux/src/Dashboard/Dashboard.tsx)
  now measures the live column width via `ResizeObserver` and uses it as
  the row height, so every grid track is a perfect square. A widget at
  `w:4, h:2` is literally 4×2 squares and the dashed backdrop cells
  render as squares regardless of viewport width. Row tracks are also
  fixed (was `minmax($rowH, auto)`) so content overflow scrolls inside
  the cell instead of stretching the row and breaking squareness.
  [packages/ux/src/Dashboard/Dashboard.styles.ts](packages/ux/src/Dashboard/Dashboard.styles.ts).
- **Resize animates per snap step** — the FLIP block in
  [packages/ux/src/Dashboard/Dashboard.tsx](packages/ux/src/Dashboard/Dashboard.tsx)
  now captures pre-layout `w/h` in addition to `x/y`. The resizing cell
  applies a scale-FLIP (`scale(prev/new)` → identity over 220ms) on each
  grid-snap commit, so growing/shrinking by one grid track plays as a
  smooth tween instead of an instant jump. Neighbors continue to use
  translate-only FLIP to keep their text crisp.
- **FX widget defaults to a 1-row tile** —
  [packages/widgets/src/Fx/manifest.yaml](packages/widgets/src/Fx/manifest.yaml)
  now ships `defaultSize.h: 1`. The 4-pair rate row is short and was
  floating in a half-empty 2-row tile by default.
- **Atlas allows 1-row-tall widgets** — pass `minHeight={1}` to the
  shared `<Dashboard>` in
  [apps/atlas/src/AtlasPage.tsx](apps/atlas/src/AtlasPage.tsx) so users
  can resize tiles down to a thin strip. Default floor was 2 rows, which
  made low-density widgets (e.g. World Bank's Latest block) sit in a
  half-empty tile they couldn't shrink.
- **Resize feedback** — dragging the resize handle in
  [packages/ux/src/Dashboard/Dashboard.tsx](packages/ux/src/Dashboard/Dashboard.tsx)
  now reveals the grid backdrop (previously only shown during reorder /
  external-drop) so snap targets are visible. Live snap-resize is
  preserved — the cell shrinks/grows in real time as the cursor crosses
  cell boundaries. A previous attempt at a ghost-preview-only flow was
  reverted because the preview sat *inside* the cell footprint while
  shrinking and felt unresponsive. FLIP now also runs on non-resizing
  neighbors so they glide as they're displaced; only the resizing cell
  itself skips FLIP (translate-back would shudder against the live
  size change).

### Added
- **`@azores/core` storage proxy** — adapter-based key/value persistence so
  app state (dashboard layouts, future user prefs) sits behind a swappable
  backend. Default is IndexedDB; Supabase (or any remote KV) can land later
  via `setStorageAdapter(createSupabaseAdapter(...))` without touching the
  call sites.
  - [packages/core/src/storage/adapter.ts](packages/core/src/storage/adapter.ts) —
    `StorageAdapter { get, set, delete }` interface.
  - [packages/core/src/storage/indexeddb.ts](packages/core/src/storage/indexeddb.ts) —
    `createIndexedDBAdapter()`. Distinct DB (`azores-storage`, store `kv`)
    from the fetch cache so "clear cache" can never wipe user layouts.
  - [packages/core/src/storage/store.ts](packages/core/src/storage/store.ts) —
    `getStorage()` / `setStorageAdapter()`. `globalThis`-pinned singleton
    so federated remotes that bundle their own copy of `@azores/core` all
    resolve to the same adapter instance.
- **Atlas dashboard layout persistence** —
  [apps/atlas/src/AtlasPage.tsx](apps/atlas/src/AtlasPage.tsx) hydrates
  widgets from `getStorage()` on mount and writes back on every change
  (250 ms debounce so a drag/resize gesture coalesces into one write).
  Stored under `atlas:dashboard:layout` as `{ v: 1, widgets: [...] }`;
  the `v` lets a future shape change discard incompatible records instead
  of crashing. `Reset` clears the persisted entry.

### Added
- **Catalog-add fits existing gaps** — adding a widget from the library now
  inspects the current packed layout and shrinks the new tile (clamped at
  2×2) to land in the first empty pocket, rather than always seeding the
  manifest's default size and pushing the new widget past the last row. The
  external-drag ghost previews the same shrunk size so the drop is
  predictable.
  - [packages/ux/src/Dashboard/layout.ts](packages/ux/src/Dashboard/layout.ts) —
    new `findFirstGap` helper.
  - [apps/atlas/src/AtlasPage.tsx](apps/atlas/src/AtlasPage.tsx) — `sizeForCatalog`
    + updated `makeFromCatalog` and external-drag wiring.

### Changed
- **Widget default heights tuned to content** — list/chart widgets seed taller
  so they don't ship squashed. Atlas/Weather/Wikipedia/Fx unchanged at h:2;
  News/Earthquakes/WorldBank now h:3. Fx bumped from h:1 to h:2 (h:1 cut off
  the rate values).
  - [packages/widgets/src/Fx/manifest.yaml](packages/widgets/src/Fx/manifest.yaml)
  - [packages/widgets/src/News/manifest.yaml](packages/widgets/src/News/manifest.yaml)
  - [packages/widgets/src/Earthquakes/manifest.yaml](packages/widgets/src/Earthquakes/manifest.yaml)
  - [packages/widgets/src/WorldBank/manifest.yaml](packages/widgets/src/WorldBank/manifest.yaml)
- **Dashboard min widget height = 2 rows** — resize floor and the default
  size-preset ladder now start at h:2 instead of h:1, so a widget body is
  always at least ~5× the header height. Fits the rule that h:1 leaves only
  chrome visible.
  - [packages/ux/src/Dashboard/Dashboard.tsx](packages/ux/src/Dashboard/Dashboard.tsx) —
    `minHeight` default 1 → 2; `S` preset h:1 → h:2.
- **Smoother dashboard reordering** — non-dragged cells now run the FLIP
  animation while a drag is in flight, so the user sees where tiles will
  land before dropping. Previously animations were suppressed for the whole
  grid during drag; now only the dragged cell (pointer-driven) and resize
  (mid-frame size changes) skip FLIP.
  - [packages/ux/src/Dashboard/Dashboard.tsx](packages/ux/src/Dashboard/Dashboard.tsx).

### Fixed
- **Vertical reordering picks the wrong slot** — the drop-target lookup keyed
  off each packed widget's top-left cell, so dragging onto rows *inside* a
  tall widget skipped past it. Now picks the widget whose region contains
  the target cell (or the nearest by center distance) and inserts above/below
  based on whether the cursor is in its top or bottom half.
  - [packages/ux/src/Dashboard/layout.ts](packages/ux/src/Dashboard/layout.ts) —
    `reorderForInsertion`.
- **Atlas page background gap during drag** —
  [apps/atlas/src/AtlasPage.tsx](apps/atlas/src/AtlasPage.tsx) — switched
  the `<Background>` from `position: absolute` (constrained to the
  Shell's box) to `position: fixed` so the wallpaper always covers the
  viewport, even when the Shell briefly grows past 100dvh during drag.

### Added
- **`azores-external-worldbank` source** —
  [packages/dataprovider/src/sources/azores-external-worldbank/source.ts](packages/dataprovider/src/sources/azores-external-worldbank/source.ts)
  wraps the World Bank Open Data Indicators API (`api.worldbank.org/v2`,
  no key). Typed `WorldBankParams` covers `country`, `indicator`, `date`
  range and page size; `parse` flattens the API's `[meta, rows]` envelope
  into `WorldBankSeries { meta, rows }`. 24-hour TTL.
- **`worldbank` widget** —
  [packages/widgets/src/WorldBank/WorldBank.tsx](packages/widgets/src/WorldBank/WorldBank.tsx)
  renders the latest reported value plus an 8-cell year strip for any
  country/indicator pair. Per-instance `data: { country, indicator, title, date }`
  selects the series; defaults to Portugal · GDP (current US$). SI-suffix
  formatter handles values from fractions to trillions. Default size 4×2.
- Widget registry in
  [packages/widgets/src/registry.ts](packages/widgets/src/registry.ts)
  now includes `worldbank`.
- **IPMA station sources** for live observations across Portugal (mainland, Azores, Madeira) —
  - [packages/dataprovider/src/sources/azores-external-ipma-stations/source.ts](packages/dataprovider/src/sources/azores-external-ipma-stations/source.ts) — station metadata (GeoJSON, 24h TTL).
  - [packages/dataprovider/src/sources/azores-external-ipma-observations/source.ts](packages/dataprovider/src/sources/azores-external-ipma-observations/source.ts) — hourly observations across all stations (10m TTL). Missing readings surface as `-99`; widgets must guard.

### Changed
- **Dashboard rows are fixed-height; widget bodies scroll internally.**
  Switched `gridAutoRows` from `minmax(rowH, auto)` to a flat `rowH` so a
  tall widget (e.g. `earthquakes` h=2) can no longer drag a neighbouring
  short widget (e.g. `fx` h=1 sharing row 0) up to its own height. Each
  widget now occupies exactly `h × rowHeight` and its `Body` uses
  `overflow: auto` — the user can resize a big widget smaller and scroll
  its content in place, and two h=1 widgets stacked next to one h=2
  widget all keep their declared heights.
  - [packages/ux/src/Dashboard/Dashboard.styles.ts](packages/ux/src/Dashboard/Dashboard.styles.ts) — `Grid` / `GridBackdrop` `gridAutoRows`, `Body` `overflow`.
- **Weather widget augments with IPMA station data inside Portugal.**
  Open-Meteo still owns the 7-day forecast; the "now" card is replaced by the nearest IPMA station's reading when `(lat, lng)` falls inside the mainland / Azores / Madeira bounding boxes. Outside those, behaviour is unchanged.
  - [packages/widgets/src/Weather/Weather.tsx](packages/widgets/src/Weather/Weather.tsx) — composes both sources; falls back to Open-Meteo current_weather when station data is unavailable.
  - [packages/widgets/src/Weather/ipma.ts](packages/widgets/src/Weather/ipma.ts) — `isPortugal`, `nearestStation`, `latestForStation` helpers (equirectangular distance, newest-first walk over the time-keyed observations map).
  - [packages/widgets/src/Weather/manifest.yaml](packages/widgets/src/Weather/manifest.yaml) — declares the two new IPMA sources alongside `azores-external-weather`.

### Added
- **Text-body sources in `@azores/core`** — `Source.responseType` (`"json" | "text"`, defaults to `"json"`) tells the Fetcher whether to call `res.json()` or `res.text()`. The existing `parse?` hook receives the raw body and types the result.
  - [packages/core/src/fetch/sources.ts](packages/core/src/fetch/sources.ts) — type addition.
  - [packages/core/src/fetch/fetcher.ts](packages/core/src/fetch/fetcher.ts) — branches on `responseType` before parsing.
- **RSS / Atom support in `@azores/dataprovider`** —
  [packages/dataprovider/src/rss.ts](packages/dataprovider/src/rss.ts) parses RSS 2.0 and Atom into a uniform `RssFeed { title, items: [{ title, link, published, summary, id }] }`. Browser-only (uses `DOMParser`).
  - **`azores-external-rss`** generic source —
    [packages/dataprovider/src/sources/news/azores-external-rss/source.ts](packages/dataprovider/src/sources/news/azores-external-rss/source.ts) takes `{ url }` so any CORS-friendly feed can be plugged in. `responseType: "text"` + `parseRss` in the source's `parse` hook. 10-minute TTL.
- **`earthquakes` widget** —
  [packages/widgets/src/Earthquakes/Earthquakes.tsx](packages/widgets/src/Earthquakes/Earthquakes.tsx)
  lists USGS events from the last 24h at magnitude 4.5+, severity-coloured magnitude pill, relative timestamps. Default size 4×2.
- **`news` widget** —
  [packages/widgets/src/News/News.tsx](packages/widgets/src/News/News.tsx)
  generic RSS/Atom reader. Per-instance `data: { url, title? }` selects the feed; defaults to USGS' significant-week Atom (CORS-friendly). Default size 4×2.
- **Widget registry** in
  [packages/widgets/src/registry.ts](packages/widgets/src/registry.ts) now includes `earthquakes` and `news`.

- **News source category** under
  [packages/dataprovider/src/sources/news/](packages/dataprovider/src/sources/news/) —
  introduces a grouping folder so news-shaped feeds live separately from
  generic external sources. Each provider keeps its own
  `source.ts` + `manifest.yaml` folder and self-registers on import.
  - **`azores-external-earthquakes`** —
    [packages/dataprovider/src/sources/news/azores-external-earthquakes/source.ts](packages/dataprovider/src/sources/news/azores-external-earthquakes/source.ts)
    wraps the USGS Earthquake Catalog (`fdsnws/event/1/query`,
    GeoJSON, no key). Typed `EarthquakeParams` covers time window,
    magnitude bounds, bounding box, and ordering; `EarthquakeData`
    types the GeoJSON `FeatureCollection`. 5-minute TTL.
  - The category barrel
    [packages/dataprovider/src/sources/news/index.ts](packages/dataprovider/src/sources/news/index.ts)
    is re-exported from
    [packages/dataprovider/src/sources/index.ts](packages/dataprovider/src/sources/index.ts),
    so `import "@azores/dataprovider"` continues to register everything.

- **`@azores/dataprovider` package** — the data layer on top of
  `@azores/core` fetch. Owns the source folders, the React seam, and
  the widget-manifest schema.
  - **Source folders** at
    [packages/dataprovider/src/sources/](packages/dataprovider/src/sources/) —
    one folder per source (`azores-external-weather`, `-countries`,
    `-wikipedia`, `-fx`), each with a `source.ts` (URL builder, parser,
    typed params/data) and a co-located `manifest.yaml`. The four
    `weather/countries/wikipedia/fx` registrations have moved out of
    `@azores/core` (which keeps only the registry primitives `Source<>`,
    `registerSource`, `getSource`).
  - **`<DataProvider>`** in
    [packages/dataprovider/src/DataProvider.tsx](packages/dataprovider/src/DataProvider.tsx) —
    React context exposing a single `Fetcher`. Allowlist is the union
    of `sources:` arrays from the widget manifests it serves.
  - **`useSource`** in
    [packages/dataprovider/src/useSource.ts](packages/dataprovider/src/useSource.ts) —
    the only fetch-related symbol widgets import. Owns the
    `AbortController` lifecycle, reads cache synchronously when fresh,
    `refresh()` bypasses cache, accepts a per-call `ttlMs` override
    that flows through to `Fetcher.get` and pins the cache entry's
    TTL — the seam by which a manifest's `ttl: 30m` actually takes
    effect.
  - **Widget-manifest schema** in
    [packages/dataprovider/src/manifest.ts](packages/dataprovider/src/manifest.ts) —
    `parseWidgetManifest` validates the YAML and `parseDurationMs`
    handles humanised durations (`"30m"`, `"2h"`, `"45s"`, raw ms).
    6 new vitest tests in
    [packages/dataprovider/src/manifest.test.ts](packages/dataprovider/src/manifest.test.ts).
- **`@azores/widgets` package** — every Azores widget, with its YAML
  manifest and a lazy component thunk. Apps consume `widgetRegistry`
  + `useSource`; they don't import widget components directly.
  - **Four live widgets**, each a folder under
    [packages/widgets/src/](packages/widgets/src/) with `manifest.yaml`,
    `<Name>.tsx`, and `<Name>.styles.ts`: `Weather` (Open-Meteo,
    geolocation + Ponta Delgada fallback), `Atlas` (REST Countries,
    rotating random country every 60s), `Wikipedia` (page summary,
    random pick from a curated list), `Fx` (Frankfurter ECB rates,
    EUR base).
  - **Registry** in
    [packages/widgets/src/registry.ts](packages/widgets/src/registry.ts) —
    imports every `manifest.yaml` (rspack yaml-loader), validates each
    via `parseWidgetManifest`, pairs with a `React.lazy` thunk.
    `collectAllowedSources()` returns the union of source names so
    `<DataProvider>`'s allowlist is one line away from "every widget
    that might mount".
- **`apps/atlas` — new federated remote app** at
  [apps/atlas/](apps/atlas/) on port `5174`, exposes
  `./AtlasRoutes`. A small launcher dashboard mounting all four live
  widgets in a 2×2 tile grid with shimmer skeletons and per-tile
  Suspense boundaries. Replaces the previous "PLANNED" placeholder
  for Atlas in the home shell — see
  [apps/home/src/apps.ts](apps/home/src/apps.ts) and
  [apps/home/src/App.tsx](apps/home/src/App.tsx).
- **`@azores/ui` `LoadingShimmer`** primitive at
  [packages/ui/src/LoadingShimmer/](packages/ui/src/LoadingShimmer/) —
  token-driven horizontal-sweep shimmer. Used by every live widget
  for first-paint skeletons.
- **Per-call `ttlMs` on `Fetcher.get`** — `FetchOptions` accepts a
  `ttlMs` override. Precedence: `opts.ttlMs > source.ttlMs >
  fetcher.ttlMs > DEFAULT_TTL_MS`. Required to plumb manifest TTLs
  through to `FetchCache.set()`.

### Changed
- **`apps/home`** consumes a second federated remote (`atlas`) in
  addition to `showcase`. New `AZORES_ATLAS_MANIFEST` env var locks
  down the production manifest URL the same way
  `AZORES_SHOWCASE_MANIFEST` does.
- **`@azores/core` `sources.ts`** stripped of built-in source
  registrations. Those moved into `@azores/dataprovider`.
- **pnpm catalog** gains `yaml: ^2.8.3`; `@azores/config` references
  `"yaml": "catalog:"` instead of a literal range.
- **ESLint** config gets a node-environment override for
  `**/rspack.config.mjs`, `tools/**`, `vitest.config.ts`, and
  `vitest.setup.ts`.

### Fixed
- [packages/ui/src/Box/Box.tsx](packages/ui/src/Box/Box.tsx) —
  `tokens` import was used only as a type; switched to
  `import type` to satisfy `consistent-type-imports`.

### Added
- **`@azores/build` shared rspack config** — factory at
  [tools/rspack-config.mjs](tools/rspack-config.mjs) collapses the three
  near-identical app configs ([apps/web](apps/web/rspack.config.mjs),
  [apps/atlas](apps/atlas/rspack.config.mjs),
  [apps/home](apps/home/rspack.config.mjs)) into thin call sites that
  declare only the app-specific bits (port, federation name/exposes/
  remotes, copy assets, CORS, optional YAML loader). Common swc-loader
  config, css/yaml rules, DefinePlugin/Html/CopyRspack/ReactRefresh
  plugins, watchOptions, and the federation `shared` version-pinning
  helper all live in one place. Registered as `@azores/build` workspace
  package; `tools/*` added to [pnpm-workspace.yaml](pnpm-workspace.yaml).

### Fixed
- **Frankfurter FX endpoint moved** —
  [packages/dataprovider/src/sources/azores-external-fx/source.ts](packages/dataprovider/src/sources/azores-external-fx/source.ts)
  switched from `api.frankfurter.app/latest` to
  `api.frankfurter.dev/v1/latest`. The old host now returns a 301 the
  browser can't follow due to CORS, so the FX widget was failing.
- **`@azores/dataprovider` missing `@emotion/react` peer** — atlas's
  rspack runs the swc-loader on workspace packages with
  `importSource: "@emotion/react"`, which injects
  `@emotion/react/jsx-dev-runtime` into
  [packages/dataprovider/src/DataProvider.tsx](packages/dataprovider/src/DataProvider.tsx).
  Declared as a peer so it resolves through the consuming app.

### Added
- **`@azores/core` fetch module** — public-API foundation for Phase 9
  live-data widgets. Three pieces that compose:
  - **`FetchCache`** + **`getCache()`** in
    [packages/core/src/fetch/cache.ts](packages/core/src/fetch/cache.ts).
    IndexedDB-backed (DB `azores-fetch`, store `entries`) with an
    in-memory fast path. Default TTL 10 min, per-entry override on
    `set()`. Singleton pinned to `globalThis.__azores_fetch_cache__`
    so multiple module copies (one per MF remote) all share the same
    instance. Degrades silently to in-memory when IDB is unavailable
    (jsdom, private browsing, quota errors).
  - **Source registry** in
    [packages/core/src/fetch/sources.ts](packages/core/src/fetch/sources.ts).
    A `Source<TParams, TData>` is a typed contract: name, URL builder,
    optional TTL override, optional response transformer. Built-ins
    cover the four Phase 9 picks — `weather` (Open-Meteo, 10min),
    `countries` (REST Countries, 24h), `wikipedia` (page summary, 1h),
    `fx` (Frankfurter, 5min). Add a new source with
    `registerSource({ name, build, ttlMs?, parse? })`.
  - **`Fetcher`** + **`createFetcher({ sources })`** in
    [packages/core/src/fetch/fetcher.ts](packages/core/src/fetch/fetcher.ts).
    Per-app/widget gateway with a `sources` allowlist — calling
    `.get("weather", …)` from a Fetcher that wasn't given `weather`
    throws at request time, so unauthorized sources surface immediately
    instead of silently working. Cache key is
    `<source>:<sorted-JSON-params>` so `{ a, b }` and `{ b, a }`
    collapse to one entry. Supports `signal` (AbortController) and
    `forceRefresh` (bypass cache + replace entry).
  - 5 new vitest tests in
    [packages/core/src/fetch/Fetcher.test.ts](packages/core/src/fetch/Fetcher.test.ts)
    cover: allowlist enforcement, cache hit dedupes calls, stable key
    is order-insensitive, `forceRefresh` bypasses, non-2xx throws.
    All 13 tests in the suite passing.

### Added
- **Phase 10 — `@azores/home` launcher app + Module Federation.** A
  new app under [apps/home/](apps/home/) is the shell users land on:
  a tile grid that lazy-loads sibling apps as MF remotes. First tile
  is the showcase; Atlas + Markdown studio are placeholder tiles.
  - **Host** ([apps/home/rspack.config.mjs](apps/home/rspack.config.mjs))
    runs on port `5170` and configures
    `@module-federation/enhanced/rspack`'s `ModuleFederationPlugin`
    with a `showcase@<manifestUrl>` remote. The manifest URL defaults
    to `http://localhost:5173/mf-manifest.json` and is overridable
    via `AZORES_SHOWCASE_MANIFEST` for production deploys.
  - **Remote** ([apps/web/rspack.config.mjs](apps/web/rspack.config.mjs))
    exposes `./ShowcaseRoutes` from
    [apps/web/src/ShowcaseRoutes.tsx](apps/web/src/ShowcaseRoutes.tsx),
    a new router-agnostic component extracted from the old
    `App.tsx`. The standalone
    [apps/web/src/App.tsx](apps/web/src/App.tsx) is now a thin
    wrapper that adds `<BrowserRouter>`; the host adds its own when
    consuming the remote, so the same component works in both modes.
    Output uses `publicPath: "auto"` so federated chunks load from
    the remote's origin, and dev server sets
    `Access-Control-Allow-Origin: *` so the host can fetch the
    manifest cross-origin.
  - **Singletons** — `react`, `react-dom`, `react-router-dom`,
    `@emotion/react` are declared `singleton: true` on both sides
    with `requiredVersion` read from each package.json at config
    time. The pnpm catalog already pins these to one version, so
    runtime version drift can only be a `pnpm-workspace.yaml` bug,
    never a per-app bug.
  - **Manifest mode** (`mf-manifest.json`) is used instead of raw
    `remoteEntry.js` lookup so the host can introspect what the
    remote exposes/shares without parsing the entry chunk.
  - **Routing** — host's `<BrowserRouter>` owns `/` (launcher) and
    `/apps/showcase/*` (lazy-loaded showcase). `ShowcaseRoutes` uses
    relative `<Route path="…">` and relative `<NavLink to="…">` so
    it resolves correctly under either basename. `useResolvedPath(".")`
    feeds the topbar title lookup.
  - **Tile UI** in [apps/home/src/Launcher.tsx](apps/home/src/Launcher.tsx)
    composes `@azores/ui` primitives (Background, BrandMark, Icon)
    with an Emotion-styled tile grid. Tile manifest lives in
    [apps/home/src/apps.ts](apps/home/src/apps.ts) — adding a new
    federated app is one entry.
  - **Tooling note** — `@module-federation/enhanced@^2.4.0` requires
    Node ≥22 (uses `util.styleText`). Repo's
    [package.json](package.json) `engines.node` is already `>=24`,
    so this only bites devs on stale Node versions.

### Fixed
- Dashboard rows now grow to fit content. `gridAutoRows` changed from
  a fixed `${rowH}px` to `minmax(${rowH}px, auto)` in
  [packages/ux/src/Dashboard/Dashboard.styles.ts](packages/ux/src/Dashboard/Dashboard.styles.ts).
  Short widgets still respect the visual rhythm (minimum row height is
  unchanged); widgets whose content overflows their row span (e.g. the
  KPI delta line clipping at h=1) now expand the row instead of being
  cropped. Drag math in `cellFromEvent` still assumes uniform `rowH`
  rows, so pointer-to-cell mapping degrades slightly when a row has
  grown — acceptable for current widgets.

### Added
- Dashboard polish — closes the three deferred items from Phase 4 of
  [docs/plan.md](docs/plan.md):
  - **Widget-library drawer** on the Dashboard page — click *Add
    widget* to open a `Drawer` listing the catalog. Entries can be
    clicked (appended to the grid) or dragged onto a target cell. The
    Dashboard component grew an `externalDrag` prop that takes
    `{ w, h, onDrop }`; while set, the grid renders a "+ Drop to add"
    ghost following the cursor and calls `onDrop(cell)` on release.
    The drawer renders without a backdrop so the grid stays
    interactive during the drag.
    [apps/web/src/pages/Dashboard.tsx](apps/web/src/pages/Dashboard.tsx),
    [packages/ux/src/Dashboard/Dashboard.tsx](packages/ux/src/Dashboard/Dashboard.tsx).
  - **FLIP reflow animations** — when widgets reorder (drop, add,
    remove, size cycle), each cell animates from its previous bounding
    box to its new one via a 280ms transform transition. Implemented
    inline in the `Dashboard` component using `useLayoutEffect` to
    snapshot positions on every render, with the animation suppressed
    during active drag/resize so the user's pointer-driven motion
    isn't fought.
  - **Size-cycling glyph** in every widget header — a 4×3 SVG mini-
    grid that visualises the current footprint and cycles through
    preset sizes (S 3×1 → M 4×2 → L 6×2 → XL 8×3) on click. Presets
    are configurable via the new `sizePresets` prop; the feature can
    be disabled with `enableSizeCycle={false}`. New file
    [packages/ux/src/Dashboard/SizeGlyph.tsx](packages/ux/src/Dashboard/SizeGlyph.tsx).

### Changed
- Phase 5 of [docs/plan.md](docs/plan.md) — **KaTeX is now lazy-
  loaded.** `MarkdownView` only imports `katex` and
  `katex/dist/katex.min.css` after detecting math markers (`$…$`,
  `$$`, or ```math) in its source. Until the dynamic import resolves,
  math expressions render as escaped raw text wrapped in
  `.az-md-math-pending` so layout doesn't jump.
  - Production build: main JS bundle dropped from 581KB to 389KB (the
    192KB / 33% win called out as the obvious code-splitting target
    in [docs/plan.md](docs/plan.md)). KaTeX now ships as a 262KB JS
    chunk + 23KB CSS chunk, fetched only on the markdown route when
    the source contains math.
  - [packages/ux/src/Markdown/parse.ts](packages/ux/src/Markdown/parse.ts)
    no longer imports `katex` at module load. A new `setKatex()`
    setter and `hasMath()` helper are exported; the renderer uses an
    injected impl when present and falls back to a placeholder span
    otherwise. [packages/ux/src/Markdown/MarkdownView.tsx](packages/ux/src/Markdown/MarkdownView.tsx)
    triggers the import in a `useEffect` keyed on `hasMath(source)`,
    once per page session.

### Changed
- Phase 8 of [docs/plan.md](docs/plan.md) — showcase navigation moved
  off hash-based routing onto `react-router-dom`. URLs are real and
  deep-linkable: `/foundations` (default), `/components`, `/icons`,
  `/dashboard`, `/markdown`, `/login`.
  - [apps/web/src/App.tsx](apps/web/src/App.tsx) now wraps the app in
    `<BrowserRouter>` with a layout route (`ShowcaseLayout`) that
    renders the sidebar + topbar + `<Outlet>`. The login route is a
    sibling so it renders edge-to-edge without the shell. Sidebar
    items use `<NavLink>` for active state; command-palette "Go to …"
    commands call `useNavigate()` instead of mutating
    `window.location.hash`. Unknown paths redirect to `/foundations`.
  - `<BrowserRouter basename={__AZORES_BASE_PATH__}>` reads a build-
    time global injected by
    [`rspack.config.mjs`](apps/web/rspack.config.mjs) via
    `DefinePlugin` from `PAGES_BASE`, so GitHub Pages deploys under a
    sub-path keep working. Dev server already had
    `historyApiFallback: true`.
  - `react-router-dom: ^6.28.0` added to the catalog in
    [`pnpm-workspace.yaml`](pnpm-workspace.yaml) and consumed by
    `@azores/web` only.
  - Resolves the routing open question in
    [docs/plan.md](docs/plan.md). The icons question was also
    decided: stay on the inline SVG sprite — no code change.

### Fixed
- Code-block gutter line numbers misaligned with the code rows. Two
  bugs in
  [packages/ux/src/Markdown/markdown.css](packages/ux/src/Markdown/markdown.css):
  (1) gutter `font-size` was 12px while the body was 13px so rows
  drifted; (2) the generic `.az-md pre` rule (specificity 0,1,1) was
  overriding `.az-md-codeblock-body` (0,1,0), so the `<pre>` actually
  rendered with `font-size: 0.86em`, `line-height: 1.55`, and
  `margin: 1.2em 0` — the top margin pushed the body down inside the
  flex wrap relative to the gutter. Bumped the codeblock rules to
  `.az-md pre.az-md-codeblock-body` and `.az-md-codeblock
  .az-md-codeblock-gutter` so they actually win, matched
  font-size/line-height across both, and explicitly zeroed the body
  margin.

### Added
- Phase 7 of [docs/plan.md](docs/plan.md) — test infrastructure and the
  UI/UX import guard.
  - Vitest + jsdom + React Testing Library wired at the repo root
    ([vitest.config.ts](vitest.config.ts),
    [vitest.setup.ts](vitest.setup.ts)). Single config covers all
    packages; tests live next to components as `*.test.tsx`. New
    scripts: `pnpm test` (run once) and `pnpm test:watch`.
  - First behavior tests:
    [Button.test.tsx](packages/ui/src/Button/Button.test.tsx) (smoke:
    render, click, disabled) and
    [Modal.test.tsx](packages/ux/src/Modal/Modal.test.tsx) (open/closed,
    aria, Escape close, `closeOnEscape={false}`, dialog
    `stopPropagation`).
  - ESLint `no-restricted-imports` rule in
    [eslint.config.js](eslint.config.js) forbids `@azores/ui` from
    importing `@azores/ux` or any subpath, codifying the UI-vs-UX split
    from [CLAUDE.md](CLAUDE.md).
  - New catalog entries in [pnpm-workspace.yaml](pnpm-workspace.yaml):
    `vitest`, `jsdom`, `@testing-library/{react,jest-dom,user-event}`,
    `@vitejs/plugin-react`. `react` / `react-dom` added as root
    devDependencies so the test-runner JSX transform can resolve them
    outside any single package.

### Added
- Phase 6 of [docs/plan.md](docs/plan.md) — `LoginFlow` in
  [`@azores/ux/src/auth/`](packages/ux/src/auth/), ported from
  [docs/design/Azores/page-login.jsx](docs/design/Azores/page-login.jsx).
  Two-pane layout (form + topo visual), OAuth provider row, email/password
  with leading-icon input groups, "Forgot?" + "Create account" hooks,
  spinner during submit. Visual pane collapses under 900px. Composes
  `BrandMark`, `Button`, and `Icon` from `@azores/ui`; no new deps.
  - Public API: `LoginFlow({ onLogin, onProvider, onForgotPassword,
    onCreateAccount })` with `LoginCredentials` and `LoginProvider` types.
  - New showcase route `#/login`
    ([apps/web/src/App.tsx](apps/web/src/App.tsx)) plus palette command
    "Go to Login". When active it bypasses the showcase shell so the
    full-bleed login design renders edge-to-edge; the command palette
    and tweaks panel remain reachable so the user can navigate away.
  - [apps/web/src/pages/Login.tsx](apps/web/src/pages/Login.tsx) wires
    the flow into the showcase with `useToast()` stand-ins for the
    sign-in / provider / forgot / create-account callbacks.

### Changed
- [docs/plan.md](docs/plan.md) trimmed to what's still actionable.
  Phases 1–5 (Emotion + tokens, `@azores/ui` primitives, flow
  primitives, Dashboard, Markdown) are shipped per this changelog, so
  their entries in the plan were removed. Remaining phases (6 login,
  7 tests + lint guard), deferred items from earlier phases, and the
  still-open routing/icons questions are kept.
- Mobile responsiveness pass across the showcase + design system.
  - **App shell**
    ([apps/web/src/App.tsx](apps/web/src/App.tsx),
    [apps/web/src/showcase.css](apps/web/src/showcase.css)): under
    900px the sidebar collapses off-screen and slides in via a hamburger
    in the topbar; backdrop dismisses; nav auto-closes on route change.
    Topbar button labels (`Commands ⌘K`, `Tweaks`) hide at narrow
    widths, leaving icon-only. Topbar stays above the drawer (so the
    burger is always reachable to close it) and the drawer anchors
    `top: 56px / bottom: 0` instead of `100vh` so iOS Safari sizes it
    correctly. Topbar/sidebar/content padding respect
    `env(safe-area-inset-*)` for notched devices. The `BrandMark` shows
    in the topbar on mobile so the brand is visible whether the drawer
    is open or closed.
  - **Foundations**
    ([apps/web/src/pages/Foundations.tsx](apps/web/src/pages/Foundations.tsx)):
    fixed `1fr 1fr` and `repeat(5, 1fr)` grids replaced with
    `auto-fit minmax()` so spacing/radii/elevation reflow.
  - **Dashboard**
    ([apps/web/src/pages/Dashboard.tsx](apps/web/src/pages/Dashboard.tsx)):
    grid cols now responsive via `matchMedia` — 12 (≥900px) / 8
    (480–900px) / 4 (<480px); widget widths get clamped by the existing
    packing logic. Header wraps on narrow screens.
  - **MarkdownEditor**
    ([packages/ux/src/Markdown/MarkdownEditor.styles.ts](packages/ux/src/Markdown/MarkdownEditor.styles.ts)):
    split panes stack vertically under 768px; per-pane minimum heights
    keep both usable.
  - **Markdown content**
    ([packages/ux/src/Markdown/MarkdownView.tsx](packages/ux/src/Markdown/MarkdownView.tsx),
    [packages/ux/src/Markdown/markdown.css](packages/ux/src/Markdown/markdown.css)):
    tables wrapped in scroll containers; KaTeX math blocks scroll
    horizontally; heading/code sizes shrink under 768px.
  - **Toast**
    ([packages/ux/src/Toast/Toast.styles.ts](packages/ux/src/Toast/Toast.styles.ts)):
    viewport switches to full-width pinned bottom under 480px;
    individual toasts respect the available width.
- KaTeX wired into the markdown pipeline. Inline `$…$` and block `$$…$$`
  / fenced ` ```math ` are now rendered as real math instead of plain
  italic text.
  - Added `katex` + `@types/katex` to the pnpm `catalog:`
    ([pnpm-workspace.yaml](pnpm-workspace.yaml)).
  - `@azores/ux` depends on `katex`
    ([packages/ux/package.json](packages/ux/package.json)).
  - [parse.ts](packages/ux/src/Markdown/parse.ts) renders math
    expressions to HTML at parse time via `katex.renderToString`
    (`throwOnError: false`); the `math-block` block now carries `html`
    instead of raw `body`.
  - [MarkdownView.tsx](packages/ux/src/Markdown/MarkdownView.tsx) imports
    `katex/dist/katex.min.css` and renders math-block HTML via
    `dangerouslySetInnerHTML`.
  - **Cost**: web bundle JS grew from 351 KB → 581 KB. Lazy-loading
    KaTeX (only when a markdown source contains `$`) is the planned
    follow-up — it's the obvious code-splitting candidate now that we
    have actual heavy content.
- Mermaid node labels use a fixed dark fill (`#14161A`) instead of
  `var(--az-text)` so they stay readable on the always-light pastel
  node backgrounds in dark mode
  ([packages/ux/src/Markdown/Mermaid.tsx](packages/ux/src/Markdown/Mermaid.tsx)).

### Added
- App icon / favicon at [apps/web/icon.svg](apps/web/icon.svg) — single
  SVG matching the `BrandMark` (ocean gradient + lava dot + `AZ`
  wordmark). Wired in [apps/web/index.html](apps/web/index.html) via
  `<link rel="icon">` + `<link rel="apple-touch-icon">` and copied to
  `dist/` by `CopyRspackPlugin`
  ([apps/web/rspack.config.mjs](apps/web/rspack.config.mjs)).
- `BrandMark` now renders an "AZ" wordmark inside the gradient square
  ([packages/ui/src/BrandMark/](packages/ui/src/BrandMark/)). Display
  font, weight 600, sizes scale with `sm` / `md` / `lg`. Lava dot
  badge unchanged.
- Icons showcase route `#/icons` ported from
  [docs/design/Azores/page-icons.jsx](docs/design/Azores/page-icons.jsx).
  Single-file page in [apps/web/src/pages/Icons.tsx](apps/web/src/pages/Icons.tsx)
  reusing existing primitives — `Icon` / `Input` / `Button` / `Badge` /
  `Inline` from `@azores/ui` and `useToast()` from `@azores/ux` — instead
  of re-rolling inputs, chips, code blocks, or a custom toast.
  Sticky toolbar (search + size pills + stroke slider), category chip
  filter, sectioned grid; clicking any tile copies its `<Icon name="…"/>`
  tag and fires a toast. Wired into the sidebar nav and palette
  ([apps/web/src/App.tsx](apps/web/src/App.tsx)).
- Phase 5 of [docs/plan.md](docs/plan.md) — `@azores/ux` `MarkdownView` +
  `MarkdownEditor`, ported from
  [docs/design/Azores/page-markdown.jsx](docs/design/Azores/page-markdown.jsx)
  with zero new dependencies.
  - [parse.ts](packages/ux/src/Markdown/parse.ts) — tiny markdown parser
    supporting headings, bold/italic/code, lists, blockquotes, tables,
    code fences, callouts (`:::note|tip|warn|danger`), inline + block
    math (`$…$`, `$$…$$`), mermaid blocks, JSON `chart` blocks, HR,
    images, links, footnote refs.
  - [highlight.ts](packages/ux/src/Markdown/highlight.ts) — manual
    keyword/string/number/comment highlighter for js/ts, py, rust, go,
    sql, bash, json, css, html/xml, diff. No CDN dependency.
  - [Mermaid.tsx](packages/ux/src/Markdown/Mermaid.tsx) — basic
    flowchart renderer (`graph LR/TD/TB/RL` with rect/round/rhombus
    shapes and labelled arrows).
  - [Chart.tsx](packages/ux/src/Markdown/Chart.tsx) — line + bar charts
    from JSON.
  - [CodeBlock.tsx](packages/ux/src/Markdown/CodeBlock.tsx) — fenced
    block with traffic-light header, optional `lang:filename` tag,
    line-number gutter, copy-to-clipboard button.
  - [MarkdownView.tsx](packages/ux/src/Markdown/MarkdownView.tsx) —
    public renderer; takes a `source` string, parses once via `useMemo`,
    renders all block kinds. Imports
    [markdown.css](packages/ux/src/Markdown/markdown.css) (lifted from
    the mockup) for the rendered chrome.
  - [MarkdownEditor.tsx](packages/ux/src/Markdown/MarkdownEditor.tsx) —
    two-column split-pane: source textarea on the left (with toolbar +
    char counter), live `MarkdownView` preview on the right.
  - [packages/ux/src/globals.d.ts](packages/ux/src/globals.d.ts) —
    `*.css` module declaration so TS accepts the side-effect CSS import
    inside the package.
  - New showcase route `#/markdown`
    ([apps/web/src/App.tsx](apps/web/src/App.tsx)) plus palette command
    "Go to Markdown".
  - [pages/Markdown.tsx](apps/web/src/pages/Markdown.tsx) — pill-tab
    switcher across Blog post / ngrok-style docs / Live editor; sample
    markdown ported verbatim into
    [pages/markdownSamples.ts](apps/web/src/pages/markdownSamples.ts).
- Phase 4 of [docs/plan.md](docs/plan.md) — `@azores/ux` `Dashboard`
  primitive with drag/resize, plus a UX dashboard showcase page using
  `@azores/ui` `Background` variants.
  - [Dashboard](packages/ux/src/Dashboard/) — generic 12-col grid with
    HTML5 drag-to-reorder (live ghost preview during drag), corner
    resize, packing, configurable cols/rowHeight/gap/min-max sizes.
    Consumer supplies `renderTitle` + `renderBody` and optional per-widget
    `widgetActions`. Pure layout helpers (packing + insertion reorder)
    live in [layout.ts](packages/ux/src/Dashboard/layout.ts) and are
    exported.
  - New showcase route `#/ux`
    ([apps/web/src/App.tsx](apps/web/src/App.tsx)) plus palette command
    "Go to UX dashboard".
  - [pages/Dashboard.tsx](apps/web/src/pages/Dashboard.tsx) — sample
    layout with KPI / Chart / Tasks / Calendar / Notes / Clock / Team
    widgets and a 6-option background picker (Paper, Atlantic, Blueprint,
    Fog, Moss, Basalt) backed by `@azores/ui` `Background`.
  - [pages/widgets.tsx](apps/web/src/pages/widgets.tsx) — app-specific
    widget renderers ported from
    [docs/design/Azores/page-ux.jsx](docs/design/Azores/page-ux.jsx).
    Not part of the design system; demo content only.
  - **Deferred from this phase** (called out so future PRs pick them up):
    widget-library drawer (clickable + drag-to-add), FLIP reflow
    animations, size-cycling glyph in the widget header. The plan's
    phase-4 acceptance criteria ("UX showcase page works with real
    drag/resize, backgrounds switchable") are met without them.
- Phase 3 of [docs/plan.md](docs/plan.md) — `@azores/ux` flow primitives
  with focus/keyboard/persistence behavior, plus integration into the
  showcase shell.
  - [Modal](packages/ux/src/Modal/) — portaled dialog with backdrop,
    Escape-to-close, focus restore, body scroll lock, and an opt-out
    `padded` body for full-bleed contents (used by the palette).
  - [Drawer](packages/ux/src/Drawer/) — side panel (left/right), backdrop
    optional, slide-in animation, focus restore.
  - Shared overlay behavior in
    [packages/ux/src/overlay/useOverlay.ts](packages/ux/src/overlay/useOverlay.ts).
  - [Toast](packages/ux/src/Toast/) — `<ToastProvider>`, `useToast()`,
    portaled bottom-right viewport with auto-dismiss timers; four
    semantic kinds (info/success/warning/danger).
  - [CommandPalette](packages/ux/src/CommandPalette/) — built on Modal,
    arrow-key navigation, fuzzy substring filter over label + keywords +
    group, grouped results, ENTER to run.
  - [TweaksPanel](packages/ux/src/TweaksPanel/) — Drawer-based panel
    with theme (light/dark) and accent (ocean/volcanic/mono/violet)
    controls. State + persistence via
    [useTweaks](packages/ux/src/TweaksPanel/useTweaks.ts) (localStorage
    key `azores:tweaks`). Applies `data-theme` / `data-accent` on
    `<html>`.
  - Accent token overrides in
    [packages/ui/src/styles/tokens.css](packages/ui/src/styles/tokens.css)
    — `[data-accent="volcanic"|"mono"|"violet"]` rules for both light and
    dark, swapping `--az-primary`, `--az-primary-hover`, and `--az-accent`.
  - `react-dom` added as a peer of `@azores/ux`
    ([packages/ux/package.json](packages/ux/package.json)) — required by
    the portals in Modal/Drawer/Toast.
  - Showcase shell wiring
    ([apps/web/src/App.tsx](apps/web/src/App.tsx)): `⌘K` toggles the
    palette, topbar gains "Commands" + "Tweaks" buttons, theme toggle
    moved into the Tweaks panel, app wrapped in `<ToastProvider>`.
    Palette commands cover navigation, theme, accent, opening tweaks,
    and firing a sample toast.
  - "Overlays & feedback" section in
    [apps/web/src/pages/Components.tsx](apps/web/src/pages/Components.tsx)
    demoing Modal + Toast + the ⌘K hint.
- Phase 2 of [docs/plan.md](docs/plan.md) — `@azores/ui` primitives complete and
  showcase shell live in `@azores/web`.
  - New primitives: [Box](packages/ui/src/Box/),
    [Kbd](packages/ui/src/Kbd/),
    [BrandMark](packages/ui/src/BrandMark/),
    [Background](packages/ui/src/Background/) (with curated variant
    library in [backgrounds.ts](packages/ui/src/Background/backgrounds.ts);
    light/dark via `[data-theme]`).
  - [packages/ui/src/index.ts](packages/ui/src/index.ts) now re-exports
    every primitive and the typed `tokens` map.
  - Avatar now extends `HTMLAttributes<HTMLSpanElement>` so callers can
    pass `style` / `className` directly
    ([packages/ui/src/Avatar/Avatar.tsx](packages/ui/src/Avatar/Avatar.tsx)).
- Showcase app shell in `@azores/web`: sidebar + topbar + hash-based nav
  with a light/dark theme toggle wired to `data-theme`
  ([apps/web/src/App.tsx](apps/web/src/App.tsx)).
- Showcase pages porting the static mockups
  ([docs/design/Azores/page-foundations.jsx](docs/design/Azores/page-foundations.jsx),
  [docs/design/Azores/page-components.jsx](docs/design/Azores/page-components.jsx)):
  [Foundations](apps/web/src/pages/Foundations.tsx) (color, typography,
  spacing, radii, elevation) and
  [Components](apps/web/src/pages/Components.tsx) (buttons, form
  controls, badges, avatars, layout primitives, brand/keyboard,
  backgrounds).
- [apps/web/src/showcase.css](apps/web/src/showcase.css) — chrome
  styles for the showcase shell (sidebar, topbar, page header, sections,
  demo grid, token swatches, type rows). App-specific demo styling, not
  part of the design system.
- [apps/web/src/globals.d.ts](apps/web/src/globals.d.ts) — `*.css` module
  declaration so TS accepts side-effect CSS imports.

### Changed
- [apps/web/rspack.config.mjs](apps/web/rspack.config.mjs) — enabled
  `experiments.css` and added a `type: "css"` rule so the entry can
  import `tokens.css` (from `@azores/ui`) and `showcase.css` directly.
- [apps/web/src/main.tsx](apps/web/src/main.tsx) — imports
  `@azores/ui/src/styles/tokens.css` once at the app entry, plus the
  showcase chrome stylesheet.
- [apps/web/src/App.tsx](apps/web/src/App.tsx) — replaced the placeholder
  greeting with the showcase shell.
- Centralized shared third-party dep versions via pnpm `catalog:` in
  [pnpm-workspace.yaml](pnpm-workspace.yaml). `react`, `react-dom`,
  `@types/react`, `@types/react-dom`, `@emotion/react`, and
  `@emotion/styled` are now pinned once at the workspace root; every
  package references them as `"catalog:"` instead of duplicating the
  range. Guarantees a single installed instance (no duplicate React) and
  makes upgrades a one-line change. Updated
  [apps/web/package.json](apps/web/package.json),
  [packages/ui/package.json](packages/ui/package.json),
  [packages/ux/package.json](packages/ux/package.json), and added the
  rule to [CLAUDE.md](CLAUDE.md).
- Renamed top-level `app/` directory to `apps/`. Updated
  [pnpm-workspace.yaml](pnpm-workspace.yaml),
  [tsconfig.json](tsconfig.json),
  [package.json](package.json) `dev` script filter,
  [.github/workflows/pages.yml](.github/workflows/pages.yml) artifact
  path, and [CLAUDE.md](CLAUDE.md) references.
- Simplified the root `dev` script: dropped redundant `--recursive`
  (filter already implies it) — now
  `pnpm --parallel --filter "./apps/*" --stream dev`.

### Fixed
- [apps/web/rspack.config.mjs](apps/web/rspack.config.mjs) — added
  `resolve.extensionAlias` so `.js` imports inside workspace packages
  resolve to their `.ts` source. Was producing
  `ESModulesLinkingWarning: export 'theme' ... module has no exports`
  for `@azores/ui` because `index.ts` imports `'./theme.js'` (per the
  project's explicit-extension rule) and rspack was looking for a
  literal `theme.js` file.

### Added
- Toolchain version pins: [.nvmrc](.nvmrc), [.node-version](.node-version),
  [.tool-versions](.tool-versions) — Node 24.15.0 (LTS), pnpm 10.33.2.
- [docs/plan.md](docs/plan.md) — implementation plan for porting the
  static design-system mockups under [docs/design/Azores](docs/design/Azores)
  into the live `@azores/web` + `@azores/ui` + `@azores/ux` app.
- This changelog file. Project rule: every change updates this file.

### Changed
- [package.json](package.json) — bumped `engines.node` to `>=24` and
  `packageManager` to `pnpm@10.33.2`.
- [.github/workflows/pages.yml](.github/workflows/pages.yml) — switched
  `actions/setup-node` to `node-version-file: .nvmrc` so CI tracks the
  pinned version automatically.

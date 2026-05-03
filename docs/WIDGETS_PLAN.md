# Widgets — backlog

Ideas for additional dashboard widgets, all using **no API keys**. The
shipped list below is what's currently registered (see
[packages/widgets/src/](../packages/widgets/src/) and the
[CHANGELOG](../CHANGELOG.md)). The rest are tracked here so we don't
lose them. When picking the next batch, optimize for: clear value,
stable CORS-friendly endpoint, minimal config, no key.

## Already shipped

- ✅ Weather (Open-Meteo / IPMA)
- ✅ Atlas (REST Countries)
- ✅ Wikipedia (random curated summary)
- ✅ FX rates (Frankfurter / ECB)
- ✅ Earthquakes (USGS)
- ✅ News (RSS, multiple presets)
- ✅ World Bank
- ✅ Hacker News (Algolia HN API)
- ✅ Crypto (CoinGecko)
- ✅ GitHub trending (Search API)
- ✅ Quote of the day (Quotable)
- ✅ ISS live position (wheretheiss.at)
- ✅ Clock (local)
- ✅ Countdown (local, fixed to NYE)
- ✅ Scratchpad (local, persisted)
- ✅ On this day (Wikipedia feed)
- ✅ Air quality (Open-Meteo)
- ✅ Public holidays (Nager.Date)
- ✅ Pomodoro (local timer)
- ✅ Moon phase (local computation)
- ✅ Sunrise & sunset (sunrise-sunset.org)
- ✅ Cat fact (catfact.ninja)
- ✅ Joke (official-joke-api)
- ✅ npm downloads (api.npmjs.org, hardcoded to `react`)
- ✅ World clocks (local, 4 cities)
- ✅ Aurora forecast / Kp (NOAA SWPC)
- ✅ Bitcoin fees (mempool.space)
- ✅ Wikipedia featured article (REST feed)
- ✅ Advice slip (adviceslip.com)
- ✅ GitHub repo stats (facebook/react)
- ✅ Your IP (ipapi.co)
- ✅ GitHub status (statuspage.io)
- ✅ NASA APOD (DEMO_KEY)
- ✅ Random cocktail (TheCocktailDB)
- ✅ Random meal (TheMealDB)
- ✅ Random dog photo (dog.ceo)
- ✅ Trivia (OpenTDB, with reveal)
- ✅ To-do list (local, persisted)
- ✅ Bookmarks (local, persisted)
- ✅ Calculator (local)
- ✅ Calendar month view (local)
- ✅ Unit converter (local; length / weight / temperature)
- ✅ Stopwatch (local)
- ✅ Dice roller (local)
- ✅ Coin flip (local)

## Backlog — external (no key)

### Knowledge / serendipity

- **Random Wikipedia article** — already partially covered by the
  curated Wikipedia widget; a "fully random" preset using
  `/page/random/summary` would be one config flag away.
- **Word of the day** — Wiktionary REST or
  `random-word-api.herokuapp.com`. Pair with a definition fetch.
- **arXiv recent papers** — `export.arxiv.org/api/query`. Atom feed,
  CORS questionable.

### Markets / money

- **Stock ticker (Yahoo Finance)** —
  `query1.finance.yahoo.com/v8/finance/chart/{SYMBOL}`. Unofficial but
  stable; CORS depends on host. May need a simple proxy.
- **Gold/silver spot** — `metals.live` or `data-asg.goldprice.org`.
- **FX history chart** — Frankfurter has a `/timeseries` endpoint;
  needs a small SVG sparkline component.
- **Inflation / CPI** — World Bank already covers this; could carve
  out a focused single-metric widget.

### Earth / sky / nature

- **Tides** — NOAA CO-OPS for US stations; for PT, IH (hidrográfico)
  publishes XML.
- **Solar flare / X-ray flux** — NOAA SWPC, similar to Aurora.

### Dev / infra

- **Docker Hub pulls** — `hub.docker.com/v2/repositories/{ns}/{repo}/`.
- **Bundlephobia size** — `bundlephobia.com/api/size?package=…`.
- **PyPI downloads** — `pypistats.org/api/packages/{pkg}/recent`.
- **More status pages** — Cloudflare, AWS, Anthropic, OpenAI all
  expose statuspage.io APIs. Same shape as the GitHub widget.

### Public transit / civic

- **TfL line status** —
  `api.tfl.gov.uk/Line/Mode/tube/Status`, no key for low volume.
- **Lisbon CARRIS / Metro** — CML open-data feeds where available.
- **MBTA / BART / NYC MTA** — GTFS-RT endpoints, all key-free.

### Just-for-fun

- **Bored / activity suggester** — `bored.api.lewagon.com`.
- **xkcd latest** — `xkcd.com/info.0.json`. ⚠️ no CORS.
- **Random Chuck Norris fact** — `api.chucknorris.io`.
- **Random useless fact** — `uselessfacts.jsph.pl`.

## Backlog — local-only (no network)

- **Per-instance countdown** — like the shipped Countdown but with
  user-set target date (needs an edit affordance in the dashboard, not
  yet present).
- **Weekly planner** — 7-column to-do, persisted.
- **Markdown viewer / editor** — render a stored markdown blob.
- **Multi-note pad** — like Scratchpad but with a list of named notes.
- **Random number** — within user-set min/max.
- **Color picker / palette generator** — for the design-y crowd.

## Notes / gotchas

- **CORS is the gating factor.** RSS feeds, NOAA, and several "open"
  APIs respond without `Access-Control-Allow-Origin` and can't be
  consumed from the browser. Verify in the network panel before
  scaffolding. The repo already lost Reddit, Wikinews, HN-RSS, and
  Lobste.rs presets to this — see [CHANGELOG.md](../CHANGELOG.md).
- **Per-instance config** — widgets that take user input (a stock
  symbol, an npm package, a repo name) need an edit affordance in the
  dashboard. Today only News presets are configurable, and they're
  configured at catalog-add time, not editable afterward. A general
  "edit widget" UI is a prerequisite for most of the dev/markets
  ideas. Several shipped widgets (NpmDownloads pinned to `react`,
  GitHubRepo pinned to `facebook/react`, Holidays pinned to `PT`)
  are awaiting this.
- **Mixed content** — endpoints over `http://` (e.g. `open-notify.org`)
  are blocked when the app is served over HTTPS. Always pick HTTPS
  endpoints; the shipped ISS widget uses `wheretheiss.at` for that
  reason.
- **Dashboard density** — the catalog is now ~38 entries deep. The
  library Drawer in
  [apps/atlas/src/AtlasPage.tsx](../apps/atlas/src/AtlasPage.tsx)
  scrolls but isn't grouped. Consider adding section headers
  (Knowledge / Markets / Tools / Fun) before adding many more.

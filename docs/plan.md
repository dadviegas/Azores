# Azores — implementation plan

A plan to turn the static design-system mockups under
[`docs/design/Azores`](./design/Azores/) into a real, working React app
that exercises every surface — foundations, components, UI showcase,
UX dashboard, and the markdown renderer — with a clean separation
between **UI** (chrome) and **UX** (behavior).

Status: phases 1–8 shipped (Emotion + tokens, `@azores/ui` primitives,
flow primitives, dashboard, markdown, login, tests + lint guard,
react-router migration). The Phase 4 dashboard polish (drawer, FLIP,
size-cycle glyph) and the Phase 5 KaTeX lazy-load also shipped.
**Phase 10 — `@azores/home` launcher + Module Federation — shipped**
(see §6). See [`CHANGELOG.md`](../CHANGELOG.md) for what landed.
Remaining work: the still-deferred items in §3 plus the live-data-
widgets phase in §7.

---

## 1. UI vs UX — the dividing line

The split codified in [CLAUDE.md](../CLAUDE.md) is the rule. Concrete
heuristic:

- **Goes in `@azores/ui`** if it can be screenshotted in isolation and
  fully understood: `Button`, `Input`, `Badge`, `Avatar`, `Card`,
  `Stack`, `Inline`, `Box`, `Icon`, `Kbd`, `Background`, `BrandMark`,
  typography primitives. No `useEffect`, no router, no global state, no
  network.
- **Goes in `@azores/ux`** if it has motion, focus management, async
  state, or composes a flow: `CommandPalette` (kbd shortcuts, focus
  trap), `Dashboard` (drag/resize), `MarkdownView` + `MarkdownEditor`,
  `LoginFlow`, `TweaksPanel` (theme/accent persistence), `Modal` /
  `Drawer` (focus trap, escape handling), `Toast` system.

The lint guard now enforces this: an ESLint `no-restricted-imports`
rule scoped to `packages/ui/**` forbids `@azores/ui` from importing
`@azores/ux` (or any subpath). See [`eslint.config.js`](../eslint.config.js).

## 2. Remaining phases

All planned phases (1–7) have shipped. New work goes through the
deferred items below or new phases added on top.

## 3. Deferred items from earlier phases

Called out so future PRs pick them up:

- **Phase 4 (Dashboard):** ~~widget-library drawer, FLIP reflow
  animations, size-cycling glyph~~ — all shipped. See
  [`CHANGELOG.md`](../CHANGELOG.md).
- **Phase 5 (Markdown):** ~~lazy-load KaTeX~~ — shipped (581 KB →
  389 KB main bundle, KaTeX now in an on-demand chunk). Still
  deferred:
  - **Swap the hand-rolled parser for `markdown-it`** + plugins
    (`markdown-it-attrs`, `markdown-it-anchor`,
    `markdown-it-container`) keeping `MarkdownView` unchanged so
    callers don't break. Medium-term: the current parser handles
    every fixture in the showcase and the public surface
    (`parseMarkdown`, `Block` type) is small, so the swap is real
    work without an immediate user-facing payoff. Pick it up when
    coverage gaps appear (footnote definitions, nested lists, task
    lists, etc.) or when we need plugin-style extensibility.
  - **Lazy-load `highlight.js`** — the hand-rolled highlighter in
    [`highlight.ts`](../packages/ux/src/Markdown/highlight.ts)
    covers js/ts, py, rust, go, sql, bash, json, css, html, diff and
    is ~100 lines. Only swap to `highlight.js/lib/core` (behind
    `React.lazy`) when a real coverage gap shows up.

## 4. Decisions

- **Routing — `react-router`.** Move the showcase off hash-based nav
  onto `react-router` so we get real URLs, deep linking, and a routing
  primitive the rest of the app can grow into. New phase to schedule
  (see §5).
- **Icons — inline SVG sprite.** Keep the sprite from
  [`icons.jsx`](./design/Azores/icons.jsx); don't take on `lucide-react`.
  Bundle size wins while the icon set stays small; we'll revisit if
  coverage gets thin.

## 5. Phase 8 — routing migration (shipped)

Done. `react-router-dom` powers the showcase; URLs are real
(`/foundations`, `/components`, `/icons`, `/dashboard`, `/markdown`,
`/login`) and deep-linkable. See [`CHANGELOG.md`](../CHANGELOG.md).

## 6. Phase 10 — home shell + Module Federation (shipped)

A new `@azores/home` app under [`apps/home/`](../apps/home/) is the
launcher users land on. Sibling apps are loaded as Module Federation
remotes via manifest (`mf-manifest.json`), with React, react-dom,
react-router-dom, and @emotion/react declared `singleton: true` on
both sides. Versions are pulled from each package.json at config
time, so the pnpm catalog is the single source of truth — drift is a
config bug, not a runtime hazard.

- **Host:** [`apps/home`](../apps/home/) on port 5170. Owns the
  outer `BrowserRouter`. Routes: `/` (launcher tiles),
  `/apps/showcase/*` (lazy-loaded federated showcase).
- **Remote:** [`apps/web`](../apps/web/) on port 5173. Exposes
  `./ShowcaseRoutes` — a router-agnostic component that mounts
  `<Routes>` with relative paths so it works under either parent.
  Standalone deploys still get a thin `App` wrapper that adds
  `<BrowserRouter>`.
- **Adding a new federated app:** drop a new app under `apps/`,
  configure its `rspack.config.mjs` with `ModuleFederationPlugin`
  matching the singleton list, then add an entry to
  [`apps/home/src/apps.ts`](../apps/home/src/apps.ts) and a
  matching `<Route>` in [`apps/home/src/App.tsx`](../apps/home/src/App.tsx).

### Open follow-ups

- **Type safety across the federation boundary.** Today the host
  has a hand-rolled stub in
  [`apps/home/src/federated.d.ts`](../apps/home/src/federated.d.ts)
  declaring `showcase/ShowcaseRoutes` as an opaque
  `ComponentType`. `@module-federation/enhanced` ships a DTS plugin
  that publishes `.d.ts` alongside `remoteEntry.js`; wire it up so
  the host gets real types when it imports federated modules. The
  build already attempts to generate `@mf-types.zip` on the remote
  side — flaky on the first run, worth fixing.
- **Pre-fetch on hover.** First click into the showcase tile is a
  cold network hop for the manifest + entry + chunks. Pre-fetch
  the manifest on hover/focus of the tile so the click feels free.
- **Production manifest URL** — `AZORES_SHOWCASE_MANIFEST` env var
  is read at build time. Lock down the production value in CI per
  environment when we have one.

## 7. Phase 9 — live data widgets (planned)

Today every Dashboard widget renders hard-coded fixture data. Phase 9
turns at least four of them into live widgets backed by **public,
no-key, CORS-open** JSON APIs. Constraint: no API keys, no secrets in
the bundle, no auth flow — drop the URL into `fetch` and it works.

### Picks

The four below cover one widget per quadrant of the existing catalog
(weather / atlas / knowledge / markets) and have stable schemas:

- **Weather** — [Open-Meteo](https://open-meteo.com)
  `https://api.open-meteo.com/v1/forecast?latitude=…&longitude=…&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`.
  Replaces the placeholder Weather widget from the design mock. Pair
  with `navigator.geolocation` (with a Ponta Delgada fallback) so the
  widget reflects the user's location.
- **Country / atlas** — [REST Countries](https://restcountries.com)
  `https://restcountries.com/v3.1/all?fields=name,cca2,capital,population,flag,currencies,languages`.
  New `AtlasWidget` — picks a random country on each tick, shows
  flag + capital + population + currency. Cheap, visually striking.
- **Wikipedia summary** — `https://en.wikipedia.org/api/rest_v1/page/summary/<title>`.
  New `OnThisDayWidget` (or a "random article" variant via
  `…/page/random/summary`). Good for typography density and
  thumbnail rendering.
- **FX ticker** — [Frankfurter](https://www.frankfurter.app) /
  ECB rates `https://api.frankfurter.app/latest?from=EUR&to=USD,GBP,JPY,BRL`.
  Replaces the fake Stocks widget with real EUR-base rates. Mono-
  font numbers, sparkline-friendly via the `…/2024-01-01..` range
  endpoint.

### Cross-cutting work

- **`useFetchJson` hook in `@azores/core`** — the framework-agnostic
  layer. Owns `AbortController`, error/loading state, swr-style
  refresh-on-focus, and a tiny in-memory cache keyed by URL. Widgets
  consume it; no widget should call `fetch` directly.
- **Skeleton/loading state in widget bodies** — the Dashboard
  already has the chrome; widgets need a `LoadingShimmer` primitive
  (probably in `@azores/ui`) that respects token spacing/radius.
- **Failure UX** — every widget needs an offline/error state. Show
  a muted "—" with a retry chip, not a full error card; the
  Dashboard chrome stays.
- **CORS / network-failure smoke test** — hit each picked endpoint
  from `apps/web` dev once and confirm headers + payload shape match
  the types. Pin a `zod` schema (or a hand-rolled type guard) per
  widget so a silent API change shows up as a typed runtime error,
  not a crash deep in the renderer.
- **Refresh cadence** — every widget declares its own interval
  (weather 10 min, FX 5 min, atlas 60 s for the rotation, wiki on
  click). The size-cycle action stays; add a refresh action via the
  existing `widgetActions` prop.

### Out of scope for Phase 9

- API key gated services (NASA APOD, Open-Meteo air-quality with
  history, Alpha Vantage, etc.) — defer until we have a config layer
  for build-time secrets.
- Server-side caching / proxying. If a free API rate-limits us in
  practice we'll add a tiny edge function then; not before.
- Persisting the widget grid across sessions. Independent concern,
  separate phase.

### Open candidates (not picked)

Solid but didn't make the cut for this phase: Hacker News
(`hn.algolia.com`), GitHub user/repo (`api.github.com` — 60 req/h
unauthenticated), CoinGecko (`api.coingecko.com`), ISS live position
(`api.open-notify.org/iss-now.json`), SpaceX (`api.spacexdata.com`),
TheMealDB, PokeAPI, world-time-api. Each could become a fifth or
sixth live widget if the four above land cleanly.

Decisions land in this file as we make them. Anything that ships goes
into [`CHANGELOG.md`](../CHANGELOG.md).

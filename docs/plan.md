# Azores — implementation plan

A plan to turn the static design-system mockups under
[`docs/design/Azores`](./design/Azores/) into a real, working React app
that exercises every surface — foundations, components, UI showcase,
UX dashboard, and the markdown renderer — with a clean separation
between **UI** (chrome) and **UX** (behavior).

Status: phases 1–8, 9, and 10 shipped. Phase 9 landed end-to-end:
`@azores/dataprovider` (sources + `<DataProvider>` + `useSource` +
widget-manifest schema) on top of `@azores/core` fetch, `@azores/widgets`
with four live widgets (Weather, Atlas, Wikipedia, FX), and a new
`apps/atlas` federated remote that mounts them all in a shared
`<Dashboard>`. The Atlas tile in the home shell is now `live`.
See [`CHANGELOG.md`](../CHANGELOG.md) for what landed.

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

## 2. Deferred items from earlier phases

Called out so future PRs pick them up:

- **Phase 5 (Markdown):**
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

- **Phase 10 (Module Federation):**
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

## 3. Decisions

- **Routing — `react-router`.** The showcase moved off hash-based nav;
  URLs are real and deep-linkable.
- **Icons — inline SVG sprite.** Keep the sprite from
  [`icons.jsx`](./design/Azores/icons.jsx); don't take on `lucide-react`.
  Bundle size wins while the icon set stays small; we'll revisit if
  coverage gets thin.
- **Fetch layer — typed `Fetcher` with source allowlist.** Widgets do
  not call `fetch` directly; they receive a `Fetcher` whose `sources`
  list constrains what they can request. Cache lives in `@azores/core`
  and is shared across MF remotes via a `globalThis` singleton.

## 4. Phase 9 — live data widgets (in progress)

Foundation shipped: `@azores/core` exposes `FetchCache`,
`registerSource`, `createFetcher`, and built-in sources for `weather`,
`countries`, `wikipedia`, `fx`. Remaining work is on the widget side.

### Widgets to wire

One per quadrant of the existing catalog (weather / atlas / knowledge /
markets), each consuming a `Fetcher` with a single-source allowlist:

- **Weather** — replace placeholder Weather widget with an Open-Meteo
  reader (`source: "weather"`). Pair with `navigator.geolocation` and
  a Ponta Delgada fallback. TTL 10 min already set on the source.
- **Atlas** — new `AtlasWidget` consuming `source: "countries"`.
  Picks a random country on each tick; shows flag + capital +
  population + currency. TTL 24h on the source; rotation handled
  client-side, not via re-fetch.
- **Wikipedia** — new `OnThisDayWidget` (or random-article variant)
  consuming `source: "wikipedia"`. Good for typography density and
  thumbnail rendering.
- **FX ticker** — replace the fake Stocks widget with Frankfurter
  rates (`source: "fx"`, EUR base → USD/GBP/JPY/BRL). Mono-font
  numbers; sparkline-friendly via the date-range endpoint when we
  add history.

### Cross-cutting work

- **`useFetchSource` hook in `@azores/core`** — thin React wrapper
  over `Fetcher.get` returning `{ data, error, loading, refresh }`.
  Owns the `AbortController` lifecycle (cancel on unmount / param
  change), reads from cache synchronously when fresh, swr-style
  revalidate-on-focus opt-in. Widgets consume the hook; no widget
  touches `Fetcher` directly.
- **Skeleton/loading state in widget bodies** — the Dashboard
  already has the chrome; widgets need a `LoadingShimmer` primitive
  in `@azores/ui` that respects token spacing/radius.
- **Failure UX** — every widget needs an offline/error state. Show
  a muted "—" with a retry chip, not a full error card; the
  Dashboard chrome stays.
- **Runtime validation** — the `Source.parse` hook is the seam for
  this. Add a `zod` schema (or hand-rolled type guard) per source so
  a silent API change shows up as a typed runtime error, not a crash
  deep in the renderer.
- **Refresh cadence** — every widget declares its own interval
  (weather 10 min, FX 5 min, atlas 60 s for the rotation, wiki on
  click). Add a refresh action via the existing `widgetActions` prop;
  it calls `Fetcher.get(name, params, { forceRefresh: true })`.

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

## 5. Phase 11 — widget grid persistence (planned)

Once live data lands, the grid layout itself becomes worth keeping
between sessions. Pieces that need to compose:

- **Storage seam** — same `globalThis` singleton trick as
  `FetchCache`, backed by IDB store `layout`. Key by user id once we
  have one; for now key by `"default"`.
- **Layout schema** — versioned (`{ v: 1, widgets: [...] }`) so we
  can migrate without nuking saved grids. Reject unknown versions
  forward.
- **Reset action** — surface a "reset layout" item in the existing
  Dashboard menu. Cheap to add, expensive to omit when a user wedges
  their grid.

Not started; called out so the data-widget phase doesn't accidentally
couple itself to ad-hoc `localStorage` writes.

Decisions land in this file as we make them. Anything that ships goes
into [`CHANGELOG.md`](../CHANGELOG.md).

# Azores — implementation plan

A plan to turn the static design-system mockups under
[`docs/design/Azores`](./design/Azores/) into a real, working React app
that exercises every surface — foundations, components, UI showcase,
UX dashboard, and the markdown renderer — with a clean separation
between **UI** (chrome) and **UX** (behavior).

Status: phases 1–11 shipped. Phase 9 landed end-to-end
(`@azores/dataprovider` + four live widgets); phase 10 wired the home
shell to federated remotes; phase 11 added storage-backed grid
persistence with a versioned schema. The catalog has since grown past
100 widgets across three expansion batches (dev tools, productivity,
finance), the Tweaks panel now configures AI provider settings, and a
suite of OpenAI-compatible AI widgets (chat, summarize, translate,
rewrite, code-explain, prompt) ships against any user-configured
endpoint. Drag/drop now supports drop-anywhere pins, and a Tidy action
re-packs the grid. See [`CHANGELOG.md`](../CHANGELOG.md) for what
landed.

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

## 4. Phase 9 — live data widgets (shipped)

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

## 5. Phase 11 — widget grid persistence (shipped)

Storage seam landed in [`@azores/core/storage`](../packages/core/src/storage/adapter.ts)
as an adapter-based key/value proxy. Default adapter is IndexedDB;
`setStorageAdapter()` swaps it for any remote KV (Supabase planned —
see Phase 14). The Atlas page persists under
`atlas:dashboard:layout` with a versioned envelope (`{ v: 4, widgets:
[...] }`); unknown versions are discarded forward, and a debounced
save (250 ms) keeps drag/resize gestures from thrashing storage.
Reset and Remove-all are wired into the header and library drawer.

What followed naturally and shipped alongside:

- **Drop-where-you-want pins.** Widgets gained optional `col`/`row`
  coordinates; the packer respects them and the schema bumped to v4
  to persist them. Tidy clears pins and re-packs first-fit.
- **Responsive column count.** [`colsForWidth`](../apps/atlas/src/AtlasPage.tsx)
  picks 4/8/12/16/20/24 columns by viewport width so cells stay
  roughly square across phones, laptops, and ultrawides.
- **External drag from the library.** The library drawer drags
  catalog entries onto the grid with a sized ghost reflecting the
  pocket the widget will actually land in.

## 6. Phase 12 — catalog scaling to ~200 widgets (in progress)

The catalog crossed 100 entries with three landed batches: dev
tools, productivity, and finance calculators. The shape of the
remaining work:

- **Offline-first bias.** Net-new widgets default to no network. CORS
  has bitten the News presets repeatedly (every non-CORS preset was
  removed in the last batch); prefer the platform — `Intl`, `crypto`,
  `Notification`, `localStorage`, `Canvas`, `Web Audio` — before
  reaching for an API.
- **Categories, not a flat list.** [`WIDGET_CATEGORY_ORDER`](../packages/widgets/src/index.ts)
  is the canonical ordering used by the library drawer. New widgets
  declare a `category`; if a batch needs a new one, add it to the
  order array in the same PR.
- **Configurable presets.** The pattern from News (one widget,
  `data` payload picks the source) is the right shape for any
  widget that's "one component, many sources" (RSS, GitHub repo,
  city clock, color palette, etc.). Configurable widgets can have
  multiple instances on a dashboard; fixed widgets are blocked once
  added.
- **Per-widget refresh cadence.** Widgets that hit the network
  declare `ttlMs` on their registry entry; the dashboard chrome
  exposes a refresh action via `widgetActions`. No widget sets up
  its own polling loop.
- **Shared primitives over per-widget chrome.** Anything that looks
  like a list, table, gauge, or sparkline should live in
  [`packages/ui`](../packages/ui/src/) before the third widget
  ships it. `LoadingShimmer` is the precedent.

### Open candidates

Solid net-new categories the next batches can pull from: world-time,
RSS-readable feeds (with proxy, deferred), unit conversions beyond
the basics, more text/encoding tools, simple games (2048, snake,
minesweeper), small science demos (pendulum, double-pendulum, FFT
visualizer), small data-viz (sortable table, bar/line chart with
paste-in CSV).

## 7. Phase 13 — AI widget surface (shipped, extending)

The AI widget suite ships against any OpenAI-compatible endpoint
([`packages/widgets/src/_ai/client.ts`](../packages/widgets/src/_ai/client.ts))
with the user's URL/key/model held in `azores:ai-settings`
`localStorage`. Six widgets shipped: AiChat, AiSummarize, AiTranslate,
AiRewrite, AiCodeExplain, AiPrompt. Tweaks → AI is the configuration
seam.

Extension work that's natural from here, none committed:

- **Streaming responses.** Today every widget waits for the full
  reply. Switching to `stream: true` and rendering tokens as they
  arrive is mostly a client-side change in `_ai/client.ts`; the
  widgets need to render partial state without flicker.
- **Per-widget prompt overrides.** AiPrompt persists a seed list;
  the others hard-code a system prompt. A small "Edit prompt" affordance
  on each widget header would unify them without a new widget.
- **Tool/function calling.** Out of scope until there's a concrete
  use case; the contract is open-ended and the widget surface is
  small.
- **Local model defaults.** A "Use LM Studio at localhost:1234"
  shortcut in Tweaks → AI removes a copy-paste step for the most
  common offline setup.

## 8. Phase 14 — sync adapter (planned)

The storage proxy was built with this phase in mind: layouts and AI
settings already flow through `getStorage()`, so swapping the adapter
swaps the backend. Pieces:

- **Auth seam.** No login flow today. Anything that touches a remote
  KV needs an identity to key by. Pick the smallest workable shape
  (anonymous device id → upgradeable to email magic-link) before
  wiring Supabase.
- **Conflict policy.** Two devices editing the same dashboard need a
  rule. Default to last-write-wins on the layout envelope (already
  versioned); revisit if it bites.
- **Migration on schema bump.** Layout `v` bumps currently discard
  forward. With sync, a stale device should refuse to overwrite a
  newer record — server-side `v` check on write.
- **Settings sync, opt-in.** AI keys in particular shouldn't roam
  silently across devices. Layouts should; secrets shouldn't.

Not started. Called out so Phase 12 batches don't accidentally
introduce widgets that write directly to `localStorage` and bypass
the adapter.

Decisions land in this file as we make them. Anything that ships goes
into [`CHANGELOG.md`](../CHANGELOG.md).

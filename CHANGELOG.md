# Changelog

All notable changes to this project are recorded here. Format loosely
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning is date-based until we ship a real release.

Newest entries on top. Each entry: a one-line summary, then bullets
under **Added / Changed / Removed / Fixed** as needed. Reference files
with relative links so the entry stays clickable.

## Unreleased

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

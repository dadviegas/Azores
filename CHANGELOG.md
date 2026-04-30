# Changelog

All notable changes to this project are recorded here. Format loosely
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning is date-based until we ship a real release.

Newest entries on top. Each entry: a one-line summary, then bullets
under **Added / Changed / Removed / Fixed** as needed. Reference files
with relative links so the entry stays clickable.

## Unreleased

### Added
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

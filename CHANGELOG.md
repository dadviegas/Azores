# Changelog

All notable changes to this project are recorded here. Format loosely
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning is date-based until we ship a real release.

Newest entries on top. Each entry: a one-line summary, then bullets
under **Added / Changed / Removed / Fixed** as needed. Reference files
with relative links so the entry stays clickable.

## Unreleased

### Added
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

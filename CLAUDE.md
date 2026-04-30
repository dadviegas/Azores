# Azores — frontend & design guide

This file is loaded into Claude's context for any work in this repo. Read it
before suggesting changes. Keep edits to it concrete and current — delete
anything that becomes stale rather than letting it rot.

## Stack

- **Monorepo** — pnpm workspaces. Packages live under `apps/*` (deployables)
  and `packages/*` (libraries):
  - `@azores/web` — consumer app (rspack + React)
  - `@azores/ui` — visual primitives & design tokens (buttons, inputs,
    typography, color/spacing/radius). Pure presentation.
  - `@azores/ux` — interaction & flow components (layouts, modals,
    navigation, transitions, focus/keyboard). Composes `@azores/ui`; owns
    behavior, not chrome.
  - `@azores/core` — shared framework-agnostic logic.
  - `@azores/config` — typed env/config loader.

  Cross-package imports use the `@azores/<name>` specifier and must be
  declared as `workspace:*` deps in the consuming package.
- **Shared third-party deps** — versions of cross-cutting libraries
  (`react`, `react-dom`, `@types/react`, `@types/react-dom`,
  `@emotion/react`, `@emotion/styled`, and any future framework-level
  shared dep) are pinned **once** in the `catalog:` block of
  [pnpm-workspace.yaml](pnpm-workspace.yaml). Every package references
  them as `"catalog:"` — never a literal version range. This guarantees a
  single installed instance (no duplicate React, no type-mismatched
  `@types/react`) and makes upgrades a one-line change. When adding a
  new dep that more than one package will consume, put it in the catalog
  first; don't let versions drift across `package.json`s.
- **Build** — rspack + swc-loader. No Babel. Dev server: `pnpm --filter
  @azores/web dev` on port 5173.
- **UI** — React 18, function components, hooks. No class components.
- **Language** — TypeScript strict (`noUncheckedIndexedAccess`,
  `verbatimModuleSyntax`). ESM only (`"type": "module"`). Use `.tsx` for
  components, `.ts` elsewhere. Imports inside the same package use explicit
  `.js` extension (TS resolves to `.ts`); cross-package imports use the bare
  `@azores/<name>` specifier.
- **Config/secrets** — read via `@azores/config` (`config.app.basePath`,
  `config.api.key`, …). Never read `process.env` from app code; build scripts
  (rspack/CI) may. Add new vars to both the schema in
  `packages/config/src/config.ts` AND the templates `.env.example` /
  `.env.example.yml`.

## React conventions

- **Components** — named exports, arrow function with explicit `JSX.Element`
  return type when public, inferred otherwise. `PascalCase.tsx` per component.
  Co-locate small subcomponents in the same file until they're reused.
- **Props** — `type Props = { … }` (not `interface`); destructure in the
  signature; mark optional only when there is a real default. Avoid
  `React.FC` — it adds nothing and bloats inferred types.
- **State** — `useState` for local UI, `useReducer` when transitions are
  non-trivial, lift only as far as needed. No global stores until two
  unrelated screens actually share state. Don't reach for Redux/Zustand
  speculatively.
- **Effects** — `useEffect` is for syncing with external systems (DOM, network,
  subscriptions). Don't use it to derive state from props — derive inline or
  `useMemo`. Every effect needs a complete dep array; no `// eslint-disable`
  on `react-hooks/exhaustive-deps` without a comment explaining why.
- **Refs** — `useRef` for imperative DOM access only. `forwardRef` only when a
  parent genuinely needs the node; otherwise pass a `ref` prop with React 19
  conventions when we upgrade.
- **Keys** — stable IDs from data, never array index unless the list is
  append-only and order-stable.
- **Suspense / lazy** — split route-level chunks with `React.lazy`; don't lazy
  every component.

## Styling

- **Emotion** (`@emotion/react` + `@emotion/styled`) is the component styling
  layer. Each component owns its styles in a sibling `*.styles.ts` file.
  Variants, states, and theme-aware values live there.
- **Global tokens** (`tokens.css`) are plain CSS custom properties on
  `<html>`, imported once from the app entry. Theme/accent switching uses
  `data-theme` / `data-accent` attributes — no `<ThemeProvider>` needed.
  Emotion styles read tokens via `var(--az-*)`.
- **Per-component file layout** (in `@azores/ui` and `@azores/ux`):
  ```
  ComponentName/
    ComponentName.tsx         # component
    ComponentName.styles.ts   # Emotion styled + css definitions
    ComponentName.css         # optional: keyframes, @font-face, base resets
    index.ts                  # re-export
  ```
  Keep CSS and Emotion isolated per folder — never share style files
  across components.
- **Inline `style={{}}`** — fine for one-offs that reference tokens
  (`style={{ background: 'var(--az-bg)' }}`). For anything reused, move it
  into the component's `*.styles.ts`.
- **No hardcoded values** — no hex, pixel spacing, or font stacks in app or
  component code. Always reference tokens via `var(--az-*)` or the typed
  `tokens.ts` map.
- Design tokens live in `packages/ui/src/styles` and are the single source
  of truth. App components read tokens from `@azores/ui`.
- Layout primitives (Stack, Inline, Box) and other behavior-bearing
  components (modals, popovers, focus traps, transitions) belong in
  `@azores/ux`. App components compose them; they don't reinvent flex/grid
  or focus management.
- **`ui` vs `ux` rule of thumb**: if it makes sense as a static screenshot,
  it belongs in `@azores/ui`. If it only makes sense in motion (open/close,
  focus, navigation, drag, async state) it belongs in `@azores/ux`.

## Accessibility (non-negotiable)

- Every interactive element is keyboard-reachable and has a visible focus
  indicator. No `outline: none` without an equivalent replacement.
- Use semantic elements (`<button>`, `<a>`, `<nav>`, `<main>`, `<label>`)
  before reaching for `role=`. A `<div onClick>` is a bug.
- Form inputs have associated `<label>` (wrap or `htmlFor`). Never rely on
  placeholder as label.
- Images: `alt` is required. Decorative images use `alt=""`.
- Color contrast: WCAG AA minimum (4.5:1 body, 3:1 large text). Don't convey
  state through color alone — pair with icon or text.
- Test tab order and screen-reader output before saying a feature is done.

## Performance

- Measure before optimizing. `React.memo`, `useMemo`, `useCallback` are
  surgical tools — apply when a profile shows a real cost, not preemptively.
- Avoid unnecessary re-renders by keeping props stable (no inline object/array
  literals as deps for memoized children) and colocating state.
- Images: explicit `width`/`height` to prevent CLS; `loading="lazy"` for
  below-the-fold; serve appropriate format (AVIF/WebP) when we add an asset
  pipeline.
- Bundle: `rspack build` then check sizes. New top-level deps over ~30KB
  gzipped need justification. Prefer the platform.

## Testing

- We don't have a test runner wired yet. When adding one, default to Vitest +
  React Testing Library. Test behavior (what the user sees/does), not
  implementation. No snapshot tests for components — they detect change, not
  correctness.

## Linting / formatting

- ESLint flat config at root, Prettier for formatting. Run `pnpm lint` and
  `pnpm format` before finishing. Don't disable rules inline without a
  one-line reason comment.
- TypeScript: no `any`. Use `unknown` + narrowing. `as` casts need
  justification — prefer type guards.

## Workflow rules

- **Changelog is mandatory.** Every change to this repo — code, config,
  docs, deps, CI — gets an entry in [CHANGELOG.md](CHANGELOG.md) under
  the `## Unreleased` heading, in the same PR as the change. One-line
  summary, plus Added / Changed / Removed / Fixed bullets as needed.
  Reference files with relative markdown links. No entry = the change
  isn't done.
- **Verify, don't claim.** UI changes are not "done" until you've run the dev
  server and exercised the feature in a browser (golden path + the obvious
  edge cases). Type-checks pass ≠ feature works. If you can't run the
  browser, say so explicitly.
- **One concern per PR.** Don't bundle a refactor with a feature with a
  styling pass. Reviewers can't reason about combined diffs.
- **No drive-by changes.** Touch only what the task requires. If you spot
  unrelated rot, note it; don't silently fix it.
- **Imports stay tidy.** No unused imports. Group: node builtins → external →
  `@azores/*` → relative. ESLint will sort; don't fight it.

## When adding a new app or package

1. Create under `apps/` or `packages/` — match the existing
   convention (`@azores/<name>`).
2. Copy a sibling's `package.json` + `tsconfig.json` as the starting point.
3. Register the path in the root `tsconfig.json` `references` array.
4. Run `pnpm install` then `pnpm -r typecheck` to confirm wiring.
5. If the package needs env vars, extend the schema in `@azores/config` —
   don't read `process.env` directly.

## Things to push back on

- Adding a UI library (MUI, Chakra, AntD). We have a design system; extend
  it instead.
- New state management libraries before there's a concrete shared-state
  problem.
- Generic abstractions ("make it configurable", "make it pluggable") with
  one caller. Inline the code; abstract on the third repetition.
- Comments that restate the code. Comments explain *why*, when the why is
  non-obvious.

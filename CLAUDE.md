# Azores — frontend & design guide

This file is loaded into Claude's context for any work in this repo. Read it
before suggesting changes. Keep edits to it concrete and current — delete
anything that becomes stale rather than letting it rot.

## Stack

- **Monorepo** — pnpm workspaces. Packages: `app/web` (consumer), `design/ui`
  (design system), `packages/core` (shared logic), `packages/config` (typed
  env/config). Cross-package imports use `@azores/<name>` and must be declared
  as `workspace:*` deps in the consuming package.
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

- Inline `style={{}}` is fine for one-offs and theme tokens (see
  `design/ui`'s `theme`). For anything reused across components, add a token
  or component to `@azores/design` first.
- No CSS-in-JS runtime libraries (styled-components, emotion). If we need
  scoped styles, use CSS Modules via rspack.
- Design tokens live in `design/ui/src` and are the single source of truth
  for radius, spacing, color, typography. Components in `app/web` read tokens
  from `@azores/design` — never hardcode hex values, pixel spacing, or font
  stacks in app code.
- Layout primitives (Stack, Inline, Box) belong in `@azores/design`. App
  components compose them; they don't reinvent flex/grid.

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

1. Create under `app/`, `design/`, or `packages/` — match the existing
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

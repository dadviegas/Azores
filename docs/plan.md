# Azores — implementation plan

A plan to turn the static design-system mockups under
[`docs/design/Azores`](./design/Azores/) into a real, working React app
that exercises every surface — foundations, components, UI showcase,
UX dashboard, and the markdown renderer — with a clean separation
between **UI** (chrome) and **UX** (behavior).

Status: planning. No code has been written against this plan yet. Once
work begins, every change MUST be recorded in
[`CHANGELOG.md`](../CHANGELOG.md).

---

## 1. Goals

1. Stand up a real React app at `@azores/web` that mirrors the static
   HTML/JSX mockups.
2. Move primitives (tokens, buttons, inputs, badges, icons,
   backgrounds) into [`@azores/ui`](../packages/ui) — pure presentation,
   no behavior.
3. Move flow/interaction (dashboard widgets with drag/resize, command
   palette, tweaks panel, markdown renderer, login flow) into
   [`@azores/ux`](../packages/ux) — composes `@azores/ui`.
4. Single live "Showcase" route in `@azores/web` that renders every
   page from the mockup so we can validate the system end-to-end in a
   browser.
5. Markdown support shipped from `@azores/ux` (renderer + editor),
   matching the demo in
   [`page-markdown.jsx`](./design/Azores/page-markdown.jsx).

## 2. Source of truth

The mockups already define the system. We port, we don't redesign:

| Mockup file | Destination |
| --- | --- |
| [`tokens.css`](./design/Azores/tokens.css) | `@azores/ui/src/styles/tokens.css` (global, imported once) |
| [`components.css`](./design/Azores/components.css) | split into per-component CSS Modules under `@azores/ui/src/components/*` |
| [`markdown.css`](./design/Azores/markdown.css) | `@azores/ux/src/markdown/markdown.module.css` |
| [`icons.jsx`](./design/Azores/icons.jsx) | `@azores/ui/src/Icon/` |
| [`page-foundations.jsx`](./design/Azores/page-foundations.jsx) | showcase page in `@azores/web` |
| [`page-components.jsx`](./design/Azores/page-components.jsx) | showcase page in `@azores/web` |
| [`page-ui.jsx`](./design/Azores/page-ui.jsx) | showcase page in `@azores/web` |
| [`page-backgrounds.jsx`](./design/Azores/page-backgrounds.jsx) | showcase page; backgrounds primitive in `@azores/ui` |
| [`page-login.jsx`](./design/Azores/page-login.jsx) | flow in `@azores/ux/src/auth/` |
| [`page-ux.jsx`](./design/Azores/page-ux.jsx) | dashboard in `@azores/ux/src/dashboard/` |
| [`page-markdown.jsx`](./design/Azores/page-markdown.jsx) | renderer in `@azores/ux/src/markdown/` |
| [`tweaks-panel.jsx`](./design/Azores/tweaks-panel.jsx) | `@azores/ux/src/tweaks/` |
| [`command-palette.jsx`](./design/Azores/command-palette.jsx) | `@azores/ux/src/command-palette/` |

## 3. UI vs UX — the dividing line

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

Lint guard: `@azores/ui` is forbidden from importing `@azores/ux`. Add
an ESLint `no-restricted-imports` rule once both packages have content.

## 4. Styling — decision

**Emotion + CSS custom properties.** Component styles author in Emotion;
theming flows through CSS variables on `<html>`. This decision overrides
the earlier "no runtime CSS-in-JS" rule — [CLAUDE.md](../CLAUDE.md) has
been updated to match.

**Stack:**

1. **Global tokens** — port [`tokens.css`](./design/Azores/tokens.css)
   verbatim into `@azores/ui/src/styles/tokens.css` and import once from
   the app entry. Theme + accent switch via `data-theme` / `data-accent`
   attributes on `<html>`, exactly as the mockup does. No
   `<ThemeProvider>` — Emotion styles read tokens via `var(--az-*)`.
2. **Component styles** — **Emotion** (`@emotion/react` +
   `@emotion/styled`). Each component lives in its own folder with an
   isolated `*.styles.ts` for Emotion definitions and an optional
   `*.css` for things that don't belong in JS (keyframes, `@font-face`,
   base resets):
   ```
   packages/ui/src/Button/
     Button.tsx
     Button.styles.ts
     Button.css            # optional
     index.ts
   ```
   One folder per component. Never share style files across components.
3. **Type-safe token access in TS** — export a thin `tokens.ts` constant
   map (`tokens.color.primary = 'var(--az-primary)'`) so Emotion styles
   and inline values stay typed without duplicating values. Single
   source of truth = the CSS file.
4. **Inline `style={{}}`** — fine for one-offs that reference tokens
   (`style={{ background: 'var(--az-bg)' }}`).
5. **rspack** — enable `@emotion/babel-plugin` equivalent via swc-loader's
   Emotion transform for better DX (sourcemaps, labels, smaller output).

What we **don't** want: Tailwind (token system already exists, would
duplicate), styled-components (legacy, slower than Emotion),
styled-jsx (weak TS, Next-coupled), Chakra/MUI (we'd be replacing our
own design system).

## 5. Showcase route — the verification surface

The showcase isn't a sidebar of demos — it's the same shell as
[`Azores Design System.html`](./design/Azores/Azores%20Design%20System.html),
ported to the real app:

- Sidebar with the same nav items: Foundations, Components,
  Backgrounds & Icons, UI showcase, UX dashboard, Markdown.
- Tweaks panel (top-right) for theme/accent — wires up the live
  CSS-variable swap.
- Command palette (`⌘K`) navigates between showcase pages.
- Each page imports from `@azores/ui` / `@azores/ux` only — no local
  primitives in the app. If a page needs something the packages don't
  export, that's a missing primitive, not an app problem.

This is how we verify the UI/UX separation holds: if the showcase
renders, the packages are complete enough to build a real product
against.

## 6. Markdown in `@azores/ux`

[`page-markdown.jsx`](./design/Azores/page-markdown.jsx) ships a
hand-rolled parser that supports headings, lists, tables, code
fences, callouts (`:::`), inline + block math (`$…$`, `$$…$$`),
mermaid blocks, and JSON `chart` blocks. Two paths:

- **Short term (port faithfully):** lift the existing parser into
  `@azores/ux/src/markdown/parse.ts`, render via
  `MarkdownView`, ship the editor split-view as a separate component.
  Zero new dependencies. Output stays under 100 KB.
- **Medium term (when content grows):** swap the hand-rolled parser
  for `markdown-it` + plugins (`markdown-it-attrs`,
  `markdown-it-anchor`, `markdown-it-container`). Keep the rendering
  layer (`MarkdownView`) unchanged so callers don't break.

For syntax highlighting, the mockup uses highlight.js from a CDN; in
the real app, lazy-load `highlight.js/lib/core` plus only the
languages we use, behind `React.lazy` so it doesn't hit the initial
bundle.

Public API (initial):

```ts
// @azores/ux
export function MarkdownView(props: { source: string }): JSX.Element;
export function MarkdownEditor(props: {
  value: string;
  onChange: (next: string) => void;
}): JSX.Element;
```

## 7. Phasing

| Phase | Scope | Done when |
| --- | --- | --- |
| 1 | Emotion + token wiring; install `@emotion/react` + `@emotion/styled`; port `tokens.css`; configure swc Emotion transform; wire `data-theme` / `data-accent` toggling in app shell. | Theme switch flips the whole app; `pnpm dev` shows tokenized colors; sample Emotion-styled component renders. |
| 2 | `@azores/ui` primitives: `Button`, `Input`, `Badge`, `Avatar`, `Card`, `Stack`, `Inline`, `Box`, `Icon`, `Kbd`, `Background`, `BrandMark`. Each in its own folder with `*.styles.ts`. Foundations + Components showcase pages. | Foundations + Components pages render in `@azores/web`, no inline hex/px in app. |
| 3 | `@azores/ux` flows: `CommandPalette`, `TweaksPanel`, `Modal`, `Drawer`, `Toast`. Wire palette + tweaks into the showcase shell. | `⌘K` navigates pages; tweaks panel persists across reloads. |
| 4 | `@azores/ux` `Dashboard` (drag/resize widgets) + `Background` variants — port `page-ux.jsx`. | UX showcase page works with real drag/resize, backgrounds switchable. |
| 5 | `@azores/ux` `MarkdownView` + `MarkdownEditor`. Markdown showcase page. | Markdown demo renders the same content as the mockup; editor split-view works. |
| 6 | Login flow in `@azores/ux/src/auth/`. | Login showcase mirrors `page-login.jsx`. |
| 7 | Tests (Vitest + RTL) for behavior in `@azores/ux`; basic visual smoke for `@azores/ui`. ESLint `no-restricted-imports` guard. | `pnpm test` green; lint forbids `@azores/ui` → `@azores/ux`. |

Each phase is a single PR. Don't bundle phases — review surface stays
small.

## 8. Open questions

- **Routing** — for the showcase, do we want `react-router` or roll
  the hash-based nav from the mockup? Lean toward hash-only for the
  showcase (no extra dep) until the real app needs deep linking.
- **Drag/resize lib** — port the mockup's hand-rolled handlers, or
  bring in `@dnd-kit` + `re-resizable`? Decision deferred to phase 4
  with a measured bundle comparison.
- **Icons** — keep the inline SVG sprite from
  [`icons.jsx`](./design/Azores/icons.jsx), or move to `lucide-react`?
  Inline sprite wins on bundle size if our icon set stays under ~30;
  `lucide` wins on coverage if we cross that threshold.

Decisions land in this file as we make them. Anything that ships goes
into [`CHANGELOG.md`](../CHANGELOG.md).

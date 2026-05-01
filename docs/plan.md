# Azores — implementation plan

A plan to turn the static design-system mockups under
[`docs/design/Azores`](./design/Azores/) into a real, working React app
that exercises every surface — foundations, components, UI showcase,
UX dashboard, and the markdown renderer — with a clean separation
between **UI** (chrome) and **UX** (behavior).

Status: phases 1–8 shipped (Emotion + tokens, `@azores/ui` primitives,
flow primitives, dashboard, markdown, login, tests + lint guard,
react-router migration). See [`CHANGELOG.md`](../CHANGELOG.md) for what
landed. Remaining work is the deferred items in §3.

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

- **Phase 4 (Dashboard):** widget-library drawer (clickable +
  drag-to-add), FLIP reflow animations, size-cycling glyph in the
  widget header.
- **Phase 5 (Markdown):** lazy-load KaTeX (only when source contains
  `$`). The web bundle grew 351 KB → 581 KB when KaTeX landed; this is
  the obvious code-splitting win. Medium-term, swap the hand-rolled
  parser for `markdown-it` + plugins (`markdown-it-attrs`,
  `markdown-it-anchor`, `markdown-it-container`) keeping `MarkdownView`
  unchanged so callers don't break. Syntax highlighting today uses a
  hand-rolled highlighter; if coverage gets thin, lazy-load
  `highlight.js/lib/core` plus only the languages we use, behind
  `React.lazy`.

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

Decisions land in this file as we make them. Anything that ships goes
into [`CHANGELOG.md`](../CHANGELOG.md).

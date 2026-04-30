# Azores — implementation plan

A plan to turn the static design-system mockups under
[`docs/design/Azores`](./design/Azores/) into a real, working React app
that exercises every surface — foundations, components, UI showcase,
UX dashboard, and the markdown renderer — with a clean separation
between **UI** (chrome) and **UX** (behavior).

Status: phases 1–5 shipped (Emotion + tokens, `@azores/ui` primitives,
flow primitives, dashboard, markdown). Remaining work is the login
flow and the testing/lint-guard pass. See
[`CHANGELOG.md`](../CHANGELOG.md) for what landed.

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

Lint guard pending in phase 7: `@azores/ui` must be forbidden from
importing `@azores/ux` via an ESLint `no-restricted-imports` rule.

## 2. Remaining phases

| Phase | Scope | Done when |
| --- | --- | --- |
| 6 | Login flow in `@azores/ux/src/auth/`, ported from [`page-login.jsx`](./design/Azores/page-login.jsx). | Login showcase mirrors `page-login.jsx`. |
| 7 | Tests (Vitest + RTL) for behavior in `@azores/ux`; basic visual smoke for `@azores/ui`. ESLint `no-restricted-imports` guard so `@azores/ui` can't import `@azores/ux`. | `pnpm test` green; lint forbids `@azores/ui` → `@azores/ux`. |

Each phase is a single PR. Don't bundle phases — review surface stays
small.

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

## 4. Open questions

- **Routing** — for the showcase, do we want `react-router` or stay on
  the hash-based nav from the mockup? Hash-only has held up so far; no
  reason to add a dep until the real app needs deep linking.
- **Icons** — keep the inline SVG sprite from
  [`icons.jsx`](./design/Azores/icons.jsx), or move to `lucide-react`?
  Inline sprite wins on bundle size if our icon set stays under ~30;
  `lucide` wins on coverage if we cross that threshold.

Decisions land in this file as we make them. Anything that ships goes
into [`CHANGELOG.md`](../CHANGELOG.md).

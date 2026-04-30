# Azores — code conventions & gotchas

This file captures the **non-obvious code-level rules** that come from the
combination of our toolchain (TypeScript strict + composite, Emotion,
rspack, ESM-only, pnpm workspaces). High-level architecture lives in
[`CLAUDE.md`](../CLAUDE.md); the implementation roadmap lives in
[`plan.md`](./plan.md). This file is for the small things that bite when
you're writing a component.

---

## TypeScript

### `verbatimModuleSyntax: true`

- Every type-only symbol must be imported with `import type { … }`.
- Mixed imports use `import { foo, type Bar } from "…"`.
- Don't `export` a type re-export with a value `export` — split them.

### `noUncheckedIndexedAccess: true`

Indexed access returns `T | undefined`. Always handle the `undefined`:

```ts
// bad — d is string | undefined
const d = ICON_PATHS[name];
d.split("|");

// good
const d = ICON_PATHS[name] ?? ICON_PATHS.help ?? "";
```

### `composite: true` + `declaration: true` (the Emotion trap)

Because every package emits `.d.ts`, TypeScript must be able to **name**
every exported type. Emotion's `styled.span<...>` returns a type that
references `@types/react` internals. If `@types/react` isn't a direct
dependency of the package, you get:

> TS2742: The inferred type of `StyledX` cannot be named without a
> reference to `@types/react`. A type annotation is necessary.

Two fixes, in order of preference:

1. **Add `@types/react` as a `devDependency`** of any package that uses
   Emotion's `styled`. This is what `@azores/ui` and `@azores/ux` do.
2. If you still hit it (rare), give the styled component an explicit
   type annotation:
   ```ts
   import type { ComponentType, HTMLAttributes } from "react";
   export const StyledX: ComponentType<HTMLAttributes<HTMLDivElement> & { $foo: boolean }> =
     styled.div<{ $foo: boolean }>(...);
   ```

### Same-package vs cross-package imports

- Inside a package: explicit `.js` extension on every relative import,
  even though the file is `.ts`. TS resolves it; the bundler resolves
  it; without the extension, ESM strict mode breaks.
  ```ts
  import { Icon } from "../Icon/Icon.js";   // ✅
  import { Icon } from "../Icon/Icon";      // ❌
  ```
- Across packages: bare `@azores/<name>` specifier, no extension.
  ```ts
  import { Button } from "@azores/ui";      // ✅
  ```

---

## Emotion

### Transient props (`$`-prefix)

Style-only props that should **not** reach the DOM start with `$`:

```tsx
const StyledBadge = styled.span<{ $tone: BadgeTone }>(({ $tone }) => ({…}));

// public API translates `tone` → `$tone`:
<Badge tone="ocean" />        // user-facing
<StyledBadge $tone="ocean" /> // internal
```

Emotion strips `$`-prefixed props from the DOM automatically. Without
the prefix, React warns about unknown attributes.

### Tokens, not hex/px

Style files import from `../styles/tokens.js` and reference CSS
variables. Never write a hex literal or pixel value in a `.styles.ts`:

```ts
// ❌
{ background: "#FAFAF7", padding: 16 }

// ✅
{ background: tokens.bg, padding: tokens.s[4] }
```

Exception: pure dimensions that aren't on the spacing scale (`width:
"36px"` for input height) are fine.

### Folder layout — one component, one folder

```
ComponentName/
  ComponentName.tsx         # public component (forwardRef when ref makes sense)
  ComponentName.styles.ts   # Emotion `styled` definitions
  ComponentName.css         # optional — keyframes, @font-face, base resets
  index.ts                  # named re-exports
```

Never share a `.styles.ts` between two components. If two components
share the same look, factor a third primitive they both compose.

### Theme switching is CSS-variable-only

We don't use `<ThemeProvider>`. Theme/accent flips on the `<html>`
element via `data-theme` and `data-accent`. All Emotion styles read
`var(--az-*)` from `tokens.ts`. This means:

- A component re-render is **not** required to swap themes.
- SSR is trivial — no provider, no critical CSS hassle.
- Don't reach for `useTheme()`. There is no theme object at runtime.

---

## Component API

### Named exports, `forwardRef` when relevant

```ts
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((p, ref) => …);
Button.displayName = "Button";
```

Set `displayName` so React DevTools doesn't show `ForwardRef`.

### Props

- `type Props = { … }`, never `interface`.
- Destructure in the signature with defaults. Defaults declared **once**,
  in the destructure — not also in the type.
- `children?: ReactNode` only when the component genuinely accepts
  arbitrary children. A `<Button>` does. A `<Badge>` arguably does. An
  `<Icon>` does not.

### Spreading rest props

Components that wrap a single HTML element should accept and spread
that element's attributes:

```ts
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant };
```

Caller can pass `aria-*`, `data-*`, `onClick`, etc. without us
enumerating them.

---

## rspack + SWC

### JSX runtime is `@emotion/react`

`apps/web/rspack.config.mjs` sets:

```js
react: {
  runtime: "automatic",
  importSource: "@emotion/react",
}
```

This enables the `css` prop on every JSX element. You don't need
`/** @jsxImportSource @emotion/react */` pragmas anywhere.

### `tokens.css` is imported once

`apps/web/src/main.tsx` imports `@azores/ui/styles/tokens.css` exactly
once. Components must never re-import it. Doing so risks duplicating
the variables across bundles.

---

## pnpm workspace

### Adding a dep

- `dependencies` — anything imported at runtime by the package's
  source. Emotion lives here.
- `devDependencies` — types, tooling. `@types/react` lives here even
  though it's effectively part of the public type surface (peer-dep
  semantics for types are awkward; devDep is the pragmatic choice).
- `peerDependencies` — `react`. Consumers supply it.

### Cross-package deps need `workspace:*`

```json
"dependencies": { "@azores/ui": "workspace:*" }
```

Without this, pnpm resolves from the registry and you get a 404.

---

## When to update this file

Add an entry when you hit a non-obvious gotcha that took more than
five minutes to debug. Delete entries when the toolchain or rule
changes — better empty than stale.

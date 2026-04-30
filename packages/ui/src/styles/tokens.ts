// Typed mirror of tokens.css. The CSS file is the source of truth — values
// here are `var(--az-*)` references, not duplicated literals.
//
// Usage in Emotion: `css({ color: tokens.text, padding: tokens.s[4] })`.

export const tokens = {
  // Surfaces
  bg: "var(--az-bg)",
  bg2: "var(--az-bg-2)",
  bg3: "var(--az-bg-3)",
  surface: "var(--az-surface)",
  surface2: "var(--az-surface-2)",
  line: "var(--az-line)",
  line2: "var(--az-line-2)",

  // Text
  text: "var(--az-text)",
  text2: "var(--az-text-2)",
  text3: "var(--az-text-3)",
  muted: "var(--az-muted)",

  // Brand palette
  ocean: {
    50: "var(--az-ocean-50)",
    100: "var(--az-ocean-100)",
    200: "var(--az-ocean-200)",
    300: "var(--az-ocean-300)",
    400: "var(--az-ocean-400)",
    500: "var(--az-ocean-500)",
    600: "var(--az-ocean-600)",
    700: "var(--az-ocean-700)",
    800: "var(--az-ocean-800)",
  },
  lava: {
    50: "var(--az-lava-50)",
    100: "var(--az-lava-100)",
    200: "var(--az-lava-200)",
    300: "var(--az-lava-300)",
    400: "var(--az-lava-400)",
    500: "var(--az-lava-500)",
    600: "var(--az-lava-600)",
  },
  moss: { 400: "var(--az-moss-400)", 500: "var(--az-moss-500)" },
  amber: { 400: "var(--az-amber-400)", 500: "var(--az-amber-500)" },
  coral: { 400: "var(--az-coral-400)", 500: "var(--az-coral-500)" },

  // Semantic
  primary: "var(--az-primary)",
  primaryHover: "var(--az-primary-hover)",
  accent: "var(--az-accent)",
  success: "var(--az-success)",
  warning: "var(--az-warning)",
  danger: "var(--az-danger)",

  // Radii
  r: {
    xs: "var(--az-r-xs)",
    sm: "var(--az-r-sm)",
    md: "var(--az-r-md)",
    lg: "var(--az-r-lg)",
    xl: "var(--az-r-xl)",
    pill: "var(--az-r-pill)",
  },

  // Spacing
  s: {
    1: "var(--az-s-1)",
    2: "var(--az-s-2)",
    3: "var(--az-s-3)",
    4: "var(--az-s-4)",
    5: "var(--az-s-5)",
    6: "var(--az-s-6)",
    8: "var(--az-s-8)",
    10: "var(--az-s-10)",
    12: "var(--az-s-12)",
    16: "var(--az-s-16)",
    20: "var(--az-s-20)",
  },

  // Type
  font: {
    sans: "var(--az-font-sans)",
    display: "var(--az-font-display)",
    mono: "var(--az-font-mono)",
  },
  fs: {
    xs: "var(--az-fs-xs)",
    sm: "var(--az-fs-sm)",
    base: "var(--az-fs-base)",
    md: "var(--az-fs-md)",
    lg: "var(--az-fs-lg)",
    xl: "var(--az-fs-xl)",
    "2xl": "var(--az-fs-2xl)",
    "3xl": "var(--az-fs-3xl)",
    "4xl": "var(--az-fs-4xl)",
    "5xl": "var(--az-fs-5xl)",
    "6xl": "var(--az-fs-6xl)",
  },
  lh: {
    tight: "var(--az-lh-tight)",
    snug: "var(--az-lh-snug)",
    base: "var(--az-lh-base)",
    loose: "var(--az-lh-loose)",
  },
  fw: {
    regular: "var(--az-fw-regular)",
    medium: "var(--az-fw-medium)",
    semi: "var(--az-fw-semi)",
    bold: "var(--az-fw-bold)",
  },

  // Shadows + ring
  shadow: {
    xs: "var(--az-shadow-xs)",
    sm: "var(--az-shadow-sm)",
    md: "var(--az-shadow-md)",
    lg: "var(--az-shadow-lg)",
    xl: "var(--az-shadow-xl)",
  },
  ring: "var(--az-ring)",

  // Motion
  ease: "var(--az-ease)",
  easeOut: "var(--az-ease-out)",
  dur: {
    fast: "var(--az-dur-fast)",
    base: "var(--az-dur-base)",
    slow: "var(--az-dur-slow)",
  },

  // Z-index
  z: {
    base: "var(--az-z-base)",
    dropdown: "var(--az-z-dropdown)",
    sticky: "var(--az-z-sticky)",
    overlay: "var(--az-z-overlay)",
    modal: "var(--az-z-modal)",
    toast: "var(--az-z-toast)",
  },
} as const;

export type Tokens = typeof tokens;

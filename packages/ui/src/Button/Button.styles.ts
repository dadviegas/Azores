import styled from "@emotion/styled";
import { tokens } from "../styles/tokens.js";

export type ButtonVariant =
  | "default"
  | "primary"
  | "ocean"
  | "accent"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

type StyledProps = {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $iconOnly: boolean;
};

const sizeMap = {
  sm: { height: "28px", padX: tokens.s[3], font: tokens.fs.sm, square: "28px" },
  md: { height: "36px", padX: tokens.s[4], font: tokens.fs.base, square: "32px" },
  lg: { height: "44px", padX: tokens.s[5], font: tokens.fs.md, square: "44px" },
} as const;

export const StyledButton = styled.button<StyledProps>(({ $variant, $size, $iconOnly }) => {
  const s = sizeMap[$size];
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.s[2],
    height: s.height,
    padding: $iconOnly ? 0 : `0 ${s.padX}`,
    width: $iconOnly ? s.square : undefined,
    borderRadius: tokens.r.md,
    border: "1px solid transparent",
    fontSize: s.font,
    fontWeight: tokens.fw.medium,
    fontFamily: "inherit",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    transition: `all ${tokens.dur.fast} ${tokens.ease}`,
    "&:focus-visible": { outline: "none", boxShadow: tokens.ring },
    "&:disabled": { opacity: 0.4, cursor: "not-allowed" },
  };

  const variants: Record<ButtonVariant, object> = {
    default: {
      background: tokens.surface,
      color: tokens.text,
      borderColor: tokens.line2,
      "&:hover:not(:disabled)": {
        background: tokens.surface2,
        borderColor: tokens.text3,
      },
    },
    primary: {
      background: tokens.text,
      color: tokens.bg,
      borderColor: tokens.text,
      "&:hover:not(:disabled)": { opacity: 0.9 },
    },
    ocean: {
      background: tokens.primary,
      color: "#fff",
      borderColor: tokens.primary,
      "&:hover:not(:disabled)": {
        background: tokens.primaryHover,
        borderColor: tokens.primaryHover,
      },
    },
    accent: {
      background: tokens.lava[400],
      color: "#fff",
      borderColor: tokens.lava[400],
      "&:hover:not(:disabled)": {
        background: tokens.lava[500],
        borderColor: tokens.lava[500],
      },
    },
    ghost: {
      background: "transparent",
      color: tokens.text2,
      borderColor: "transparent",
      "&:hover:not(:disabled)": {
        background: tokens.surface2,
        color: tokens.text,
      },
    },
    danger: {
      background: tokens.coral[500],
      color: "#fff",
      borderColor: tokens.coral[500],
      "&:hover:not(:disabled)": { opacity: 0.9 },
    },
  };

  return { ...base, ...variants[$variant] };
});

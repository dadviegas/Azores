import styled from "@emotion/styled";
import { tokens } from "../styles/tokens.js";

export type BadgeTone = "neutral" | "ocean" | "lava" | "moss" | "amber" | "coral" | "solid";

const toneMap: Record<BadgeTone, { bg: string; color: string; border: string }> = {
  neutral: { bg: tokens.bg2, color: tokens.text2, border: tokens.line },
  ocean: { bg: tokens.ocean[50], color: tokens.ocean[600], border: tokens.ocean[100] },
  lava: { bg: tokens.lava[50], color: tokens.lava[500], border: tokens.lava[100] },
  moss: { bg: "#E9F1EC", color: tokens.moss[500], border: "#C5DCCC" },
  amber: { bg: "#FBF2DD", color: tokens.amber[500], border: "#ECD9A6" },
  coral: { bg: "#F8E5E5", color: tokens.coral[500], border: "#ECC5C5" },
  solid: { bg: tokens.text, color: tokens.bg, border: tokens.text },
};

export const StyledBadge = styled.span<{ $tone: BadgeTone }>(({ $tone }) => {
  const t = toneMap[$tone];
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.s[1],
    height: "20px",
    padding: `0 ${tokens.s[2]}`,
    borderRadius: tokens.r.sm,
    fontSize: tokens.fs.xs,
    fontWeight: tokens.fw.medium,
    background: t.bg,
    color: t.color,
    border: `1px solid ${t.border}`,
  };
});

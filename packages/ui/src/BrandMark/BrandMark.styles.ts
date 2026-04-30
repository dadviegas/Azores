import styled from "@emotion/styled";
import { tokens } from "../styles/tokens.js";

export type BrandSize = "sm" | "md" | "lg";

const sizeMap: Record<BrandSize, { box: string; dot: string; offset: string; fs: string }> = {
  sm: { box: "24px", dot: "10px", offset: "-4px", fs: "10px" },
  md: { box: "32px", dot: "14px", offset: "-6px", fs: "13px" },
  lg: { box: "40px", dot: "16px", offset: "-6px", fs: "16px" },
};

export const StyledBrandMark = styled.span<{ $size: BrandSize }>(({ $size }) => {
  const s = sizeMap[$size];
  return {
    width: s.box,
    height: s.box,
    borderRadius: tokens.r.md,
    background: `linear-gradient(135deg, ${tokens.ocean[500]}, ${tokens.ocean[700]})`,
    display: "grid",
    placeItems: "center",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
    fontFamily: tokens.font.display,
    fontSize: s.fs,
    fontWeight: 600,
    letterSpacing: "0.02em",
    lineHeight: 1,
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: s.offset,
      right: s.offset,
      width: s.dot,
      height: s.dot,
      borderRadius: "999px",
      background: tokens.lava[400],
      boxShadow: "0 0 12px rgba(213, 88, 42, 0.6)",
    },
  };
});

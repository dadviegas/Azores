import styled from "@emotion/styled";
import { tokens } from "../styles/tokens.js";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<AvatarSize, { wh: string; fs: string }> = {
  sm: { wh: "24px", fs: "10px" },
  md: { wh: "32px", fs: tokens.fs.xs },
  lg: { wh: "44px", fs: tokens.fs.base },
  xl: { wh: "64px", fs: tokens.fs.xl },
};

export const StyledAvatar = styled.span<{ $size: AvatarSize }>(({ $size }) => {
  const s = sizeMap[$size];
  return {
    display: "inline-grid",
    placeItems: "center",
    width: s.wh,
    height: s.wh,
    borderRadius: "999px",
    background: tokens.ocean[500],
    color: "#fff",
    fontSize: s.fs,
    fontWeight: tokens.fw.semi,
    letterSpacing: "0.02em",
    flexShrink: 0,
    textTransform: "uppercase" as const,
    overflow: "hidden",
    "& img": { width: "100%", height: "100%", objectFit: "cover" as const },
  };
});

export const StyledAvatarGroup = styled.div({
  display: "inline-flex",
  "& > *": {
    border: `2px solid ${tokens.bg}`,
    marginLeft: "-8px",
  },
  "& > *:first-of-type": { marginLeft: 0 },
});

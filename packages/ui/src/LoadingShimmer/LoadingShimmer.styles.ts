import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { tokens } from "../styles/tokens.js";

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" },
});

export const StyledShimmer = styled.div<{ $rounded?: boolean }>(({ $rounded }) => ({
  // Two-stop gradient between two surface tones; the keyframes pan the
  // gradient horizontally for a subtle, token-faithful sweep.
  background: `linear-gradient(90deg, ${tokens.surface} 0%, ${tokens.bg2} 50%, ${tokens.surface} 100%)`,
  backgroundSize: "200% 100%",
  animation: `${shimmer} 1.4s ${tokens.ease} infinite`,
  borderRadius: $rounded === false ? 0 : tokens.r.md,
  width: "100%",
  height: "100%",
  minHeight: 12,
}));

import styled from "@emotion/styled";
import { tokens } from "../styles/tokens.js";
import type { SpaceKey } from "../Stack/Stack.styles.js";

const alignMap = { start: "flex-start", center: "center", end: "flex-end", baseline: "baseline", stretch: "stretch" } as const;
const justifyMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
} as const;

export const StyledInline = styled.div<{
  $gap: SpaceKey;
  $align?: keyof typeof alignMap;
  $justify?: keyof typeof justifyMap;
  $wrap?: boolean;
}>(({ $gap, $align, $justify, $wrap }) => ({
  display: "flex",
  flexDirection: "row",
  gap: tokens.s[$gap],
  alignItems: $align ? alignMap[$align] : "center",
  justifyContent: $justify ? justifyMap[$justify] : undefined,
  flexWrap: $wrap ? "wrap" : "nowrap",
}));

import styled from "@emotion/styled";
import { tokens } from "../styles/tokens.js";

export type SpaceKey = keyof typeof tokens.s;
type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "between" | "around";

const alignMap = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch" } as const;
const justifyMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
} as const;

export const StyledStack = styled.div<{
  $gap: SpaceKey;
  $align?: Align;
  $justify?: Justify;
}>(({ $gap, $align, $justify }) => ({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[$gap],
  alignItems: $align ? alignMap[$align] : undefined,
  justifyContent: $justify ? justifyMap[$justify] : undefined,
}));

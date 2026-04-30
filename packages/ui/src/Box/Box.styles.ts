import styled from "@emotion/styled";
import { tokens } from "../styles/tokens.js";
import type { SpaceKey } from "../Stack/Stack.styles.js";

type RadiusKey = keyof typeof tokens.r;

export const StyledBox = styled.div<{
  $p?: SpaceKey;
  $px?: SpaceKey;
  $py?: SpaceKey;
  $bg?: string;
  $border?: boolean;
  $radius?: RadiusKey;
}>(({ $p, $px, $py, $bg, $border, $radius }) => ({
  padding: $p !== undefined ? tokens.s[$p] : undefined,
  paddingInline: $px !== undefined ? tokens.s[$px] : undefined,
  paddingBlock: $py !== undefined ? tokens.s[$py] : undefined,
  background: $bg,
  border: $border ? `1px solid ${tokens.line}` : undefined,
  borderRadius: $radius ? tokens.r[$radius] : undefined,
}));

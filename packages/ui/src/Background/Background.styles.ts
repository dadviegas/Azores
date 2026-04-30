import styled from "@emotion/styled";
import { BACKGROUNDS_BY_ID, type BackgroundId } from "./backgrounds.js";

const styleFor = (variant: { background: string; backgroundSize?: string; backgroundColor?: string }) => ({
  background: variant.background,
  backgroundSize: variant.backgroundSize,
  backgroundColor: variant.backgroundColor,
});

export const StyledBackground = styled.div<{ $variant: BackgroundId }>(({ $variant }) => {
  const def = BACKGROUNDS_BY_ID[$variant];
  return {
    ...styleFor(def.light),
    "[data-theme='dark'] &": styleFor(def.dark),
  };
});

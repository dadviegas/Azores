import { type HTMLAttributes } from "react";
import { StyledBackground } from "./Background.styles.js";
import type { BackgroundId } from "./backgrounds.js";

export type BackgroundProps = HTMLAttributes<HTMLDivElement> & {
  variant: BackgroundId;
};

export const Background = ({ variant, ...rest }: BackgroundProps): JSX.Element => (
  <StyledBackground $variant={variant} {...rest} />
);

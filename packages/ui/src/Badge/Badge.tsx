import { type HTMLAttributes } from "react";
import { StyledBadge, type BadgeTone } from "./Badge.styles.js";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone };

export const Badge = ({ tone = "neutral", ...rest }: BadgeProps): JSX.Element => (
  <StyledBadge $tone={tone} {...rest} />
);

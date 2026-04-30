import { type HTMLAttributes } from "react";
import { StyledInline } from "./Inline.styles.js";
import type { SpaceKey } from "../Stack/Stack.styles.js";

export type InlineProps = HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceKey;
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
};

export const Inline = ({
  gap = 3,
  align,
  justify,
  wrap,
  ...rest
}: InlineProps): JSX.Element => (
  <StyledInline $gap={gap} $align={align} $justify={justify} $wrap={wrap} {...rest} />
);

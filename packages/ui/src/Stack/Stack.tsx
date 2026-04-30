import { type HTMLAttributes } from "react";
import { StyledStack, type SpaceKey } from "./Stack.styles.js";

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceKey;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
};

export const Stack = ({ gap = 3, align, justify, ...rest }: StackProps): JSX.Element => (
  <StyledStack $gap={gap} $align={align} $justify={justify} {...rest} />
);

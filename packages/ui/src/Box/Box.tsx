import { type HTMLAttributes } from "react";
import { StyledBox } from "./Box.styles.js";
import type { SpaceKey } from "../Stack/Stack.styles.js";
import { tokens } from "../styles/tokens.js";

type RadiusKey = keyof typeof tokens.r;

export type BoxProps = HTMLAttributes<HTMLDivElement> & {
  p?: SpaceKey;
  px?: SpaceKey;
  py?: SpaceKey;
  bg?: string;
  border?: boolean;
  radius?: RadiusKey;
};

export const Box = ({ p, px, py, bg, border, radius, ...rest }: BoxProps): JSX.Element => (
  <StyledBox $p={p} $px={px} $py={py} $bg={bg} $border={border} $radius={radius} {...rest} />
);

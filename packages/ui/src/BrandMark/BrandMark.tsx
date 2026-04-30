import { type HTMLAttributes } from "react";
import { StyledBrandMark, type BrandSize } from "./BrandMark.styles.js";

export type BrandMarkProps = HTMLAttributes<HTMLSpanElement> & {
  size?: BrandSize;
};

export const BrandMark = ({ size = "md", ...rest }: BrandMarkProps): JSX.Element => (
  <StyledBrandMark $size={size} aria-hidden {...rest} />
);

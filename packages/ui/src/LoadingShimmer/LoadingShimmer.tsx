import { type HTMLAttributes } from "react";
import { StyledShimmer } from "./LoadingShimmer.styles.js";

export type LoadingShimmerProps = HTMLAttributes<HTMLDivElement> & {
  rounded?: boolean;
};

export const LoadingShimmer = ({
  rounded,
  ...rest
}: LoadingShimmerProps): JSX.Element => (
  <StyledShimmer $rounded={rounded} aria-hidden="true" {...rest} />
);

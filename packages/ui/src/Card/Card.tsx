import { type HTMLAttributes, type ReactNode } from "react";
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledCardBody,
  StyledCardFooter,
} from "./Card.styles.js";

export type CardProps = HTMLAttributes<HTMLDivElement> & { hover?: boolean };

export const Card = ({ hover, ...rest }: CardProps): JSX.Element => (
  <StyledCard $hover={hover} {...rest} />
);

export const CardHeader = (props: HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <StyledCardHeader {...props} />
);

export type CardTitleProps = { children: ReactNode; className?: string };
export const CardTitle = ({ children, className }: CardTitleProps): JSX.Element => (
  <StyledCardTitle className={className}>{children}</StyledCardTitle>
);

export const CardBody = (props: HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <StyledCardBody {...props} />
);

export const CardFooter = (props: HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <StyledCardFooter {...props} />
);

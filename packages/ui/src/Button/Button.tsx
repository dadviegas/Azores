import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import {
  StyledButton,
  type ButtonSize,
  type ButtonVariant,
} from "./Button.styles.js";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  children?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", iconOnly = false, type = "button", ...rest }, ref) => (
    <StyledButton
      ref={ref}
      type={type}
      $variant={variant}
      $size={size}
      $iconOnly={iconOnly}
      {...rest}
    />
  ),
);
Button.displayName = "Button";

import { type HTMLAttributes, type ReactNode } from "react";
import { StyledAvatar, StyledAvatarGroup, type AvatarSize } from "./Avatar.styles.js";

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
  children?: ReactNode;
};

export const Avatar = ({
  size = "md",
  src,
  alt,
  initials,
  children,
  ...rest
}: AvatarProps): JSX.Element => (
  <StyledAvatar $size={size} aria-label={alt} {...rest}>
    {src ? <img src={src} alt={alt ?? ""} /> : (children ?? initials)}
  </StyledAvatar>
);

export type AvatarGroupProps = { children: ReactNode; className?: string };
export const AvatarGroup = ({ children, className }: AvatarGroupProps): JSX.Element => (
  <StyledAvatarGroup className={className}>{children}</StyledAvatarGroup>
);

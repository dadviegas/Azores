import { type ReactNode } from "react";
import { StyledAvatar, StyledAvatarGroup, type AvatarSize } from "./Avatar.styles.js";

export type AvatarProps = {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
  children?: ReactNode;
  className?: string;
};

export const Avatar = ({
  size = "md",
  src,
  alt,
  initials,
  children,
  className,
}: AvatarProps): JSX.Element => (
  <StyledAvatar $size={size} className={className} aria-label={alt}>
    {src ? <img src={src} alt={alt ?? ""} /> : (children ?? initials)}
  </StyledAvatar>
);

export type AvatarGroupProps = { children: ReactNode; className?: string };
export const AvatarGroup = ({ children, className }: AvatarGroupProps): JSX.Element => (
  <StyledAvatarGroup className={className}>{children}</StyledAvatarGroup>
);

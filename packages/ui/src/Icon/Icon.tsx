import { type CSSProperties } from "react";
import { ICON_PATHS, type IconName } from "./paths.js";

export type IconProps = {
  name: IconName | string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

export const Icon = ({
  name,
  size = 16,
  strokeWidth = 1.6,
  className,
  style,
  title,
}: IconProps): JSX.Element => {
  const d = ICON_PATHS[name] ?? ICON_PATHS.help ?? "";
  const parts = d.split("|");
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {parts.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
};

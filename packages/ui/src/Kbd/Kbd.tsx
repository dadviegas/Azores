import { type HTMLAttributes } from "react";
import { StyledKbd } from "./Kbd.styles.js";

export type KbdProps = HTMLAttributes<HTMLElement>;

export const Kbd = (props: KbdProps): JSX.Element => <StyledKbd {...props} />;

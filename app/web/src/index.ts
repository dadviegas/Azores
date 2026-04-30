import { greet } from "@azores/core";
import { theme } from "@azores/design";

export const main = (): string => `${greet("Azores")} — theme:${theme.name}`;

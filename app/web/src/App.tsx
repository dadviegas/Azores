import { greet } from "@azores/core";
import { theme } from "@azores/design";

export const App = (): JSX.Element => (
  <main style={{ borderRadius: theme.radius, padding: 16 }}>
    <h1>{greet("Azores")}</h1>
    <p>theme: {theme.name}</p>
  </main>
);

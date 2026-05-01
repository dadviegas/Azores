// See apps/home/src/bootstrap.tsx — same async-boundary pattern. Even though
// `apps/web` is the *remote*, it still shares singletons with itself when
// run standalone, and a host loading the remote needs the boundary to exist
// here too so the remote's own initial chunk doesn't sync-resolve react.

import "@azores/ui/src/styles/tokens.css";
// `showcase.css` is imported from `ShowcaseRoutes.tsx` so the federated
// remote ships its own styles when consumed by `apps/home`.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const root = document.getElementById("app");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

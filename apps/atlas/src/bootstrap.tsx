import "@azores/ui/src/styles/tokens.css";
// `atlas.css` is imported from `AtlasRoutes.tsx` so the federated remote
// ships its own styles when consumed by `apps/home`.

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

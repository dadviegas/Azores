// The actual app render. Imported asynchronously from `main.tsx` so Module
// Federation has a chance to negotiate shared singletons (react, react-dom,
// react-router-dom, @emotion/react) before any of them are resolved.
// Loading them eagerly would defeat the singleton dedup; deferring them
// behind a dynamic import is the canonical "async boundary".

import "@azores/ui/src/styles/tokens.css";
import "./home.css";

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

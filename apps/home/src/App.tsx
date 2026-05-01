import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Background } from "@azores/ui";
import { Launcher } from "./Launcher";

// Federated remote, loaded on demand the first time someone navigates to
// /apps/showcase/*. The `showcase/*` specifier is resolved at runtime by the
// Module Federation plugin against the manifest URL configured in
// rspack.config.mjs.
const Showcase = lazy(() => import("showcase/ShowcaseRoutes"));

const ShowcaseFallback = (): JSX.Element => (
  <div
    style={{
      position: "relative",
      minHeight: "100dvh",
      display: "grid",
      placeItems: "center",
    }}
  >
    <Background variant="fog" style={{ position: "absolute", inset: 0, zIndex: 0 }} />
    <div style={{ position: "relative", zIndex: 1, color: "var(--az-text-2)" }}>
      Loading showcase…
    </div>
  </div>
);

export const App = (): JSX.Element => (
  <BrowserRouter basename={__AZORES_BASE_PATH__}>
    <Routes>
      <Route path="/" element={<Launcher />} />
      <Route
        path="/apps/showcase/*"
        element={
          <Suspense fallback={<ShowcaseFallback />}>
            <Showcase />
          </Suspense>
        }
      />
      <Route path="*" element={<Launcher />} />
    </Routes>
  </BrowserRouter>
);

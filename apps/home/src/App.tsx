import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Background } from "@azores/ui";
import { Launcher } from "./Launcher";

// Federated remotes, loaded on demand the first time someone navigates to
// the matching route. The `<remote>/*` specifiers are resolved at runtime
// by the Module Federation plugin against the manifest URLs in
// rspack.config.mjs.
const Showcase = lazy(() => import("showcase/ShowcaseRoutes"));
const Atlas = lazy(() => import("atlas/AtlasRoutes"));

const RemoteFallback = ({ label }: { label: string }): JSX.Element => (
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
      Loading {label}…
    </div>
  </div>
);

export const App = (): JSX.Element => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Launcher />} />
      <Route
        path="/apps/showcase/*"
        element={
          <Suspense fallback={<RemoteFallback label="showcase" />}>
            <Showcase />
          </Suspense>
        }
      />
      <Route
        path="/apps/atlas/*"
        element={
          <Suspense fallback={<RemoteFallback label="atlas" />}>
            <Atlas />
          </Suspense>
        }
      />
      <Route path="*" element={<Launcher />} />
    </Routes>
  </HashRouter>
);

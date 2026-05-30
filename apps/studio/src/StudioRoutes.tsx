// Router-agnostic Studio entry. Mounts <Routes> with relative paths so it
// works at the root of a BrowserRouter (standalone) or nested under a host
// route (Module Federation consumer).

import "./studio.css";

import { Route, Routes, Navigate } from "react-router-dom";
import { ToastProvider } from "@azores/ux";
import { StudioPage } from "./StudioPage";

export const StudioRoutes = (): JSX.Element => (
  <ToastProvider>
    <Routes>
      <Route index element={<StudioPage />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  </ToastProvider>
);

export default StudioRoutes;

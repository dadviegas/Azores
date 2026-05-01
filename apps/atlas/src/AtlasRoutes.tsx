// Router-agnostic Atlas. Mounts <Routes> with relative paths so it works
// at the root of a BrowserRouter (standalone) or nested under a host route
// (Module Federation consumer).

import { Route, Routes, Navigate } from "react-router-dom";
import { ToastProvider } from "@azores/ux";
import { AtlasPage } from "./AtlasPage";

export const AtlasRoutes = (): JSX.Element => (
  <ToastProvider>
    <Routes>
      <Route index element={<AtlasPage />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  </ToastProvider>
);

export default AtlasRoutes;

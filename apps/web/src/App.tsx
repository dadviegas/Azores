// Standalone entry — wraps the router-agnostic ShowcaseRoutes in a
// BrowserRouter so `apps/web` can be deployed on its own. When consumed via
// Module Federation by `apps/home`, the host owns the BrowserRouter and
// imports ShowcaseRoutes directly instead.

import { BrowserRouter } from "react-router-dom";
import { ShowcaseRoutes } from "./ShowcaseRoutes";

export const App = (): JSX.Element => (
  <BrowserRouter basename={__AZORES_BASE_PATH__}>
    <ShowcaseRoutes />
  </BrowserRouter>
);

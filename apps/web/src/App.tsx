// Standalone entry — wraps the router-agnostic ShowcaseRoutes in a
// HashRouter so `apps/web` can be deployed on its own (incl. on GitHub
// Pages, where deep-link reloads would otherwise 404 with a
// BrowserRouter). When consumed via Module Federation by `apps/home`,
// the host owns the router and imports ShowcaseRoutes directly instead.

import { HashRouter } from "react-router-dom";
import { ShowcaseRoutes } from "./ShowcaseRoutes";

export const App = (): JSX.Element => (
  <HashRouter>
    <ShowcaseRoutes />
  </HashRouter>
);

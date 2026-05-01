// Standalone entry — wraps AtlasRoutes in a HashRouter so `apps/atlas`
// can be deployed on its own (incl. on GitHub Pages, where deep-link
// reloads would otherwise 404 with a BrowserRouter). When consumed via
// Module Federation by `apps/home`, the host owns the router and
// imports AtlasRoutes directly instead.

import { HashRouter } from "react-router-dom";
import { AtlasRoutes } from "./AtlasRoutes";

export const App = (): JSX.Element => (
  <HashRouter>
    <AtlasRoutes />
  </HashRouter>
);

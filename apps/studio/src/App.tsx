// Standalone entry — wraps StudioRoutes in a HashRouter so apps/studio
// can be deployed on its own. When consumed via Module Federation by
// apps/home, the host owns the router and imports StudioRoutes directly.

import { HashRouter } from "react-router-dom";
import { StudioRoutes } from "./StudioRoutes";

export const App = (): JSX.Element => (
  <HashRouter>
    <StudioRoutes />
  </HashRouter>
);

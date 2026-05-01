// Standalone entry — wraps AtlasRoutes in a BrowserRouter so `apps/atlas`
// can be deployed on its own. When consumed via Module Federation by
// `apps/home`, the host owns the BrowserRouter and imports AtlasRoutes
// directly instead.

import { BrowserRouter } from "react-router-dom";
import { AtlasRoutes } from "./AtlasRoutes";

export const App = (): JSX.Element => (
  <BrowserRouter basename={__AZORES_BASE_PATH__}>
    <AtlasRoutes />
  </BrowserRouter>
);

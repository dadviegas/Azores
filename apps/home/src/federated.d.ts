// Type stubs for federated remotes. Until we wire up the
// `@module-federation/typescript` plugin to publish .d.ts alongside each
// remoteEntry, the host treats imports as opaque — we know they default-
// export a React component, and that's enough to render them.

declare module "showcase/ShowcaseRoutes" {
  import type { ComponentType } from "react";
  const ShowcaseRoutes: ComponentType;
  export default ShowcaseRoutes;
  export { ShowcaseRoutes };
}

declare module "atlas/AtlasRoutes" {
  import type { ComponentType } from "react";
  const AtlasRoutes: ComponentType;
  export default AtlasRoutes;
  export { AtlasRoutes };
}

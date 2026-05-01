// Type stub for the federated `showcase` remote. Until we wire up the
// `@module-federation/typescript` plugin to publish .d.ts alongside the
// remoteEntry, the host treats the import as opaque — we know it default-
// exports a React component, and that's enough to render it.

declare module "showcase/ShowcaseRoutes" {
  import type { ComponentType } from "react";
  const ShowcaseRoutes: ComponentType;
  export default ShowcaseRoutes;
  export { ShowcaseRoutes };
}

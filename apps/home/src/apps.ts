// The launcher's manifest of sibling apps. Each entry maps to a route under
// the host shell. Apps marked `live` are exposed as Module Federation
// remotes (see `rspack.config.mjs` for the manifest URL); apps marked
// `planned` are placeholder tiles.
//
// Add a new entry here when a new federated app is wired up — that's the
// only edit a new app needs to appear on the home shell.

export type LauncherApp = {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  // Internal route the host BrowserRouter handles. Empty for `planned` apps.
  path: string;
  status: "live" | "planned";
  accent: "ocean" | "lava" | "moss" | "amber";
};

export const APPS: ReadonlyArray<LauncherApp> = [
  {
    id: "showcase",
    name: "Showcase",
    tagline: "Foundations, components, dashboard, markdown.",
    icon: "sandbox",
    path: "/apps/showcase",
    status: "live",
    accent: "ocean",
  },
  {
    id: "atlas",
    name: "Atlas",
    tagline: "Live data widgets — weather, FX, countries, wiki.",
    icon: "globe",
    path: "",
    status: "planned",
    accent: "moss",
  },
  {
    id: "studio",
    name: "Markdown studio",
    tagline: "Standalone editor + preview.",
    icon: "edit",
    path: "",
    status: "planned",
    accent: "lava",
  },
];

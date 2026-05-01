import { fileURLToPath } from "node:url";
import path from "node:path";
import { createRspackConfig } from "@azores/build/rspack-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default createRspackConfig({
  rootDir: __dirname,
  port: 5173,
  // `auto` lets MF chunks load from wherever the remoteEntry was served
  // from, which is what we want when the home host fetches us cross-origin.
  publicPath: "auto",
  copyAssets: ["icon.svg"],
  // Allow the home host (cross-origin in dev) to fetch our remoteEntry + manifest.
  cors: true,
  federation: {
    // Host consumes us as `showcase@…/mf-manifest.json`.
    name: "showcase",
    exposes: { "./ShowcaseRoutes": "./src/ShowcaseRoutes.tsx" },
    shared: ["react", "react-dom", "react-router-dom", "@emotion/react", "@emotion/styled"],
  },
});

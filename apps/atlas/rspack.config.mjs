import { fileURLToPath } from "node:url";
import path from "node:path";
import { createRspackConfig } from "@azores/build/rspack-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default createRspackConfig({
  rootDir: __dirname,
  port: 5174,
  publicPath: "auto",
  copyAssets: ["icon.svg"],
  cors: true,
  yamlLoader: true,
  federation: {
    name: "atlas",
    exposes: {
      // Router-agnostic component the host mounts under its own
      // BrowserRouter. Standalone deploys use `App.tsx` instead.
      "./AtlasRoutes": "./src/AtlasRoutes.tsx",
    },
    shared: ["react", "react-dom", "react-router-dom", "@emotion/react"],
  },
});

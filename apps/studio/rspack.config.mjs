import { fileURLToPath } from "node:url";
import path from "node:path";
import { createRspackConfig } from "@azores/build/rspack-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default createRspackConfig({
  rootDir: __dirname,
  port: 5175,
  publicPath: "auto",
  copyAssets: ["icon.svg"],
  cors: true,
  federation: {
    name: "studio",
    exposes: {
      "./StudioRoutes": "./src/StudioRoutes.tsx",
    },
    shared: ["react", "react-dom", "react-router-dom", "@emotion/react"],
  },
});

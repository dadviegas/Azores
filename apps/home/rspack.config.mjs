import { fileURLToPath } from "node:url";
import path from "node:path";
import { createRspackConfig } from "@azores/build/rspack-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Where to fetch each remote's manifest from. Defaults to the dev server,
// but production deploys override via env so the host points at the real CDN.
const showcaseManifest =
  process.env.AZORES_SHOWCASE_MANIFEST ?? "http://localhost:5173/mf-manifest.json";
const atlasManifest =
  process.env.AZORES_ATLAS_MANIFEST ?? "http://localhost:5174/mf-manifest.json";

// Host's own `publicPath` — chunks/assets for `home` are served from here.
// Defaults to root for local dev; CI sets `PAGES_BASE=/Azores/` so Pages
// resolves chunks under the repo subpath.
const homePublicPath = process.env.PAGES_BASE ?? "/";

export default createRspackConfig({
  rootDir: __dirname,
  port: 5170,
  publicPath: homePublicPath,
  federation: {
    name: "home",
    // Manifest-based remote loading. Format is `<remoteName>@<manifestUrl>`;
    // the runtime fetches the manifest first (cheap JSON), then loads the
    // entry + chunks listed inside.
    remotes: {
      showcase: `showcase@${showcaseManifest}`,
      atlas: `atlas@${atlasManifest}`,
    },
    shared: ["react", "react-dom", "react-router-dom", "@emotion/react", "@emotion/styled"],
  },
});

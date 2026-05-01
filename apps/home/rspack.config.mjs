import { fileURLToPath } from "node:url";
import path from "node:path";
import { createRequire } from "node:module";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import ReactRefreshPlugin from "@rspack/plugin-react-refresh";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";
const basePath = (process.env.PAGES_BASE ?? "/").replace(/\/$/, "") || "/";

// Where to fetch the showcase manifest from. Defaults to the dev server, but
// production deploys override via env so the host points at the real CDN.
const showcaseManifest =
  process.env.AZORES_SHOWCASE_MANIFEST ?? "http://localhost:5173/mf-manifest.json";

const reactVersion = require("react/package.json").version;
const reactDomVersion = require("react-dom/package.json").version;
const routerVersion = require("react-router-dom/package.json").version;
const emotionReactVersion = require("@emotion/react/package.json").version;
const emotionStyledVersion = require("@emotion/styled/package.json").version;

export default defineConfig({
  entry: { main: "./src/main.tsx" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    extensionAlias: {
      ".js": [".ts", ".tsx", ".js"],
      ".jsx": [".tsx", ".jsx"],
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: { syntax: "typescript", tsx: true },
            transform: {
              react: {
                runtime: "automatic",
                development: isDev,
                refresh: isDev,
                importSource: "@emotion/react",
              },
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.css$/,
        type: "css",
      },
    ],
  },
  experiments: { css: true },
  lazyCompilation: false,
  plugins: [
    new rspack.DefinePlugin({
      __AZORES_BASE_PATH__: JSON.stringify(basePath),
    }),
    new rspack.HtmlRspackPlugin({ template: "./index.html" }),
    isDev && new ReactRefreshPlugin(),
    new ModuleFederationPlugin({
      name: "home",
      dev: false,
      // Manifest-based remote loading. The string format is
      // `<remoteName>@<manifestUrl>`. The runtime fetches the manifest first
      // (cheap JSON), then loads the entry + chunks listed inside it.
      remotes: {
        showcase: `showcase@${showcaseManifest}`,
      },
      // Off until we publish remote types properly — see web's
      // rspack.config.mjs and docs/plan.md §6.
      dts: false,
      shared: {
        react: { singleton: true, requiredVersion: reactVersion },
        "react-dom": { singleton: true, requiredVersion: reactDomVersion },
        "react-router-dom": { singleton: true, requiredVersion: routerVersion },
        "@emotion/react": { singleton: true, requiredVersion: emotionReactVersion },
        "@emotion/styled": { singleton: true, requiredVersion: emotionStyledVersion },
      },
    }),
  ].filter(Boolean),
  devServer: { port: 5170, historyApiFallback: true, hot: true },
  watchOptions: {
    ignored: ["**/node_modules/**", "**/dist/**", "**/@mf-types/**"],
  },
});

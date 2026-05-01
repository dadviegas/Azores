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

// Federation deps. Singletons so the host and remote share one instance —
// version pinned via the pnpm catalog, so a runtime drift means a bug in
// pnpm-workspace.yaml, not here.
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
    // `auto` lets MF chunks load from wherever the remoteEntry was served
    // from, which is what we want when the home host fetches us cross-origin.
    publicPath: "auto",
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
    new rspack.CopyRspackPlugin({ patterns: [{ from: "icon.svg", to: "icon.svg" }] }),
    isDev && new ReactRefreshPlugin(),
    new ModuleFederationPlugin({
      // Federation identity. Host consumes us as `showcase@…/mf-manifest.json`.
      name: "showcase",
      filename: "remoteEntry.js",
      // `manifest: true` is the default in @module-federation/enhanced ≥0.6,
      // but spell it out so a future major doesn't silently change behavior.
      manifest: true,
      // DTS plugin is off until we set up a proper federation tsconfig and
      // type-archive pipeline. Host gets types from a hand-rolled stub at
      // `apps/home/src/federated.d.ts`. Tracked in docs/plan.md §6.
      dts: false,
      exposes: {
        "./ShowcaseRoutes": "./src/ShowcaseRoutes.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: reactVersion },
        "react-dom": { singleton: true, requiredVersion: reactDomVersion },
        "react-router-dom": { singleton: true, requiredVersion: routerVersion },
        "@emotion/react": { singleton: true, requiredVersion: emotionReactVersion },
        "@emotion/styled": { singleton: true, requiredVersion: emotionStyledVersion },
      },
    }),
  ].filter(Boolean),
  devServer: {
    port: 5173,
    historyApiFallback: true,
    hot: true,
    devMiddleware: { writeToDisk: false },
    // Allow the home host (cross-origin in dev) to fetch our remoteEntry +
    // manifest. Without this CORS the host's loader sees a network error.
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  watchOptions: {
    ignored: ["**/node_modules/**", "**/dist/**", "**/@mf-types/**", "**/.mf/**"],
  },
});

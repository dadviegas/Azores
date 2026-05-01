import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import ReactRefreshPlugin from "@rspack/plugin-react-refresh";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

const require = createRequire(import.meta.url);
const isDev = process.env.NODE_ENV !== "production";
const basePath = (process.env.PAGES_BASE ?? "/").replace(/\/$/, "") || "/";

// Resolve catalog-pinned versions for federation `shared`. All apps share the
// same singleton instances; the version literal comes from whatever pnpm
// linked, which is the catalog entry in pnpm-workspace.yaml.
const v = (pkg) => require(`${pkg}/package.json`).version;

const SHARED_VERSIONS = {
  react: () => v("react"),
  "react-dom": () => v("react-dom"),
  "react-router-dom": () => v("react-router-dom"),
  "@emotion/react": () => v("@emotion/react"),
  "@emotion/styled": () => v("@emotion/styled"),
};

const buildShared = (names) =>
  Object.fromEntries(
    names.map((name) => [
      name,
      { singleton: true, requiredVersion: SHARED_VERSIONS[name]() },
    ]),
  );

/**
 * Shared rspack config factory for Azores apps.
 *
 * @param {object} opts
 * @param {string} opts.rootDir          App root (pass `__dirname`).
 * @param {string} [opts.entry]          Entry path. Defaults to `./src/main.tsx`.
 * @param {number} opts.port             Dev server port.
 * @param {"auto"|"/"} [opts.publicPath] Output publicPath. Defaults to "auto".
 * @param {string[]} [opts.copyAssets]   Filenames at app root to copy verbatim.
 * @param {boolean} [opts.cors]          Send `Access-Control-Allow-Origin: *` in dev.
 * @param {boolean} [opts.yamlLoader]    Enable build-time YAML imports.
 * @param {object} [opts.federation]     ModuleFederationPlugin options:
 * @param {string} opts.federation.name
 * @param {Record<string,string>} [opts.federation.exposes]
 * @param {Record<string,string>} [opts.federation.remotes]
 * @param {string[]} opts.federation.shared  Subset of SHARED_VERSIONS keys.
 */
export function createRspackConfig(opts) {
  const {
    rootDir,
    entry = "./src/main.tsx",
    port,
    publicPath = "auto",
    copyAssets = [],
    cors = false,
    yamlLoader = false,
    federation,
  } = opts;

  const rules = [
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
    { test: /\.css$/, type: "css" },
  ];

  if (yamlLoader) {
    // Emits a JS module whose default export is the parsed YAML; no parser
    // ships to the browser. Used by `@azores/widgets` and `@azores/dataprovider`.
    rules.push({
      test: /\.ya?ml$/,
      use: [{ loader: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "rspack-yaml-loader.cjs") }],
      type: "javascript/auto",
    });
  }

  const plugins = [
    new rspack.DefinePlugin({
      __AZORES_BASE_PATH__: JSON.stringify(basePath),
    }),
    new rspack.HtmlRspackPlugin({ template: "./index.html" }),
    copyAssets.length > 0 &&
      new rspack.CopyRspackPlugin({
        patterns: copyAssets.map((from) => ({ from, to: from })),
      }),
    isDev && new ReactRefreshPlugin(),
    federation &&
      new ModuleFederationPlugin({
        name: federation.name,
        ...(federation.exposes
          ? { filename: "remoteEntry.js", manifest: true, exposes: federation.exposes }
          : {}),
        ...(federation.remotes ? { remotes: federation.remotes, dev: false } : {}),
        // DTS off until we set up a proper federation type-archive pipeline.
        // See docs/plan.md §6.
        dts: false,
        shared: buildShared(federation.shared),
      }),
  ].filter(Boolean);

  return defineConfig({
    entry: { main: entry },
    output: {
      path: path.resolve(rootDir, "dist"),
      filename: "[name].[contenthash].js",
      publicPath,
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      extensionAlias: {
        ".js": [".ts", ".tsx", ".js"],
        ".jsx": [".tsx", ".jsx"],
      },
    },
    module: { rules },
    experiments: { css: true },
    lazyCompilation: false,
    plugins,
    devServer: {
      port,
      historyApiFallback: true,
      hot: true,
      devMiddleware: { writeToDisk: false },
      ...(cors ? { headers: { "Access-Control-Allow-Origin": "*" } } : {}),
    },
    watchOptions: {
      ignored: ["**/node_modules/**", "**/dist/**", "**/@mf-types/**", "**/.mf/**"],
    },
  });
}

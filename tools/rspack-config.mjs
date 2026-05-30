import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

// Preflight: bail before importing federation plugins, which transitively
// require Node 22+ (util.styleText). Without this guard, running on Node
// 20 produces an unreadable stack trace deep inside the federation
// manifest plugin. The required version comes from .nvmrc.
const __preflightHere = path.dirname(fileURLToPath(import.meta.url));
try {
  const want = readFileSync(
    path.resolve(__preflightHere, "..", ".nvmrc"),
    "utf8",
  ).trim();
  const wantMajor = Number(want.split(".")[0]) || 0;
  const haveMajor = Number(process.versions.node.split(".")[0]) || 0;
  if (haveMajor < wantMajor) {
    const red = "\x1b[31m";
    const dim = "\x1b[2m";
    const reset = "\x1b[0m";
    process.stderr.write(
      `\n${red}Node ${process.versions.node} is too old — this repo needs Node ${want}.${reset}\n` +
        `${dim}Run ${reset}nvm use${dim} in this repo's root, then re-run.${reset}\n\n`,
    );
    process.exit(1);
  }
} catch {
  // No .nvmrc readable from here — skip the guard rather than fail.
}

const { defineConfig } = await import("@rspack/cli");
const { rspack } = await import("@rspack/core");
const ReactRefreshPlugin = (await import("@rspack/plugin-react-refresh")).default;
const { ModuleFederationPlugin } = await import("@module-federation/enhanced/rspack");

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
      // Federation remotes are fetched cross-origin in dev (the host page is
      // served from a different port). webpack-dev-server 5.2.1+ ships a
      // "cross-origin-header-check" that 403s cross-site `no-cors` requests —
      // which is exactly what a <script>-tag chunk load looks like, so every
      // remoteEntry/chunk fetch from the host gets blocked. `allowedHosts:
      // "all"` opts this dev-only server out of that check; the ACAO header
      // then lets the host actually read the responses.
      ...(cors
        ? { allowedHosts: "all", headers: { "Access-Control-Allow-Origin": "*" } }
        : {}),
    },
    watchOptions: {
      ignored: ["**/node_modules/**", "**/dist/**", "**/@mf-types/**", "**/.mf/**"],
    },
  });
}

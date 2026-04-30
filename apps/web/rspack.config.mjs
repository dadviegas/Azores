import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import ReactRefreshPlugin from "@rspack/plugin-react-refresh";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  entry: { main: "./src/main.tsx" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: process.env.PAGES_BASE ?? "/",
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
  plugins: [
    new rspack.HtmlRspackPlugin({ template: "./index.html" }),
    new rspack.CopyRspackPlugin({ patterns: [{ from: "icon.svg", to: "icon.svg" }] }),
    isDev && new ReactRefreshPlugin(),
  ].filter(Boolean),
  devServer: { port: 5173, historyApiFallback: true, hot: true },
});

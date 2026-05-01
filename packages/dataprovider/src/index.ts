// @azores/dataprovider — the data layer.
//
// Sits on top of @azores/core (FetchCache + Fetcher). Owns the actual source
// folders (URL builders, parsers, per-source typed params/data), the React
// seam (DataProvider, useSource), and the widget-manifest schema.

import "./sources/index.js"; // side-effect: registers built-in sources

export * from "./sources/index.js";

export {
  DataProvider,
  useFetcher,
  type DataProviderProps,
} from "./DataProvider.js";

export {
  useSource,
  type UseSourceOptions,
  type UseSourceResult,
} from "./useSource.js";

export {
  parseWidgetManifest,
  parseSourceManifest,
  parseDurationMs,
  type WidgetManifest,
  type SourceManifest,
} from "./manifest.js";

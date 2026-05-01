// Registry of named data sources. A "source" is a typed contract:
//   - a URL builder taking the caller's params,
//   - an optional TTL override (some sources change faster than the 10-min
//     default; some rarely change at all),
//   - an optional response transformer.
//
// Apps and widgets request data by source name + params via the Fetcher. The
// Fetcher checks the source name against its allowlist, builds the URL,
// hits the cache (keyed by source + params), and falls through to fetch.
//
// Built-in sources for specific public APIs live in @azores/dataprovider.
// This module owns only the registry primitive.

import { DEFAULT_TTL_MS } from "./cache.js";

export type Source<TParams = unknown, TData = unknown> = {
  name: string;
  ttlMs?: number;
  build: (params: TParams) => string;
  // How to read the response body. Defaults to "json". Use "text" for
  // XML/RSS/Atom feeds and let `parse` turn the string into typed data.
  responseType?: "json" | "text";
  parse?: (raw: unknown) => TData;
};

const registry = new Map<string, Source<unknown, unknown>>();

export const registerSource = <TParams, TData>(s: Source<TParams, TData>): void => {
  registry.set(s.name, s as unknown as Source<unknown, unknown>);
};

export const getSource = (name: string): Source<unknown, unknown> | undefined =>
  registry.get(name);

export const listSources = (): string[] => Array.from(registry.keys());

// Fallback for sources that don't override the default — keeps types tight.
export const DEFAULT_SOURCE_TTL_MS = DEFAULT_TTL_MS;

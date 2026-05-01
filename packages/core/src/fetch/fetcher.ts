// Fetcher: the front door for app/widget code that needs data from a
// registered Source. Construct one per app or widget with a `sources`
// allowlist; the Fetcher refuses requests for any source not in the list.
//
// Cache is the global singleton from `cache.ts` — multiple Fetchers share
// it so two widgets asking for the same `weather` of the same coords don't
// double-fetch.
//
// Cache key shape: `<source>:<stable-json-of-params>`. The stringify keeps
// keys human-readable for IDB inspection; stable-key sorting keeps two
// callers with the same params (different prop order) on the same entry.

import { getCache, DEFAULT_TTL_MS } from "./cache.js";
import { getSource } from "./sources.js";

export type FetcherConfig = {
  // Source names this fetcher is allowed to query. Other names throw at
  // request time so a typo or unauthorized source surfaces immediately.
  sources: ReadonlyArray<string>;
  // Per-fetcher TTL override. Source-level TTL still wins over this.
  ttlMs?: number;
  // Pluggable for tests.
  fetchImpl?: typeof fetch;
};

export type FetchOptions = {
  signal?: AbortSignal;
  // Force a network round-trip and replace the cache entry.
  forceRefresh?: boolean;
  // Per-call TTL override. Wins over source.ttlMs and fetcher.ttlMs.
  // Lets callers (e.g. a widget manifest) declare their own freshness.
  ttlMs?: number;
};

const stableKey = (source: string, params: unknown): string => {
  if (params === undefined || params === null) return `${source}:`;
  // Sort keys so { a, b } and { b, a } collapse to the same cache key.
  const sorted = (obj: unknown): unknown => {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(sorted);
    const out: Record<string, unknown> = {};
    Object.keys(obj as Record<string, unknown>)
      .sort()
      .forEach((k) => {
        out[k] = sorted((obj as Record<string, unknown>)[k]);
      });
    return out;
  };
  return `${source}:${JSON.stringify(sorted(params))}`;
};

export class Fetcher {
  private allowed: Set<string>;
  private fetchImpl: typeof fetch;
  private ttlOverrideMs?: number;

  constructor(cfg: FetcherConfig) {
    this.allowed = new Set(cfg.sources);
    this.fetchImpl = cfg.fetchImpl ?? fetch.bind(globalThis);
    this.ttlOverrideMs = cfg.ttlMs;
  }

  async get<T>(
    sourceName: string,
    params?: unknown,
    opts: FetchOptions = {},
  ): Promise<T> {
    if (!this.allowed.has(sourceName)) {
      throw new Error(
        `Fetcher: source "${sourceName}" is not in the allowlist [${[...this.allowed].join(", ")}]`,
      );
    }
    const source = getSource(sourceName);
    if (!source) throw new Error(`Fetcher: unknown source "${sourceName}"`);

    const key = stableKey(sourceName, params);
    const cache = getCache();
    if (!opts.forceRefresh) {
      const hit = await cache.get<T>(key);
      if (hit !== null) return hit;
    }

    const url = source.build(params);
    const res = await this.fetchImpl(url, { signal: opts.signal });
    if (!res.ok) {
      throw new Error(`Fetcher: ${sourceName} returned ${res.status} ${res.statusText}`);
    }
    const raw =
      source.responseType === "text"
        ? ((await res.text()) as unknown)
        : ((await res.json()) as unknown);
    const data = (source.parse ? source.parse(raw) : raw) as T;

    const ttl = opts.ttlMs ?? source.ttlMs ?? this.ttlOverrideMs ?? DEFAULT_TTL_MS;
    await cache.set(key, data, ttl);
    return data;
  }

  // For consumers that want to expire one entry without clearing everything.
  async invalidate(sourceName: string, params?: unknown): Promise<void> {
    await getCache().invalidate(stableKey(sourceName, params));
  }

  has(sourceName: string): boolean {
    return this.allowed.has(sourceName);
  }
}

export const createFetcher = (cfg: FetcherConfig): Fetcher => new Fetcher(cfg);

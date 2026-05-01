// `useSource` is the only fetch-related symbol widgets import. It owns the
// AbortController lifecycle (cancel on unmount or param change), reads from
// the shared FetchCache synchronously when a fresh entry exists, and exposes
// a `refresh()` that bypasses the cache.
//
// Per-call ttlMs override flows through to `Fetcher.get` and pins the cache
// entry's TTL — that's how a widget manifest's `ttl: 30m` actually takes
// effect.

import { useCallback, useEffect, useRef, useState } from "react";
import { useFetcher } from "./DataProvider.js";

export type UseSourceOptions = {
  ttlMs?: number;
  // When false (default false), the hook does not fire. Useful when params
  // aren't ready yet (e.g. waiting on geolocation).
  enabled?: boolean;
};

export type UseSourceResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refresh: () => void;
};

// Stable JSON for the deps array — prevents identity-based effect loops when
// callers pass `{ a: 1 }` inline on every render.
const stableStringify = (v: unknown): string => {
  if (v === undefined) return "";
  return JSON.stringify(v, (_, val) => {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      const sorted: Record<string, unknown> = {};
      for (const k of Object.keys(val).sort()) sorted[k] = (val as Record<string, unknown>)[k];
      return sorted;
    }
    return val;
  });
};

export const useSource = <T>(
  sourceName: string,
  params?: unknown,
  options: UseSourceOptions = {},
): UseSourceResult<T> => {
  const fetcher = useFetcher();
  const { ttlMs, enabled = true } = options;
  const paramsKey = stableStringify(params);

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [tick, setTick] = useState(0);

  // Latest controller so refresh() can cancel an in-flight request.
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError(null);

    fetcher
      .get<T>(sourceName, params, {
        signal: controller.signal,
        ttlMs,
        forceRefresh: tick > 0,
      })
      .then((value) => {
        if (controller.signal.aborted) return;
        setData(value);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });

    return () => controller.abort();
    // `paramsKey` (stable JSON of `params`) is used in place of `params`
    // identity so an inline object literal on every render doesn't loop.
  }, [fetcher, sourceName, paramsKey, ttlMs, enabled, tick]);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  return { data, error, loading, refresh };
};

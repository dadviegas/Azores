// Behavior tests for the Fetcher: allowlist enforcement, cache hit/miss,
// stable key generation, force-refresh. IDB persistence is exercised by
// jsdom's `fake-indexeddb` shim if present; otherwise the cache silently
// degrades to in-memory only and these tests still pass.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createFetcher } from "./fetcher.js";
import { getCache } from "./cache.js";
import { registerSource } from "./sources.js";

registerSource<{ q: string }, { echoed: string }>({
  name: "echo",
  build: ({ q }) => `https://example.test/echo?q=${q}`,
  ttlMs: 60_000,
});

const makeFetch = (payload: unknown, status = 200) =>
  vi.fn(async () => {
    const ok = status >= 200 && status < 300;
    return {
      ok,
      status,
      statusText: ok ? "OK" : "ERR",
      json: async () => payload,
    } as Response;
  });

describe("Fetcher", () => {
  beforeEach(async () => {
    await getCache().clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects sources outside the allowlist", async () => {
    const f = createFetcher({ sources: ["echo"], fetchImpl: makeFetch({}) });
    await expect(f.get("weather", { lat: 0, lng: 0 })).rejects.toThrow(/allowlist/);
  });

  it("returns cached value on second call", async () => {
    const fetchImpl = makeFetch({ echoed: "hi" });
    const f = createFetcher({ sources: ["echo"], fetchImpl });
    const a = await f.get<{ echoed: string }>("echo", { q: "hi" });
    const b = await f.get<{ echoed: string }>("echo", { q: "hi" });
    expect(a).toEqual({ echoed: "hi" });
    expect(b).toEqual({ echoed: "hi" });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("stableKey is order-insensitive on params", async () => {
    const fetchImpl = makeFetch({ echoed: "k" });
    const f = createFetcher({ sources: ["echo"], fetchImpl });
    await f.get("echo", { a: 1, b: 2 });
    await f.get("echo", { b: 2, a: 1 });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("forceRefresh bypasses the cache", async () => {
    const fetchImpl = makeFetch({ echoed: "v1" });
    const f = createFetcher({ sources: ["echo"], fetchImpl });
    await f.get("echo", { q: "x" });
    await f.get("echo", { q: "x" }, { forceRefresh: true });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("propagates non-2xx as errors", async () => {
    const f = createFetcher({ sources: ["echo"], fetchImpl: makeFetch({}, 503) });
    await expect(f.get("echo", { q: "x" })).rejects.toThrow(/503/);
  });
});

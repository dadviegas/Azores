// React context that exposes a single Fetcher to every widget under the
// dashboard. The allowlist is the union of `sources:` from every widget the
// dashboard knows about — typically computed from the widget registry at
// mount time.

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { createFetcher, type Fetcher } from "@azores/core";

const FetcherContext = createContext<Fetcher | null>(null);

export type DataProviderProps = {
  sources: ReadonlyArray<string>;
  children: ReactNode;
  // Mostly for tests. Production code uses the global fetch.
  fetchImpl?: typeof fetch;
};

export const DataProvider = ({
  sources,
  children,
  fetchImpl,
}: DataProviderProps): JSX.Element => {
  // Stable allowlist key so a parent re-render with the same array doesn't
  // spawn a new Fetcher (and tank cache locality).
  const key = useMemo(() => [...sources].sort().join("|"), [sources]);
  // The deps array intentionally uses `key` (a stable string of `sources`)
  // instead of the array identity so a parent re-render with the same
  // sources doesn't spawn a new Fetcher.
  const fetcher = useMemo(() => createFetcher({ sources, fetchImpl }), [key, fetchImpl]);
  return <FetcherContext.Provider value={fetcher}>{children}</FetcherContext.Provider>;
};

export const useFetcher = (): Fetcher => {
  const f = useContext(FetcherContext);
  if (!f) {
    throw new Error("useFetcher: no <DataProvider> found in the tree.");
  }
  return f;
};

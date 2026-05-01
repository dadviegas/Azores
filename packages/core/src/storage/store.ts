import type { StorageAdapter } from "./adapter.js";
import { createIndexedDBAdapter } from "./indexeddb.js";

// Singleton storage proxy. Apps talk to `getStorage()`; the underlying
// adapter is swappable via `setStorageAdapter()`. Default is IndexedDB; when
// Supabase lands, the bootstrap call becomes:
//
//   setStorageAdapter(createSupabaseAdapter({ client, table: "kv" }));
//
// Pinned to `globalThis` so federated remotes that bundle their own copy of
// `@azores/core` still resolve to the same instance.

const GLOBAL_KEY = "__azores_storage_adapter__";

type GlobalWithStorage = typeof globalThis & { [GLOBAL_KEY]?: StorageAdapter };

export const setStorageAdapter = (adapter: StorageAdapter): void => {
  (globalThis as GlobalWithStorage)[GLOBAL_KEY] = adapter;
};

export const getStorage = (): StorageAdapter => {
  const g = globalThis as GlobalWithStorage;
  if (!g[GLOBAL_KEY]) g[GLOBAL_KEY] = createIndexedDBAdapter();
  return g[GLOBAL_KEY];
};

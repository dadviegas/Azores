// IndexedDB-backed cache with an in-memory fast path. Singleton — pinned to
// `globalThis` so even if `@azores/core` ends up bundled into multiple
// federated remotes, all module copies share the same instance, and the
// browser's per-origin IDB store is the single source of truth at rest.
//
// Why IDB and not localStorage: payloads can be large (REST Countries' /all
// returns ~1MB JSON), and localStorage stringifies+blocks the main thread.
// IDB stores structured clones and is async out of the box.
//
// TTL is enforced on read, not on write — entries past expiry are kept on
// disk until the next read replaces them. This is fine for our use case
// (low entry count, weekly-ish manual eviction is enough) and avoids
// scheduling a worker for nothing.

const DB_NAME = "azores-fetch";
const DB_VERSION = 1;
const STORE = "entries";
const DEFAULT_TTL_MS = 10 * 60 * 1000;

type StoredEntry = {
  key: string;
  data: unknown;
  expiresAt: number;
  storedAt: number;
};

const openDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "key" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

const idb = {
  get: async (key: string): Promise<StoredEntry | null> => {
    const db = await openDb();
    return new Promise<StoredEntry | null>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve((req.result as StoredEntry | undefined) ?? null);
      req.onerror = () => reject(req.error);
    });
  },
  put: async (entry: StoredEntry): Promise<void> => {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(entry);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  },
  delete: async (key: string): Promise<void> => {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  },
  clear: async (): Promise<void> => {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  },
};

export class FetchCache {
  private memory = new Map<string, StoredEntry>();

  // Returns the cached payload if it exists and isn't past TTL; null otherwise.
  // Reads memory first; falls back to IDB and rehydrates memory on hit.
  async get<T>(key: string): Promise<T | null> {
    const now = Date.now();
    const mem = this.memory.get(key);
    if (mem) {
      if (mem.expiresAt > now) return mem.data as T;
      this.memory.delete(key);
    }

    if (typeof indexedDB === "undefined") return null;
    try {
      const persisted = await idb.get(key);
      if (!persisted) return null;
      if (persisted.expiresAt <= now) {
        await idb.delete(key);
        return null;
      }
      this.memory.set(key, persisted);
      return persisted.data as T;
    } catch {
      // IDB failure (private browsing, quota, etc.) — degrade silently.
      return null;
    }
  }

  async set<T>(key: string, data: T, ttlMs: number = DEFAULT_TTL_MS): Promise<void> {
    const now = Date.now();
    const entry: StoredEntry = { key, data, expiresAt: now + ttlMs, storedAt: now };
    this.memory.set(key, entry);
    if (typeof indexedDB === "undefined") return;
    try {
      await idb.put(entry);
    } catch {
      // Persistence is best-effort; in-memory copy is still valid.
    }
  }

  async invalidate(key: string): Promise<void> {
    this.memory.delete(key);
    if (typeof indexedDB === "undefined") return;
    try {
      await idb.delete(key);
    } catch {
      /* ignore */
    }
  }

  async clear(): Promise<void> {
    this.memory.clear();
    if (typeof indexedDB === "undefined") return;
    try {
      await idb.clear();
    } catch {
      /* ignore */
    }
  }
}

// `globalThis`-pinned singleton. Multiple module copies (e.g. one per MF
// remote) all reach the same instance, so the in-memory layer dedupes too,
// not just the IDB layer.
const GLOBAL_KEY = "__azores_fetch_cache__";

type GlobalWithCache = typeof globalThis & { [GLOBAL_KEY]?: FetchCache };

export const getCache = (): FetchCache => {
  const g = globalThis as GlobalWithCache;
  if (!g[GLOBAL_KEY]) g[GLOBAL_KEY] = new FetchCache();
  return g[GLOBAL_KEY];
};

export { DEFAULT_TTL_MS };

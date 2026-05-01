import type { StorageAdapter } from "./adapter.js";

// IDB-backed `StorageAdapter`. Distinct DB from the fetch cache (which has
// its own TTL semantics) — durable user state belongs in its own store so
// "clear cache" never wipes layouts.

const DB_NAME = "azores-storage";
const DB_VERSION = 1;
const STORE = "kv";

const openDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

export const createIndexedDBAdapter = (): StorageAdapter => ({
  get: async <T>(key: string): Promise<T | null> => {
    if (typeof indexedDB === "undefined") return null;
    try {
      const db = await openDb();
      return await new Promise<T | null>((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const req = tx.objectStore(STORE).get(key);
        req.onsuccess = () => resolve((req.result as T | undefined) ?? null);
        req.onerror = () => reject(req.error);
      });
    } catch {
      return null;
    }
  },
  set: async <T>(key: string, value: T): Promise<void> => {
    if (typeof indexedDB === "undefined") return;
    try {
      const db = await openDb();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).put(value, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {
      // Persistence is best-effort. The caller treats `set` as fire-and-forget.
    }
  },
  delete: async (key: string): Promise<void> => {
    if (typeof indexedDB === "undefined") return;
    try {
      const db = await openDb();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {
      /* ignore */
    }
  },
});

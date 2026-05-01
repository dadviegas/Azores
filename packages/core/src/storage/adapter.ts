// The seam every persistence backend implements. Today: IndexedDB. Later:
// Supabase (or any remote KV) — the consumer doesn't change, only the
// adapter passed into `setStorageAdapter()`.
//
// Values are typed by the caller (`get<T>`, `set<T>`) and round-tripped via
// structured clone (IDB) or JSON (remote). Adapters MUST preserve plain
// objects, arrays, numbers, strings, booleans, null. Don't pass functions,
// class instances, Maps, or Sets — Supabase round-trips through JSON and
// will silently lose them.
export type StorageAdapter = {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
};

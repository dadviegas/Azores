export type { StorageAdapter } from "./adapter.js";
export { createIndexedDBAdapter } from "./indexeddb.js";
export { getStorage, setStorageAdapter } from "./store.js";
export {
  getIdentity,
  upgradeIdentity,
  __resetIdentityCache,
  type Identity,
} from "./identity.js";
export {
  createSupabaseAdapter,
  type SupabaseAdapterConfig,
} from "./supabase.js";

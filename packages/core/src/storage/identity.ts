// Minimal identity seam for sync. Today: an anonymous, per-device UUID
// generated and persisted on first read. Tomorrow: replaced by the real
// auth identity (email magic-link, OAuth, etc.) without changing the
// signature consumers depend on.
//
// Why this lives in @azores/core: storage adapters need a stable key
// prefix per identity to avoid cross-pollinating layouts between devices
// or accounts. `getIdentity()` is what the Supabase adapter (or any
// future remote KV) keys writes by.

import { getStorage } from "./store.js";

const ID_KEY = "azores:identity";

export type Identity = {
  // Stable per-device until storage is cleared. Used as the row key in
  // remote KV until a real account upgrades it.
  deviceId: string;
  // Set once a real auth flow runs. Adapters should prefer `accountId`
  // over `deviceId` when both are present so prior-anonymous data can be
  // migrated under the user's account.
  accountId?: string;
  // Optional, informational. The adapter MUST NOT key by email — emails
  // change.
  email?: string;
};

const newDeviceId = (): string => {
  // crypto.randomUUID is available in every browser we target. Fall back
  // to a date-and-random string for non-browser bootstraps (SSR, tests).
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `dev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

let cached: Identity | null = null;

export const getIdentity = async (): Promise<Identity> => {
  if (cached) return cached;
  const stored = await getStorage().get<Identity>(ID_KEY);
  if (stored && typeof stored.deviceId === "string" && stored.deviceId) {
    cached = stored;
    return stored;
  }
  const fresh: Identity = { deviceId: newDeviceId() };
  await getStorage().set<Identity>(ID_KEY, fresh);
  cached = fresh;
  return fresh;
};

// Called once a real auth flow completes. Merges account info into the
// existing device identity so the device's anonymous writes stay
// addressable under the upgraded id.
export const upgradeIdentity = async (
  patch: { accountId: string; email?: string },
): Promise<Identity> => {
  const current = await getIdentity();
  const next: Identity = { ...current, ...patch };
  await getStorage().set<Identity>(ID_KEY, next);
  cached = next;
  return next;
};

// Test/reset hook — drops the in-memory cache so the next `getIdentity()`
// re-reads from storage. Doesn't clear storage itself.
export const __resetIdentityCache = (): void => {
  cached = null;
};

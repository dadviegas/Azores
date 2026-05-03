// Supabase storage adapter — a sketch.
//
// What this is: a fetch-based implementation of `StorageAdapter` against
// a PostgREST endpoint (Supabase's default). No `@supabase/supabase-js`
// dependency — the surface is small enough that the SDK's auth/realtime
// features aren't worth a 100KB+ bundle for now.
//
// What this is NOT (yet):
// - Auth wired into the Tweaks panel (no UI to paste a URL/key).
// - Realtime subscriptions — the adapter only handles get/set/delete.
// - Migration on schema bump — see "version guard" note below.
//
// The expected table shape (Supabase SQL):
//
//   create table public.kv (
//     identity text not null,
//     key      text not null,
//     value    jsonb not null,
//     v        int  not null default 1,
//     updated  timestamptz not null default now(),
//     primary key (identity, key)
//   );
//   alter table public.kv enable row level security;
//   create policy "self" on public.kv
//     for all using (identity = current_setting('request.jwt.claim.sub', true));
//
// The `identity` column is keyed off `getIdentity().accountId ??
// deviceId` so device-anonymous writes survive the upgrade to a real
// account (the upgrade migration is the consumer's responsibility — see
// `upgradeIdentity` in identity.ts).
//
// Conflict policy: last-write-wins on (identity, key). Each row carries
// `v` so a stale device that bumps its layout schema can be rejected at
// the API layer (PostgREST `if-match`-style check). Implementing the
// rejection is left for when Phase 14 actually ships sync — the seam is
// here so we don't paint ourselves into a corner.

import type { StorageAdapter } from "./adapter.js";
import { getIdentity } from "./identity.js";

export type SupabaseAdapterConfig = {
  // The PostgREST URL — typically `https://<project>.supabase.co/rest/v1`.
  url: string;
  // The Supabase anon (or service) key. Pass through `Authorization:
  // Bearer ${apiKey}` AND `apikey: ${apiKey}` headers — PostgREST wants
  // both. NEVER ship the service-role key to the browser; use the anon
  // key with row-level-security policies instead.
  apiKey: string;
  // Optional table name override. Defaults to "kv" — match the SQL above.
  table?: string;
  // Schema version stamped on every write. Bump alongside the layout `v`
  // so a future server-side guard can reject downgrades.
  schemaVersion?: number;
};

type Row = { identity: string; key: string; value: unknown; v: number };

const buildHeaders = (apiKey: string): HeadersInit => ({
  apikey: apiKey,
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
});

export const createSupabaseAdapter = (
  config: SupabaseAdapterConfig,
): StorageAdapter => {
  const table = config.table ?? "kv";
  const v = config.schemaVersion ?? 1;
  const base = config.url.replace(/\/+$/, "");
  const endpoint = `${base}/${table}`;

  const identityKey = async (): Promise<string> => {
    const id = await getIdentity();
    return id.accountId ?? id.deviceId;
  };

  return {
    async get<T>(key: string): Promise<T | null> {
      const identity = await identityKey();
      const url = `${endpoint}?identity=eq.${encodeURIComponent(identity)}&key=eq.${encodeURIComponent(key)}&select=value`;
      const res = await fetch(url, {
        headers: { ...buildHeaders(config.apiKey), Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Supabase get ${key} · HTTP ${res.status}`);
      const rows = (await res.json()) as Array<{ value: T }>;
      return rows[0]?.value ?? null;
    },

    async set<T>(key: string, value: T): Promise<void> {
      const identity = await identityKey();
      const row: Row = { identity, key, value, v };
      const url = `${endpoint}?on_conflict=identity,key`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          ...buildHeaders(config.apiKey),
          // PostgREST upsert: merge on conflict instead of erroring.
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify(row),
      });
      if (!res.ok) throw new Error(`Supabase set ${key} · HTTP ${res.status}`);
    },

    async delete(key: string): Promise<void> {
      const identity = await identityKey();
      const url = `${endpoint}?identity=eq.${encodeURIComponent(identity)}&key=eq.${encodeURIComponent(key)}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: buildHeaders(config.apiKey),
      });
      if (!res.ok) throw new Error(`Supabase delete ${key} · HTTP ${res.status}`);
    },
  };
};

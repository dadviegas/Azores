import { readFileSync, existsSync } from 'node:fs';
import { extname } from 'node:path';
import { parse as parseYaml } from 'yaml';

export type LoadOptions = {
  /** Overwrite values already present in process.env. Default: false. */
  override?: boolean;
};

/**
 * Load environment variables from a `.env`, `.yml`, or `.yaml` file into
 * `process.env`. Returns the parsed key/value map.
 *
 * YAML files may be flat (`KEY: value`) or nested — nested keys are flattened
 * with `_` (e.g. `api: { key: x }` → `API_KEY=x`).
 */
export function loadEnvFile(path: string, options: LoadOptions = {}): Record<string, string> {
  if (!existsSync(path)) return {};
  const raw = readFileSync(path, 'utf8');
  const ext = extname(path).toLowerCase();
  const parsed = ext === '.yml' || ext === '.yaml' ? parseYamlEnv(raw) : parseDotenv(raw);
  applyToProcessEnv(parsed, options.override ?? false);
  return parsed;
}

/**
 * Try a list of candidate paths in order; load the first that exists.
 * Useful for ".env.yml" → ".env" fallback during local dev.
 */
export function loadFirstEnvFile(paths: string[], options: LoadOptions = {}): string | undefined {
  for (const p of paths) {
    if (existsSync(p)) {
      loadEnvFile(p, options);
      return p;
    }
  }
  return undefined;
}

function applyToProcessEnv(values: Record<string, string>, override: boolean): void {
  for (const [k, v] of Object.entries(values)) {
    if (override || process.env[k] === undefined) {
      process.env[k] = v;
    }
  }
}

function parseDotenv(input: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of input.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function parseYamlEnv(input: string): Record<string, string> {
  const doc = parseYaml(input);
  if (doc == null || typeof doc !== 'object') return {};
  const out: Record<string, string> = {};
  flatten(doc as Record<string, unknown>, '', out);
  return out;
}

function flatten(obj: Record<string, unknown>, prefix: string, out: Record<string, string>): void {
  for (const [key, value] of Object.entries(obj)) {
    const flatKey = (prefix ? `${prefix}_${key}` : key).toUpperCase();
    if (value === null || value === undefined) continue;
    if (typeof value === 'object' && !Array.isArray(value)) {
      flatten(value as Record<string, unknown>, flatKey, out);
    } else {
      out[flatKey] = Array.isArray(value) ? value.join(',') : String(value);
    }
  }
}

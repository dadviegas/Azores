// Widget manifest — the YAML schema that lives next to each widget. Loaded
// by the build (rspack yaml-loader) and validated through `parseWidgetManifest`
// at module-init time so a malformed manifest fails the build, not at runtime.

export type WidgetManifest = {
  name: string;
  title: string;
  description?: string;
  sources: ReadonlyArray<string>;
  // Optional override for the default cache TTL of any source this widget
  // queries. Format: humanised duration ("30m", "2h", "45s") or raw ms number.
  ttl?: string | number;
  defaultSize: { w: number; h: number };
  icon?: string;
  // True when the widget reads per-instance `data` so two instances can show
  // different things (e.g. weather for Azores and weather for Lisbon). The
  // dashboard library uses this to allow duplicates of configurable widgets
  // and block duplicates of fixed ones.
  configurable?: boolean;
};

const DURATION_RE = /^(\d+)\s*(ms|s|m|h|d)?$/i;

// "30m" → 1_800_000. Bare number → ms. Throws on garbage so a typo in a
// manifest stops the build.
export const parseDurationMs = (input: string | number): number => {
  if (typeof input === "number") {
    if (!Number.isFinite(input) || input < 0) {
      throw new Error(`parseDurationMs: invalid numeric duration "${input}"`);
    }
    return input;
  }
  const match = DURATION_RE.exec(input.trim());
  if (!match) throw new Error(`parseDurationMs: cannot parse "${input}"`);
  const n = Number(match[1]);
  const unit = (match[2] ?? "ms").toLowerCase();
  switch (unit) {
    case "ms":
      return n;
    case "s":
      return n * 1000;
    case "m":
      return n * 60_000;
    case "h":
      return n * 3_600_000;
    case "d":
      return n * 86_400_000;
    default:
      throw new Error(`parseDurationMs: unknown unit "${unit}"`);
  }
};

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

export const parseWidgetManifest = (raw: unknown): WidgetManifest => {
  if (!isObject(raw)) {
    throw new Error("parseWidgetManifest: manifest must be a YAML object");
  }
  const name = raw.name;
  const title = raw.title;
  const sources = raw.sources;
  const defaultSize = raw.defaultSize;

  if (typeof name !== "string" || !name) {
    throw new Error('parseWidgetManifest: missing "name"');
  }
  if (typeof title !== "string" || !title) {
    throw new Error(`parseWidgetManifest [${name}]: missing "title"`);
  }
  if (!Array.isArray(sources) || !sources.every((s) => typeof s === "string")) {
    throw new Error(`parseWidgetManifest [${name}]: "sources" must be a string array`);
  }
  if (
    !isObject(defaultSize) ||
    typeof defaultSize.w !== "number" ||
    typeof defaultSize.h !== "number"
  ) {
    throw new Error(`parseWidgetManifest [${name}]: "defaultSize" must be { w, h }`);
  }

  const ttl =
    typeof raw.ttl === "string" || typeof raw.ttl === "number" ? raw.ttl : undefined;
  // Validate eagerly so a typo fails at build, not at first request.
  if (ttl !== undefined) parseDurationMs(ttl);

  return {
    name,
    title,
    description: typeof raw.description === "string" ? raw.description : undefined,
    sources,
    ttl,
    defaultSize: { w: defaultSize.w, h: defaultSize.h },
    icon: typeof raw.icon === "string" ? raw.icon : undefined,
    configurable: typeof raw.configurable === "boolean" ? raw.configurable : false,
  };
};

export type SourceManifest = {
  name: string;
  url?: string;
  description?: string;
  ttl?: string | number;
};

export const parseSourceManifest = (raw: unknown): SourceManifest => {
  if (!isObject(raw)) throw new Error("parseSourceManifest: manifest must be an object");
  if (typeof raw.name !== "string" || !raw.name) {
    throw new Error('parseSourceManifest: missing "name"');
  }
  const ttl =
    typeof raw.ttl === "string" || typeof raw.ttl === "number" ? raw.ttl : undefined;
  if (ttl !== undefined) parseDurationMs(ttl);
  return {
    name: raw.name,
    url: typeof raw.url === "string" ? raw.url : undefined,
    description: typeof raw.description === "string" ? raw.description : undefined,
    ttl,
  };
};

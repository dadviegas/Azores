import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Icon,
  ICON_GROUPS,
  ICON_NAMES,
  Inline,
  Input,
} from "@azores/ui";
import { useToast } from "@azores/ux";

const SIZES = [16, 20, 24, 32, 40] as const;
type Size = (typeof SIZES)[number];

type Filter = "all" | string;

export const Icons = (): JSX.Element => {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState<Size>(20);
  const [stroke, setStroke] = useState(1.6);
  const [filter, setFilter] = useState<Filter>("all");
  const toast = useToast();

  const total = ICON_NAMES.length;

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ICON_GROUPS.filter((g) => filter === "all" || g.name === filter)
      .map((g) => ({
        ...g,
        icons: g.icons.filter((n) => !q || n.toLowerCase().includes(q)),
      }))
      .filter((g) => g.icons.length > 0);
  }, [query, filter]);

  const filteredCount = sections.reduce((s, g) => s + g.icons.length, 0);

  const copyTag = (name: string): void => {
    const tag = `<Icon name="${name}" />`;
    void navigator.clipboard?.writeText(tag);
    toast.push({ kind: "success", title: "Copied", message: tag, duration: 1800 });
  };

  return (
    <div className="az-content">
      <div className="az-page-eyebrow">VISUAL LIBRARY</div>
      <h1 className="az-page-title">Icons</h1>
      <p className="az-page-lead">
        A {total}-icon set drawn on a single 24×24 grid with a 1.6 stroke. Every glyph is one
        prop — <code>{`<Icon name="…" />`}</code>. Click to copy the tag.
      </p>

      <div
        style={{
          position: "sticky",
          top: 56,
          background: "var(--az-bg)",
          padding: "var(--az-s-3) 0",
          borderBottom: "1px solid var(--az-line)",
          marginBottom: "var(--az-s-6)",
          zIndex: 5,
        }}
      >
        <Inline gap={3} align="center" wrap>
          <Input
            placeholder={`Search ${total} icons by name…`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: "1 1 240px", maxWidth: 360 }}
          />
          <Inline gap={1} align="center">
            <span style={{ fontSize: 12, color: "var(--az-text-3)" }}>Size</span>
            {SIZES.map((s) => (
              <Button
                key={s}
                variant={size === s ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSize(s)}
              >
                {s}
              </Button>
            ))}
          </Inline>
          <Inline gap={2} align="center">
            <span style={{ fontSize: 12, color: "var(--az-text-3)" }}>Stroke</span>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.1"
              value={stroke}
              onChange={(e) => setStroke(parseFloat(e.target.value))}
              style={{ width: 100, accentColor: "var(--az-primary)" }}
              aria-label="Stroke width"
            />
            <span
              style={{
                fontSize: 12,
                color: "var(--az-text-2)",
                fontFamily: "var(--az-font-mono)",
                minWidth: 28,
              }}
            >
              {stroke.toFixed(1)}
            </span>
          </Inline>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--az-text-3)" }}>
            {filteredCount} of {total}
          </span>
        </Inline>

        <div
          style={{
            display: "flex",
            gap: 6,
            marginTop: 12,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          <ChipButton active={filter === "all"} onClick={() => setFilter("all")}>
            All <Badge tone="neutral">{total}</Badge>
          </ChipButton>
          {ICON_GROUPS.map((g) => (
            <ChipButton
              key={g.name}
              active={filter === g.name}
              onClick={() => setFilter(g.name)}
            >
              {g.name} <Badge tone="neutral">{g.icons.length}</Badge>
            </ChipButton>
          ))}
        </div>
      </div>

      {sections.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 64,
            color: "var(--az-text-3)",
            border: "1px dashed var(--az-line)",
            borderRadius: "var(--az-r-lg)",
            background: "var(--az-surface)",
          }}
        >
          <Icon name="search" size={32} style={{ opacity: 0.4 }} />
          <div style={{ marginTop: 12, fontSize: 14 }}>No icons match &ldquo;{query}&rdquo;</div>
          <Button
            style={{ marginTop: 12 }}
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {sections.map((g) => (
            <section key={g.name}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{g.name}</h2>
                <div style={{ flex: 1, height: 1, background: "var(--az-line)" }} />
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--az-text-3)",
                    fontFamily: "var(--az-font-mono)",
                  }}
                >
                  {g.icons.length}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(108px, 1fr))",
                  gap: 4,
                  border: "1px solid var(--az-line)",
                  borderRadius: "var(--az-r-lg)",
                  background: "var(--az-surface)",
                  padding: 8,
                }}
              >
                {g.icons.map((name) => (
                  <IconTile
                    key={name}
                    name={name}
                    size={size}
                    stroke={stroke}
                    onClick={() => copyTag(name)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

type IconTileProps = {
  name: string;
  size: Size;
  stroke: number;
  onClick: () => void;
};

const IconTile = ({ name, size, stroke, onClick }: IconTileProps): JSX.Element => (
  <button
    type="button"
    onClick={onClick}
    title={`<Icon name="${name}" />`}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      padding: "18px 6px 10px",
      border: "1px solid transparent",
      borderRadius: "var(--az-r-md)",
      background: "transparent",
      cursor: "pointer",
      color: "var(--az-text)",
      fontFamily: "inherit",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "var(--az-bg-2)";
      e.currentTarget.style.borderColor = "var(--az-line)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.borderColor = "transparent";
    }}
  >
    <Icon name={name} size={size} strokeWidth={stroke} />
    <span
      style={{
        fontSize: 10,
        color: "var(--az-text-3)",
        fontFamily: "var(--az-font-mono)",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  </button>
);

type ChipButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const ChipButton = ({ active, onClick, children }: ChipButtonProps): JSX.Element => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 12px",
      fontSize: 12,
      fontWeight: 500,
      color: active ? "var(--az-bg)" : "var(--az-text-2)",
      background: active ? "var(--az-text)" : "var(--az-surface)",
      border: `1px solid ${active ? "var(--az-text)" : "var(--az-line)"}`,
      borderRadius: 999,
      cursor: "pointer",
      whiteSpace: "nowrap",
      fontFamily: "inherit",
    }}
  >
    {children}
  </button>
);

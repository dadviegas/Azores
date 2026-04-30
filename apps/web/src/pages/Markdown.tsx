import { useState } from "react";
import { MarkdownEditor, MarkdownView } from "@azores/ux";
import { SAMPLE_BLOG, SAMPLE_DOCS } from "./markdownSamples";

type View = "blog" | "docs" | "editor";

const TABS: ReadonlyArray<{ id: View; label: string }> = [
  { id: "blog", label: "Blog post" },
  { id: "docs", label: "ngrok-style docs" },
  { id: "editor", label: "Live editor" },
];

const tabStyle = (active: boolean): React.CSSProperties => ({
  appearance: "none",
  border: "none",
  background: active ? "var(--az-surface)" : "transparent",
  color: active ? "var(--az-text)" : "var(--az-text-2)",
  padding: "6px 14px",
  borderRadius: 999,
  fontFamily: "inherit",
  fontSize: 13,
  fontWeight: active ? 500 : 400,
  cursor: "pointer",
  boxShadow: active ? "var(--az-shadow-xs)" : "none",
});

export const Markdown = (): JSX.Element => {
  const [view, setView] = useState<View>("blog");
  const [src, setSrc] = useState<string>(SAMPLE_BLOG);

  return (
    <div className="az-content" style={{ maxWidth: 1280 }}>
      <div className="az-page-eyebrow">MARKDOWN</div>
      <h1 className="az-page-title">Rich content, rendered live.</h1>
      <p className="az-page-lead">
        A custom markdown renderer with mermaid diagrams, math blocks, charts from JSON, callouts,
        syntax highlighting, and tables — for blogs, docs, and ngrok-style apps.
      </p>

      <div
        role="tablist"
        aria-label="Markdown showcase"
        style={{
          display: "inline-flex",
          gap: 4,
          padding: 4,
          background: "var(--az-bg-2)",
          border: "1px solid var(--az-line)",
          borderRadius: 999,
          marginBottom: 24,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={view === t.id}
            style={tabStyle(view === t.id)}
            onClick={() => setView(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {view === "editor" ? (
        <MarkdownEditor value={src} onChange={setSrc} />
      ) : (
        <div style={{ display: "grid", placeItems: "start center" }}>
          <MarkdownView source={view === "docs" ? SAMPLE_DOCS : SAMPLE_BLOG} />
        </div>
      )}
    </div>
  );
};

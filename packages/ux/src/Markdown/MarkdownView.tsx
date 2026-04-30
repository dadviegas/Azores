import { useMemo, type ReactNode } from "react";
import { Icon } from "@azores/ui";
import "katex/dist/katex.min.css";
import "./markdown.css";
import { Chart } from "./Chart.js";
import { CodeBlock } from "./CodeBlock.js";
import { Mermaid } from "./Mermaid.js";
import { parseMarkdown, type Block, type CalloutKind } from "./parse.js";

const CALLOUT_ICON: Record<CalloutKind, string> = {
  note: "info",
  tip: "success",
  warn: "warn",
  danger: "error",
};

const renderBlocks = (blocks: Block[]): ReactNode =>
  blocks.map((b, i) => {
    switch (b.k) {
      case "heading": {
        const tag = (`h${b.lvl}` as unknown) as keyof JSX.IntrinsicElements;
        const Tag = tag;
        return <Tag key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
      }
      case "p":
        return <p key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
      case "quote":
        return <blockquote key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
      case "list": {
        const ListTag = b.ordered ? "ol" : "ul";
        return (
          <ListTag key={i}>
            {b.items.map((it, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: it }} />
            ))}
          </ListTag>
        );
      }
      case "hr":
        return <hr key={i} />;
      case "code":
        return <CodeBlock key={i} lang={b.lang} body={b.body} />;
      case "math-block":
        return (
          <div
            key={i}
            className="az-md-math-block"
            dangerouslySetInnerHTML={{ __html: b.html }}
          />
        );
      case "table":
        return (
          <div key={i} className="az-md-table-wrap">
            <table>
              <thead>
                <tr>
                  {b.head.map((h, j) => (
                    <th key={j}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, j) => (
                  <tr key={j}>
                    {r.map((c, k) => (
                      <td key={k} dangerouslySetInnerHTML={{ __html: c }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "image":
        return (
          <figure key={i}>
            <div
              style={{
                aspectRatio: "16/9",
                background: "linear-gradient(135deg, var(--az-ocean-200), var(--az-ocean-500))",
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                color: "white",
                fontFamily: "var(--az-font-display)",
                fontSize: 32,
              }}
            >
              {b.alt}
            </div>
            <figcaption>{b.alt}</figcaption>
          </figure>
        );
      case "callout":
        return (
          <div key={i} className={`az-md-callout az-md-callout--${b.kind}`}>
            <div className="az-md-callout-icon">
              <Icon name={CALLOUT_ICON[b.kind]} size={18} />
            </div>
            <div className="az-md-callout-body">
              {b.title ? <strong style={{ display: "block", marginBottom: 4 }}>{b.title}</strong> : null}
              {renderBlocks(b.body)}
            </div>
          </div>
        );
      case "mermaid":
        return (
          <div key={i} className="az-md-mermaid">
            <Mermaid code={b.code} />
          </div>
        );
      case "chart":
        return <Chart key={i} data={b.data} />;
      default:
        return null;
    }
  });

export type MarkdownViewProps = {
  source: string;
  className?: string;
};

export const MarkdownView = ({ source, className }: MarkdownViewProps): JSX.Element => {
  const blocks = useMemo(() => parseMarkdown(source), [source]);
  return <div className={`az-md${className ? ` ${className}` : ""}`}>{renderBlocks(blocks)}</div>;
};

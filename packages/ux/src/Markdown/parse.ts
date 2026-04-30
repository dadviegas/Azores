// Tiny markdown parser ported from docs/design/Azores/page-markdown.jsx.
// Supports headings, bold/italic/code, lists, blockquotes, tables, code fences,
// callouts (`:::`), inline + block math (rendered via KaTeX), mermaid blocks,
// JSON chart blocks, HR, images, links, footnote refs.

import katex from "katex";

export type CalloutKind = "note" | "tip" | "warn" | "danger";

const renderMath = (expr: string, displayMode: boolean): string => {
  try {
    return katex.renderToString(expr, {
      displayMode,
      throwOnError: false,
      output: "html",
    });
  } catch {
    return expr;
  }
};

export type ChartData = {
  type?: "line" | "bar";
  title?: string;
  labels?: string[];
  series?: Array<{ name: string; data: number[] }>;
};

export type Block =
  | { k: "heading"; lvl: number; html: string }
  | { k: "p"; html: string }
  | { k: "quote"; html: string }
  | { k: "list"; ordered: boolean; items: string[] }
  | { k: "hr" }
  | { k: "code"; lang: string; body: string }
  | { k: "math-block"; html: string }
  | { k: "table"; head: string[]; rows: string[][] }
  | { k: "image"; alt: string; src: string }
  | { k: "callout"; kind: CalloutKind; title: string; body: Block[] }
  | { k: "mermaid"; code: string }
  | { k: "chart"; data: ChartData };

const inline = (input: string): string => {
  if (!input) return input;
  // Escape HTML
  let t = input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  // KaTeX-rendered output is already escaped HTML, so wrap in a span so the
  // outer div doesn't double-escape it.
  t = t.replace(/\$([^$]+)\$/g, (_m, expr: string) => renderMath(expr, false));
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  t = t.replace(/\[\^(\d+)\]/g, '<a class="az-md-fn-ref" href="#fn$1">[$1]</a>');
  return t;
};

export const parseMarkdown = (src: string): Block[] => {
  const lines = src.split("\n");
  const out: Block[] = [];
  let i = 0;
  let listBuf: { k: "list"; ordered: boolean; items: string[] } | null = null;

  const flushList = (): void => {
    if (listBuf) {
      out.push(listBuf);
      listBuf = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i] ?? "";

    if (/^```/.test(line)) {
      flushList();
      const lang = line.slice(3).trim();
      let body = "";
      i++;
      while (i < lines.length && !/^```/.test(lines[i] ?? "")) {
        body += (lines[i] ?? "") + "\n";
        i++;
      }
      i++;
      if (lang === "mermaid") {
        out.push({ k: "mermaid", code: body });
      } else if (lang === "chart") {
        try {
          const data = JSON.parse(body) as ChartData;
          out.push({ k: "chart", data });
        } catch {
          out.push({ k: "code", lang, body });
        }
      } else if (lang === "math") {
        out.push({ k: "math-block", html: renderMath(body.trim(), true) });
      } else {
        out.push({ k: "code", lang, body });
      }
      continue;
    }

    if (/^\$\$/.test(line)) {
      flushList();
      let body = "";
      i++;
      while (i < lines.length && !/^\$\$/.test(lines[i] ?? "")) {
        body += (lines[i] ?? "") + "\n";
        i++;
      }
      i++;
      out.push({ k: "math-block", html: renderMath(body.trim(), true) });
      continue;
    }

    const calloutMatch = line.match(/^:::(note|tip|warn|danger)\s*(.*)/);
    if (calloutMatch) {
      flushList();
      const kind = calloutMatch[1] as CalloutKind;
      const title = calloutMatch[2] ?? "";
      let body = "";
      i++;
      while (i < lines.length && !/^:::$/.test(lines[i] ?? "")) {
        body += (lines[i] ?? "") + "\n";
        i++;
      }
      i++;
      out.push({ k: "callout", kind, title, body: parseMarkdown(body) });
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s(.*)$/);
    if (headingMatch) {
      flushList();
      out.push({ k: "heading", lvl: headingMatch[1]!.length, html: inline(headingMatch[2] ?? "") });
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      flushList();
      let body = "";
      while (i < lines.length && /^>\s?/.test(lines[i] ?? "")) {
        body += (lines[i] ?? "").replace(/^>\s?/, "") + "\n";
        i++;
      }
      out.push({ k: "quote", html: inline(body.trim()) });
      continue;
    }

    const next = lines[i + 1];
    if (/^\|/.test(line) && next && /^\|[\s\-|:]+\|$/.test(next.trim())) {
      flushList();
      const head = line.split("|").slice(1, -1).map((s) => s.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i] ?? "")) {
        rows.push((lines[i] ?? "").split("|").slice(1, -1).map((s) => s.trim()));
        i++;
      }
      out.push({ k: "table", head, rows });
      continue;
    }

    if (/^[-*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      const ordered = /^\d+\.\s/.test(line);
      if (!listBuf) listBuf = { k: "list", ordered, items: [] };
      listBuf.items.push(inline(line.replace(/^([-*]|\d+\.)\s/, "")));
      i++;
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      flushList();
      out.push({ k: "hr" });
      i++;
      continue;
    }

    if (/^!\[/.test(line)) {
      flushList();
      const m = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
      if (m) {
        out.push({ k: "image", alt: m[1] ?? "", src: m[2] ?? "" });
        i++;
        continue;
      }
    }

    if (line.trim()) {
      flushList();
      let body = line;
      while (
        i + 1 < lines.length &&
        (lines[i + 1] ?? "").trim() &&
        !/^[#>!|`-]/.test(lines[i + 1] ?? "") &&
        !/^\d+\.\s/.test(lines[i + 1] ?? "")
      ) {
        i++;
        body += " " + (lines[i] ?? "");
      }
      out.push({ k: "p", html: inline(body) });
      i++;
      continue;
    }

    flushList();
    i++;
  }
  flushList();
  return out;
};

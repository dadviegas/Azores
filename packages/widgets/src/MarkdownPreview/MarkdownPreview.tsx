import { useMemo, useState } from "react";
import { Preview, TextArea, Wrap } from "./MarkdownPreview.styles.js";

const SAMPLE = `# Markdown preview

This widget renders **a useful subset** of Markdown without pulling in a
30KB dependency.

## Features

- Headers (\`#\` → \`###\`)
- **bold**, *italic*, \`inline code\`
- Lists, blockquotes
- [Links](https://example.com)

> Quote-style blocks read like this.

\`\`\`
fenced code blocks
\`\`\`
`;

const escape = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const inline = (s: string): string =>
  escape(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer noopener">$1</a>');

// Block-level pass: split on blank lines, recognise fenced code, headers,
// bullet/ordered lists, blockquotes, and paragraphs. Keeps the parser small
// enough to inline rather than pulling marked.js or remark.
const render = (src: string): string => {
  const lines = src.split(/\r?\n/);
  let html = "";
  let i = 0;
  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (/^```/.test(line)) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i] ?? "")) {
        buf.push(lines[i] ?? "");
        i++;
      }
      i++;
      html += `<pre>${escape(buf.join("\n"))}</pre>`;
      continue;
    }
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      html += `<h${h[1]!.length}>${inline(h[2] ?? "")}</h${h[1]!.length}>`;
      i++;
      continue;
    }
    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i] ?? "")) {
        buf.push((lines[i] ?? "").replace(/^>\s?/, ""));
        i++;
      }
      html += `<blockquote>${inline(buf.join(" "))}</blockquote>`;
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i] ?? "")) {
        items.push(inline((lines[i] ?? "").replace(/^\s*[-*]\s+/, "")));
        i++;
      }
      html += `<ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i] ?? "")) {
        items.push(inline((lines[i] ?? "").replace(/^\s*\d+\.\s+/, "")));
        i++;
      }
      html += `<ol>${items.map((x) => `<li>${x}</li>`).join("")}</ol>`;
      continue;
    }
    if (line.trim() === "") {
      i++;
      continue;
    }
    const buf: string[] = [];
    while (i < lines.length && (lines[i] ?? "").trim() !== "" && !/^(#|>|```|\s*[-*]\s|\s*\d+\.\s)/.test(lines[i] ?? "")) {
      buf.push(lines[i] ?? "");
      i++;
    }
    html += `<p>${inline(buf.join(" "))}</p>`;
  }
  return html;
};

export const MarkdownPreview = (): JSX.Element => {
  const [src, setSrc] = useState<string>(SAMPLE);
  const html = useMemo(() => render(src), [src]);
  return (
    <Wrap>
      <TextArea value={src} onChange={(e) => setSrc(e.target.value)} aria-label="Markdown source" />
      <Preview dangerouslySetInnerHTML={{ __html: html }} />
    </Wrap>
  );
};

export default MarkdownPreview;

// Azores — Markdown Demo (blog + ngrok-style docs + live editor)
const { useState: uSm, useMemo: uMm, useRef: uRm } = React;

/* Tiny markdown parser supporting headings, bold/italic/code, lists, blockquotes,
   tables, code fences, callouts, math ($...$ and $$...$$), mermaid blocks, charts. */
function parseMarkdown(src) {
  const lines = src.split("\n");
  const out = [];
  let i = 0;
  let listBuf = null;
  const flushList = () => { if (listBuf) { out.push(listBuf); listBuf = null; } };

  const inline = (t) => {
    if (!t) return t;
    // Escape HTML
    t = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // Inline code
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold
    t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    // Italic
    t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    // Inline math $...$
    t = t.replace(/\$([^$]+)\$/g, '<span class="az-md-math">$1</span>');
    // Links
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    // Footnote ref
    t = t.replace(/\[\^(\d+)\]/g, '<a class="az-md-fn-ref" href="#fn$1">[$1]</a>');
    return t;
  };

  while (i < lines.length) {
    const line = lines[i];

    // Code fence
    if (/^```/.test(line)) {
      flushList();
      const lang = line.slice(3).trim();
      let body = "";
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) { body += lines[i] + "\n"; i++; }
      i++;
      if (lang === "mermaid") out.push({ k: "mermaid", code: body });
      else if (lang === "chart") {
        try { out.push({ k: "chart", data: JSON.parse(body) }); } catch { out.push({ k: "code", lang, body }); }
      } else if (lang === "math") out.push({ k: "math-block", body: body.trim() });
      else out.push({ k: "code", lang, body });
      continue;
    }
    // $$ math block
    if (/^\$\$/.test(line)) {
      flushList();
      let body = "";
      i++;
      while (i < lines.length && !/^\$\$/.test(lines[i])) { body += lines[i] + "\n"; i++; }
      i++;
      out.push({ k: "math-block", body: body.trim() });
      continue;
    }
    // Callout :::type
    if (/^:::(note|tip|warn|danger)/.test(line)) {
      flushList();
      const m = line.match(/^:::(note|tip|warn|danger)\s*(.*)/);
      const kind = m[1]; const title = m[2];
      let body = "";
      i++;
      while (i < lines.length && !/^:::$/.test(lines[i])) { body += lines[i] + "\n"; i++; }
      i++;
      out.push({ k: "callout", kind, title, body: parseMarkdown(body) });
      continue;
    }
    // Heading
    if (/^#{1,4}\s/.test(line)) {
      flushList();
      const lvl = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s/, "");
      out.push({ k: "heading", lvl, html: inline(text) });
      i++;
      continue;
    }
    // Blockquote
    if (/^>\s?/.test(line)) {
      flushList();
      let body = "";
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        body += lines[i].replace(/^>\s?/, "") + "\n";
        i++;
      }
      out.push({ k: "quote", html: inline(body.trim()) });
      continue;
    }
    // Table (simple: pipe rows, optional --- separator)
    if (/^\|/.test(line) && lines[i + 1] && /^\|[\s\-|:]+\|$/.test(lines[i + 1].trim())) {
      flushList();
      const head = line.split("|").slice(1, -1).map(s => s.trim());
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        rows.push(lines[i].split("|").slice(1, -1).map(s => s.trim()));
        i++;
      }
      out.push({ k: "table", head, rows });
      continue;
    }
    // List
    if (/^[-*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      const ordered = /^\d+\.\s/.test(line);
      if (!listBuf) listBuf = { k: "list", ordered, items: [] };
      listBuf.items.push(inline(line.replace(/^([-*]|\d+\.)\s/, "")));
      i++;
      continue;
    }
    // HR
    if (/^---+\s*$/.test(line)) { flushList(); out.push({ k: "hr" }); i++; continue; }
    // Image ![alt](url)
    if (/^!\[/.test(line)) {
      flushList();
      const m = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
      if (m) { out.push({ k: "image", alt: m[1], src: m[2] }); i++; continue; }
    }
    // Paragraph
    if (line.trim()) {
      flushList();
      let body = line;
      while (i + 1 < lines.length && lines[i + 1].trim() && !/^[#>!|`-]/.test(lines[i + 1]) && !/^\d+\.\s/.test(lines[i + 1])) {
        i++;
        body += " " + lines[i];
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
}

function highlightCode(code, lang) {
  let h = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const KW = {
    js: "const|let|var|function|return|if|else|for|while|do|class|extends|new|import|export|from|as|async|await|=&gt;|try|catch|finally|throw|typeof|instanceof|of|in|null|undefined|true|false|this|super",
    py: "def|class|return|if|elif|else|for|while|in|not|and|or|is|import|from|as|with|try|except|finally|raise|lambda|None|True|False|self|yield|pass|break|continue|global|nonlocal",
    rust: "fn|let|mut|const|static|struct|enum|impl|trait|pub|use|mod|crate|self|Self|match|if|else|for|while|loop|return|ref|move|as|in|where|async|await|true|false",
    go: "func|var|const|type|struct|interface|package|import|return|if|else|for|range|switch|case|default|break|continue|defer|go|chan|map|nil|true|false",
    sql: "SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|AS|AND|OR|NOT|IN|LIKE|IS|NULL|TRUE|FALSE|DISTINCT|COUNT|SUM|AVG|MIN|MAX",
    css: "important",
  };
  const langN = (lang || "").toLowerCase();
  const lkey = ["js","javascript","jsx","ts","typescript","tsx"].includes(langN) ? "js"
    : ["py","python"].includes(langN) ? "py"
    : ["rust","rs"].includes(langN) ? "rust"
    : ["go","golang"].includes(langN) ? "go"
    : ["sql"].includes(langN) ? "sql"
    : null;

  if (lkey) {
    if (lkey === "py") h = h.replace(/(#[^\n]*)/g, '<span class="tok-com">$1</span>');
    else if (lkey === "sql") h = h.replace(/(--[^\n]*)/g, '<span class="tok-com">$1</span>');
    else h = h.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, '<span class="tok-com">$1</span>');
    h = h.replace(/("[^"]*"|'[^']*'|`[^`]*`)/g, '<span class="tok-str">$1</span>');
    if (lkey === "sql") {
      const re = new RegExp(`\\b(${KW.sql})\\b`, "gi");
      h = h.replace(re, '<span class="tok-kw">$1</span>');
    } else {
      const re = new RegExp(`\\b(${KW[lkey]})\\b`, "g");
      h = h.replace(re, '<span class="tok-kw">$1</span>');
    }
    h = h.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-num">$1</span>');
    if (["js","go","rust"].includes(lkey)) {
      h = h.replace(/([A-Za-z_][A-Za-z0-9_]*)(\s*\()/g, '<span class="tok-fn">$1</span>$2');
    }
  } else if (langN === "bash" || langN === "sh" || langN === "shell") {
    h = h.replace(/(#[^\n]*)/g, '<span class="tok-com">$1</span>');
    h = h.replace(/^(\$\s)/gm, '<span class="tok-fn">$1</span>');
    h = h.replace(/("[^"]*"|'[^']*')/g, '<span class="tok-str">$1</span>');
    h = h.replace(/(\s)(--?[a-z][a-z0-9-]*)/gi, '$1<span class="tok-num">$2</span>');
  } else if (langN === "json") {
    h = h.replace(/("[^"]*")(\s*:)/g, '<span class="tok-fn">$1</span>$2');
    h = h.replace(/:\s*("[^"]*")/g, ': <span class="tok-str">$1</span>');
    h = h.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-num">$1</span>');
    h = h.replace(/\b(true|false|null)\b/g, '<span class="tok-kw">$1</span>');
  } else if (langN === "css") {
    h = h.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-com">$1</span>');
    h = h.replace(/(--[a-z0-9-]+)/gi, '<span class="tok-fn">$1</span>');
    h = h.replace(/(#[0-9a-f]{3,8}\b)/gi, '<span class="tok-num">$1</span>');
    h = h.replace(/\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|ms)?)\b/g, '<span class="tok-num">$1</span>');
  } else if (langN === "html" || langN === "xml") {
    h = h.replace(/(&lt;\/?[a-z][a-z0-9-]*)/gi, '<span class="tok-kw">$1</span>');
    h = h.replace(/([a-z-]+)(=)("[^"]*")/gi, '<span class="tok-fn">$1</span>$2<span class="tok-str">$3</span>');
  } else if (langN === "diff") {
    h = h.split("\n").map(line => {
      if (line.startsWith("+")) return `<span class="tok-str">${line}</span>`;
      if (line.startsWith("-")) return `<span class="tok-kw">${line}</span>`;
      if (line.startsWith("@@")) return `<span class="tok-com">${line}</span>`;
      return line;
    }).join("\n");
  }
  return h;
}

/* ------- Mermaid renderer (very basic flowchart only) ------- */
function MermaidRender({ code }) {
  // Parse: "graph TD" / "graph LR" plus "A[label] --> B[label]"
  const lines = code.trim().split("\n").map(l => l.trim()).filter(Boolean);
  const dir = (lines[0].match(/graph (LR|TD|TB|RL)/) || [])[1] || "TD";
  const horiz = dir === "LR" || dir === "RL";
  const nodes = {}; const edges = [];
  const nodeRe = /([A-Za-z0-9_]+)(?:\[([^\]]+)\]|\(([^)]+)\)|\{([^}]+)\})?/g;

  for (let li = 1; li < lines.length; li++) {
    const ln = lines[li];
    const arrowM = ln.match(/(.+?)\s*--\s*(?:\|([^|]+)\|\s*)?-->\s*(.+)/) || ln.match(/(.+?)\s*-->\s*(.+)/);
    if (arrowM) {
      const [, l, label, r] = arrowM.length === 4 ? arrowM : [arrowM[0], arrowM[1], "", arrowM[2]];
      const parseSide = (s) => {
        const m = s.trim().match(/^([A-Za-z0-9_]+)(?:\[([^\]]+)\]|\(([^)]+)\)|\{([^}]+)\})?/);
        if (!m) return null;
        const id = m[1]; const lbl = m[2] || m[3] || m[4] || id;
        const shape = m[2] ? "rect" : m[3] ? "round" : m[4] ? "rhombus" : "rect";
        if (!nodes[id]) nodes[id] = { id, label: lbl, shape };
        else if (m[2] || m[3] || m[4]) nodes[id] = { id, label: lbl, shape };
        return id;
      };
      const a = parseSide(l), b = parseSide(r);
      if (a && b) edges.push({ a, b, label });
    }
  }

  // Layout (very simple BFS layering)
  const ids = Object.keys(nodes);
  const adj = {}, indeg = {};
  ids.forEach(id => { adj[id] = []; indeg[id] = 0; });
  edges.forEach(({ a, b }) => { adj[a].push(b); indeg[b]++; });
  const layers = [];
  let frontier = ids.filter(id => indeg[id] === 0);
  const seen = new Set();
  while (frontier.length) {
    layers.push(frontier);
    frontier.forEach(id => seen.add(id));
    const next = [];
    frontier.forEach(id => adj[id].forEach(b => { indeg[b]--; if (indeg[b] === 0) next.push(b); }));
    frontier = next;
  }
  ids.forEach(id => { if (!seen.has(id)) layers[layers.length - 1] = (layers[layers.length - 1] || []).concat(id); });

  const nodeW = 130, nodeH = 50, gapX = 60, gapY = 30;
  const pos = {};
  layers.forEach((layer, li) => {
    layer.forEach((id, ci) => {
      if (horiz) pos[id] = { x: 30 + li * (nodeW + gapX), y: 30 + ci * (nodeH + gapY) };
      else pos[id] = { x: 30 + ci * (nodeW + gapX), y: 30 + li * (nodeH + gapY) };
    });
  });
  const maxX = Math.max(...Object.values(pos).map(p => p.x + nodeW)) + 30;
  const maxY = Math.max(...Object.values(pos).map(p => p.y + nodeH)) + 30;

  return (
    <svg viewBox={`0 0 ${maxX} ${maxY}`} style={{ width: "100%", maxWidth: maxX, height: "auto" }}>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--az-text-3)" />
        </marker>
      </defs>
      {edges.map((e, i) => {
        const a = pos[e.a], b = pos[e.b];
        if (!a || !b) return null;
        const x1 = a.x + nodeW / 2, y1 = a.y + nodeH;
        const x2 = b.x + nodeW / 2, y2 = b.y;
        const mx = horiz ? (a.x + nodeW) : x1;
        const my = horiz ? a.y + nodeH / 2 : y1;
        const ex = horiz ? b.x : x2;
        const ey = horiz ? b.y + nodeH / 2 : y2;
        const path = horiz
          ? `M ${mx} ${my} C ${(mx + ex) / 2} ${my}, ${(mx + ex) / 2} ${ey}, ${ex} ${ey}`
          : `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
        return (
          <g key={i}>
            <path d={path} fill="none" stroke="var(--az-text-3)" strokeWidth="1.5" markerEnd="url(#arr)" />
            {e.label && <text x={(mx + ex) / 2} y={(my + ey) / 2 - 4} textAnchor="middle" fontSize="11" fill="var(--az-text-2)" style={{ fontFamily: "var(--az-font-mono)" }}>{e.label}</text>}
          </g>
        );
      })}
      {Object.values(nodes).map(n => {
        const p = pos[n.id]; if (!p) return null;
        const cx = p.x + nodeW / 2, cy = p.y + nodeH / 2;
        return (
          <g key={n.id}>
            {n.shape === "rhombus" ? (
              <polygon points={`${cx},${p.y} ${p.x + nodeW},${cy} ${cx},${p.y + nodeH} ${p.x},${cy}`} fill="var(--az-amber-50, #FBF2DD)" stroke="var(--az-amber-500)" strokeWidth="1.5" />
            ) : n.shape === "round" ? (
              <rect x={p.x} y={p.y} width={nodeW} height={nodeH} rx="20" fill="var(--az-lava-50)" stroke="var(--az-lava-400)" strokeWidth="1.5" />
            ) : (
              <rect x={p.x} y={p.y} width={nodeW} height={nodeH} rx="6" fill="var(--az-ocean-50)" stroke="var(--az-ocean-500)" strokeWidth="1.5" />
            )}
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="12" fontWeight="500" fill="var(--az-text)" style={{ fontFamily: "var(--az-font-sans)" }}>{n.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ChartRender({ data }) {
  const { type = "line", title, series = [], labels = [] } = data;
  const W = 600, H = 240, pad = 36;
  if (type === "bar") {
    const all = series[0]?.data || [];
    const max = Math.max(...all);
    const bw = (W - pad * 2) / all.length;
    return (
      <div className="az-md-chart">
        {title && <div className="az-md-chart-title">{title}</div>}
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 240 }}>
          {[0,1,2,3].map(i => (
            <line key={i} x1={pad} y1={pad + i*(H-pad*2)/3} x2={W-pad} y2={pad + i*(H-pad*2)/3} stroke="var(--az-line)" strokeDasharray="2 4" />
          ))}
          {all.map((v, i) => {
            const h = (v / max) * (H - pad * 2);
            return <rect key={i} x={pad + i * bw + 4} y={H - pad - h} width={bw - 8} height={h} fill="var(--az-primary)" rx="3" />;
          })}
          {labels.map((l, i) => (
            <text key={i} x={pad + i * bw + bw / 2} y={H - 12} textAnchor="middle" fontSize="11" fill="var(--az-text-3)">{l}</text>
          ))}
        </svg>
      </div>
    );
  }
  // line
  const colors = ["var(--az-primary)", "var(--az-lava-400)", "var(--az-moss-500)"];
  const allVals = series.flatMap(s => s.data);
  const max = Math.max(...allVals), min = Math.min(...allVals, 0);
  return (
    <div className="az-md-chart">
      {title && <div className="az-md-chart-title">{title}</div>}
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 240 }}>
        {[0,1,2,3].map(i => (
          <line key={i} x1={pad} y1={pad + i*(H-pad*2)/3} x2={W-pad} y2={pad + i*(H-pad*2)/3} stroke="var(--az-line)" strokeDasharray="2 4" />
        ))}
        {series.map((s, si) => {
          const xs = s.data.map((_, i) => pad + (i * (W - pad * 2)) / (s.data.length - 1));
          const ys = s.data.map(v => H - pad - ((v - min) / (max - min)) * (H - pad * 2));
          const d = xs.map((x, i) => `${i ? "L" : "M"} ${x} ${ys[i]}`).join(" ");
          return <path key={si} d={d} fill="none" stroke={colors[si % colors.length]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
        })}
        {labels.map((l, i) => {
          const x = pad + (i * (W - pad * 2)) / (labels.length - 1);
          return <text key={i} x={x} y={H - 12} textAnchor="middle" fontSize="11" fill="var(--az-text-3)">{l}</text>;
        })}
        {series.map((s, si) => (
          <g key={si}>
            <rect x={pad + si*100} y={8} width={10} height={10} fill={colors[si % colors.length]} rx="2" />
            <text x={pad + si*100 + 16} y={17} fontSize="11" fill="var(--az-text-2)">{s.name}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function CodeBlock({ lang, body }) {
  const [copied, setCopied] = uSm(false);
  const [actualLang, filename] = (lang || "").includes(":") ? lang.split(":") : [lang, null];
  const ref = uRm(null);
  const trimmed = body.replace(/\n$/, "");

  React.useEffect(() => {
    if (ref.current && window.hljs) {
      try {
        const result = actualLang && window.hljs.getLanguage(actualLang)
          ? window.hljs.highlight(trimmed, { language: actualLang, ignoreIllegals: true })
          : window.hljs.highlightAuto(trimmed);
        ref.current.innerHTML = result.value;
      } catch (e) {
        ref.current.textContent = trimmed;
      }
    }
  }, [trimmed, actualLang]);

  const copy = () => {
    navigator.clipboard?.writeText(trimmed);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  const lineCount = trimmed.split("\n").length;

  return (
    <div className="az-md-codeblock">
      <div className="az-md-codeblock-head">
        <div className="az-md-codeblock-traffic">
          <span></span><span></span><span></span>
        </div>
        {filename && <span className="az-md-codeblock-name">{filename}</span>}
        <span className="az-md-codeblock-lang">{actualLang || "text"}</span>
      </div>
      <button className={`az-md-codeblock-copy ${copied ? "is-copied" : ""}`} onClick={copy} aria-label="Copy code" title="Copy code">
        <Icon name={copied ? "check" : "copy"} size={13} />
        <span className="az-md-codeblock-copy-label">Copied</span>
      </button>
      <div className="az-md-codeblock-wrap">
        <div className="az-md-codeblock-gutter" aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <pre className="az-md-codeblock-body"><code ref={ref} className={`hljs language-${actualLang || ""}`}>{trimmed}</code></pre>
      </div>
    </div>
  );
}

function renderBlocks(blocks) {
  return blocks.map((b, i) => {
    switch (b.k) {
      case "heading":
        const Tag = `h${b.lvl}`;
        return <Tag key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
      case "p": return <p key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
      case "quote": return <blockquote key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
      case "list":
        const ListTag = b.ordered ? "ol" : "ul";
        return <ListTag key={i}>{b.items.map((it, j) => <li key={j} dangerouslySetInnerHTML={{ __html: it }} />)}</ListTag>;
      case "hr": return <hr key={i} />;
      case "code":
        return <CodeBlock key={i} lang={b.lang} body={b.body} />;
      case "math-block":
        return <div key={i} className="az-md-math-block">{b.body}</div>;
      case "table":
        return (
          <table key={i}>
            <thead><tr>{b.head.map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k} dangerouslySetInnerHTML={{ __html: c }} />)}</tr>)}</tbody>
          </table>
        );
      case "image":
        return <figure key={i}><div style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, var(--az-ocean-200), var(--az-ocean-500))", borderRadius: 10, display: "grid", placeItems: "center", color: "white", fontFamily: "var(--az-font-display)", fontSize: 32 }}>{b.alt}</div><figcaption>{b.alt}</figcaption></figure>;
      case "callout":
        return (
          <div key={i} className={`az-md-callout az-md-callout--${b.kind === "warn" ? "warn" : b.kind}`}>
            <div className="az-md-callout-icon"><Icon name={b.kind === "tip" ? "success" : b.kind === "warn" ? "warn" : b.kind === "danger" ? "error" : "info"} size={18} /></div>
            <div className="az-md-callout-body">
              {b.title && <strong style={{ display: "block", marginBottom: 4 }}>{b.title}</strong>}
              {renderBlocks(b.body)}
            </div>
          </div>
        );
      case "mermaid":
        return <div key={i} className="az-md-mermaid"><MermaidRender code={b.code} /></div>;
      case "chart":
        return <ChartRender key={i} data={b.data} />;
      default: return null;
    }
  });
}

const SAMPLE_BLOG = `# Engineering at the edge of the Atlantic

How we built Azores Cloud — a regional-first platform that ships sub-20ms latency to all of Western Europe — and what we learned along the way.

:::note Heads up
This is a long-form post. Estimated reading time: **8 minutes**.
:::

## The premise

When we started Azores in 2024, every cloud provider was still pretending the world was flat. We didn't buy it. Latency *matters*, and the closer you can put compute to your users, the more humane your product feels.

Our north star metric: **p95 cold-start under 50ms** anywhere in EU-West.

## Architecture in one diagram

\`\`\`mermaid
graph LR
  Client[Client] --> Edge(Edge proxy)
  Edge --> Router{Region router}
  Router --> Lisbon[Lisbon]
  Router --> Frankfurt[Frankfurt]
  Lisbon --> DB[(Postgres)]
  Frankfurt --> DB
\`\`\`

Three pieces:
- An **edge proxy** terminates TLS in 30+ POPs
- A **region router** picks the cheapest healthy region for each request
- A **leader-follower Postgres** keeps writes consistent

## The numbers so far

\`\`\`chart
{
  "type": "line",
  "title": "p95 latency by region (ms)",
  "labels": ["Jan", "Feb", "Mar", "Apr"],
  "series": [
    { "name": "Lisbon",    "data": [142, 118, 96, 84] },
    { "name": "Frankfurt", "data": [156, 134, 112, 98] }
  ]
}
\`\`\`

> Latency is a feature. Treat it like one.

## A bit of math

For a request hitting region $r$ from client $c$, the wall-clock latency is:

$$
T_{c,r} = T_{net}(c, r) + T_{queue}(r) + T_{proc}(r)
$$

Our router minimizes the expected sum across healthy regions $r \\in R$.

## Code we ship

\`\`\`js
async function route(req) {
  const region = await pickRegion(req);
  const t0 = performance.now();
  const res = await fetchFromRegion(region, req);
  metrics.observe(region, performance.now() - t0);
  return res;
}
\`\`\`

## What's next

| Quarter | Milestone | Status |
| --- | --- | --- |
| Q2 | São Miguel region GA | Shipping |
| Q2 | SOC 2 Type II | In review |
| Q3 | Edge Functions v2 | Designing |
| Q3 | Postgres branching | Exploring |

:::tip Try it yourself
\`\`\`bash
$ npm i -g @azores/cli
$ azores deploy
\`\`\`
:::

Thanks for reading. — _The Azores team_
`;

const SAMPLE_DOCS = `# Tunneling with ngrok-style routes

Expose any local service to the public internet in seconds.

## Quickstart

\`\`\`bash:terminal
$ azores tunnel http 3000
Forwarding   https://blue-orca-92.azores.app -> http://localhost:3000
Region       lisbon
Latency      8ms
\`\`\`

That's it. Your local app is now public.

:::warn Security note
Tunnels are public by default. Add \`--auth user:pass\` for basic auth, or \`--allow-cidr\` to restrict by IP.
:::

## Anatomy of a tunnel

\`\`\`mermaid
graph TD
  Local[Local app :3000] --> Agent(Azores agent)
  Agent --> Edge[Edge POP]
  Edge --> Public((Public URL))
\`\`\`

## Configuration

| Flag | Default | Description |
| --- | --- | --- |
| \`--region\` | \`lisbon\` | Edge POP to bind to |
| \`--subdomain\` | random | Custom subdomain (paid) |
| \`--auth\` | — | HTTP basic auth |
| \`--inspect\` | \`true\` | Local request inspector |

## Programmatic SDK

\`\`\`python:tunnel.py
from azores import Tunnel

with Tunnel.http(3000, region="lisbon") as t:
    print(f"Public URL: {t.url}")
    t.wait_forever()
\`\`\`

\`\`\`go:main.go
package main

import "github.com/azores/sdk-go"

func main() {
    t, _ := azores.NewTunnel(azores.HTTP(3000))
    defer t.Close()
    select {}
}
\`\`\`

\`\`\`rust:main.rs
use azores::Tunnel;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let t = Tunnel::http(3000).region("lisbon").start().await?;
    println!("public: {}", t.url());
    t.wait().await
}
\`\`\`

## Querying tunnel logs

\`\`\`sql
SELECT region, count(*) AS req, avg(latency_ms) AS p50
FROM tunnel_logs
WHERE created_at > now() - interval '1 hour'
GROUP BY region
ORDER BY req DESC;
\`\`\`

## Diff: v1 → v2 config

\`\`\`diff
  [tunnel]
  port = 3000
- region = "default"
+ region = "lisbon"
+ inspect = true
\`\`\`

## Pricing math

Each tunnel uses metered bandwidth. Cost per month:

$$
\\text{cost} = \\text{base} + (\\text{GB out}) \\times \\$0.02
$$

:::tip Free tier
First **5 GB/month** are free. No card required.
:::

## Troubleshooting

- **\`ECONNREFUSED\`** — the local port isn't listening yet
- **TLS errors** — pass \`--insecure-local\` if hitting an HTTPS app on localhost
- **Slow** — try a closer region with \`--region frankfurt\`

> If your tunnel disconnects, the agent reconnects automatically with exponential backoff.
`;

function MarkdownPage() {
  const [view, setView] = uSm("blog"); // blog | docs | editor
  const [src, setSrc] = uSm(SAMPLE_BLOG);

  const blocks = uMm(() => parseMarkdown(view === "docs" ? SAMPLE_DOCS : view === "editor" ? src : SAMPLE_BLOG), [view, src]);

  return (
    <div>
      <div style={{ padding: "32px 48px 0", maxWidth: 1280 }}>
        <div className="az-page-eyebrow">MARKDOWN</div>
        <h1 className="az-page-title">Rich content, rendered live.</h1>
        <p className="az-page-lead">
          A custom markdown renderer with mermaid diagrams, KaTeX-style math, charts from JSON,
          callouts, syntax highlighting, and tables — for blogs, docs, and ngrok-style apps.
        </p>
        <div className="az-tabs--pill az-tabs" style={{ marginBottom: 0 }}>
          {[["blog","Blog post"],["docs","ngrok-style docs"],["editor","Live editor"]].map(([k,l]) => (
            <button key={k} className={`az-tab ${view===k?"is-active":""}`} onClick={() => setView(k)}>{l}</button>
          ))}
        </div>
      </div>

      {view === "editor" ? (
        <div className="az-md-editor">
          <div style={{ display: "flex", flexDirection: "column", borderRight: "1px solid var(--az-line)" }}>
            <div className="az-md-editor-toolbar">
              {[["bold","B"],["italic","I"],["quote",">"],["code","</>"],["link","🔗"],["list","≡"]].map(([ic,l]) => (
                <button key={ic} className="az-md-tb-btn"><Icon name={ic} size={12} />{l}</button>
              ))}
              <div style={{ flex: 1 }}></div>
              <span style={{ fontSize: 11, color: "var(--az-text-3)", fontFamily: "var(--az-font-mono)" }}>{src.length} chars</span>
            </div>
            <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
              <textarea className="az-md-editor-input" value={src} onChange={e => setSrc(e.target.value)} />
            </div>
          </div>
          <div className="az-md-editor-pane">
            <div className="az-md">{renderBlocks(blocks)}</div>
          </div>
        </div>
      ) : (
        <div style={{ padding: "16px 48px 64px", display: "grid", placeItems: "start center" }}>
          <div className="az-md">{renderBlocks(blocks)}</div>
        </div>
      )}
    </div>
  );
}

window.MarkdownPage = MarkdownPage;

// Tiny manual syntax highlighter ported from
// docs/design/Azores/page-markdown.jsx. Returns HTML with <span class="tok-*">
// wrappers; the .az-md stylesheet provides the colours.

const KEYWORDS: Record<string, string> = {
  js: "const|let|var|function|return|if|else|for|while|do|class|extends|new|import|export|from|as|async|await|=&gt;|try|catch|finally|throw|typeof|instanceof|of|in|null|undefined|true|false|this|super",
  py: "def|class|return|if|elif|else|for|while|in|not|and|or|is|import|from|as|with|try|except|finally|raise|lambda|None|True|False|self|yield|pass|break|continue|global|nonlocal",
  rust:
    "fn|let|mut|const|static|struct|enum|impl|trait|pub|use|mod|crate|self|Self|match|if|else|for|while|loop|return|ref|move|as|in|where|async|await|true|false",
  go: "func|var|const|type|struct|interface|package|import|return|if|else|for|range|switch|case|default|break|continue|defer|go|chan|map|nil|true|false",
  sql: "SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|AS|AND|OR|NOT|IN|LIKE|IS|NULL|TRUE|FALSE|DISTINCT|COUNT|SUM|AVG|MIN|MAX",
};

const escape = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const highlightCode = (code: string, lang: string): string => {
  let h = escape(code);
  const langN = (lang || "").toLowerCase();
  const lkey =
    ["js", "javascript", "jsx", "ts", "typescript", "tsx"].includes(langN)
      ? "js"
      : ["py", "python"].includes(langN)
        ? "py"
        : ["rust", "rs"].includes(langN)
          ? "rust"
          : ["go", "golang"].includes(langN)
            ? "go"
            : ["sql"].includes(langN)
              ? "sql"
              : null;

  if (lkey) {
    if (lkey === "py") h = h.replace(/(#[^\n]*)/g, '<span class="tok-com">$1</span>');
    else if (lkey === "sql") h = h.replace(/(--[^\n]*)/g, '<span class="tok-com">$1</span>');
    else h = h.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, '<span class="tok-com">$1</span>');
    h = h.replace(/("[^"]*"|'[^']*'|`[^`]*`)/g, '<span class="tok-str">$1</span>');
    if (lkey === "sql") {
      const re = new RegExp(`\\b(${KEYWORDS.sql})\\b`, "gi");
      h = h.replace(re, '<span class="tok-kw">$1</span>');
    } else {
      const re = new RegExp(`\\b(${KEYWORDS[lkey]})\\b`, "g");
      h = h.replace(re, '<span class="tok-kw">$1</span>');
    }
    h = h.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-num">$1</span>');
    if (["js", "go", "rust"].includes(lkey)) {
      h = h.replace(/([A-Za-z_][A-Za-z0-9_]*)(\s*\()/g, '<span class="tok-fn">$1</span>$2');
    }
    return h;
  }

  if (langN === "bash" || langN === "sh" || langN === "shell") {
    h = h.replace(/(#[^\n]*)/g, '<span class="tok-com">$1</span>');
    h = h.replace(/^(\$\s)/gm, '<span class="tok-fn">$1</span>');
    h = h.replace(/("[^"]*"|'[^']*')/g, '<span class="tok-str">$1</span>');
    h = h.replace(/(\s)(--?[a-z][a-z0-9-]*)/gi, '$1<span class="tok-num">$2</span>');
    return h;
  }

  if (langN === "json") {
    h = h.replace(/("[^"]*")(\s*:)/g, '<span class="tok-fn">$1</span>$2');
    h = h.replace(/:\s*("[^"]*")/g, ': <span class="tok-str">$1</span>');
    h = h.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-num">$1</span>');
    h = h.replace(/\b(true|false|null)\b/g, '<span class="tok-kw">$1</span>');
    return h;
  }

  if (langN === "css") {
    h = h.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-com">$1</span>');
    h = h.replace(/(--[a-z0-9-]+)/gi, '<span class="tok-fn">$1</span>');
    h = h.replace(/(#[0-9a-f]{3,8}\b)/gi, '<span class="tok-num">$1</span>');
    h = h.replace(
      /\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|ms)?)\b/g,
      '<span class="tok-num">$1</span>',
    );
    return h;
  }

  if (langN === "html" || langN === "xml") {
    h = h.replace(/(&lt;\/?[a-z][a-z0-9-]*)/gi, '<span class="tok-kw">$1</span>');
    h = h.replace(/([a-z-]+)(=)("[^"]*")/gi, '<span class="tok-fn">$1</span>$2<span class="tok-str">$3</span>');
    return h;
  }

  if (langN === "diff") {
    return h
      .split("\n")
      .map((line) => {
        if (line.startsWith("+")) return `<span class="tok-str">${line}</span>`;
        if (line.startsWith("-")) return `<span class="tok-kw">${line}</span>`;
        if (line.startsWith("@@")) return `<span class="tok-com">${line}</span>`;
        return line;
      })
      .join("\n");
  }

  return h;
};

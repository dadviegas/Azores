import { useEffect, useRef, useState } from "react";
import { Icon } from "@azores/ui";
import { highlightCode } from "./highlight.js";

export type CodeBlockProps = {
  lang: string;
  body: string;
};

export const CodeBlock = ({ lang, body }: CodeBlockProps): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const [actualLang, filename] = lang.includes(":")
    ? (lang.split(":") as [string, string])
    : ([lang, null] as [string, string | null]);
  const trimmed = body.replace(/\n$/, "");

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = highlightCode(trimmed, actualLang);
    }
  }, [trimmed, actualLang]);

  const copy = (): void => {
    void navigator.clipboard?.writeText(trimmed);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const lineCount = trimmed.split("\n").length;

  return (
    <div className="az-md-codeblock">
      <div className="az-md-codeblock-head">
        <div className="az-md-codeblock-traffic">
          <span />
          <span />
          <span />
        </div>
        {filename ? <span className="az-md-codeblock-name">{filename}</span> : null}
        <span className="az-md-codeblock-lang">{actualLang || "text"}</span>
      </div>
      <button
        className={`az-md-codeblock-copy${copied ? " is-copied" : ""}`}
        onClick={copy}
        aria-label="Copy code"
        title="Copy code"
      >
        <Icon name={copied ? "check" : "copy"} size={13} />
        <span className="az-md-codeblock-copy-label">Copied</span>
      </button>
      <div className="az-md-codeblock-wrap">
        <div className="az-md-codeblock-gutter" aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="az-md-codeblock-body">
          <code ref={codeRef} className={`hljs language-${actualLang || ""}`}>
            {trimmed}
          </code>
        </pre>
      </div>
    </div>
  );
};

import { useMemo, useState } from "react";
import { Input, Out, Wrap } from "./Slugify.styles.js";

const slugify = (s: string): string =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const Slugify = (): JSX.Element => {
  const [text, setText] = useState<string>("Hello, World! São Paulo 2026");
  const slug = useMemo(() => slugify(text), [text]);
  return (
    <Wrap>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something to slugify…"
        aria-label="Input"
      />
      <Out
        onClick={() => void navigator.clipboard?.writeText(slug)}
        title="Click to copy"
      >
        {slug || <span style={{ color: "var(--az-text-3)" }}>(empty)</span>}
      </Out>
    </Wrap>
  );
};

export default Slugify;

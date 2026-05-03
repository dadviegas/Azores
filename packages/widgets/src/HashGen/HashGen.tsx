import { useEffect, useState } from "react";
import { Hash, List, Row, Tag, TextArea, Wrap } from "./HashGen.styles.js";

const ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
type Algo = (typeof ALGOS)[number];

const hex = (buf: ArrayBuffer): string =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

export const HashGen = (): JSX.Element => {
  const [text, setText] = useState<string>("hello world");
  const [hashes, setHashes] = useState<Record<Algo, string>>({
    "SHA-1": "",
    "SHA-256": "",
    "SHA-384": "",
    "SHA-512": "",
  });

  useEffect(() => {
    let cancelled = false;
    const bytes = new TextEncoder().encode(text);
    void Promise.all(
      ALGOS.map(async (a): Promise<[Algo, string]> => [a, hex(await crypto.subtle.digest(a, bytes))]),
    ).then((entries) => {
      if (cancelled) return;
      setHashes(Object.fromEntries(entries) as Record<Algo, string>);
    });
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <Wrap>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        aria-label="Input text"
      />
      <List>
        {ALGOS.map((a) => (
          <Row key={a}>
            <Tag>{a}</Tag>
            <Hash title={hashes[a]} onClick={() => void navigator.clipboard?.writeText(hashes[a])}>
              {hashes[a]}
            </Hash>
          </Row>
        ))}
      </List>
    </Wrap>
  );
};

export default HashGen;

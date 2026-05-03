import { useMemo, useState } from "react";
import { Err, Input, List, Row, Tag, Val, Wrap } from "./UrlParser.styles.js";

export const UrlParser = (): JSX.Element => {
  const [src, setSrc] = useState(
    "https://user:pass@example.com:8443/path/to/page?q=hello+world&lang=en#section",
  );
  const parsed = useMemo(() => {
    try {
      const u = new URL(src);
      return { ok: true as const, u };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "invalid URL" };
    }
  }, [src]);

  return (
    <Wrap>
      <Input value={src} onChange={(e) => setSrc(e.target.value)} aria-label="URL" />
      {parsed.ok ? (
        <List>
          <Row><Tag>protocol</Tag><Val>{parsed.u.protocol}</Val></Row>
          <Row><Tag>username</Tag><Val>{parsed.u.username || "—"}</Val></Row>
          <Row><Tag>password</Tag><Val>{parsed.u.password || "—"}</Val></Row>
          <Row><Tag>host</Tag><Val>{parsed.u.host}</Val></Row>
          <Row><Tag>hostname</Tag><Val>{parsed.u.hostname}</Val></Row>
          <Row><Tag>port</Tag><Val>{parsed.u.port || "—"}</Val></Row>
          <Row><Tag>pathname</Tag><Val>{parsed.u.pathname}</Val></Row>
          <Row><Tag>hash</Tag><Val>{parsed.u.hash || "—"}</Val></Row>
          {[...parsed.u.searchParams.entries()].map(([k, v], i) => (
            <Row key={i}><Tag>?{k}</Tag><Val>{v}</Val></Row>
          ))}
        </List>
      ) : (
        <Err>{parsed.error}</Err>
      )}
    </Wrap>
  );
};

export default UrlParser;

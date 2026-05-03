import { useMemo, useState } from "react";
import { Code, Desc, List, Row, Search, Title, Wrap } from "./HttpStatus.styles.js";

const CODES: ReadonlyArray<[number, string, string]> = [
  [100, "Continue", "Initial part of request received."],
  [101, "Switching Protocols", "Server agrees to switch protocols."],
  [200, "OK", "Standard success."],
  [201, "Created", "Resource created."],
  [202, "Accepted", "Request accepted, processing later."],
  [204, "No Content", "Success with no body."],
  [206, "Partial Content", "Range request fulfilled."],
  [301, "Moved Permanently", "Resource moved; update bookmarks."],
  [302, "Found", "Temporary redirect."],
  [304, "Not Modified", "Cached version still fresh."],
  [307, "Temporary Redirect", "Re-issue with same method."],
  [308, "Permanent Redirect", "Re-issue with same method permanently."],
  [400, "Bad Request", "Malformed syntax or invalid framing."],
  [401, "Unauthorized", "Auth required or failed."],
  [403, "Forbidden", "Authenticated but not allowed."],
  [404, "Not Found", "Resource doesn't exist."],
  [405, "Method Not Allowed", "Method unsupported on this resource."],
  [406, "Not Acceptable", "Cannot satisfy Accept headers."],
  [408, "Request Timeout", "Client took too long."],
  [409, "Conflict", "State conflict (e.g. version mismatch)."],
  [410, "Gone", "Resource permanently removed."],
  [413, "Payload Too Large", "Request body exceeds limits."],
  [415, "Unsupported Media Type", "Content-Type not accepted."],
  [418, "I'm a teapot", "Easter egg from RFC 2324."],
  [422, "Unprocessable Entity", "Semantic validation failed."],
  [425, "Too Early", "Server unwilling to risk replay."],
  [429, "Too Many Requests", "Rate-limited."],
  [500, "Internal Server Error", "Generic server failure."],
  [501, "Not Implemented", "Method not supported."],
  [502, "Bad Gateway", "Upstream server returned an error."],
  [503, "Service Unavailable", "Server overloaded or down."],
  [504, "Gateway Timeout", "Upstream took too long."],
  [507, "Insufficient Storage", "Server is out of room."],
];

const tone = (code: number): string =>
  code < 200
    ? "var(--az-text-2)"
    : code < 300
      ? "#3cb45a"
      : code < 400
        ? "#5aa3e8"
        : code < 500
          ? "#d8a528"
          : "#dc3c3c";

export const HttpStatus = (): JSX.Element => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return CODES;
    return CODES.filter(
      ([c, t, d]) =>
        String(c).includes(needle) ||
        t.toLowerCase().includes(needle) ||
        d.toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <Wrap>
      <Search
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search code, name, or description…"
        aria-label="Search HTTP status codes"
      />
      <List>
        {filtered.map(([c, t, d]) => (
          <Row key={c}>
            <Code $tone={tone(c)}>{c}</Code>
            <div>
              <Title>{t}</Title>
              <Desc>{d}</Desc>
            </div>
          </Row>
        ))}
        {filtered.length === 0 ? (
          <Desc style={{ padding: 12, textAlign: "center" }}>No matches.</Desc>
        ) : null}
      </List>
    </Wrap>
  );
};

export default HttpStatus;

import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Area = styled.textarea({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontFamily: "var(--az-font-mono)",
  fontSize: 11,
  resize: "none",
  outline: "none",
  minHeight: 0,
});

export const TableWrap = styled.div({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  overflow: "auto",
  minHeight: 0,
});

export const Table = styled.table({
  borderCollapse: "collapse",
  width: "100%",
  fontSize: 11,
  fontFamily: "var(--az-font-mono)",
  "& th, & td": {
    borderBottom: `1px solid ${tokens.line}`,
    padding: "4px 8px",
    textAlign: "left",
    color: tokens.text,
  },
  "& th": {
    position: "sticky",
    top: 0,
    background: tokens.bg3,
    cursor: "pointer",
    userSelect: "none",
  },
});

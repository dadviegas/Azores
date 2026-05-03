import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "grid",
  gridTemplateColumns: "140px 1fr",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Side = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minHeight: 0,
});

export const Search = styled.input({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "4px 8px",
  fontSize: 11,
  outline: "none",
});

export const List = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  overflow: "auto",
  minHeight: 0,
});

export const NoteRow = styled.button<{ $active?: boolean }>(({ $active }) => ({
  textAlign: "left",
  background: $active ? tokens.bg3 : tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontSize: 11,
  color: tokens.text,
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&:hover": { background: tokens.bg3 },
}));

export const Btn = styled.button({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "4px 8px",
  fontSize: 11,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
});

export const Body = styled.textarea({
  flex: 1,
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontFamily: "inherit",
  fontSize: 12,
  resize: "none",
  outline: "none",
  minHeight: 0,
});

export const Toolbar = styled.div({
  display: "flex",
  gap: 4,
  marginTop: 4,
});

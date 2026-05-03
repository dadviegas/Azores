import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  overflow: "hidden",
});

export const Form = styled.form({
  display: "grid",
  gridTemplateColumns: "1fr 1fr auto",
  gap: tokens.s[2],
});

export const Input = styled.input({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  color: tokens.text,
  fontSize: 12,
  padding: `${tokens.s[1]} ${tokens.s[2]}`,
  fontFamily: "inherit",
  outline: "none",
  minWidth: 0,
  "&:focus-visible": { borderColor: tokens.ocean[500] },
});

export const AddBtn = styled.button({
  background: tokens.primary,
  color: "#fff",
  border: "none",
  borderRadius: tokens.r.md,
  fontSize: 12,
  fontWeight: 600,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  cursor: "pointer",
  fontFamily: "inherit",
});

export const List = styled.ul({
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[1],
  overflowY: "auto",
});

export const Item = styled.li({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[2],
  paddingBottom: tokens.s[1],
  borderBottom: `1px solid ${tokens.line}`,
  "&:last-of-type": { borderBottom: "none" },
});

export const Link = styled.a({
  flex: 1,
  fontSize: 12,
  color: tokens.text,
  textDecoration: "none",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&:hover": { textDecoration: "underline" },
});

export const Remove = styled.button({
  background: "transparent",
  border: "none",
  color: tokens.text3,
  cursor: "pointer",
  fontSize: 14,
  lineHeight: 1,
  padding: 4,
  "&:hover": { color: "var(--az-coral-500)" },
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
  textAlign: "center",
  padding: tokens.s[3],
});

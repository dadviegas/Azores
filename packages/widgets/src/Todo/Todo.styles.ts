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
  display: "flex",
  gap: tokens.s[2],
});

export const Input = styled.input({
  flex: 1,
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  color: tokens.text,
  fontSize: 12,
  fontFamily: "inherit",
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  outline: "none",
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

export const Item = styled.li<{ done: boolean }>(({ done }) => ({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[2],
  fontSize: 13,
  color: done ? tokens.text3 : tokens.text,
  textDecoration: done ? "line-through" : "none",
}));

export const Check = styled.input({
  margin: 0,
  cursor: "pointer",
});

export const Label = styled.span({
  flex: 1,
  cursor: "pointer",
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

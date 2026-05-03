import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Form = styled.form({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: 4,
});

export const Input = styled.input({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "4px 8px",
  fontSize: 12,
  outline: "none",
});

export const Btn = styled.button({
  background: "var(--az-primary)",
  color: "#fff",
  border: "none",
  borderRadius: tokens.r.sm,
  padding: "4px 10px",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
});

export const List = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  minHeight: 0,
});

export const Row = styled.div<{ $running?: boolean }>(({ $running }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 70px auto auto",
  gap: 6,
  padding: "6px 8px",
  borderBottom: `1px solid ${tokens.line}`,
  alignItems: "center",
  fontSize: 12,
  background: $running ? "rgba(60,180,90,0.08)" : "transparent",
}));

export const Time = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontWeight: 600,
  textAlign: "right",
  color: tokens.text,
});

export const SmBtn = styled.button({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "2px 8px",
  fontSize: 11,
  cursor: "pointer",
  fontFamily: "inherit",
});

import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Bar = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: 4,
  alignItems: "center",
});

export const Pill = styled.button({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: 999,
  padding: "3px 10px",
  fontSize: 11,
  cursor: "pointer",
  fontFamily: "inherit",
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  "&:hover": { background: tokens.bg3 },
});

export const X = styled.span({
  color: tokens.text3,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 700,
  "&:hover": { color: "#dc3c3c" },
});

export const Form = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr auto",
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
  padding: "4px 12px",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
});

export const Run = styled.button({
  background: "var(--az-primary)",
  color: "#fff",
  border: "none",
  borderRadius: tokens.r.sm,
  padding: "4px 12px",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
  marginLeft: "auto",
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
});

export const Area = styled.textarea({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontFamily: "inherit",
  fontSize: 12,
  resize: "none",
  outline: "none",
  minHeight: 60,
});

export const Out = styled.div<{ $error?: boolean }>(({ $error }) => ({
  flex: 1,
  background: $error ? "rgba(220,60,60,0.08)" : tokens.bg2,
  border: `1px solid ${$error ? "rgba(220,60,60,0.4)" : tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontSize: 12,
  lineHeight: 1.5,
  overflow: "auto",
  whiteSpace: "pre-wrap",
  color: $error ? "#dc3c3c" : tokens.text,
  minHeight: 60,
}));

export const Tag = styled.div({
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: tokens.text3,
  width: "100%",
  marginTop: 4,
});

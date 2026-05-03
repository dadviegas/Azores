import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Log = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 6,
  overflow: "auto",
  minHeight: 0,
  paddingRight: 4,
});

export const Bubble = styled.div<{ $role: "user" | "assistant" | "error" }>(({ $role }) => ({
  alignSelf: $role === "user" ? "flex-end" : "flex-start",
  maxWidth: "85%",
  background:
    $role === "user"
      ? "var(--az-primary)"
      : $role === "error"
        ? "rgba(220,60,60,0.12)"
        : tokens.bg2,
  color: $role === "user" ? "#fff" : $role === "error" ? "#dc3c3c" : tokens.text,
  border: `1px solid ${$role === "user" ? "transparent" : tokens.line}`,
  borderRadius: tokens.r.md,
  padding: "8px 10px",
  fontSize: 12,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
}));

export const Form = styled.form({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: 4,
});

export const Input = styled.textarea({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontFamily: "inherit",
  fontSize: 12,
  outline: "none",
  resize: "none",
  minHeight: 36,
  maxHeight: 100,
});

export const Btn = styled.button({
  background: "var(--az-primary)",
  color: "#fff",
  border: "none",
  borderRadius: tokens.r.sm,
  padding: "0 12px",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
});

export const Empty = styled.div({
  color: tokens.text3,
  fontSize: 12,
  textAlign: "center",
  padding: 12,
  lineHeight: 1.5,
});

export const Toolbar = styled.div({
  display: "flex",
  gap: 6,
  alignItems: "center",
  fontSize: 11,
  color: tokens.text3,
});

export const Tag = styled.span({
  fontFamily: "var(--az-font-mono)",
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "1px 6px",
});

export const Clear = styled.button({
  background: "transparent",
  border: "none",
  color: tokens.text3,
  cursor: "pointer",
  fontSize: 11,
  padding: 0,
  textDecoration: "underline",
  marginLeft: "auto",
  fontFamily: "inherit",
});

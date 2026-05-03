import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
});

export const Meta = styled.div({
  fontSize: 10,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const Question = styled.div({
  fontSize: 13,
  fontWeight: 500,
  color: tokens.text,
  lineHeight: 1.4,
});

export const Choices = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[1],
});

export const Choice = styled.button<{ revealed: boolean; correct: boolean }>(
  ({ revealed, correct }) => ({
    textAlign: "left",
    background: revealed && correct ? "rgba(42,157,143,0.18)" : tokens.bg2,
    border: `1px solid ${
      revealed && correct ? "var(--az-success-500, #2a9d8f)" : tokens.line
    }`,
    borderRadius: tokens.r.md,
    color: tokens.text,
    padding: `${tokens.s[1]} ${tokens.s[3]}`,
    fontSize: 12,
    cursor: revealed ? "default" : "pointer",
    fontFamily: "inherit",
    "&:hover": revealed ? {} : { background: tokens.bg3 },
  }),
);

export const Reveal = styled.button({
  alignSelf: "flex-start",
  background: "transparent",
  border: "none",
  color: tokens.primary,
  padding: 0,
  fontSize: 11,
  cursor: "pointer",
  fontFamily: "inherit",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});

import styled from "@emotion/styled";
import { tokens } from "../styles/tokens.js";

const baseField = {
  width: "100%",
  height: "36px",
  padding: `0 ${tokens.s[3]}`,
  borderRadius: tokens.r.md,
  border: `1px solid ${tokens.line2}`,
  background: tokens.surface,
  color: tokens.text,
  fontSize: tokens.fs.base,
  fontFamily: "inherit",
  transition: `border-color ${tokens.dur.fast} ${tokens.ease}, box-shadow ${tokens.dur.fast} ${tokens.ease}`,
  "&::placeholder": { color: tokens.muted },
  "&:hover": { borderColor: tokens.text3 },
  "&:focus": {
    outline: "none",
    borderColor: tokens.primary,
    boxShadow: tokens.ring,
  },
};

export const StyledInput = styled.input<{ $invalid?: boolean }>(({ $invalid }) => ({
  ...baseField,
  ...($invalid && {
    borderColor: tokens.danger,
    "&:focus": { boxShadow: "0 0 0 3px rgba(209, 72, 72, 0.18)" },
  }),
}));

export const StyledTextarea = styled.textarea<{ $invalid?: boolean }>(({ $invalid }) => ({
  ...baseField,
  height: "auto",
  padding: tokens.s[3],
  minHeight: "88px",
  resize: "vertical",
  ...($invalid && { borderColor: tokens.danger }),
}));

export const StyledSelect = styled.select(baseField);

export const StyledField = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
});

export const StyledLabel = styled.label({
  fontSize: tokens.fs.sm,
  fontWeight: tokens.fw.medium,
  color: tokens.text2,
});

export const StyledHelp = styled.div<{ $error?: boolean }>(({ $error }) => ({
  fontSize: tokens.fs.xs,
  color: $error ? tokens.danger : tokens.text3,
}));

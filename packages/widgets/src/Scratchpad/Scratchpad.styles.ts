import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const Area = styled.textarea({
  flex: 1,
  width: "100%",
  resize: "none",
  border: "none",
  outline: "none",
  background: "transparent",
  color: tokens.text,
  fontSize: 13,
  lineHeight: 1.5,
  fontFamily: "inherit",
  padding: 0,
  "&::placeholder": { color: tokens.text3 },
  "&:focus-visible": { outline: "none" },
});

export const SaveStatus = styled.div({
  fontSize: 10,
  color: tokens.text3,
  textAlign: "right",
  paddingTop: tokens.s[1],
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

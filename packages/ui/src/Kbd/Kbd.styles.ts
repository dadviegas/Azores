import styled from "@emotion/styled";
import { tokens } from "../styles/tokens.js";

export const StyledKbd = styled.kbd({
  fontFamily: tokens.font.mono,
  fontSize: tokens.fs.xs,
  padding: "1px 6px",
  background: tokens.surface,
  border: `1px solid ${tokens.line2}`,
  borderBottomWidth: "2px",
  borderRadius: tokens.r.xs,
  color: tokens.text2,
});

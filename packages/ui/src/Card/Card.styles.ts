import styled from "@emotion/styled";
import { tokens } from "../styles/tokens.js";

export const StyledCard = styled.div<{ $hover?: boolean }>(({ $hover }) => ({
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.lg,
  overflow: "hidden",
  transition: `border-color ${tokens.dur.fast} ${tokens.ease}, box-shadow ${tokens.dur.fast} ${tokens.ease}`,
  ...($hover && {
    "&:hover": { borderColor: tokens.line2, boxShadow: tokens.shadow.md },
  }),
}));

export const StyledCardHeader = styled.div({
  padding: `${tokens.s[4]} ${tokens.s[5]}`,
  borderBottom: `1px solid ${tokens.line}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const StyledCardTitle = styled.h3({
  fontSize: tokens.fs.md,
  fontWeight: tokens.fw.semi,
  margin: 0,
});

export const StyledCardBody = styled.div({ padding: tokens.s[5] });

export const StyledCardFooter = styled.div({
  padding: `${tokens.s[4]} ${tokens.s[5]}`,
  borderTop: `1px solid ${tokens.line}`,
  background: tokens.bg2,
});

import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const PaletteSearch = styled.div({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[3],
  padding: `${tokens.s[3]} ${tokens.s[4]}`,
  borderBottom: `1px solid ${tokens.line}`,
});

export const PaletteInput = styled.input({
  flex: 1,
  border: "none",
  outline: "none",
  background: "none",
  fontSize: tokens.fs.md,
  color: tokens.text,
  fontFamily: "inherit",
  "&::placeholder": { color: tokens.text3 },
});

export const PaletteList = styled.div({
  maxHeight: "440px",
  overflowY: "auto",
  padding: tokens.s[1],
});

export const GroupLabel = styled.div({
  padding: `${tokens.s[3]} ${tokens.s[3]} ${tokens.s[1]}`,
  fontSize: "10px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: tokens.muted,
  fontWeight: tokens.fw.medium,
});

export const Item = styled.button<{ $active: boolean }>(({ $active }) => ({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[3],
  width: "100%",
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  borderRadius: tokens.r.sm,
  border: "none",
  textAlign: "left",
  background: $active ? tokens.bg2 : "transparent",
  color: $active ? tokens.text : tokens.text2,
  fontFamily: "inherit",
  fontSize: tokens.fs.sm,
  cursor: "pointer",
}));

export const ItemLabel = styled.span({ flex: 1 });

export const Empty = styled.div({
  padding: tokens.s[8],
  textAlign: "center",
  color: tokens.text3,
  fontSize: tokens.fs.sm,
});

export const FooterBar = styled.div({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[4],
  padding: `${tokens.s[2]} ${tokens.s[4]}`,
  borderTop: `1px solid ${tokens.line}`,
  background: tokens.bg2,
  fontSize: tokens.fs.xs,
  color: tokens.text3,
});

export const FooterSpacer = styled.span({ flex: 1 });

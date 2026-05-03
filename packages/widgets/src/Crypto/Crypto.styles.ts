import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  overflow: "hidden",
});

export const Row = styled.div({
  display: "grid",
  gridTemplateColumns: "20px 1fr auto auto",
  alignItems: "center",
  gap: tokens.s[3],
  padding: `${tokens.s[2]} 0`,
  borderBottom: `1px solid ${tokens.line}`,
  "&:last-of-type": { borderBottom: "none" },
});

export const List = styled.div({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
});

export const CoinIcon = styled.img({
  width: 18,
  height: 18,
  borderRadius: "50%",
});

export const Name = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 1,
  minWidth: 0,
});

export const Symbol = styled.span({
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
});

export const FullName = styled.span({
  fontSize: 10,
  color: tokens.text3,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const Price = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 13,
  fontWeight: 500,
  textAlign: "right",
});

export const Change = styled.span<{ pos: boolean }>(({ pos }) => ({
  fontFamily: "var(--az-font-mono)",
  fontSize: 11,
  textAlign: "right",
  color: pos ? "var(--az-success-500, #2a9d8f)" : "var(--az-coral-500)",
  minWidth: 56,
}));

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});

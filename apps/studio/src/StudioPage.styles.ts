import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Shell = styled.div({
  display: "grid",
  gridTemplateColumns: "260px 1fr",
  gridTemplateRows: "auto 1fr",
  gap: 0,
  height: "100dvh",
  background: tokens.bg,
});

export const Header = styled.header({
  gridColumn: "1 / -1",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${tokens.s[2]} ${tokens.s[4]}`,
  borderBottom: `1px solid ${tokens.line}`,
  background: tokens.bg2,
  flexWrap: "wrap",
  rowGap: tokens.s[2],
  columnGap: tokens.s[3],
});

export const Brand = styled.div({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[2],
  color: "inherit",
  textDecoration: "none",
  fontWeight: 600,
  letterSpacing: "0.02em",
});

export const Actions = styled.div({
  display: "flex",
  gap: tokens.s[2],
  alignItems: "center",
  flexWrap: "wrap",
});

export const Sidebar = styled.aside({
  borderRight: `1px solid ${tokens.line}`,
  background: tokens.bg2,
  padding: tokens.s[3],
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  minWidth: 0,
});

export const SidebarHeading = styled.div({
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: tokens.text3,
  fontWeight: 600,
  padding: `0 ${tokens.s[1]}`,
});

export const DocList = styled.ul({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const DocItem = styled.li<{ $active?: boolean }>(({ $active }) => ({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[2],
  padding: `${tokens.s[1]} ${tokens.s[2]}`,
  borderRadius: tokens.r.md,
  background: $active ? tokens.surface : "transparent",
  border: `1px solid ${$active ? tokens.line : "transparent"}`,
  cursor: "pointer",
  "&:hover": { background: tokens.surface },
}));

export const DocLabel = styled.div({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const DocTitle = styled.span({
  fontSize: 13,
  fontWeight: 500,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const DocMeta = styled.span({
  fontSize: 10,
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
});

export const IconBtn = styled.button({
  background: "transparent",
  border: "none",
  color: tokens.text3,
  cursor: "pointer",
  padding: 4,
  borderRadius: tokens.r.sm,
  display: "grid",
  placeItems: "center",
  "&:hover": { color: tokens.text, background: tokens.bg2 },
});

export const Main = styled.main({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  overflow: "hidden",
  minWidth: 0,
});

export const Pane = styled.section({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  overflow: "hidden",
});

export const PaneHeader = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  borderBottom: `1px solid ${tokens.line}`,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: tokens.text3,
  fontWeight: 600,
  background: tokens.bg2,
});

export const PaneBody = styled.div({
  flex: 1,
  overflow: "auto",
  minHeight: 0,
});

export const PreviewBody = styled(PaneBody)({
  padding: `${tokens.s[3]} ${tokens.s[4]}`,
});

export const EditorBody = styled(PaneBody)({
  borderRight: `1px solid ${tokens.line}`,
  padding: 0,
});

export const TitleInput = styled.input({
  background: "transparent",
  border: "none",
  outline: "none",
  color: tokens.text,
  fontSize: 14,
  fontWeight: 600,
  padding: 0,
  minWidth: 0,
  flex: 1,
  "&::placeholder": { color: tokens.text3 },
});

export const SourceArea = styled.textarea({
  display: "block",
  width: "100%",
  height: "100%",
  resize: "none",
  border: "none",
  outline: "none",
  background: tokens.bg,
  color: tokens.text,
  padding: tokens.s[4],
  fontFamily: "var(--az-font-mono)",
  fontSize: 13,
  lineHeight: 1.6,
  tabSize: 2,
  caretColor: "var(--az-primary)",
});

export const Empty = styled.div({
  display: "grid",
  placeItems: "center",
  height: "100%",
  color: tokens.text3,
  fontSize: 13,
  padding: tokens.s[4],
  textAlign: "center",
});

export const Status = styled.span({
  fontSize: 11,
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const NewBtn = styled.button({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[1],
  background: tokens.bg,
  border: `1px dashed ${tokens.line}`,
  borderRadius: tokens.r.md,
  color: tokens.text2,
  padding: `${tokens.s[2]} ${tokens.s[2]}`,
  fontSize: 12,
  cursor: "pointer",
  "&:hover": { color: tokens.text, borderColor: tokens.line2 },
});

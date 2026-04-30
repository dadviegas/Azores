import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Editor = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.lg,
  overflow: "hidden",
  background: tokens.surface,
  minHeight: "560px",
});

export const Pane = styled.div({
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
});

export const SourcePane = styled(Pane)({
  borderRight: `1px solid ${tokens.line}`,
});

export const Toolbar = styled.div({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[1],
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  borderBottom: `1px solid ${tokens.line}`,
  background: tokens.bg2,
});

export const ToolbarButton = styled.button({
  appearance: "none",
  border: "none",
  background: "transparent",
  color: tokens.text2,
  display: "inline-flex",
  alignItems: "center",
  gap: tokens.s[1],
  padding: `${tokens.s[1]} ${tokens.s[2]}`,
  borderRadius: tokens.r.xs,
  fontFamily: "inherit",
  fontSize: tokens.fs.xs,
  cursor: "pointer",
  "&:hover": { background: tokens.surface, color: tokens.text },
});

export const ToolbarSpacer = styled.div({ flex: 1 });

export const ToolbarMeta = styled.span({
  fontSize: "11px",
  color: tokens.text3,
  fontFamily: tokens.font.mono,
});

export const SourceArea = styled.textarea({
  flex: 1,
  border: "none",
  outline: "none",
  resize: "none",
  padding: tokens.s[5],
  background: tokens.bg2,
  color: tokens.text,
  fontFamily: tokens.font.mono,
  fontSize: tokens.fs.sm,
  lineHeight: 1.6,
  minHeight: 0,
});

export const PreviewPane = styled.div({
  flex: 1,
  overflow: "auto",
  padding: tokens.s[5],
  background: tokens.surface,
});

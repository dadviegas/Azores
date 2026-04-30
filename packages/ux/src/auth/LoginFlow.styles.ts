import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Root = styled.div({
  minHeight: "100vh",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  background: tokens.bg,
  "@media (max-width: 900px)": {
    gridTemplateColumns: "1fr",
  },
});

export const FormPane = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "48px 80px",
  maxWidth: 520,
  width: "100%",
  margin: "0 auto",
  "@media (max-width: 600px)": {
    padding: "32px 24px",
  },
});

export const BrandRow = styled.div({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[3],
  marginBottom: 48,
});

export const BrandText = styled.div({
  display: "flex",
  flexDirection: "column",
});

export const BrandName = styled.div({
  fontFamily: tokens.font.display,
  fontSize: tokens.fs.md,
  fontWeight: tokens.fw.semi,
  color: tokens.text,
  letterSpacing: "-0.01em",
});

export const BrandTag = styled.div({
  fontFamily: tokens.font.mono,
  fontSize: "10px",
  letterSpacing: "0.12em",
  color: tokens.text3,
});

export const Eyebrow = styled.div({
  fontFamily: tokens.font.mono,
  fontSize: "11px",
  letterSpacing: "0.12em",
  color: tokens.text3,
  marginBottom: tokens.s[3],
});

export const Title = styled.h1({
  fontFamily: tokens.font.display,
  fontSize: 40,
  fontWeight: tokens.fw.semi,
  color: tokens.text,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  margin: 0,
  marginBottom: 12,
  "@media (max-width: 600px)": {
    fontSize: 32,
  },
});

export const Lede = styled.p({
  color: tokens.text2,
  fontSize: 15,
  lineHeight: 1.5,
  margin: 0,
  marginBottom: 36,
});

export const Form = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: 14,
});

export const ProviderRow = styled.div({
  display: "flex",
  gap: tokens.s[2],
});

export const Divider = styled.div({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[3],
  margin: `${tokens.s[2]} 0`,
  color: tokens.text3,
  fontFamily: tokens.font.mono,
  fontSize: "11px",
  letterSpacing: "0.1em",
  "&::before, &::after": {
    content: '""',
    flex: 1,
    height: 1,
    background: tokens.line,
  },
});

export const FieldHead = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
});

export const ForgotLink = styled.a({
  fontSize: tokens.fs.xs,
  color: tokens.primary,
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": { textDecoration: "underline" },
});

export const InputGroup = styled.div({
  display: "flex",
  alignItems: "stretch",
  borderRadius: tokens.r.md,
  border: `1px solid ${tokens.line2}`,
  background: tokens.surface,
  transition: `border-color ${tokens.dur.fast} ${tokens.ease}, box-shadow ${tokens.dur.fast} ${tokens.ease}`,
  "&:hover": { borderColor: tokens.text3 },
  "&:focus-within": {
    borderColor: tokens.primary,
    boxShadow: tokens.ring,
  },
  "& > input": {
    flex: 1,
    height: 40,
    padding: `0 ${tokens.s[3]}`,
    border: "none",
    background: "transparent",
    color: tokens.text,
    fontSize: tokens.fs.base,
    fontFamily: "inherit",
    outline: "none",
    "&::placeholder": { color: tokens.muted },
  },
});

export const InputAddon = styled.span({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  color: tokens.text3,
  borderRight: `1px solid ${tokens.line}`,
});

export const Checkbox = styled.label({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[2],
  fontSize: tokens.fs.sm,
  color: tokens.text2,
  cursor: "pointer",
  marginTop: tokens.s[1],
  "& input": { accentColor: tokens.primary },
});

export const Spinner = styled.span({
  width: 14,
  height: 14,
  borderRadius: "50%",
  border: "2px solid rgba(255,255,255,0.35)",
  borderTopColor: tokens.bg,
  animation: "az-login-spin 0.7s linear infinite",
  display: "inline-block",
  "@keyframes az-login-spin": {
    to: { transform: "rotate(360deg)" },
  },
});

export const Footnote = styled.div({
  textAlign: "center",
  fontSize: tokens.fs.sm,
  color: tokens.text3,
  marginTop: tokens.s[3],
  "& a": {
    color: tokens.primary,
    textDecoration: "none",
    fontWeight: tokens.fw.medium,
    cursor: "pointer",
  },
});

export const Legal = styled.div({
  marginTop: "auto",
  paddingTop: 40,
  fontSize: "11px",
  color: tokens.text3,
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
  "& a": { color: "inherit", textDecoration: "none", cursor: "pointer" },
});

export const VisualPane = styled.div({
  position: "relative",
  overflow: "hidden",
  background: `
    radial-gradient(ellipse 80% 60% at 30% 30%, rgba(15, 76, 117, 0.18), transparent 60%),
    radial-gradient(ellipse 60% 50% at 70% 70%, rgba(213, 88, 42, 0.16), transparent 60%),
    radial-gradient(ellipse 50% 40% at 50% 50%, rgba(217, 164, 65, 0.10), transparent 70%),
    linear-gradient(135deg, #0F2230 0%, #0B1620 100%)`,
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: 48,
  "@media (max-width: 900px)": { display: "none" },
});

export const Topo = styled.svg({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  opacity: 0.18,
});

export const VisualHeader = styled.div({
  position: "relative",
  zIndex: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const Coords = styled.div({
  fontFamily: tokens.font.mono,
  fontSize: 11,
  letterSpacing: "0.1em",
  opacity: 0.7,
});

export const Ticks = styled.div({
  display: "flex",
  gap: 6,
});

export const Tick = styled.div<{ $active?: boolean }>(({ $active }) => ({
  width: 24,
  height: 2,
  background: $active ? "white" : "rgba(255,255,255,0.2)",
}));

export const VisualBody = styled.div({ position: "relative", zIndex: 1 });

export const Headline = styled.div({
  fontFamily: tokens.font.display,
  fontSize: 64,
  fontWeight: 500,
  lineHeight: 0.95,
  letterSpacing: "-0.03em",
  marginBottom: 16,
});

export const HeadlineLede = styled.p({
  fontSize: 17,
  lineHeight: 1.5,
  opacity: 0.75,
  maxWidth: 440,
  margin: 0,
});

export const Stats = styled.div({
  position: "relative",
  zIndex: 1,
  display: "flex",
  gap: 32,
  fontFamily: tokens.font.mono,
  fontSize: 11,
});

export const StatLabel = styled.div({
  opacity: 0.5,
  letterSpacing: "0.1em",
  marginBottom: 4,
});

export const StatValue = styled.div({
  fontFamily: tokens.font.display,
  fontSize: 22,
  fontWeight: 500,
  letterSpacing: "-0.01em",
});

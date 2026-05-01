import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Background, BrandMark, Button, Icon } from "@azores/ui";
import { TweaksPanel, useTweaks } from "@azores/ux";
import { APPS, type LauncherApp } from "./apps";
import { Eyebrow, Grid, Page, Shell, Tile, TileBody, TileHead, Title } from "./App.styles";

const Tagline = ({ text }: { text: string }): JSX.Element => (
  <p style={{ color: "var(--az-text-2)", fontSize: 14, margin: 0, lineHeight: 1.5 }}>{text}</p>
);

const StatusChip = ({ status }: { status: LauncherApp["status"] }): JSX.Element => (
  <span
    style={{
      fontSize: 10,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "2px 8px",
      borderRadius: 999,
      border: "1px solid var(--az-line)",
      color: status === "live" ? "var(--az-moss-500)" : "var(--az-text-3)",
      background: "var(--az-surface)",
    }}
  >
    {status}
  </span>
);

export const Launcher = (): JSX.Element => {
  const navigate = useNavigate();
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const { tweaks, setTheme, setAccent, toggleTheme } = useTweaks();

  const open = (app: LauncherApp): void => {
    if (app.status !== "live" || !app.path) return;
    navigate(app.path);
  };

  return (
    <Shell>
      <Background variant="atlantic" style={{ position: "absolute", inset: 0, zIndex: 0 }} />
      <Page>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 48,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BrandMark size="md" />
            <span style={{ fontWeight: 600, letterSpacing: "0.02em" }}>Azores</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleTheme()}
              aria-label={`Switch to ${tweaks.theme === "dark" ? "light" : "dark"} theme`}
              title="Toggle theme"
            >
              <Icon name={tweaks.theme === "dark" ? "sun" : "moon"} size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTweaksOpen(true)}
              aria-label="Open tweaks"
            >
              <Icon name="settings" size={14} />
              Tweaks
            </Button>
          </div>
        </header>

        <Eyebrow>HOME</Eyebrow>
        <Title>Pick an app.</Title>
        <Tagline text="A launcher for everything Azores ships. Apps load on demand via Module Federation." />

        <Grid>
          {APPS.map((a) => {
            const launchable = a.status === "live" && Boolean(a.path);
            return (
              <Tile
                key={a.id}
                $accent={a.accent}
                $launchable={launchable}
                role="button"
                tabIndex={launchable ? 0 : -1}
                aria-disabled={!launchable}
                onClick={() => open(a)}
                onKeyDown={(e) => {
                  if (!launchable) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open(a);
                  }
                }}
              >
                <TileHead>
                  <span className="az-tile-icon">
                    <Icon name={a.icon} size={22} />
                  </span>
                  <StatusChip status={a.status} />
                </TileHead>
                <TileBody>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>{a.name}</h2>
                  <Tagline text={a.tagline} />
                </TileBody>
                {launchable ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      color: "var(--az-primary)",
                    }}
                  >
                    Open <Icon name="arrowright" size={14} />
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: "var(--az-text-3)" }}>Coming soon</span>
                )}
              </Tile>
            );
          })}
        </Grid>
      </Page>
      <TweaksPanel
        open={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
        theme={tweaks.theme}
        accent={tweaks.accent}
        onThemeChange={setTheme}
        onAccentChange={setAccent}
      />
    </Shell>
  );
};

import { Icon } from "@azores/ui";
import { Drawer } from "../Drawer/Drawer.js";
import {
  AccentButton,
  AccentGrid,
  SectionTitle,
  SegButton,
  SegGroup,
  Section,
} from "./TweaksPanel.styles.js";
import type { AccentId, ThemeMode } from "./useTweaks.js";

const ACCENTS: ReadonlyArray<{ id: AccentId; label: string; swatch: string }> = [
  { id: "ocean", label: "Ocean", swatch: "var(--az-ocean-500)" },
  { id: "volcanic", label: "Volcanic", swatch: "var(--az-lava-400)" },
  { id: "mono", label: "Mono", swatch: "var(--az-text)" },
  { id: "violet", label: "Violet", swatch: "#6B4FBB" },
];

export type TweaksPanelProps = {
  open: boolean;
  onClose: () => void;
  theme: ThemeMode;
  accent: AccentId;
  onThemeChange: (theme: ThemeMode) => void;
  onAccentChange: (accent: AccentId) => void;
};

export const TweaksPanel = ({
  open,
  onClose,
  theme,
  accent,
  onThemeChange,
  onAccentChange,
}: TweaksPanelProps): JSX.Element => (
  <Drawer open={open} onClose={onClose} side="right" width="320px" title="Tweaks">
    <Section>
      <SectionTitle>Theme</SectionTitle>
      <SegGroup role="radiogroup" aria-label="Theme">
        <SegButton
          role="radio"
          aria-checked={theme === "light"}
          $active={theme === "light"}
          onClick={() => onThemeChange("light")}
        >
          <Icon name="sun" size={14} /> Light
        </SegButton>
        <SegButton
          role="radio"
          aria-checked={theme === "dark"}
          $active={theme === "dark"}
          onClick={() => onThemeChange("dark")}
        >
          <Icon name="moon" size={14} /> Dark
        </SegButton>
      </SegGroup>
    </Section>

    <Section>
      <SectionTitle>Accent</SectionTitle>
      <AccentGrid role="radiogroup" aria-label="Accent">
        {ACCENTS.map((a) => (
          <AccentButton
            key={a.id}
            role="radio"
            aria-checked={accent === a.id}
            $active={accent === a.id}
            $color={a.swatch}
            onClick={() => onAccentChange(a.id)}
          >
            {a.label}
          </AccentButton>
        ))}
      </AccentGrid>
    </Section>
  </Drawer>
);

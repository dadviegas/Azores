import { Icon } from "@azores/ui";
import { Drawer } from "../Drawer/Drawer.js";
import {
  AccentButton,
  AccentGrid,
  Field,
  Hint,
  Input,
  SectionTitle,
  SegButton,
  SegGroup,
  Section,
} from "./TweaksPanel.styles.js";
import type { AccentId, ThemeMode } from "./useTweaks.js";
import type { AiSettings } from "./useAiSettings.js";

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
  // AI section is optional so the panel still renders without an AI config —
  // useful for embeds that don't ship an AI-capable widget.
  aiSettings?: AiSettings;
  onAiUrlChange?: (url: string) => void;
  onAiKeyChange?: (key: string) => void;
  onAiModelChange?: (model: string) => void;
};

export const TweaksPanel = ({
  open,
  onClose,
  theme,
  accent,
  onThemeChange,
  onAccentChange,
  aiSettings,
  onAiUrlChange,
  onAiKeyChange,
  onAiModelChange,
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

    {aiSettings && onAiUrlChange && onAiKeyChange && onAiModelChange ? (
      <Section>
        <SectionTitle>AI</SectionTitle>
        <Field>
          API URL
          <Input
            type="url"
            value={aiSettings.apiUrl}
            onChange={(e) => onAiUrlChange(e.target.value)}
            placeholder="https://abc123.ngrok-free.app"
            spellCheck={false}
            autoComplete="off"
          />
        </Field>
        <Field>
          API Key
          <Input
            type="password"
            value={aiSettings.apiKey}
            onChange={(e) => onAiKeyChange(e.target.value)}
            placeholder="sk-…"
            spellCheck={false}
            autoComplete="off"
          />
        </Field>
        <Field>
          Model
          <Input
            type="text"
            value={aiSettings.model}
            onChange={(e) => onAiModelChange(e.target.value)}
            placeholder="gpt-4o-mini"
            spellCheck={false}
            autoComplete="off"
          />
        </Field>
        <Hint>
          Sent as <code>POST {"{apiUrl}"}/v1/chat/completions</code> with{" "}
          <code>Authorization: Bearer …</code>. Stored locally only — never
          sent anywhere except the URL above.
        </Hint>
      </Section>
    ) : null}
  </Drawer>
);

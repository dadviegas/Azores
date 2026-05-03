import { useState } from "react";
import {
  ContrastBox,
  Field,
  Label,
  Pill,
  Row,
  Swatch,
  TopRow,
  Wrap,
} from "./ColorTools.styles.js";

const hexToRgb = (hex: string): [number, number, number] | null => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const v = parseInt(m[1]!, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
};

const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === R) h = ((G - B) / d + (G < B ? 6 : 0)) / 6;
  else if (max === G) h = ((B - R) / d + 2) / 6;
  else h = ((R - G) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

const lin = (c: number): number => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const lum = (rgb: [number, number, number]): number =>
  0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
const contrast = (a: [number, number, number], b: [number, number, number]): number => {
  const la = lum(a);
  const lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

export const ColorTools = (): JSX.Element => {
  const [bg, setBg] = useState<string>("#0b1d2a");
  const [fg, setFg] = useState<string>("#f4f6f8");
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  const ratio = fgRgb && bgRgb ? contrast(fgRgb, bgRgb) : 0;
  const tone = ratio >= 4.5 ? "good" : ratio >= 3 ? "ok" : "bad";

  const hsl = fgRgb ? rgbToHsl(...fgRgb) : null;

  return (
    <Wrap>
      <TopRow>
        <Swatch type="color" value={fg} onChange={(e) => setFg(e.target.value)} aria-label="Foreground" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Row>
            <Label>HEX</Label>
            <Field value={fg} onChange={(e) => setFg(e.target.value)} aria-label="HEX" />
          </Row>
          <Row>
            <Label>RGB</Label>
            <Field readOnly value={fgRgb ? `rgb(${fgRgb.join(", ")})` : ""} aria-label="RGB" />
          </Row>
          <Row>
            <Label>HSL</Label>
            <Field
              readOnly
              value={hsl ? `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` : ""}
              aria-label="HSL"
            />
          </Row>
        </div>
      </TopRow>
      <Row>
        <Label>BG</Label>
        <Field value={bg} onChange={(e) => setBg(e.target.value)} aria-label="Background" />
      </Row>
      <ContrastBox $bg={bgRgb ? bg : "#000"} $fg={fgRgb ? fg : "#fff"}>
        Sample · {ratio.toFixed(2)}:1
        <Pill $tone={tone}>
          {tone === "good" ? "AA" : tone === "ok" ? "AA Large" : "Fail"}
        </Pill>
      </ContrastBox>
    </Wrap>
  );
};

export default ColorTools;

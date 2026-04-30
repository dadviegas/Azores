// Curated subset of the mockup's background library. The full set lives in
// docs/design/Azores/page-backgrounds.jsx — port more here as the showcase
// needs them.

export type BackgroundId =
  | "caldera"
  | "atlantic"
  | "basalt"
  | "blueprint"
  | "fog"
  | "dotmatrix"
  | "lava"
  | "moss";

export type BackgroundVariant = {
  background: string;
  backgroundSize?: string;
  backgroundColor?: string;
};

export type BackgroundDef = {
  id: BackgroundId;
  name: string;
  desc: string;
  light: BackgroundVariant;
  dark: BackgroundVariant;
};

export const BACKGROUNDS: readonly BackgroundDef[] = [
  {
    id: "caldera",
    name: "Caldera",
    desc: "Volcanic crater — concentric calm",
    light: {
      background: `
        radial-gradient(ellipse 100% 80% at 50% 50%, rgba(15, 76, 117, 0.10) 0%, transparent 55%),
        radial-gradient(ellipse 70% 60% at 50% 50%, rgba(15, 76, 117, 0.14) 0%, transparent 55%),
        radial-gradient(ellipse 45% 40% at 50% 50%, rgba(213, 88, 42, 0.10) 0%, transparent 60%),
        repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 60px, rgba(15, 76, 117, 0.06) 60px, rgba(15, 76, 117, 0.06) 61px),
        #FAFAF7`,
    },
    dark: {
      background: `
        radial-gradient(ellipse 100% 80% at 50% 50%, rgba(74, 155, 199, 0.12) 0%, transparent 55%),
        radial-gradient(ellipse 70% 60% at 50% 50%, rgba(74, 155, 199, 0.10) 0%, transparent 55%),
        radial-gradient(ellipse 45% 40% at 50% 50%, rgba(224, 123, 83, 0.14) 0%, transparent 60%),
        repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 60px, rgba(74, 155, 199, 0.05) 60px, rgba(74, 155, 199, 0.05) 61px),
        #0B0E12`,
    },
  },
  {
    id: "atlantic",
    name: "Atlantic",
    desc: "Layered ocean swells",
    light: {
      background: `
        linear-gradient(180deg, rgba(245, 248, 251, 1) 0%, rgba(220, 235, 244, 1) 100%),
        radial-gradient(ellipse 1200px 200px at 30% 30%, rgba(15, 76, 117, 0.08), transparent 70%),
        radial-gradient(ellipse 800px 150px at 70% 70%, rgba(15, 76, 117, 0.06), transparent 70%)`,
    },
    dark: {
      background: `
        linear-gradient(180deg, #0B1620 0%, #0F2230 100%),
        radial-gradient(ellipse 1200px 300px at 30% 30%, rgba(74, 155, 199, 0.10), transparent 70%),
        radial-gradient(ellipse 800px 200px at 70% 70%, rgba(74, 155, 199, 0.08), transparent 70%)`,
    },
  },
  {
    id: "basalt",
    name: "Basalt",
    desc: "Hexagonal volcanic rock",
    light: {
      background: `
        conic-gradient(from 30deg at 50% 50%, #F0EFEA, #F5F4EF, #F0EFEA, #F5F4EF, #F0EFEA, #F5F4EF, #F0EFEA),
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='92' viewBox='0 0 80 92'><polygon points='20,0 60,0 80,34.6 60,69.3 20,69.3 0,34.6' fill='none' stroke='%23D8D6CD' stroke-width='1'/></svg>")`,
      backgroundSize: "auto, 80px 92px",
    },
    dark: {
      background: `
        linear-gradient(180deg, #14161A 0%, #1B1E24 100%),
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='92' viewBox='0 0 80 92'><polygon points='20,0 60,0 80,34.6 60,69.3 20,69.3 0,34.6' fill='none' stroke='%23262A32' stroke-width='1'/></svg>")`,
      backgroundSize: "auto, 80px 92px",
    },
  },
  {
    id: "blueprint",
    name: "Blueprint",
    desc: "Engineering grid",
    light: {
      background: `
        linear-gradient(rgba(15, 76, 117, 0.08) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(90deg, rgba(15, 76, 117, 0.08) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(rgba(15, 76, 117, 0.18) 1px, transparent 1px) 0 0 / 120px 120px,
        linear-gradient(90deg, rgba(15, 76, 117, 0.18) 1px, transparent 1px) 0 0 / 120px 120px,
        radial-gradient(circle at 50% 50%, #ECF1F5 0%, #DCE6EE 100%)`,
    },
    dark: {
      background: `
        linear-gradient(rgba(74, 155, 199, 0.10) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(90deg, rgba(74, 155, 199, 0.10) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(rgba(74, 155, 199, 0.22) 1px, transparent 1px) 0 0 / 120px 120px,
        linear-gradient(90deg, rgba(74, 155, 199, 0.22) 1px, transparent 1px) 0 0 / 120px 120px,
        radial-gradient(circle at 50% 50%, #0F2230 0%, #061018 100%)`,
    },
  },
  {
    id: "fog",
    name: "Fog",
    desc: "Misty mesh gradient",
    light: {
      background: `
        radial-gradient(at 12% 22%, rgba(15, 76, 117, 0.18) 0px, transparent 50%),
        radial-gradient(at 80% 18%, rgba(213, 88, 42, 0.14) 0px, transparent 50%),
        radial-gradient(at 78% 82%, rgba(47, 110, 66, 0.12) 0px, transparent 50%),
        radial-gradient(at 18% 78%, rgba(217, 164, 65, 0.14) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(255, 255, 255, 0.6) 0px, transparent 60%),
        #FAFAF7`,
    },
    dark: {
      background: `
        radial-gradient(at 12% 22%, rgba(74, 155, 199, 0.22) 0px, transparent 50%),
        radial-gradient(at 80% 18%, rgba(232, 153, 119, 0.18) 0px, transparent 50%),
        radial-gradient(at 78% 82%, rgba(141, 188, 154, 0.16) 0px, transparent 50%),
        radial-gradient(at 18% 78%, rgba(229, 196, 122, 0.14) 0px, transparent 50%),
        #0B0E12`,
    },
  },
  {
    id: "dotmatrix",
    name: "Dot matrix",
    desc: "Calm pinpoint grid",
    light: {
      background: `
        radial-gradient(circle at 50% 50%, rgba(15, 76, 117, 0.5) 1.2px, transparent 1.5px) 0 0 / 24px 24px,
        radial-gradient(circle at 50% 50%, rgba(213, 88, 42, 0.4) 1.5px, transparent 2px) 0 0 / 96px 96px,
        #FAFAF7`,
    },
    dark: {
      background: `
        radial-gradient(circle at 50% 50%, rgba(74, 155, 199, 0.4) 1.2px, transparent 1.5px) 0 0 / 24px 24px,
        radial-gradient(circle at 50% 50%, rgba(232, 153, 119, 0.5) 1.5px, transparent 2px) 0 0 / 96px 96px,
        #0B0E12`,
    },
  },
  {
    id: "lava",
    name: "Lava flow",
    desc: "Cooling magma streaks",
    light: {
      background: `
        radial-gradient(ellipse 600px 300px at 20% 20%, rgba(213, 88, 42, 0.18), transparent 60%),
        radial-gradient(ellipse 500px 250px at 80% 80%, rgba(217, 164, 65, 0.15), transparent 60%),
        radial-gradient(ellipse 400px 200px at 50% 100%, rgba(184, 68, 23, 0.10), transparent 60%),
        repeating-linear-gradient(60deg, transparent 0, transparent 100px, rgba(213, 88, 42, 0.04) 100px, rgba(213, 88, 42, 0.04) 102px),
        #FBF6EE`,
    },
    dark: {
      background: `
        radial-gradient(ellipse 600px 300px at 20% 20%, rgba(232, 153, 119, 0.18), transparent 60%),
        radial-gradient(ellipse 500px 250px at 80% 80%, rgba(229, 196, 122, 0.10), transparent 60%),
        radial-gradient(ellipse 400px 200px at 50% 100%, rgba(213, 88, 42, 0.20), transparent 60%),
        repeating-linear-gradient(60deg, transparent 0, transparent 100px, rgba(232, 153, 119, 0.05) 100px, rgba(232, 153, 119, 0.05) 102px),
        #14100C`,
    },
  },
  {
    id: "moss",
    name: "Moss",
    desc: "Green crater lake",
    light: {
      background: `
        radial-gradient(ellipse 700px 400px at 30% 70%, rgba(47, 110, 66, 0.18), transparent 60%),
        radial-gradient(ellipse 500px 300px at 80% 30%, rgba(74, 138, 92, 0.10), transparent 60%),
        repeating-linear-gradient(135deg, transparent 0, transparent 60px, rgba(47, 110, 66, 0.04) 60px, rgba(47, 110, 66, 0.04) 61px),
        #F4F6EC`,
    },
    dark: {
      background: `
        radial-gradient(ellipse 700px 400px at 30% 70%, rgba(141, 188, 154, 0.14), transparent 60%),
        radial-gradient(ellipse 500px 300px at 80% 30%, rgba(74, 138, 92, 0.18), transparent 60%),
        repeating-linear-gradient(135deg, transparent 0, transparent 60px, rgba(141, 188, 154, 0.04) 60px, rgba(141, 188, 154, 0.04) 61px),
        #0E1410`,
    },
  },
];

export const BACKGROUNDS_BY_ID: Record<BackgroundId, BackgroundDef> =
  Object.fromEntries(BACKGROUNDS.map((b) => [b.id, b])) as Record<BackgroundId, BackgroundDef>;

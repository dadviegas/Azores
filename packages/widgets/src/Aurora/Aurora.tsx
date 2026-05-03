import { LoadingShimmer } from "@azores/ui";
import {
  AURORA_SOURCE_NAME,
  useSource,
  type AuroraData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import { Band, Empty, Kp, When, Wrap } from "./Aurora.styles.js";

const bandFor = (kp: number): { label: string; color: string } => {
  if (kp < 3) return { label: "Quiet", color: "var(--az-success-500, #2a9d8f)" };
  if (kp < 4) return { label: "Unsettled", color: "var(--az-ocean-500)" };
  if (kp < 5) return { label: "Active", color: "var(--az-honey-500, #e9c46a)" };
  if (kp < 6) return { label: "Minor storm", color: "var(--az-orange-500, #f4a261)" };
  if (kp < 7) return { label: "Moderate storm", color: "var(--az-coral-500)" };
  return { label: "Severe storm", color: "var(--az-lava-500)" };
};

export const Aurora = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<AuroraData>(
    AURORA_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 44, width: "40%" }} />
        <LoadingShimmer style={{ height: 14, width: "60%" }} />
      </Wrap>
    );
  }

  if (error || !Array.isArray(data) || data.length < 2) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Aurora data unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  // Skip the header row and take the last entry — that's the most recent
  // 3-hour Kp. SWPC has been seen returning rows as plain arrays AND as
  // objects with {time_tag, kp, ...}, so normalise both shapes here rather
  // than crashing on a tuple destructure.
  const last = data[data.length - 1];
  let time: string | undefined;
  let kpRaw: unknown;
  if (Array.isArray(last)) {
    time = typeof last[0] === "string" ? last[0] : undefined;
    kpRaw = last[1];
  } else if (last && typeof last === "object") {
    const o = last as Record<string, unknown>;
    time = typeof o.time_tag === "string" ? o.time_tag : undefined;
    kpRaw = o.kp ?? o.Kp;
  }
  const kp = Number(kpRaw);
  if (time == null || !Number.isFinite(kp)) {
    return (
      <Wrap>
        <Empty>No Kp readings yet.</Empty>
      </Wrap>
    );
  }
  const b = bandFor(kp);

  return (
    <Wrap>
      <Kp band={b.color}>Kp {kp.toFixed(0)}</Kp>
      <Band band={b.color}>{b.label}</Band>
      <When>{new Date(time).toUTCString().replace(":00 GMT", " UTC")}</When>
    </Wrap>
  );
};

export default Aurora;

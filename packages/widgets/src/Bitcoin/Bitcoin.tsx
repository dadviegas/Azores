import { LoadingShimmer } from "@azores/ui";
import {
  MEMPOOL_SOURCE_NAME,
  useSource,
  type MempoolFees,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Empty,
  Label,
  Tier,
  Tiers,
  Unit,
  Value,
  Wrap,
} from "./Bitcoin.styles.js";

export const Bitcoin = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<MempoolFees>(
    MEMPOOL_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 56 }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Bitcoin fees unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  const tiers: ReadonlyArray<{ label: string; value: number }> = [
    { label: "Fast", value: data.fastestFee },
    { label: "30 min", value: data.halfHourFee },
    { label: "1 hr", value: data.hourFee },
    { label: "Economy", value: data.economyFee },
  ];

  return (
    <Wrap>
      <Tiers>
        {tiers.map((t) => (
          <Tier key={t.label}>
            <Label>{t.label}</Label>
            <Value>{t.value}</Value>
          </Tier>
        ))}
      </Tiers>
      <Unit>sat / vB</Unit>
    </Wrap>
  );
};

export default Bitcoin;

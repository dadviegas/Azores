import { LoadingShimmer } from "@azores/ui";
import {
  ADVICE_SOURCE_NAME,
  useSource,
  type AdviceData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import { Empty, Tag, Text, Wrap } from "./Advice.styles.js";

export const Advice = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<AdviceData>(
    ADVICE_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 18, width: "85%" }} />
        <LoadingShimmer style={{ height: 18, width: "65%" }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Advice unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Tag>Advice #{data.slip.id}</Tag>
      <Text>{data.slip.advice}</Text>
    </Wrap>
  );
};

export default Advice;

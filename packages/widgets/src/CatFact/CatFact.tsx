import { LoadingShimmer } from "@azores/ui";
import {
  CATFACT_SOURCE_NAME,
  useSource,
  type CatFactData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import { Empty, Fact, Wrap } from "./CatFact.styles.js";

export const CatFact = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<CatFactData>(
    CATFACT_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 14, width: "92%" }} />
        <LoadingShimmer style={{ height: 14, width: "70%" }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Cat fact unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Fact>{data.fact}</Fact>
    </Wrap>
  );
};

export default CatFact;

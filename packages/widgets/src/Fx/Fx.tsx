import { LoadingShimmer } from "@azores/ui";
import {
  FX_SOURCE_NAME,
  useSource,
  type FxParams,
  type FxRates,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import { Code, Header, Pair, Rate, Rates, Wrap } from "./Fx.styles.js";

const PARAMS: FxParams = { base: "EUR", symbols: ["USD", "GBP", "JPY", "BRL"] };

export const Fx = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<FxRates>(
    FX_SOURCE_NAME,
    PARAMS,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <Header>
          <span>EUR base</span>
          <span>—</span>
        </Header>
        <Rates>
          {[0, 1, 2, 3].map((i) => (
            <LoadingShimmer key={i} style={{ height: 40 }} />
          ))}
        </Rates>
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Header style={{ color: "var(--az-coral-500)" }}>
          FX unavailable. {error?.message ?? "—"}
        </Header>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Header>
        <span>EUR base</span>
        <span>{data.date}</span>
      </Header>
      <Rates>
        {Object.entries(data.rates).map(([code, value]) => (
          <Pair key={code}>
            <Code>{code}</Code>
            <Rate>{value.toFixed(3)}</Rate>
          </Pair>
        ))}
      </Rates>
    </Wrap>
  );
};

export default Fx;

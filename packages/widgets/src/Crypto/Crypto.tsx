import { LoadingShimmer } from "@azores/ui";
import {
  COINGECKO_SOURCE_NAME,
  useSource,
  type CoinGeckoData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Change,
  CoinIcon,
  Empty,
  FullName,
  List,
  Name,
  Price,
  Row,
  Symbol,
  Wrap,
} from "./Crypto.styles.js";

const PARAMS = { vsCurrency: "usd", perPage: 8 };

const fmtPrice = (n: number): string => {
  if (n >= 1000) return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  if (n >= 1) return `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  return `$${n.toFixed(4)}`;
};

const fmtChange = (n: number | null): string =>
  n == null ? "—" : `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;

export const Crypto = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<CoinGeckoData>(
    COINGECKO_SOURCE_NAME,
    PARAMS,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <List>
          {[0, 1, 2, 3].map((i) => (
            <LoadingShimmer key={i} style={{ height: 32, marginBottom: 8 }} />
          ))}
        </List>
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Crypto data unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <List>
        {data.map((coin) => {
          const change = coin.price_change_percentage_24h;
          return (
            <Row key={coin.id}>
              <CoinIcon src={coin.image} alt="" />
              <Name>
                <Symbol>{coin.symbol}</Symbol>
                <FullName>{coin.name}</FullName>
              </Name>
              <Price>{fmtPrice(coin.current_price)}</Price>
              <Change pos={(change ?? 0) >= 0}>{fmtChange(change)}</Change>
            </Row>
          );
        })}
      </List>
    </Wrap>
  );
};

export default Crypto;

import { registerSource, type Source } from "@azores/core";

export type CoinGeckoParams = { vsCurrency?: string; perPage?: number };

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number | null;
};

export type CoinGeckoData = Coin[];

export const COINGECKO_SOURCE_NAME = "azores-external-coingecko";

export const coinGeckoSource: Source<CoinGeckoParams, CoinGeckoData> = {
  name: COINGECKO_SOURCE_NAME,
  ttlMs: 5 * 60 * 1000,
  build: ({ vsCurrency = "usd", perPage = 10 } = {}) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}` +
    `&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false` +
    `&price_change_percentage=24h`,
};

registerSource(coinGeckoSource);

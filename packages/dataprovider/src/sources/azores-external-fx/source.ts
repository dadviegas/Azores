import { registerSource, type Source } from "@azores/core";

export type FxParams = { base?: string; symbols?: string[] };
export type FxRates = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};

export const FX_SOURCE_NAME = "azores-external-fx";

export const fxSource: Source<FxParams, FxRates> = {
  name: FX_SOURCE_NAME,
  ttlMs: 5 * 60 * 1000,
  build: ({ base = "EUR", symbols = ["USD", "GBP", "JPY", "BRL"] } = {}) =>
    `https://api.frankfurter.dev/v1/latest?from=${base}&to=${symbols.join(",")}`,
};

registerSource(fxSource);

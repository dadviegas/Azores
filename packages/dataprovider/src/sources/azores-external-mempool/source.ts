import { registerSource, type Source } from "@azores/core";

export type MempoolParams = Record<string, never>;

export type MempoolFees = {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
};

export const MEMPOOL_SOURCE_NAME = "azores-external-mempool";

export const mempoolSource: Source<MempoolParams, MempoolFees> = {
  name: MEMPOOL_SOURCE_NAME,
  ttlMs: 60 * 1000,
  build: () => "https://mempool.space/api/v1/fees/recommended",
};

registerSource(mempoolSource);

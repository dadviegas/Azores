import { registerSource, type Source } from "@azores/core";

export type AdviceParams = Record<string, never>;

export type AdviceData = {
  slip: { id: number; advice: string };
};

export const ADVICE_SOURCE_NAME = "azores-external-advice";

export const adviceSource: Source<AdviceParams, AdviceData> = {
  name: ADVICE_SOURCE_NAME,
  ttlMs: 30 * 60 * 1000,
  build: () => "https://api.adviceslip.com/advice",
};

registerSource(adviceSource);

import { registerSource, type Source } from "@azores/core";

export type DogParams = Record<string, never>;
export type DogData = { message: string; status: string };

export const DOG_SOURCE_NAME = "azores-external-dog";

export const dogSource: Source<DogParams, DogData> = {
  name: DOG_SOURCE_NAME,
  ttlMs: 30 * 60 * 1000,
  build: () => "https://dog.ceo/api/breeds/image/random",
};

registerSource(dogSource);

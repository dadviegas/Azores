import { registerSource, type Source } from "@azores/core";

export type TriviaParams = Record<string, never>;

export type TriviaQuestion = {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type TriviaData = {
  response_code: number;
  results: TriviaQuestion[];
};

export const TRIVIA_SOURCE_NAME = "azores-external-trivia";

// `encode=base64` keeps special characters (em dashes, &) intact across
// the JSON wire — we decode in the widget.
export const triviaSource: Source<TriviaParams, TriviaData> = {
  name: TRIVIA_SOURCE_NAME,
  ttlMs: 30 * 60 * 1000,
  build: () =>
    "https://opentdb.com/api.php?amount=1&type=multiple&encode=base64",
};

registerSource(triviaSource);

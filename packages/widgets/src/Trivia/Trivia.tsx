import { useMemo, useState } from "react";
import { LoadingShimmer } from "@azores/ui";
import {
  TRIVIA_SOURCE_NAME,
  useSource,
  type TriviaData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Choice,
  Choices,
  Empty,
  Meta,
  Question,
  Reveal,
  Wrap,
} from "./Trivia.styles.js";

const decode = (s: string): string => {
  try {
    return decodeURIComponent(escape(window.atob(s)));
  } catch {
    return s;
  }
};

// Stable shuffle keyed off the question itself so the order doesn't move
// every render. Same input → same order.
const shuffleStable = (arr: string[], seed: string): string[] => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    const a = copy[i];
    const b = copy[j];
    if (a !== undefined && b !== undefined) {
      copy[i] = b;
      copy[j] = a;
    }
  }
  return copy;
};

export const Trivia = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<TriviaData>(
    TRIVIA_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );
  const [revealed, setRevealed] = useState(false);

  const decoded = useMemo(() => {
    const q = data?.results[0];
    if (!q) return null;
    return {
      category: decode(q.category),
      difficulty: decode(q.difficulty),
      question: decode(q.question),
      correct: decode(q.correct_answer),
      incorrect: q.incorrect_answers.map(decode),
    };
  }, [data]);

  const choices = useMemo(() => {
    if (!decoded) return [];
    return shuffleStable(
      [decoded.correct, ...decoded.incorrect],
      decoded.question,
    );
  }, [decoded]);

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 12, width: "30%" }} />
        <LoadingShimmer style={{ height: 36 }} />
        <LoadingShimmer style={{ height: 80 }} />
      </Wrap>
    );
  }

  if (error || !decoded) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Trivia unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Meta>
        {decoded.category} · {decoded.difficulty}
      </Meta>
      <Question>{decoded.question}</Question>
      <Choices>
        {choices.map((c) => (
          <Choice
            key={c}
            type="button"
            revealed={revealed}
            correct={c === decoded.correct}
            onClick={() => setRevealed(true)}
            disabled={revealed}
          >
            {c}
          </Choice>
        ))}
      </Choices>
      {!revealed ? (
        <Reveal type="button" onClick={() => setRevealed(true)}>
          Reveal answer →
        </Reveal>
      ) : null}
    </Wrap>
  );
};

export default Trivia;

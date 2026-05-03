import { LoadingShimmer } from "@azores/ui";
import {
  JOKE_SOURCE_NAME,
  useSource,
  type JokeData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import { Empty, Punchline, Setup, Wrap } from "./Joke.styles.js";

export const Joke = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<JokeData>(
    JOKE_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 16, width: "85%" }} />
        <LoadingShimmer style={{ height: 16, width: "65%" }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Joke unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Setup>{data.setup}</Setup>
      <Punchline>— {data.punchline}</Punchline>
    </Wrap>
  );
};

export default Joke;

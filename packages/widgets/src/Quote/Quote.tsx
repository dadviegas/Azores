import { LoadingShimmer } from "@azores/ui";
import {
  QUOTES_SOURCE_NAME,
  useSource,
  type QuoteData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import { Author, Body, Empty, Wrap } from "./Quote.styles.js";

export const Quote = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<QuoteData>(
    QUOTES_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 18, width: "90%" }} />
        <LoadingShimmer style={{ height: 18, width: "70%" }} />
        <LoadingShimmer style={{ height: 12, width: "30%", alignSelf: "flex-end" }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Quote unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Body>“{data.content}”</Body>
      <Author>{data.author}</Author>
    </Wrap>
  );
};

export default Quote;

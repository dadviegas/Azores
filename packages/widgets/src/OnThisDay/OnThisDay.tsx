import { LoadingShimmer } from "@azores/ui";
import {
  ONTHISDAY_SOURCE_NAME,
  useSource,
  type OnThisDayData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Empty,
  Item,
  List,
  Text,
  Today,
  Wrap,
  Year,
} from "./OnThisDay.styles.js";

const todayLabel = (): string =>
  new Date().toLocaleDateString(undefined, { day: "numeric", month: "long" });

export const OnThisDay = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<OnThisDayData>(
    ONTHISDAY_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <Today>{todayLabel()}</Today>
        <List>
          {[0, 1, 2, 3].map((i) => (
            <Item key={i}>
              <LoadingShimmer style={{ height: 12, width: 36 }} />
              <LoadingShimmer style={{ height: 12, width: "90%" }} />
            </Item>
          ))}
        </List>
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Today>{todayLabel()}</Today>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          On this day unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  // Most recent first; cap so the widget doesn't render hundreds.
  const events = [...data.events]
    .sort((a, b) => b.year - a.year)
    .slice(0, 12);

  return (
    <Wrap>
      <Today>{todayLabel()}</Today>
      <List>
        {events.map((ev) => (
          <Item key={`${ev.year}-${ev.text.slice(0, 24)}`}>
            <Year>{ev.year}</Year>
            <Text>{ev.text}</Text>
          </Item>
        ))}
      </List>
    </Wrap>
  );
};

export default OnThisDay;

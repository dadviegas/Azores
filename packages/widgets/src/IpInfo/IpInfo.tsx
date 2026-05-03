import { LoadingShimmer } from "@azores/ui";
import {
  IPINFO_SOURCE_NAME,
  useSource,
  type IpInfoData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import { Empty, Ip, Label, Row, Value, Wrap } from "./IpInfo.styles.js";

export const IpInfo = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<IpInfoData>(
    IPINFO_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 18, width: "60%" }} />
        <LoadingShimmer style={{ height: 36 }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          IP info unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Ip>{data.ip}</Ip>
      <Row>
        <Label>Where</Label>
        <Value>
          {[data.city, data.region, data.country_name].filter(Boolean).join(", ")}
        </Value>
        <Label>ISP</Label>
        <Value>{data.org}</Value>
        <Label>TZ</Label>
        <Value>{data.timezone}</Value>
      </Row>
    </Wrap>
  );
};

export default IpInfo;

import { LoadingShimmer } from "@azores/ui";
import {
  NPM_SOURCE_NAME,
  useSource,
  type NpmData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import { Big, Empty, Period, Pkg, Wrap } from "./NpmDownloads.styles.js";

const PARAMS = { pkg: "react", period: "last-week" as const };

const fmt = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return n.toLocaleString("en-US");
};

export const NpmDownloads = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<NpmData>(
    NPM_SOURCE_NAME,
    PARAMS,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 30, width: "60%" }} />
        <LoadingShimmer style={{ height: 12, width: "30%" }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          npm unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Big>{fmt(data.downloads)}</Big>
      <Pkg>{data.package}</Pkg>
      <Period>last week</Period>
    </Wrap>
  );
};

export default NpmDownloads;

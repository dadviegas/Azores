import { LoadingShimmer } from "@azores/ui";
import {
  APOD_SOURCE_NAME,
  useSource,
  type ApodData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Caption,
  Empty,
  Img,
  ImgFrame,
  Title,
  Wrap,
} from "./Apod.styles.js";

export const Apod = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<ApodData>(
    APOD_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ flex: 1, minHeight: 80 }} />
        <LoadingShimmer style={{ height: 14, width: "60%" }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          APOD unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <ImgFrame>
        {data.media_type === "image" ? (
          <Img src={data.url} alt={data.title} loading="lazy" />
        ) : (
          <Empty style={{ padding: 12 }}>(video — see NASA APOD page)</Empty>
        )}
      </ImgFrame>
      <Title>{data.title}</Title>
      <Caption>{data.explanation}</Caption>
    </Wrap>
  );
};

export default Apod;

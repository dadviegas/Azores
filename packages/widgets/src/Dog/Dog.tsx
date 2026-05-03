import { LoadingShimmer } from "@azores/ui";
import {
  DOG_SOURCE_NAME,
  useSource,
  type DogData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import { Empty, Img, Wrap } from "./Dog.styles.js";

export const Dog = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<DogData>(
    DOG_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: "100%" }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Dog photo unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Img src={data.message} alt="A random dog" loading="lazy" />
    </Wrap>
  );
};

export default Dog;

import { LoadingShimmer } from "@azores/ui";
import {
  MEAL_SOURCE_NAME,
  useSource,
  type MealData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Body,
  Empty,
  Instructions,
  Meta,
  Name,
  Thumb,
  Wrap,
} from "./Meal.styles.js";

export const Meal = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<MealData>(
    MEAL_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ width: 96, height: 96 }} />
        <Body>
          <LoadingShimmer style={{ height: 14, width: "60%" }} />
          <LoadingShimmer style={{ height: 60 }} />
        </Body>
      </Wrap>
    );
  }

  const meal = data?.meals?.[0];
  if (error || !meal) {
    return (
      <Wrap>
        <Body>
          <Empty style={{ color: "var(--az-coral-500)" }}>
            Meal unavailable. {error?.message ?? "—"}
          </Empty>
        </Body>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Thumb src={meal.strMealThumb} alt="" />
      <Body>
        <Name>{meal.strMeal}</Name>
        <Meta>
          {[meal.strArea, meal.strCategory].filter(Boolean).join(" · ")}
        </Meta>
        <Instructions>{meal.strInstructions}</Instructions>
      </Body>
    </Wrap>
  );
};

export default Meal;

import { LoadingShimmer } from "@azores/ui";
import {
  COCKTAIL_SOURCE_NAME,
  useSource,
  type CocktailData,
  type CocktailDrink,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Body,
  Empty,
  List,
  Meta,
  Name,
  Thumb,
  Wrap,
} from "./Cocktail.styles.js";

const ingredients = (drink: CocktailDrink): string[] => {
  const out: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ing && ing.trim()) {
      out.push(`${(measure ?? "").trim()} ${ing.trim()}`.trim());
    }
  }
  return out;
};

export const Cocktail = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<CocktailData>(
    COCKTAIL_SOURCE_NAME,
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

  const drink = data?.drinks?.[0];

  if (error || !drink) {
    return (
      <Wrap>
        <Body>
          <Empty style={{ color: "var(--az-coral-500)" }}>
            Cocktail unavailable. {error?.message ?? "—"}
          </Empty>
        </Body>
      </Wrap>
    );
  }

  const ings = ingredients(drink).slice(0, 5);

  return (
    <Wrap>
      <Thumb src={drink.strDrinkThumb} alt="" />
      <Body>
        <Name>{drink.strDrink}</Name>
        <Meta>
          {[drink.strCategory, drink.strGlass].filter(Boolean).join(" · ")}
        </Meta>
        <List>
          {ings.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </List>
      </Body>
    </Wrap>
  );
};

export default Cocktail;

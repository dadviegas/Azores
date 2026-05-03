import { registerSource, type Source } from "@azores/core";

export type CocktailParams = Record<string, never>;

// TheCocktailDB returns ingredients/measures as 15 numbered fields. We
// keep the raw shape and let the widget pivot it.
export type CocktailDrink = Record<string, string | null> & {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCategory?: string;
  strGlass?: string;
};

export type CocktailData = { drinks: CocktailDrink[] | null };

export const COCKTAIL_SOURCE_NAME = "azores-external-cocktail";

export const cocktailSource: Source<CocktailParams, CocktailData> = {
  name: COCKTAIL_SOURCE_NAME,
  ttlMs: 60 * 60 * 1000,
  build: () => "https://www.thecocktaildb.com/api/json/v1/1/random.php",
};

registerSource(cocktailSource);

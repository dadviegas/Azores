import { registerSource, type Source } from "@azores/core";

export type MealParams = Record<string, never>;

export type MealItem = Record<string, string | null> & {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
};

export type MealData = { meals: MealItem[] | null };

export const MEAL_SOURCE_NAME = "azores-external-meal";

export const mealSource: Source<MealParams, MealData> = {
  name: MEAL_SOURCE_NAME,
  ttlMs: 60 * 60 * 1000,
  build: () => "https://www.themealdb.com/api/json/v1/1/random.php",
};

registerSource(mealSource);

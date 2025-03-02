import { Ingredient, Variation } from "@prisma/client";

/**
 * Функція для підрахунку загальної вартості піци
 * @param items - варіанти піци
 * @param size - розмір піци
 * @param type - тип тіста піци
 * @param ingredients - інгредієти піци
 * @param addedIngredients - інгредієти, які були додані до піци
 * @returns загальна ціна піци
 */

export const calcPizzaPrice = (
  items: Variation[],
  size: number,
  type: number,
  ingredients: Ingredient[],
  addedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find(
      (item) => Number(item.size) === size && Number(item.pizzaType) === type
    )?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((item) => addedIngredients.has(item.id))
    .reduce((acc, item) => acc + item.price, 0);
  return pizzaPrice + totalIngredientsPrice;
};

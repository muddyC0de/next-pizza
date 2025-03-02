import { Ingredient } from "@prisma/client";

export const getCartItemDetails = (
  ingredients: Array<{ name: string; price: number }>
) => {
  const details = [];

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};

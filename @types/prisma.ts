import { Ingredient, Product, Variation } from "@prisma/client";

export type ProductWithRelation = Product & {
  items: Variation[];
  ingredients: Ingredient[];
};

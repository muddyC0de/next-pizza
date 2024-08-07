import { Cart, CartItem, Ingredient, Product, Variation } from "@prisma/client";

export type CartItemDTO = CartItem & {
  productItem: Variation & { product: Product };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  pizzaSize?: number;
  type?: number;
  ingredientsIds?: number[];
  description?: string;
  quantity: number;
}

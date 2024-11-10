import { CartItemDTO } from "../services/dto/cart";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, item) => acc + item.price,
    0
  );
  return (ingredientsPrice + item.productItem.price) * item.quantity;
};

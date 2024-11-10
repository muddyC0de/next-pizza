import { mapPizzaTypes, PizzaSize, PizzaType } from "../constanst/pizza";

export const getCartItemInfo = (
  info: string,
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
) => {
  if (pizzaType && pizzaSize) {
    const typeName = mapPizzaTypes[pizzaType];
    return `${typeName} тісто, ${pizzaSize} см`;
  }

  return info;
};

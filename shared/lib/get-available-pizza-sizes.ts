import { Variation } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constanst/pizza";

export const getAvailablePizzaSizes = (type: PizzaType, items: Variation[]) => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === item.value
    ),
  }));
};

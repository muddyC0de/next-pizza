export const mapPizzaSize = {
  25: "Маленька",
  30: "Середня",
  40: "Велика",
} as const;

export const mapPizzaTypes = {
  1: "Традиційне",
  2: "Тонке",
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([name, value]) => ({
  name: value,
  value: Number(name),
}));

export const pizzaTypes = Object.entries(mapPizzaTypes).map(
  ([name, value]) => ({
    name: value,
    value: Number(name),
  })
);

export type PizzaType = keyof typeof mapPizzaTypes;
export type PizzaSize = keyof typeof mapPizzaSize;

import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(",").map((item) => Number(item));
  const pizzaTypes = params.pizzaTypes?.split(",").map((item) => Number(item));
  const ingredientsIdArr = params.ingredients
    ?.split(",")
    .map((item) => Number(item));
  const priceFrom = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const priceTo = Number(params.priceTo) || DEFAULT_MAX_PRICE;
  const sortBy = params.sortBy || "asc";
  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },

        where: {
          ingredients: ingredientsIdArr
            ? { some: { id: { in: ingredientsIdArr } } }
            : undefined,
          items: {
            some: {
              size: { in: sizes },
              pizzaType: { in: pizzaTypes },
              price: { gte: priceFrom, lte: priceTo },
            },
          },
        },

        include: {
          ingredients: true,
          items: {
            where: {
              price: { gte: priceFrom, lte: priceTo },
            },
            orderBy: {
              price: sortBy === "asc" ? "asc" : "desc",
            },
          },
        },
      },
    },
  });

  return categories;
};

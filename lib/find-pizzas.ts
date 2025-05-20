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

export const findPizzas = async (params: Promise<GetSearchParams>) => {
  const {
    sizes,
    pizzaTypes,
    ingredients: ingredientsStr,
    priceFrom: priceFromStr,
    priceTo: priceToStr,
    sortBy: sortByRaw,
  } = await params;

  const sizesArr = sizes?.split(",").map(Number);
  const pizzaTypesArr = pizzaTypes?.split(",").map(Number);
  const ingredientsArr = ingredientsStr?.split(",").map(Number);
  const priceFrom = Number(priceFromStr) || DEFAULT_MIN_PRICE;
  const priceTo = Number(priceToStr) || DEFAULT_MAX_PRICE;
  const sortDirection = sortByRaw === "desc" ? "desc" : "asc";

  const categories = await prisma.category.findMany({
    include: {
      products: {
        where: {
          ingredients: ingredientsArr
            ? { some: { id: { in: ingredientsArr } } }
            : undefined,
          items: {
            some: {
              size: { in: sizesArr },
              pizzaType: { in: pizzaTypesArr },
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
              price: sortDirection,
            },
          },
        },
      },
    },
  });

  for (const category of categories) {
    category.products.sort((a, b) => {
      const aMin = Math.min(...a.items.map((i) => i.price));
      const bMin = Math.min(...b.items.map((i) => i.price));
      return sortDirection === "asc" ? aMin - bMin : bMin - aMin;
    });
  }

  return categories;
};

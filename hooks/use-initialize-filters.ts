import { useSearchParams } from "next/navigation";
import { useQueryStore } from "@/shared/store/query";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export const useInitializeFilters = (
  setPrice: Dispatch<SetStateAction<PriceProps>>
) => {
  const searchParams = useSearchParams();
  const {
    selectedSizes,
    selectedIngredients,
    selectedPizzaTypes,
    toggleIngredient,
    togglePizzaTypes,
    toggleSize,
  } = useQueryStore((state) => state);

  useEffect(() => {
    if (!searchParams) return;

    const sizes = searchParams.get("sizes")?.split(",") || [];
    const ingredients = searchParams.get("ingredients")?.split(",") || [];
    const pizzaTypes = searchParams.get("pizzaTypes")?.split(",") || [];
    const sortByParam = searchParams.get("sortBy") || null;
    const priceFrom = searchParams.get("priceFrom")
      ? Number(searchParams.get("priceFrom"))
      : undefined;
    const priceTo = searchParams.get("priceTo")
      ? Number(searchParams.get("priceTo"))
      : undefined;

    selectedSizes.clear();
    selectedIngredients.clear();
    selectedPizzaTypes.clear();

    sizes.forEach((size) => toggleSize(size));
    ingredients.forEach((ingredient) => toggleIngredient(ingredient));
    pizzaTypes.forEach((type) => togglePizzaTypes(type));

    if (sortByParam) {
      useQueryStore.setState({ sortBy: sortByParam });
    }

    if (priceFrom !== undefined && priceTo !== undefined) {
      setPrice({ priceFrom, priceTo });
    }
  }, []);
};

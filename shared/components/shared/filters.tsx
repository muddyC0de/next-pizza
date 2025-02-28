"use client";

import React from "react";
import { Title } from "./title";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { Api } from "@/shared/services/api-client";
import qs from "qs";
import { Input } from "../ui";
import { useRouter } from "next/navigation";
import { useQueryStore } from "@/shared/store/query";
interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export type IngredientItem = {
  text: string;
  id: number;
};

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const isMounted = React.useRef(false);
  const {
    selectedIngredients,
    selectedPizzaTypes,
    selectedSizes,
    toggleIngredient,
    togglePizzaTypes,
    toggleSize,
    sortBy,
  } = useQueryStore((state) => state);
  const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);

  const [price, setPrice] = React.useState<PriceProps>({});
  const [loading, setLoading] = React.useState(true);

  const updatePrice = (from: number, to: number) => {
    setPrice({ priceFrom: from, priceTo: to });
  };

  React.useEffect(() => {
    async function fetch() {
      setLoading(true);
      const data = await Api.ingredients.getAll();

      setIngredients(data.map((item) => ({ text: item.name, id: item.id })));
      setLoading(false);
    }

    fetch();
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const filters = {
        ...price,
        sizes: Array.from(selectedSizes),
        ingredients: Array.from(selectedIngredients),
        pizzaTypes: Array.from(selectedPizzaTypes),
        sortBy,
      };

      const query = qs.stringify(filters, { arrayFormat: "comma" });
      router.push(`?${query}`, { scroll: false });
    }
    isMounted.current = true;
  }, [selectedSizes, selectedIngredients, selectedPizzaTypes, price, sortBy]);

  React.useEffect(() => {
    if (typeof window === "undefined") return; // Проверяем, что код выполняется на клиенте

    const params = new URLSearchParams(window.location.search);

    const sizes = params.get("sizes")?.split(",") || [];
    const ingredients = params.get("ingredients")?.split(",") || [];
    const pizzaTypes = params.get("pizzaTypes")?.split(",") || [];
    const sortBy = params.get("sortBy") || null;
    const priceFrom = params.get("priceFrom")
      ? Number(params.get("priceFrom"))
      : undefined;
    const priceTo = params.get("priceTo")
      ? Number(params.get("priceTo"))
      : undefined;

    // Устанавливаем значения в Zustand
    selectedSizes.clear();
    selectedIngredients.clear();
    selectedPizzaTypes.clear();

    sizes.forEach((size) => toggleSize(size));
    ingredients.forEach((ingredient) => toggleIngredient(ingredient));
    pizzaTypes.forEach((type) => togglePizzaTypes(type));

    if (sortBy) {
      useQueryStore.setState({ sortBy });
    }

    if (priceFrom !== undefined && priceTo !== undefined) {
      setPrice({ priceFrom, priceTo });
    }
  }, []);

  return (
    <div className={className}>
      {/* Верхні чекбокси */}
      <Title text="Фільтрація" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        selectedValues={selectedPizzaTypes}
        title="Тип тіста"
        onClickCheckbox={(value: string) => togglePizzaTypes(value)}
        items={[
          { text: "Тонке", value: "1" },
          { text: "Традиційне", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        selectedValues={selectedSizes}
        title="Розміри"
        onClickCheckbox={(value: string) => toggleSize(value)}
        items={[
          { text: "Маленька", value: "25" },
          { text: "Середня", value: "30" },
          { text: "Велика", value: "40" },
        ]}
      />

      {/* Фільтрація цін */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Ціна від і до</p>

        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder={String(price.priceFrom || 0)}
            min={price.priceFrom || 0}
            max={price.priceTo || 1000}
            defaultValue={price.priceFrom}
            className="rounded-lg"
            onChange={(e) =>
              updatePrice(Number(e.target.value), price.priceTo || 1000)
            }
          />
          <Input
            type="number"
            className="rounded-lg"
            placeholder={String(price.priceTo || 1000)}
            min={price.priceFrom || 0}
            max={price.priceTo || 1000}
            defaultValue={price.priceTo}
            onChange={(e) =>
              updatePrice(price.priceFrom || 0, Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[price.priceFrom || 0, price.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrice({ priceFrom, priceTo })
          }
        />
      </div>

      <CheckboxFiltersGroup
        title="Інгредієнти"
        className="mt-5"
        limit={5}
        selectedValues={selectedIngredients}
        onClickCheckbox={(value: string) => toggleIngredient(value)}
        defaultItems={
          ingredients?.map((o) => ({ text: o.text, value: o.id.toString() })) ||
          []
        }
        loading={loading}
        items={
          ingredients?.map((o) => ({ text: o.text, value: o.id.toString() })) ||
          []
        }
      />
    </div>
  );
};

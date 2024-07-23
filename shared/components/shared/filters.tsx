"use client";

import React from "react";
import { Title } from "./title";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { Api } from "@/shared/services/api-client";
import { useSet } from "react-use";
import qs from "qs";
import { Input } from "../ui";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet<string>(
    new Set<string>([])
  );
  const [selectedPizzaTypes, { toggle: toggleSelectedPizzaTypes }] =
    useSet<string>(new Set<string>([]));

  const [price, setPrice] = React.useState<PriceProps>({});
  const [selectedSizes, { toggle: toggleSize }] = useSet(new Set<string>([]));
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
    const filters = {
      ...price,
      sizes: Array.from(selectedSizes),
      ingredients: Array.from(selectedIngredients),
      pizzaTypes: Array.from(selectedPizzaTypes),
    };

    const query = qs.stringify(filters, { arrayFormat: "comma" });
    router.push(`?${query}`, { scroll: false });
  }, [selectedSizes, selectedIngredients, selectedPizzaTypes, price, router]);
  return (
    <div className={className}>
      {/* Верхні чекбокси */}
      <Title text="Фільтрація" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        selectedValues={selectedPizzaTypes}
        title="Тип тіста"
        onClickCheckbox={(value: string) => toggleSelectedPizzaTypes(value)}
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
          { text: "Маленька", value: "20" },
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
            onChange={(e) =>
              updatePrice(Number(e.target.value), price.priceTo || 1000)
            }
          />
          <Input
            type="number"
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

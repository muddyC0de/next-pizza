"use client";

import { cn } from "@/shared/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import React from "react";
import {
  mapPizzaTypes,
  PizzaSize,
  PizzaType,
  pizzaTypes,
} from "@/shared/constanst/pizza";
import { Variants } from "./variants";
import { Ingredient, Variation } from "@prisma/client";
import { IngredientCard } from "./ingredient-card";
import { useSet } from "react-use";
import { calcPizzaPrice, getAvailablePizzaSizes } from "@/shared/lib";
import { Button } from "../ui/button";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  isLoading: boolean;
  items: Variation[];
  onClickAdd?: () => void;
  onSumbit: (productItemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  isLoading,
  onSumbit,
  className,
}) => {
  const [addedIngredients, { toggle: setAddedIngredients }] = useSet<number>(
    new Set([])
  );
  const [size, setSize] = React.useState<PizzaSize>(25);
  const [type, setType] = React.useState<PizzaType>(1);

  const totalPrice = calcPizzaPrice(
    items,
    size,
    type,
    ingredients,
    addedIngredients
  );

  const onClick = (id: number) => {
    setAddedIngredients(id);
  };
  const currentItemId = items.find(
    (item) => Number(item.size) === size && Number(item.pizzaType) === type
  )?.id;
  const handleClickAdd = () => {
    if (currentItemId) {
      onSumbit(currentItemId, Array.from(addedIngredients));
    }
  };

  const availablePizzaSizes = getAvailablePizzaSizes(type, items);

  React.useEffect(() => {
    const isAwailableSize = availablePizzaSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if (!isAwailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);
  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400 mb-7">
          {size} см, {mapPizzaTypes[type].toLowerCase()} тісто
        </p>
        <div className="flex flex-col select-none gap-2 mb-7">
          <Variants
            items={availablePizzaSizes}
            selectedValue={size}
            onChange={(value) => setSize(value as PizzaSize)}
          />
          <Variants
            items={pizzaTypes}
            selectedValue={type}
            onChange={(value) => setType(value as PizzaType)}
          />
        </div>
        <Title
          text="Додати по смаку"
          size="sm"
          className="mb-3 font-semibold"
        />
        <div className="overflow-auto h-[420px] bg-gray-50 p-5 rounded-md scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientCard
                key={ingredient.id}
                onClick={() => onClick(ingredient.id)}
                id={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                isAdded={addedIngredients.has(ingredient.id)}
                price={ingredient.price}
              />
            ))}
          </div>
        </div>

        <Button
          loading={isLoading}
          onClick={handleClickAdd}
          className={"h-[55px] px-10 text-base rounded-[18px] w-full mt-7"}
        >
          Додати в корзину за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};

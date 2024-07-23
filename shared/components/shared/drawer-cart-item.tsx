"use client";

import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Ingredient } from "@prisma/client";
import { PizzaSize, PizzaType } from "@/shared/constanst/pizza";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";
import { useCartStore } from "@/shared/store/cart";
import React from "react";

interface Props {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  info: string;
  quantity: number;
  details?: string;
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  onClickRemoveButton: () => void;
  className?: string;
}

export const DrawerCartItem: React.FC<Props> = ({
  id,
  name,
  imageUrl,
  price,
  details,
  quantity,
  info,
  onClickCountButton,
  onClickRemoveButton,
  className,
}) => {
  const [disabled, setDisabled] = React.useState(false);

  const onClickRemove = async () => {
    setDisabled(true);
    await onClickRemoveButton?.();
    setDisabled(false);
  };
  return (
    <div
      className={cn(
        className,
        "p-5 bg-white rounded-lg flex  items-start",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <img height={65} width={65} src={imageUrl} className="mr-5" alt="" />

      <div className="flex w-full flex-col ">
        <Title className="font-extrabold" text={name} size="xs" />
        <p className="text-gray-400 text-sm">{info}</p>
        <p className="text-gray-400 text-[12px] break-all">
          {details && `+ ${details.toLowerCase()}`}
        </p>

        <div className="w-full h-[1px] bg-gray-200 my-4"></div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <CountButton
              onClick={(type) => onClickCountButton(id, quantity, type)}
              value={quantity}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold">{price} ₴</span>
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={() => onClickRemove()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

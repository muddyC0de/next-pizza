"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { CountButton, type CountButtonProps } from "./count-button";
import Image from "next/image";
import { Title } from "@/components/shared";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  details: string;
  info: string;
  quantity: number;
  className?: string;
  onClickRemoveButton?: () => void;
  onClickCountButton?: CountButtonProps["onClick"];
}

export const CartItem: React.FC<Props> = ({
  id,
  name,
  price,
  details,
  info,
  imageUrl,
  quantity,
  className,
  onClickCountButton,
  onClickRemoveButton,
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
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      {/* Product info section */}
      <div className="flex items-center gap-3 sm:gap-5 flex-1 w-full sm:w-auto">
        <div className="relative h-16 w-16 sm:h-[65px] sm:w-[65px] flex-shrink-0">
          <Image
            fill
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <Title text={name} size="xs" className="font-extrabold" />
          <p className="text-gray-400 text-sm">{info}</p>
          <p className="text-gray-400 text-[12px] break-words max-w-[200px] sm:max-w-none sm:w-[90%]">
            {details && `+ ${details.toLowerCase()}`}
          </p>
        </div>
      </div>

      {/* Price and controls section */}
      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4 sm:gap-5 mt-2 sm:mt-0">
        <span className="font-bold whitespace-nowrap">{price} ₴</span>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex gap-2 items-center">
            <CountButton onClick={onClickCountButton} value={quantity} />
          </div>
          <button
            onClick={onClickRemove}
            className="p-1"
            aria-label="Remove item"
          >
            <X
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

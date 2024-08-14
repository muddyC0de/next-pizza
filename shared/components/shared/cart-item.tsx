"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import { CountButton, CountButtonProps } from "./count-button";
import { Title } from "./title";

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
        "flex items-center justify-between",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <img height={65} width={65} src={imageUrl} alt="" />
        <div className="flex flex-col">
          <Title text={name} size="xs" className="font-extrabold" />
          <p className="text-gray-400 text-sm">{info}</p>
          <p className="text-gray-400 text-[12px] break-all  w-[90%]">
            {details && `+ ${details.toLowerCase()}`}
          </p>
        </div>
      </div>

      <span className="font-bold">{price} ₴</span>

      <div className="flex items-center gap-5 ml-20">
        <div className="flex gap-2 items-center">
          <CountButton onClick={onClickCountButton} value={quantity} />
        </div>
        <button onClick={onClickRemove}>
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};

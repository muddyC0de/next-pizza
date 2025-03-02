"use client";

import { cn } from "@/lib/utils";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { Title } from "@/components/shared";
import Image from "next/image";

interface Props {
  id: number;
  name: string;
  imageUrl: string;
  description?: string;
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
  description,
  quantity,
  info,
  onClickCountButton,
  onClickRemoveButton,
  className,
}) => {
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onClickRemove = async () => {
    setDisabled(true);
    await onClickRemoveButton?.();
    setDisabled(false);
  };

  const handleClickCountButton = async (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    setLoading(true);
    await onClickCountButton(id, quantity, type);
    setLoading(false);
  };

  return (
    <div
      className={cn(
        className,
        "p-5 bg-white rounded-lg flex  items-start",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <Image height={65} width={65} src={imageUrl} className="mr-5" alt="" />

      <div className="flex w-full flex-col ">
        <Title className="font-extrabold" text={name} size="xs" />
        <p className="text-gray-400 text-sm">{info}</p>
        <p className="text-gray-400 text-[12px] break-all">
          {details && `+ ${details.toLowerCase()}`}
          {description || ""}
        </p>

        <div className="w-full h-[1px] bg-gray-200 my-4"></div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <CountButton
              loading={loading}
              onClick={(type) => handleClickCountButton(id, quantity, type)}
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

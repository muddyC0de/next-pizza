import React from "react";
import { WhiteBlock } from "./white-block";
import { ArrowRight, Package, Truck } from "lucide-react";
import { Button } from "../ui";

interface Props {
  className?: string;
  totalAmount: number;
}

const DELIVERY_PRICE = 60;

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  className,
}) => {
  return (
    <div className="w-[450px]">
      <WhiteBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Всього:</span>
          <span className="text-[34px] font-extrabold">
            {totalAmount + DELIVERY_PRICE} ₴
          </span>
        </div>
        <div className="flex my-4">
          <span className="flex flex-1 text-lg text-neutral-500">
            <span className="flex items-center">
              <Package className="mr-2 text-gray-300" size={16} />
              Ціна корзини:
            </span>
            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
          </span>

          <span className="font-bold text-lg">{totalAmount} ₴</span>
        </div>

        <div className="flex my-4">
          <span className="flex flex-1 text-lg text-neutral-500">
            <span className="flex items-center">
              <Truck className="mr-2 text-gray-300" size={16} />
              Доставка:
            </span>
            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
          </span>
          <span className="font-bold text-lg">{DELIVERY_PRICE} ₴</span>
        </div>

        <Button className="w-full h-14 text-base rounded-2xl mt-6 font-bold">
          Перейти до оплати
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};

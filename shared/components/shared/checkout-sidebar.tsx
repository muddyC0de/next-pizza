import React from "react";
import { WhiteBlock } from "./white-block";
import { ArrowRight, Package, Truck } from "lucide-react";
import { Skeleton } from "../ui";
import { Button } from "../ui/button";

interface Props {
  className?: string;
  totalAmount: number;
  submitting?: boolean;
  loading?: boolean;
}

const DELIVERY_PRICE = 60;

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  loading,
  className,
}) => {
  return (
    <div className="w-full md:w-[450px]">
      <WhiteBlock className="p-0 md:p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Всього:</span>

          {loading ? (
            <Skeleton className="w-48  h-11 " />
          ) : (
            <span className="text-[34px] h-11 font-extrabold">
              {totalAmount + DELIVERY_PRICE} ₴
            </span>
          )}
        </div>
        <div className="flex my-4">
          <span className="flex flex-1 text-lg text-neutral-500">
            <span className="flex items-center">
              <Package className="mr-2 text-gray-300" size={16} />
              Ціна корзини:
            </span>
            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
          </span>

          {loading ? (
            <Skeleton className="w-16  h-6" />
          ) : (
            <span className="font-bold text-lg">{totalAmount} ₴</span>
          )}
        </div>

        <div className="flex my-4">
          <span className="flex flex-1 text-lg text-neutral-500">
            <span className="flex items-center">
              <Truck className="mr-2 text-gray-300" size={16} />
              Доставка:
            </span>
            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
          </span>
          {loading ? (
            <Skeleton className="w-16 rounded-[6px] h-6" />
          ) : (
            <span className="font-bold text-lg">{DELIVERY_PRICE} ₴</span>
          )}
        </div>

        <Button
          loading={loading}
          type="submit"
          className="w-full h-14 text-base rounded-2xl mt-6 font-bold"
        >
          Перейти до оплати
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};

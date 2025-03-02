"use client";

import React from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { DrawerCartItem } from "./drawer-cart-item";
import { getCartItemDetails, getCartItemInfo } from "@/lib";
import { useCartStore } from "@/store/cart";
import { PizzaSize, PizzaType } from "@/constanst/pizza";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button, Sheet } from "@/components/ui";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Title } from "@/components/shared";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const [
    totalAmount,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
    items,
  ] = useCartStore((state) => [
    state.totalAmount,
    state.fetchCartItems,
    state.updateItemQuantity,
    state.removeCartItem,
    state.items,
  ]);

  React.useEffect(() => {
    fetchCartItems();
  }, []);
  const onClickCountButton = async (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    await updateItemQuantity(id, type === "plus" ? quantity + 1 : quantity - 1);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col  justify-between pb-0 bg-[#f4f1ee]">
        <div
          className={cn(
            "flex flex-col h-full",
            !totalAmount && "justify-center"
          )}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзині{" "}
                <span className="font-bold">{items.length} товара</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {totalAmount === 0 || !totalAmount ? (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Корзина пуста"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Додайте хоча б одну піццу, щоб зробити замовлення
              </p>

              <SheetClose>
                <Button size="lg" className="text-base">
                  <ArrowLeft className="mr-2" />
                  Повернутися назад
                </Button>
              </SheetClose>
            </div>
          ) : null}

          {totalAmount > 0 && (
            <>
              <div className="-mx-3 mt-5 overflow-auto flex-1 ">
                <div className="mb-2 flex flex-col gap-5">
                  {items.map((item) => (
                    <DrawerCartItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      description={item.description}
                      name={item.name}
                      price={item.price}
                      details={
                        item.ingredients
                          ? getCartItemDetails(item.ingredients)
                          : ""
                      }
                      info={getCartItemInfo(
                        "",
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                      )}
                      onClickCountButton={onClickCountButton}
                      onClickRemoveButton={() => removeCartItem(item.id)}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              </div>
              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Разом
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} ₴</span>
                  </div>

                  <Link href="/checkout">
                    <Button type="submit" className="w-full h-12 text-base">
                      Оформити замовлення
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

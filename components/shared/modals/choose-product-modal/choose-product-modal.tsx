"use client";

import { Button, Dialog, Drawer } from "@/components/ui";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "./forms/choose-product-form";
import { ChoosePizzaForm } from "./forms/choose-pizza-form";
import { useCartStore } from "@/store/cart";
import toast from "react-hot-toast";
import React from "react";
import { ProductWithRelation } from "@/@types/prisma";

import { useMediaQuery } from "usehooks-ts";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  product: ProductWithRelation;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isPizzaForm = Boolean(product.items[0]?.pizzaType);
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const onSumbit = async (
    productItemId?: number,
    ingredientsIds?: number[]
  ) => {
    try {
      if (isPizzaForm) {
        addCartItem({
          productItemId,
          ingredientsIds,
        });
      } else {
        addCartItem({
          productItemId: product.items[0].id,
        });
      }

      toast.success(
        `${
          isPizzaForm ? "Піцца додана до корзини" : "Продукт доданий до корзини"
        }`
      );
      router.back();
    } catch (error) {
      toast.error(
        `Не вдалось додати ${isPizzaForm ? "піццу" : "продукт"} в корзину`
      );
    }
  };

  if (isMobile) {
    return (
      <Drawer open={Boolean(product)} onOpenChange={() => router.back()}>
        <DrawerTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DrawerTrigger>
        <DrawerContent className="bg-[#f7f6f5]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="hidden"></DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="overflow-y-auto">
            {isPizzaForm ? (
              <ChoosePizzaForm
                imageUrl={product.imageUrl}
                isLoading={loading}
                name={product.name}
                items={product.items}
                onSumbit={onSumbit}
                ingredients={product.ingredients}
              />
            ) : (
              <ChooseProductForm
                onSumbit={onSumbit}
                description={product.description || ""}
                imageUrl={product.imageUrl}
                isLoading={loading}
                name={product.name}
                price={product.price}
              />
            )}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="p-0 w-[1060px]  max-w-[1060px] min-h-[550px] bg-white overflow-hidden">
        <DialogTitle className="hidden"></DialogTitle>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            isLoading={loading}
            name={product.name}
            items={product.items}
            onSumbit={onSumbit}
            ingredients={product.ingredients}
          />
        ) : (
          <ChooseProductForm
            onSumbit={onSumbit}
            description={product.description || ""}
            imageUrl={product.imageUrl}
            isLoading={loading}
            name={product.name}
            price={product.price}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

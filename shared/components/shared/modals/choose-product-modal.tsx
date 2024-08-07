"use client";

import { Dialog } from "@/shared/components/ui";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";
import React from "react";
import { ProductWithRelation } from "@/@types/prisma";

interface Props {
  product: ProductWithRelation;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
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
        await addCartItem({
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

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden">
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

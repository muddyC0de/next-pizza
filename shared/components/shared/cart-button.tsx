"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/shared/store/cart";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";

export const CartButton = () => {
  const { items, totalAmount, loading } = useCartStore((state) => state);
  return (
    <CartDrawer>
      <Button
        loading={loading}
        variant="default"
        size={"default"}
        className={cn("group relative", { "w-[105px]": loading })}
      >
        <b className="hidden xs:block">{totalAmount || 0} ₴</b>
        <span className="h-full hidden xs:block w-[1px] bg-white/30 mx-3"></span>
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart
            size={16}
            className="relative bottom-[1.5px]"
            strokeWidth={2}
          />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className=" absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};

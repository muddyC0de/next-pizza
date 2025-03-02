"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import { CartDrawer } from "../../../app/(root)/_components/cart/cart-drawer";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

export const CartButton = () => {
  const { items, totalAmount, loading } = useCartStore((state) => state);
  return (
    <CartDrawer>
      <Button
        loading={loading}
        variant="default"
        size={"default"}
        className={cn("group relative", { "w-[61px] xs:w-[122px]": loading })}
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

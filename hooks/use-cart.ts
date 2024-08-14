import { CreateCartItemValues } from "@/shared/services/dto/cart";
import debounce from "lodash.debounce";
import { useCartStore } from "@/shared/store/cart";
import React from "react";
import { CartStateItem } from "@/shared/lib/get-cart-details";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (runFetch?: boolean): ReturnProps => {
  const [
    totalAmount,
    items,
    fetchCartItems,
    loading,
    addCartItem,
    updateItemQuantity,
    removeCartItem,
  ] = useCartStore((state) => [
    state.totalAmount,
    state.items,
    state.fetchCartItems,
    state.loading,
    state.addCartItem,
    debounce(state.updateItemQuantity, 200),
    state.removeCartItem,
  ]);

  React.useEffect(() => {
    if (runFetch) {
      fetchCartItems();
    }
  }, []);

  return {
    totalAmount,
    items,
    loading,
    addCartItem,
    updateItemQuantity,
    removeCartItem,
  };
};

import React from "react";
import { WhiteBlock } from "../white-block";
import { CartItem } from "../cart-item";
import { getCartItemDetails, getCartItemInfo } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constanst/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { CartItemSkeleton } from "../cart-item-skeleton";

type Props = {
  className?: string;
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
};

export const CheckoutCart: React.FC<Props> = ({
  items,
  removeCartItem,
  onClickCountButton,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading && items.length === 0 ? (
          <div className="flex flex-col gap-5">
            {[...Array(4)].map((_, i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
              price={item.price}
              quantity={item.quantity}
              details={getCartItemDetails(
                item.ingredients ? item.ingredients : []
              )}
              info={getCartItemInfo(
                "",
                item.pizzaType as PizzaType,
                item.pizzaSize as PizzaSize
              )}
              onClickCountButton={(type: "plus" | "minus") =>
                onClickCountButton(item.id, item.quantity, type)
              }
              onClickRemoveButton={() => removeCartItem(item.id)}
            />
          ))
        )}
      </div>
    </WhiteBlock>
  );
};

"use client";

import { useCart } from "@/hooks/use-cart";
import {
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { CartItem } from "@/shared/components/shared/cart-item";
import { Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constanst/pizza";
import { getCartItemDetails, getCartItemInfo } from "@/shared/lib";
import React from "react";

interface Props {
  className?: string;
}

export default function CheckoutPage({ className }: Props) {
  const { totalAmount, updateItemQuantity, items, removeCartItem } =
    useCart(true);
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    updateItemQuantity(id, type === "plus" ? quantity + 1 : quantity - 1);
  };
  return (
    <div className={className}>
      <Container>
        <Title
          text="Оформлення замовлення"
          size="lg"
          className="font-extrabold mt-7 text-[36px] mb-11"
        />

        <div className="flex gap-10">
          {/* Left side */}
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <WhiteBlock title="1. Корзина">
              <div className="flex flex-col gap-5">
                {items.map((item) => (
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
                ))}
              </div>
            </WhiteBlock>
            <WhiteBlock title="2. Персональна інформація">
              <div className="grid grid-cols-2 gap-5">
                <Input
                  name="firstName"
                  className="text-base"
                  placeholder="Имя"
                />
                <Input
                  name="lastName"
                  className="text-base"
                  placeholder="Фамилия"
                />
                <Input
                  name="email"
                  className="text-base"
                  placeholder="E-Mail"
                />
                <Input
                  name="phone"
                  className="text-base"
                  placeholder="Телефон"
                />
              </div>
            </WhiteBlock>
            <WhiteBlock title="3. Адреса доставки">
              <div className="flex flex-col gap-5">
                <Input
                  name="firstName"
                  className="text-base"
                  placeholder="Введіть адресу..."
                />
                <Textarea
                  rows={5}
                  className="text-base"
                  placeholder="Коментар до замовлення"
                />
              </div>
            </WhiteBlock>
          </div>
          {/* Right side */}
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </Container>
    </div>
  );
}

import * as React from "react";
import { CartItemDTO } from "@/shared/services/dto/cart";

interface PayOrderTemplateProps {
  orderId: number;
  totalAmount: number;
  items: CartItemDTO[];
}

export const OrderSuccesTemplate: React.FC<PayOrderTemplateProps> = ({
  orderId,
  totalAmount,
  items,
}) => {
  const itemsHtml = items
    .map(
      (item) => `
      <li key="${item.id}">
        ${item.productItem.product.name} | ${item.productItem.price} ₴ x ${
        item.quantity
      } шт. = ${item.productItem.price * item.quantity} ₴
      </li>
    `
    )
    .join("");
  return `
    <div>
      <h1>Дякуємо за покупку! 🎉</h1>
      <p>
        Ваше замовлення #${orderId} на суму <b>${totalAmount} ₴</b> було оплачено.
        Список товарів:
      </p>
      ${itemsHtml}
    </div>
  `;
};

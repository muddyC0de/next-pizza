import * as React from "react";

interface PayOrderTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<PayOrderTemplateProps> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) =>
  `
  <div>
    <h1>Замовлення #${orderId}</h1>
    <p>
      Оплатіть замовлення на сумму <b>${totalAmount} ₴</b>. Щоб оплатити
      замовлення <a href="${paymentUrl}">перейдіть по посиланню</a>
    </p>
  </div>
`;

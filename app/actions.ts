"use server";

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared";
import { ChechoutFormValues } from "@/shared/components/shared/checkout/schemas/checkout-form-schema";
import { sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { Stripe } from "stripe";

export async function createOrder(data: ChechoutFormValues) {
  try {
    const stripe = new Stripe(
      "sk_test_51Pgo3l2NVCHpMWLVhXU2Qx6zxfXbCOIiIiOLf5xrFiJZscz9NSv8NF89szdclEqIaBuHGpHF5oQ0JWzXKsA03q4d00pXeuSg9h"
    );

    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;
    if (!cartToken) {
      throw new Error("Корзина не існує");
    }
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Корзина не існує");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Корзина порожня");
    }

    const price = await stripe.prices.create({
      currency: "uah",
      unit_amount: userCart.totalAmount * 100,

      product_data: {
        name: "Всього:",
      },
    });

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],

      after_completion: {
        type: "redirect",
        redirect: {
          url: "http://localhost:3000/?paid",
        },
      },

      metadata: {
        orderId: order.id,
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    sendEmail(
      data.email,
      "Next Pizza / Оплатіть замовлення #" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: paymentLink.url,
      })
    );

    return paymentLink.url;
  } catch (error) {
    console.log("[CreateOrder] Sever error", error);
  }
}

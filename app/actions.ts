"use server";

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared";
import { ChechoutFormValues } from "@/shared/components/shared/checkout/schemas/checkout-form-schema";
import { sendEmail } from "@/shared/lib/sendEmail";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma, User, UserRole } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
import { Stripe } from "stripe";
import { VerificationUserTemplate } from "@/shared/components/shared/email-templates/verification-user";

export async function createOrder(data: ChechoutFormValues) {
  try {
    const stripe = new Stripe(
      "sk_test_51Pgo3l2NVCHpMWLVhXU2Qx6zxfXbCOIiIiOLf5xrFiJZscz9NSv8NF89szdclEqIaBuHGpHF5oQ0JWzXKsA03q4d00pXeuSg9h"
    );

    const cookieStore = cookies();
    const cartToken = (await cookieStore).get("cartToken")?.value;
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
          url: `${process.env.NEXTAUTH_URL}/?paid`,
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
      }) as string
    );

    return paymentLink.url;
  } catch (error) {
    console.log("[CreateOrder] Sever error", error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Користувач не знайдений");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.log("[UpdateUserInfo] Server error", error);
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (findUser) {
      throw new Error("Користувач з таким email вже існує");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
        verified: new Date(),
        role: "USER" as UserRole,
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    sendEmail(
      createdUser.email,
      "Next Pizza / Підтвердження реєстрації",
      VerificationUserTemplate({
        code,
      }) as string
    );
  } catch (error: any) {
    console.log("[RegisterUser] Server error", error);
    throw new Error(error);
  }
}

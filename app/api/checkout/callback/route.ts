import { prisma } from "@/prisma/prisma-client";
import { OrderSuccesTemplate } from "@/components/shared/email-templates/order-succes";
import { sendEmail } from "@/lib/sendEmail";
import { CartItemDTO } from "@/services/dto/cart";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const object = data.object;
    const order = await prisma.order.findFirst({
      where: {
        id: Number(object.metadata.orderId),
      },
    });

    if (!order) {
      return NextResponse.json({ status: 404 });
    }

    const status = object.payment_status;

    let orderStatus;

    if (status === "paid") {
      orderStatus = OrderStatus.SUCCEEDED;
    } else if (status === "processing") {
      orderStatus = OrderStatus.PENDING;
    } else {
      orderStatus = OrderStatus.CANCELLED;
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: orderStatus,
      },
    });

    if (orderStatus === OrderStatus.SUCCEEDED) {
      const items = JSON.parse(
        order?.items as unknown as string
      ) as CartItemDTO[];
      await sendEmail(
        order.email,
        "Next Pizza / Ваше замовлення успішно оплачено! 🎉",
        OrderSuccesTemplate({
          orderId: order.id,
          totalAmount: order.totalAmount,
          items,
        }) as string
      );
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("[CHECKOUT_CALLBACK]  error", error);
    return NextResponse.json({ status: 500 });
  }
}

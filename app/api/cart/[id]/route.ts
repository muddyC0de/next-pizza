import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number((await params).id);

    // Проверка на корректность ID
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
    }

    const data = await req.json();

    if (!data || typeof data.quantity !== "number") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const token = req.cookies.get("cartToken")?.value;

    if (!token || token.trim() === "") {
      return NextResponse.json(
        { error: "Cart token not found or is invalid" },
        { status: 404 }
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.error("[CART_PATCH] Server error", error);
    return NextResponse.json(
      { message: "Не вдалось оновити корзину" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number((await params).id);

    // Проверка на корректность ID
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
    }

    const token = req.cookies.get("cartToken")?.value;

    if (!token || token.trim() === "") {
      return NextResponse.json(
        { error: "Cart token not found or is invalid" },
        { status: 404 }
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({
      where: { id },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.error("[CART_DELETE] Server error", error);
    return NextResponse.json(
      { message: "Не вдалось оновити корзину" },
      { status: 500 }
    );
  }
}

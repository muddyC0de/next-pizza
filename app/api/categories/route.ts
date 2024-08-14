import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
        },
      },
    },
  });

  return NextResponse.json(categories);
}

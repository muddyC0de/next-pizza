import { prisma } from "@/prisma/prisma-client";
import { authOptions } from "@/constanst/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: any, res: any) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Ви не авторизовані" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },

      select: { fullName: true, email: true, password: false },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "[USER_GET] Server error" },
      { status: 500 }
    );
  }
}

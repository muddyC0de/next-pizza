import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const code = req.nextUrl.searchParams.get("code");
    // const email = req.nextUrl.searchParams.get("email");
    // const password = req.nextUrl.searchParams.get("password");
    const code = "";
    if (!code) {
      return NextResponse.json({ error: "Невірний код" }, { status: 404 });
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    if (!verificationCode) {
      return NextResponse.json({ error: "Невірний код" }, { status: 404 });
    }

    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.redirect(new URL("/?verified", req.url));
  } catch (error) {
    console.error(error);
    console.log("[Verify] Server error", error);
  }
}

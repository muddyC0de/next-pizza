import { Container, Header } from "@/components/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next Pizza | Профіль",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        {" "}
        <Header
          isShowProfile={false}
          isShowSearch={false}
          isShowCart={false}
          className="border-b-gray-200"
        />
      </Suspense>

      <Container>{children}</Container>
    </main>
  );
}

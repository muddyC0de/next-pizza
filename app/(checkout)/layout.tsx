import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza | Корзина",
};

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Header
        isShowSearch={false}
        isShowCart={false}
        className="border-b-gray-200"
      />
      <Container>{children}</Container>
    </main>
  );
}

"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals";
interface Props {
  className?: string;
  isShowSearch?: boolean;
  isShowCart?: boolean;
}

export const Header: React.FC<Props> = ({
  className,
  isShowSearch = true,
  isShowCart = true,
}) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  React.useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage =
        "Замовлення успішно оплачено! 📝 Інформація відправлена на пошту.";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Пошта успішно підтверджена!";
    }
    if (toastMessage) {
      router.replace("/");
      setTimeout(() => {
        toast.success(toastMessage);
      }, 500);
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Ліва частина */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                смачніше немає куди
              </p>
            </div>
          </div>
        </Link>
        {isShowSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Права частина */}
        <div className="flex items-center gap-3">
          <AuthModal open={isOpenModal} onClose={() => setIsOpenModal(false)} />
          <ProfileButton onClickSignIn={() => setIsOpenModal(true)} />
          {isShowCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};

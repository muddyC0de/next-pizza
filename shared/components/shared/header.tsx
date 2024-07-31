"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui";
import { User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
    if (searchParams.has("paid")) {
      router.replace("/");
      setTimeout(() => {
        toast.success(
          "Замовлення успішно оплачено! Інформація відправлена на пошту."
        );
      }, 500);
    }
  }, []);

  return (
    <header className={cn("border", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Ліва частина */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
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

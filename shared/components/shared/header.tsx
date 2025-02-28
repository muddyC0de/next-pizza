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
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { MobileMenu } from "./mobile-menu";
import { useSearchStore } from "@/shared/store/search";

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
  const { isActive, setActive } = useSearchStore((state) => ({
    isActive: state.isActive,
    setActive: state.setActive,
  }));
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
  }, [router, searchParams]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={cn("border-b", className)}>
      <Container className="py-4 md:py-6 lg:py-8">
        <div
          className={cn(
            "hidden items-center justify-between",
            !isActive && "flex"
          )}
        >
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 xs:gap-4">
              <Image
                src="/logo.png"
                alt="logo"
                width={25}
                height={25}
                className="xs:w-[35px] xs:h-[35px]"
              />
              <div>
                <h1 className="text-base xs:text-2xl uppercase font-black">
                  Next Pizza
                </h1>
                <p className="text-xs xs:text-sm text-gray-400 leading-3">
                  смачніше немає куди
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 md:items-center md:justify-between md:ml-10">
            {isShowSearch && (
              <div className="flex-1 max-w-md lg:max-w-xl">
                <SearchInput />
              </div>
            )}

            {/* Desktop Right Side */}
            <div className="flex items-center gap-3 ml-4">
              <ProfileButton onClickSignIn={() => setIsOpenModal(true)} />
              {isShowCart && <CartButton />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            {isShowCart && <CartButton />}
            <Button
              onClick={toggleMobileMenu}
              className="p-2 text-primary bg-primary/10"
              size={"icon"}
              variant={"secondary"}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </Button>
          </div>
        </div>

        {isActive && <SearchInput />}
      </Container>

      <AuthModal open={isOpenModal} onClose={() => setIsOpenModal(false)} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onOpenAuthModal={() => setIsOpenModal(true)}
        onClose={handleCloseMobileMenu}
      />
    </header>
  );
};

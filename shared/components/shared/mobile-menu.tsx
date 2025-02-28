import { cn } from "@/shared/lib/utils";
import React from "react";
import { ProfileButton } from "./profile-button";
import { Button } from "../ui/button";
import { LucideIcon, Search, ShoppingBasket, X } from "lucide-react";
import Link from "next/link";
import { useStore } from "zustand";
import { useSearchStore } from "@/shared/store/search";
import { useSession } from "next-auth/react";

interface Props {
  isOpen: boolean;
  onOpenAuthModal: () => void;
  onClose: () => void;
  className?: string;
}

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Корзина",
    icon: ShoppingBasket,
    href: "/checkout",
  },
];

export const MobileMenu: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenAuthModal,
  className,
}) => {
  const { data: session, status } = useSession();
  const { isActive, setActive } = useSearchStore((state) => ({
    isActive: state.isActive,
    setActive: state.setActive,
  }));

  const handleClickProfile = () => {
    onClose();
    if (status === "authenticated") return;
    onOpenAuthModal();
  };

  const handleClickSearch = () => {
    setActive(!isActive);
    onClose();
  };
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <div
      className={cn(
        "bg-[#f7f6f5] z-[99999999] hidden opacity-0  duration-150 h-full  flex-col justify-center items-center fixed top-0 left-0 w-full",
        isOpen && "opacity-100 flex",
        className
      )}
    >
      <Button
        onClick={onClose}
        variant={"ghost"}
        className="absolute top-3 right-3 text-slate-500 hover:text-primary active:bg-transparent bg-transparent"
      >
        <X size={20} />
      </Button>
      <div onClick={handleClickProfile}>
        <ProfileButton />
      </div>

      <nav>
        <ul className="flex flex-col items-center gap-4 mt-4 mb-4">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              {" "}
              <li>
                <Button className="gap-1 items-center" variant={"outline"}>
                  <item.icon size={16} /> {item.label}
                </Button>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Button
        onClick={handleClickSearch}
        className="gap-1 items-center"
        variant={"outline"}
      >
        <Search size={16} /> Знайти піццу...
      </Button>
    </div>
  );
};

import { useSession } from "next-auth/react";
import React from "react";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  onClickSignIn,
  className,
}) => {
  const { data: session } = useSession();
  return (
    <div className={className}>
      {!session ? (
        <Button
          loading={session === undefined}
          onClick={onClickSignIn}
          variant={session === undefined ? "default" : "outline"}
          className="flex items-center gap-1 w-[95px]"
        >
          <User size={16} />
          Увійти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профіль
          </Button>
        </Link>
      )}
    </div>
  );
};

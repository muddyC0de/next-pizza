"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

interface Props {
  open?: boolean;
  onClose: () => void;
  className?: string;
}

export const AuthModal: React.FC<Props> = ({
  onClose,
  open = false,
  className,
}) => {
  const [type, setType] = React.useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = React.useState(false);

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  const onClickProvider = async (
    provider: "github" | "google",
    callbackUrl: string,
    redirect = true
  ) => {
    setIsLoading(true);
    await signIn(provider, {
      callbackUrl,
      redirect,
    });
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[90%] rounded-md xs:w-[450px] max-w-full bg-white p-4 sm:p-6 md:p-10">
        {type === "login" ? (
          <LoginForm
            isLoading={isLoading}
            onClose={onClose}
            className={className}
          />
        ) : (
          <RegisterForm onClose={onClose} className={className} />
        )}
        <hr className="my-4" />
        <div className="flex flex-row gap-2">
          <Button
            variant="secondary"
            onClick={() => onClickProvider("github", "/")}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image
              width={20}
              height={20}
              className="sm:w-6 sm:h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="GitHub logo"
            />
            <span className="text-sm sm:text-base">GitHub</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => onClickProvider("google", "/")}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image
              width={20}
              height={20}
              className="sm:w-6 sm:h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google logo"
            />
            <span className="text-sm sm:text-base">Google</span>
          </Button>
        </div>
        <Button
          variant={"outline"}
          onClick={onSwitchType}
          type="button"
          className="h-10 sm:h-12 mt-2 text-sm sm:text-base"
        >
          {type === "login" ? "Зареєструватися" : "Увійти"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

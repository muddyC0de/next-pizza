import React from "react";
import { Dialog, DialogContent } from "../../../ui/dialog";
import { signIn } from "next-auth/react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";
import { Button } from "@/shared/components/ui/button";
import toast from "react-hot-toast";
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
    redirect: boolean = true
  ) => {
    setIsLoading(true);
    await signIn(provider, {
      callbackUrl,
      redirect,
    });
    setIsLoading(false);
    toast.success("Успішний вхід в аккаунт!");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === "login" ? (
          <LoginForm
            isLoading={isLoading}
            onClose={onClose}
            className={className}
          />
        ) : (
          <RegisterForm onClose={onClose} className={className} />
        )}
        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => onClickProvider("github", "/")}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
            />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() => onClickProvider("google", "/")}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
        </div>
        <Button
          variant={"outline"}
          onClick={onSwitchType}
          type="button"
          className="h-12"
        >
          {type === "login" ? "Зареєструватися" : "Увійти"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

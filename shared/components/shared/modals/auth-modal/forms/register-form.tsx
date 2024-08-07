"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./schemas";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Title } from "../../../title";
import { FormInput } from "../../../form-components";
import { Button } from "@/shared/components/ui";
import { registerUser } from "@/app/actions";

interface Props {
  isLoading: boolean;
  onClose: () => void;
  className?: string;
}

export const RegisterForm: React.FC<Props> = ({
  isLoading,
  onClose,
  className,
}) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      toast.success(
        "Успішна реєстрація 🎉.📝 Повідомлення з підтвердженням надіслано на вашу пошту"
      );
      onClose();
    } catch (error: any) {
      const errorMessage =
        (error as Error).message.replace(/^Error: /, "") ||
        "Не вдалося зареєструватися";
      toast.error(errorMessage);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Реєстрація" size="md" className="font-bold" />
            <p className="text-gray-400">
              Заповніть форму, щоб створити аккаунт
            </p>
          </div>
          <img src="" alt="" />
        </div>

        <FormInput name="fullName" label="Повне ім'я" required />
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Підтвердіть пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting || isLoading}
          className="h-12 text-base"
          type="submit"
        >
          Зареєструватися
        </Button>
      </form>
    </FormProvider>
  );
};

"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../../title";
import { FormInput } from "../../../form-components";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Button } from "@/shared/components/ui/button";

interface Props {
  isLoading: boolean;
  onClose: () => void;
  className?: string;
}

export const LoginForm: React.FC<Props> = ({
  isLoading,
  onClose,
  className,
}) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!resp?.ok) {
        throw new Error(resp?.error || "Error [LOGIN]");
      }

      toast.success("Успішний вхід в аккаунт");
      onClose();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toast.error("Не вдалося ввійти в аккаунт");
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
            <Title text="Вхід в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введіть свою пошту, щоб увійти в свій аккаунт
            </p>
          </div>
          <img src="" alt="" />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting || isLoading}
          className="h-12 text-base"
          type="submit"
        >
          Увійти
        </Button>
      </form>
    </FormProvider>
  );
};

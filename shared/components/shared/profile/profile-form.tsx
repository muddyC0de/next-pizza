"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "../container";
import { Title } from "../title";
import { FormInput } from "../form-components";
import { updateUserInfo } from "@/app/actions";
import { profileFormSchema, TFormProfileValues } from "./schemas";
import { Button } from "../../ui/button";

interface Props {
  data: User;
  className?: string;
}

export const ProfileForm: React.FC<Props> = ({ data, className }) => {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormProfileValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Ваш профіль оновлено");
    } catch (error) {
      return toast.error("Помилка оновлення профілю");
    }
  };

  const onClickSignOut = async () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <Title text="Ваш профіль" size="md" className="font-bold" />
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-full xs:w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            disabled={data.provider ? true : false}
            name="email"
            label="E-Mail"
            isClearable={data.provider ? false : true}
            required
          />
          <FormInput name="fullName" label="Повне ім'я" required />

          <FormInput type="password" name="password" label="Новий пароль" />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Повторіть пароль"
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Зберегти
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Вийти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};

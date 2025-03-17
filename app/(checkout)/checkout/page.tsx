"use client";

import { useCart } from "@/hooks/use-cart";
import { Title } from "@/components/shared";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "@/services/api-client";
import { CheckoutCart } from "../_components/checkout-cart";
import { CheckoutPersonalInfo } from "../_components/checkout-personal-info";
import { CheckoutSidebar } from "../_components/checkout-sidebar";
import { CheckoutDeliveryInfo } from "../_components/checkout-delivery-info";
import {
  ChechoutFormValues,
  checkoutFormSchema,
} from "../_components/schemas/checkout-form-schema";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart(true);
  const { data: session } = useSession();

  const form = useForm<ChechoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: ChechoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);

      toast.error("Не вдалося оформити замовлення");
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    updateItemQuantity(id, type === "plus" ? quantity + 1 : quantity - 1);
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await Api.auth.getMe();
        const [firstName, lastName] = data.fullName.split(" ");

        form.setValue("firstName", firstName);
        form.setValue("lastName", lastName);
        form.setValue("email", data.email);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [session]);

  return (
    <div>
      <Title
        text="Оформлення замовлення"
        size="lg"
        className="font-extrabold mt-7 text-[36px]  mb-11"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10 md:flex-row">
            {/* Left side */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />
              <CheckoutPersonalInfo
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />

              <CheckoutDeliveryInfo
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>
            {/* Right side */}
            <CheckoutSidebar
              loading={loading || submitting}
              totalAmount={totalAmount}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

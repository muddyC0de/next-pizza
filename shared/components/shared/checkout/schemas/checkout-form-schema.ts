import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Ім'я повинно містити не менше 2 символів" }),
  lastName: z
    .string()
    .min(2, { message: "Фамілія повинна містити не менше 2 символів" }),
  email: z.string().email({ message: "Введіть коректний E-Mail" }),
  phone: z.string().min(10, { message: "Введіть коректний номер телефону" }),
  address: z.string().min(3, { message: "Введіть коректний адрес" }),
  comment: z.string().optional(),
});

export type ChechoutFormValues = z.infer<typeof checkoutFormSchema>;

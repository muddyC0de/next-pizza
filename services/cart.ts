import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";
import { CartDTO, CreateCartItemValues } from "./dto/cart";

export const getCart = async () => {
  const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART);

  return data;
};

export const updateItemQuantity = async (id: number, quantity: number) => {
  const { data } = await axiosInstance.patch("/cart/" + id, { quantity });
  return data;
};

export const removeItem = async (id: number) => {
  const { data } = await axiosInstance.delete("/cart/" + id);
  return data;
};

export const addCartItem = async (
  values: CreateCartItemValues
): Promise<CartDTO> => {
  const { data } = await axiosInstance.post<CartDTO>("/cart", values);

  return data;
};

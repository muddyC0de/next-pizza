import { Category } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async () => {
  const { data } = await axiosInstance.get<Category[]>(ApiRoutes.CATEGORIES);

  return data;
};

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

import { getServerSession } from "next-auth";
import { authOptions } from "../constanst/authOptions";

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
};

import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/lib/get-user-session";
import { redirect } from "next/navigation";
import { ProfileForm } from "../_components/forms/profile-form";

export default async function ProfilePage() {
  const session = await getUserSession();
  if (!session) {
    return redirect("/not-auth");
  }
  console.log(session);
  const user = await prisma.user.findFirst({
    where: { id: Number(session.id) },
  });
  if (!user) {
    return redirect("/not-auth");
  }

  return <ProfileForm data={user} />;
}

import { prisma } from "@/prisma/prisma-client";
import { ProfileForm } from "@/shared/components/shared/profile/profile-form";
import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation";

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

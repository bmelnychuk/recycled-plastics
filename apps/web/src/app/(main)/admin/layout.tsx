import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSignedInUser } from "@/backend/api/session";

export default async function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getSignedInUser();
  if (!user?.isAdmin) redirect("/");

  return children;
}

import { redirect } from "next/navigation";
import { getUser as getCurrentUserApi, SignedInUser } from "@/backend/api";
import { UserViewModel } from "@/backend/application/view-model/ViewModels";
import { auth } from "@clerk/nextjs/server";

export const getSignedInUser = async (): Promise<SignedInUser> => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  else return user;
};

export const getCurrentUser = async (): Promise<SignedInUser | undefined> => {
  const { sessionClaims, isAuthenticated } = await auth();
  if (!isAuthenticated) return undefined;

  const user = await getCurrentUserApi();
  if (!user) return undefined;

  return { ...user, isAdmin: Boolean(sessionClaims?.role === "admin") };
};

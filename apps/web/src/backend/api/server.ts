import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { ApiError, apiFetch } from "./core";

export async function serverApiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { getToken } = await auth();

  let token: string | null = null;
  try {
    token = await getToken({ template: "default" });
  } catch (error) {
    console.error("Error getting token:", error);
  }

  try {
    return await apiFetch<T>(path, { ...options, token });
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        notFound();
      }
    }
    throw error;
  }
}

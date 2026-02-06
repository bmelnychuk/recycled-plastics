import { useAuth } from "@clerk/clerk-react";
import { apiFetch } from "@/backend/api/core";

export function useApiClient() {
  const { getToken } = useAuth();

  return async function clientApiFetch<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await getToken();
    return apiFetch<T>(path, { ...options, token });
  };
}

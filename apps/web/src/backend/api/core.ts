const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.API_ENDPOINT;

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

type FetchOptions = RequestInit & { token?: string | null };

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    ...(fetchOptions.headers as Record<string, string>),
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || "guest"}`,
  };

  const res = await fetch(`${API_ENDPOINT}${path}`, {
    ...fetchOptions,
    headers,
  });

  if (res.ok) {
    const json = await res.json();
    return json.data;
  } else {
    console.log(`${fetchOptions.method || "GET"} - ${API_ENDPOINT}${path}`, res.status);
    let message = "API request failed";
    try {
      const json = await res.json();
      message = json.message || message;
    } catch {
      // Response is not JSON (e.g., "Forbidden"), use status text
      message = res.statusText || message;
    }
    throw new ApiError(message, res.status);
  }
}

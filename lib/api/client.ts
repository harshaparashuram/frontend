const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface ApiErrorPayload {
  error?: {
    code?: string;
    message?: string;
  };
  detail?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function getErrorDetails(response: Response): Promise<{
  message: string;
  code?: string;
}> {
  try {
    const payload = (await response.json()) as ApiErrorPayload;

    if (payload.error) {
      return {
        message:
          payload.error.message ??
          `API request failed with status ${response.status}`,
        code: payload.error.code,
      };
    }

    if (payload.detail) {
      return {
        message: payload.detail,
      };
    }
  } catch {
    // Ignore invalid or empty error bodies.
  }

  return {
    message: `API request failed with status ${response.status}`,
  };
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await getErrorDetails(response);

    throw new ApiError(error.message, response.status, error.code);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

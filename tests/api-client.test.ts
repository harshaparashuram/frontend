import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError, apiFetch } from "@/lib/api/client";

describe("apiFetch", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  it("returns JSON for a successful response", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const result = await apiFetch<{ status: string }>("/api/v1/health");

    expect(result).toEqual({ status: "ok" });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/health",
      expect.objectContaining({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    );
  });

  it("throws ApiError for an unsuccessful response", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ detail: "Service unavailable" }), {
        status: 503,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    await expect(apiFetch("/api/v1/health")).rejects.toMatchObject({
      name: "ApiError",
      status: 503,
    });
  });

  it("preserves request options and adds JSON headers", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    await apiFetch("/api/v1/health", {
      method: "POST",
      headers: {
        Authorization: "Bearer test-token",
      },
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/health",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer test-token",
          "Content-Type": "application/json",
        },
      },
    );
  });

  it("parses structured API errors", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          error: {
            code: "PROJECT_NOT_FOUND",
            message: "Project was not found",
          },
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    await expect(apiFetch("/api/v1/projects/missing")).rejects.toMatchObject({
      name: "ApiError",
      message: "Project was not found",
      status: 404,
      code: "PROJECT_NOT_FOUND",
    });
  });

  it("returns undefined for a successful 204 response", async () => {
    fetchMock.mockResolvedValue(
      new Response(null, {
        status: 204,
      }),
    );

    const result = await apiFetch<void>("/api/v1/projects/123");

    expect(result).toBeUndefined();
  });

  it("creates an ApiError with the supplied status", () => {
    const error = new ApiError("Something went wrong", 500);

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("ApiError");
    expect(error.message).toBe("Something went wrong");
    expect(error.status).toBe(500);
  });
});

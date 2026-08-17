import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError, apiFetch } from "@/lib/api/client";

describe("apiFetch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns JSON for a successful response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    await expect(
      apiFetch<{ status: string }>("/api/v1/health"),
    ).resolves.toEqual({
      status: "ok",
    });
  });

  it("throws ApiError for an unsuccessful response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 500,
      }),
    );

    await expect(apiFetch("/api/v1/health")).rejects.toMatchObject({
      name: "ApiError",
      status: 500,
    });
  });

  it("preserves request options and adds JSON headers", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
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
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token",
        },
      }),
    );
  });

  it("creates an ApiError with the supplied status", () => {
    const error = new ApiError("Something went wrong", 400);

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("ApiError");
    expect(error.message).toBe("Something went wrong");
    expect(error.status).toBe(400);
  });
});

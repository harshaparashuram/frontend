import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import DashboardPage from "@/app/(dashboard)/dashboard/page";

vi.mock("@/hooks/use-api-health", () => ({
  useApiHealth: () => ({
    data: {
      status: "ok",
    },
    isLoading: false,
    isError: false,
  }),
}));

describe("DashboardPage", () => {
  it("renders the dashboard overview", () => {
    render(<DashboardPage />);

    expect(
      screen.getByRole("heading", {
        name: "Overview",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("API Status")).toBeInTheDocument();
    expect(screen.getByText("API Requests")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();

    expect(
      screen.getByText("Backend and database are healthy."),
    ).toBeInTheDocument();

    expect(screen.getByText("ok")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import DashboardPage from "@/app/(dashboard)/dashboard/page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
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
    expect(screen.getByText("AI Requests")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });
});

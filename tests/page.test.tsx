import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home", () => {
  it("renders the main platform content", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /build reliable software for the ai era/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the platform navigation links", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", {
        name: "Explore the platform",
      }),
    ).toHaveAttribute("href", "#platform");

    expect(
      screen.getByRole("link", {
        name: "View engineering areas",
      }),
    ).toHaveAttribute("href", "#engineering");
  });
});

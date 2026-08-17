import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

describe("Button", () => {
  it("renders a primary button by default", () => {
    render(<Button>Continue</Button>);

    const button = screen.getByRole("button", {
      name: "Continue",
    });

    expect(button).toHaveClass("bg-primary");
  });

  it("supports alternate variants", () => {
    render(<Button variant="outline">Cancel</Button>);

    expect(screen.getByRole("button")).toHaveClass("border");
  });
});

describe("Container", () => {
  it("renders its children", () => {
    render(
      <Container>
        <p>Content</p>
      </Container>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});

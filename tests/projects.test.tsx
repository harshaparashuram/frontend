import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectsPage from "@/app/(dashboard)/dashboard/projects/page";

describe("ProjectsPage", () => {
  it("renders the projects workspace", () => {
    render(<ProjectsPage />);

    expect(
      screen.getByRole("heading", { name: "Projects" }),
    ).toBeInTheDocument();

    expect(screen.getByText("AI Engineering Platform")).toBeInTheDocument();
    expect(screen.getByText("API Gateway")).toBeInTheDocument();
  });

  it("filters projects by search query", () => {
    render(<ProjectsPage />);

    const searchInput = screen.getByRole("textbox", {
      name: "Search projects",
    });

    fireEvent.change(searchInput, {
      target: { value: "API Gateway" },
    });

    expect(screen.getByText("API Gateway")).toBeInTheDocument();
    expect(
      screen.queryByText("AI Engineering Platform"),
    ).not.toBeInTheDocument();
  });

  it("filters projects by status", () => {
    render(<ProjectsPage />);

    fireEvent.click(screen.getByRole("button", { name: "Planning" }));

    expect(screen.getByText("Engineering Assistant")).toBeInTheDocument();

    expect(screen.queryByText("API Gateway")).not.toBeInTheDocument();
  });

  it("shows an empty state when no projects match", () => {
    render(<ProjectsPage />);

    fireEvent.change(screen.getByRole("textbox", { name: "Search projects" }), {
      target: { value: "does-not-exist" },
    });

    expect(screen.getByText("No projects found")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Clear filters" }),
    ).toBeInTheDocument();
  });

  it("clears project filters", () => {
    render(<ProjectsPage />);

    fireEvent.change(screen.getByRole("textbox", { name: "Search projects" }), {
      target: { value: "does-not-exist" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(screen.getByText("AI Engineering Platform")).toBeInTheDocument();
  });

  it("opens and closes the create project dialog", () => {
    render(<ProjectsPage />);

    fireEvent.click(screen.getByRole("button", { name: "Create project" }));

    expect(
      screen.getByRole("heading", { name: "Create a project" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(
      screen.queryByRole("heading", { name: "Create a project" }),
    ).not.toBeInTheDocument();
  });
});

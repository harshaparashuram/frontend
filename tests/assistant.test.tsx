import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import AssistantPage from "@/app/(dashboard)/dashboard/assistant/page";

describe("AssistantPage", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the assistant interface", () => {
    render(<AssistantPage />);

    expect(
      screen.getByRole("heading", {
        name: "Engineering Assistant",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Hello! I’m your AI engineering assistant/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: "Message",
      }),
    ).toBeInTheDocument();
  });

  it("disables send when the message is empty", () => {
    render(<AssistantPage />);

    expect(
      screen.getByRole("button", {
        name: "Send",
      }),
    ).toBeDisabled();
  });

  it("sends a user message", () => {
    render(<AssistantPage />);

    const input = screen.getByRole("textbox", {
      name: "Message",
    });

    fireEvent.change(input, {
      target: {
        value: "How should I structure my API?",
      },
    });

    expect(
      screen.getByRole("button", {
        name: "Send",
      }),
    ).toBeEnabled();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Send",
      }),
    );

    expect(
      screen.getByText("How should I structure my API?"),
    ).toBeInTheDocument();

    expect(screen.getByText("Thinking...")).toBeInTheDocument();
  });

  it("shows the assistant response", () => {
    vi.useFakeTimers();

    render(<AssistantPage />);

    fireEvent.change(
      screen.getByRole("textbox", {
        name: "Message",
      }),
      {
        target: {
          value: "Explain REST APIs",
        },
      },
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Send",
      }),
    );

    expect(screen.getByText("Explain REST APIs")).toBeInTheDocument();
    expect(screen.getByText("Thinking...")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(
      screen.getByText(
        "I received your message. The AI backend will be connected here next.",
      ),
    ).toBeInTheDocument();

    expect(screen.queryByText("Thinking...")).not.toBeInTheDocument();
  });

  it("starts a new conversation", () => {
    render(<AssistantPage />);

    fireEvent.change(
      screen.getByRole("textbox", {
        name: "Message",
      }),
      {
        target: {
          value: "My previous question",
        },
      },
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Send",
      }),
    );

    expect(screen.getByText("My previous question")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "New conversation",
      }),
    );

    expect(screen.queryByText("My previous question")).not.toBeInTheDocument();

    expect(
      screen.getByText(/Hello! I’m your AI engineering assistant/i),
    ).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SettingsPage from "@/app/(dashboard)/dashboard/settings/page";

describe("SettingsPage", () => {
  it("renders the settings workspace", () => {
    render(<SettingsPage />);

    expect(
      screen.getByRole("heading", { name: "Settings" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Configure your workspace and platform preferences."),
    ).toBeInTheDocument();
  });

  it("renders profile settings by default", () => {
    render(<SettingsPage />);

    expect(
      screen.getByRole("heading", { name: "Profile" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("Harsha");
    expect(screen.getByLabelText("Email")).toHaveValue("harsha@example.com");
  });

  it("switches between settings sections", () => {
    render(<SettingsPage />);

    fireEvent.click(screen.getByRole("button", { name: /appearance/i }));

    expect(
      screen.getByRole("heading", { name: "Appearance" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /notifications/i }));

    expect(
      screen.getByRole("heading", { name: "Notifications" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /security/i }));

    expect(
      screen.getByRole("heading", { name: "Security" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /api preferences/i }));

    expect(
      screen.getByRole("heading", { name: "API Preferences" }),
    ).toBeInTheDocument();
  });

  it("updates profile fields", () => {
    render(<SettingsPage />);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");

    fireEvent.change(nameInput, {
      target: { value: "Harsha P" },
    });

    fireEvent.change(emailInput, {
      target: { value: "harsha.p@example.com" },
    });

    expect(nameInput).toHaveValue("Harsha P");
    expect(emailInput).toHaveValue("harsha.p@example.com");
  });

  it("updates appearance preferences", () => {
    render(<SettingsPage />);

    fireEvent.click(screen.getByRole("button", { name: /appearance/i }));

    const themeSelect = screen.getByLabelText("Theme");

    fireEvent.change(themeSelect, {
      target: { value: "dark" },
    });

    expect(themeSelect).toHaveValue("dark");
  });

  it("updates notification preferences", () => {
    render(<SettingsPage />);

    fireEvent.click(screen.getByRole("button", { name: /notifications/i }));

    const productUpdates = screen.getByRole("checkbox", {
      name: /product updates/i,
    });

    const activityNotifications = screen.getByRole("checkbox", {
      name: /activity notifications/i,
    });

    expect(productUpdates).toBeChecked();
    expect(activityNotifications).toBeChecked();

    fireEvent.click(productUpdates);

    expect(productUpdates).not.toBeChecked();
    expect(activityNotifications).toBeChecked();
  });

  it("updates API environment", () => {
    render(<SettingsPage />);

    fireEvent.click(screen.getByRole("button", { name: /api preferences/i }));

    const environmentSelect = screen.getByLabelText("API environment");

    fireEvent.change(environmentSelect, {
      target: { value: "production" },
    });

    expect(environmentSelect).toHaveValue("production");
  });

  it("shows confirmation after saving profile changes", () => {
    render(<SettingsPage />);

    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    expect(screen.getByText("Changes saved")).toBeInTheDocument();
  });
});

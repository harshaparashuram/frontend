"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type Section = "profile" | "appearance" | "notifications" | "security" | "api";

const sections: Array<{
  id: Section;
  label: string;
  description: string;
}> = [
  {
    id: "profile",
    label: "Profile",
    description: "Manage your account information.",
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Customize how the platform looks.",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Choose which updates you receive.",
  },
  {
    id: "security",
    label: "Security",
    description: "Review your account security preferences.",
  },
  {
    id: "api",
    label: "API Preferences",
    description: "Configure API environment and behavior.",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [name, setName] = useState("Harsha");
  const [email, setEmail] = useState("harsha@example.com");
  const [theme, setTheme] = useState("system");
  const [productUpdates, setProductUpdates] = useState(true);
  const [activityNotifications, setActivityNotifications] = useState(true);
  const [apiEnvironment, setApiEnvironment] = useState("development");
  const [saved, setSaved] = useState(false);

  function saveChanges() {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-muted text-sm font-medium">Workspace</p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Settings</h1>

        <p className="text-muted mt-3">
          Configure your workspace and platform preferences.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Settings navigation" className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full rounded-lg px-3 py-3 text-left transition-colors",
                activeSection === section.id
                  ? "bg-surface-muted text-foreground"
                  : "text-muted hover:bg-surface-muted/70 hover:text-foreground",
              )}
            >
              <span className="block text-sm font-medium">{section.label}</span>

              <span className="mt-1 block text-xs leading-5">
                {section.description}
              </span>
            </button>
          ))}
        </nav>

        <div className="min-w-0">
          {activeSection === "profile" && (
            <SettingsCard
              title="Profile"
              description="Update the information associated with your workspace account."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" value={name} onChange={setName} />

                <Field
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                />
              </div>

              <SettingsFooter saved={saved} onSave={saveChanges} />
            </SettingsCard>
          )}

          {activeSection === "appearance" && (
            <SettingsCard
              title="Appearance"
              description="Choose how the platform should appear on your device."
            >
              <div>
                <label htmlFor="theme" className="text-sm font-medium">
                  Theme
                </label>

                <select
                  id="theme"
                  value={theme}
                  onChange={(event) => setTheme(event.target.value)}
                  className="border-border bg-background focus:ring-primary/20 mt-2 h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 sm:max-w-sm"
                >
                  <option value="system">System</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>

                <p className="text-muted mt-2 text-xs">
                  System follows your operating system preference.
                </p>
              </div>

              <SettingsFooter saved={saved} onSave={saveChanges} />
            </SettingsCard>
          )}

          {activeSection === "notifications" && (
            <SettingsCard
              title="Notifications"
              description="Control which platform updates should appear in your notifications."
            >
              <div className="space-y-4">
                <Toggle
                  id="product-updates"
                  label="Product updates"
                  description="Receive updates about new platform features and improvements."
                  checked={productUpdates}
                  onChange={setProductUpdates}
                />

                <Toggle
                  id="activity-notifications"
                  label="Activity notifications"
                  description="Receive notifications about important workspace activity."
                  checked={activityNotifications}
                  onChange={setActivityNotifications}
                />
              </div>

              <SettingsFooter saved={saved} onSave={saveChanges} />
            </SettingsCard>
          )}

          {activeSection === "security" && (
            <SettingsCard
              title="Security"
              description="Review the security preferences for your workspace account."
            >
              <div className="space-y-4">
                <div className="border-border rounded-lg border p-4">
                  <p className="text-sm font-medium">Active session</p>

                  <p className="text-muted mt-1 text-sm">
                    This browser session is currently active.
                  </p>

                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => undefined}
                  >
                    Review sessions
                  </Button>
                </div>

                <div className="border-border rounded-lg border p-4">
                  <p className="text-sm font-medium">Password</p>

                  <p className="text-muted mt-1 text-sm">
                    Password management will be connected to the authentication
                    service.
                  </p>

                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => undefined}
                  >
                    Change password
                  </Button>
                </div>
              </div>
            </SettingsCard>
          )}

          {activeSection === "api" && (
            <SettingsCard
              title="API Preferences"
              description="Configure the environment used by your API requests."
            >
              <div>
                <label
                  htmlFor="api-environment"
                  className="text-sm font-medium"
                >
                  API environment
                </label>

                <select
                  id="api-environment"
                  value={apiEnvironment}
                  onChange={(event) => setApiEnvironment(event.target.value)}
                  className="border-border bg-background focus:ring-primary/20 mt-2 h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 sm:max-w-sm"
                >
                  <option value="development">Development</option>
                  <option value="staging">Staging</option>
                  <option value="production">Production</option>
                </select>

                <p className="text-muted mt-2 text-xs">
                  Choose the environment used for platform API requests.
                </p>
              </div>

              <div className="border-border bg-surface-muted/40 mt-6 rounded-lg border p-4">
                <p className="text-sm font-medium">API credentials</p>

                <p className="text-muted mt-1 text-sm">
                  API key management will be connected when the backend
                  authentication layer is available.
                </p>
              </div>

              <SettingsFooter saved={saved} onSave={saveChanges} />
            </SettingsCard>
          )}
        </div>
      </div>
    </section>
  );
}

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border bg-background rounded-xl border">
      <div className="border-border border-b px-6 py-5">
        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="text-muted mt-1 text-sm">{description}</p>
      </div>

      <div className="px-6 py-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={label.toLowerCase()} className="text-sm font-medium">
        {label}
      </label>

      <input
        id={label.toLowerCase()}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-border bg-background focus:ring-primary/20 mt-2 h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2"
      />
    </div>
  );
}

function Toggle({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="border-border flex cursor-pointer items-start justify-between gap-4 rounded-lg border p-4"
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>

        <span className="text-muted mt-1 block text-sm">{description}</span>
      </span>

      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="accent-primary mt-1 size-4"
      />
    </label>
  );
}

function SettingsFooter({
  saved,
  onSave,
}: {
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="border-border mt-6 flex items-center justify-end gap-3 border-t pt-5">
      {saved && <span className="text-sm text-green-600">Changes saved</span>}

      <Button onClick={onSave}>Save changes</Button>
    </div>
  );
}

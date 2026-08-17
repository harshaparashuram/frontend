"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/cn";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
  },
  {
    label: "AI Assistant",
    href: "/dashboard/assistant",
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
  },
  {
    label: "API",
    href: "/dashboard/api",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-border bg-background hidden w-64 shrink-0 border-r lg:block">
      <div className="flex h-full min-h-[calc(100vh-4rem)] flex-col">
        <div className="px-6 py-6">
          <p className="text-muted text-xs font-semibold tracking-wider uppercase">
            Platform
          </p>
        </div>

        <nav className="flex flex-col gap-1 px-4" aria-label="Dashboard">
          {navigation.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-surface-subtle text-foreground"
                    : "text-muted hover:bg-surface-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4">
          <div className="border-border bg-surface-muted rounded-lg border p-4">
            <p className="text-foreground text-sm font-medium">AI Platform</p>
            <p className="text-muted mt-1 text-xs leading-5">
              Build, test, and ship reliable AI systems.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

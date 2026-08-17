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
    href: "/dashboard/ai",
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
    <aside className="border-border bg-surface hidden w-64 shrink-0 border-r lg:block">
      <div className="sticky top-0 flex h-[calc(100vh-4rem)] flex-col p-4">
        <div className="mb-6 px-3">
          <p className="text-muted text-xs font-semibold tracking-wider uppercase">
            Platform
          </p>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted hover:bg-surface-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-border bg-surface-muted mt-auto rounded-lg border p-4">
          <p className="text-foreground text-sm font-medium">AI Platform</p>
          <p className="text-muted mt-1 text-xs leading-5">
            Build, test and manage your AI applications.
          </p>
        </div>
      </div>
    </aside>
  );
}

import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-surface-muted flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

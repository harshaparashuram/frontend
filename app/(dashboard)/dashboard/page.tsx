"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type ProjectStatus = "Active" | "Paused" | "Completed";

type Project = {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  updated: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Engineering Platform",
    description: "Core platform architecture and application services.",
    status: "Active",
    updated: "Updated 2 hours ago",
  },
  {
    id: 2,
    name: "AI Assistant",
    description: "AI-powered engineering support and workflow automation.",
    status: "Active",
    updated: "Updated yesterday",
  },
  {
    id: 3,
    name: "API Gateway",
    description: "API management, authentication, and observability.",
    status: "Paused",
    updated: "Updated 3 days ago",
  },
];

const activities = [
  {
    id: 1,
    title: "API platform updated",
    description: "New endpoint configuration was published.",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "AI Assistant conversation",
    description: "Engineering Assistant processed a new request.",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Project settings changed",
    description: "Workspace notification preferences were updated.",
    time: "Yesterday",
  },
  {
    id: 4,
    title: "New project created",
    description: "Engineering Platform was added to the workspace.",
    time: "2 days ago",
  },
];

const stats = [
  {
    label: "API Status",
    value: "Operational",
    detail: "All API services healthy",
  },
  {
    label: "AI Requests",
    value: "24.8K",
    detail: "+18.4% this month",
  },
  {
    label: "Projects",
    value: "12",
    detail: "+2 this month",
  },
  {
    label: "Active Services",
    value: "8",
    detail: "All systems operational",
  },
];

export default function DashboardPage() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = useMemo(
    () => (showAllProjects ? projects : projects.slice(0, 3)),
    [showAllProjects],
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-muted text-sm font-medium">Workspace overview</p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Overview
          </h1>

          <p className="text-muted mt-3 max-w-2xl">
            Monitor your projects, APIs, AI workflows, and recent platform
            activity from one place.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">View activity</Button>
          <Button>New project</Button>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-border bg-background rounded-xl border p-5"
          >
            <p className="text-muted text-sm font-medium">{stat.label}</p>

            <p className="mt-3 text-2xl font-semibold tracking-tight">
              {stat.value}
            </p>

            <p className="text-muted mt-2 text-xs">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]">
        <div className="border-border bg-background rounded-xl border">
          <div className="border-border flex items-center justify-between border-b px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold">Recent projects</h2>

              <p className="text-muted mt-1 text-sm">
                Continue working on your latest workspace projects.
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={() => setShowAllProjects((current) => !current)}
            >
              {showAllProjects ? "Show less" : "View all"}
            </Button>
          </div>

          <div className="divide-border divide-y">
            {visibleProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="truncate text-sm font-semibold">
                      {project.name}
                    </h3>

                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium",
                        project.status === "Active" &&
                          "bg-primary/10 text-primary",
                        project.status === "Paused" &&
                          "bg-surface-muted text-muted",
                        project.status === "Completed" &&
                          "bg-secondary text-secondary-foreground",
                      )}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-muted mt-2 text-sm">
                    {project.description}
                  </p>

                  <p className="text-muted mt-2 text-xs">{project.updated}</p>
                </div>

                <Button variant="outline">Open</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border bg-background rounded-xl border">
          <div className="border-border border-b px-6 py-5">
            <h2 className="text-lg font-semibold">Quick actions</h2>

            <p className="text-muted mt-1 text-sm">
              Jump directly into common platform workflows.
            </p>
          </div>

          <div className="grid gap-3 p-6">
            <Button className="w-full justify-start">Create a project</Button>

            <Button variant="outline" className="w-full justify-start">
              Open API platform
            </Button>

            <Button variant="outline" className="w-full justify-start">
              Ask AI Assistant
            </Button>

            <Button variant="outline" className="w-full justify-start">
              Manage settings
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]">
        <div className="border-border bg-background rounded-xl border">
          <div className="border-border border-b px-6 py-5">
            <h2 className="text-lg font-semibold">Recent activity</h2>

            <p className="text-muted mt-1 text-sm">
              Latest changes and events across your workspace.
            </p>
          </div>

          <div className="divide-border divide-y">
            {activities.map((activity) => (
              <div key={activity.id} className="px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium">{activity.title}</h3>

                    <p className="text-muted mt-1 text-sm">
                      {activity.description}
                    </p>
                  </div>

                  <span className="text-muted shrink-0 text-xs">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border bg-background rounded-xl border">
          <div className="border-border border-b px-6 py-5">
            <h2 className="text-lg font-semibold">Platform health</h2>

            <p className="text-muted mt-1 text-sm">
              Current status of your core platform services.
            </p>
          </div>

          <div className="space-y-5 p-6">
            {[
              ["Web application", "Operational"],
              ["API services", "Operational"],
              ["AI Assistant", "Operational"],
              ["Database", "Operational"],
            ].map(([service, status]) => (
              <div
                key={service}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-sm font-medium">{service}</span>

                <span className="text-primary flex items-center gap-2 text-xs font-medium">
                  <span className="bg-primary size-2 rounded-full" />
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

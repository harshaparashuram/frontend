"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

type ProjectStatus = "Active" | "Planning" | "Paused";

type Project = {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  updated: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "AI Engineering Platform",
    description:
      "Core platform for building, testing, and shipping AI-powered applications.",
    status: "Active",
    stack: ["Next.js", "TypeScript", "AI"],
    updated: "Today",
  },
  {
    id: 2,
    name: "API Gateway",
    description:
      "Central API layer for secure service communication and platform integrations.",
    status: "Active",
    stack: ["Node.js", "REST", "PostgreSQL"],
    updated: "Yesterday",
  },
  {
    id: 3,
    name: "Engineering Assistant",
    description:
      "AI-assisted workspace for architecture, debugging, testing, and implementation.",
    status: "Planning",
    stack: ["Next.js", "AI", "TypeScript"],
    updated: "3 days ago",
  },
  {
    id: 4,
    name: "Observability Console",
    description:
      "Application monitoring and operational visibility for production services.",
    status: "Paused",
    stack: ["React", "APIs", "Telemetry"],
    updated: "1 week ago",
  },
];

const statusFilters = ["All", "Active", "Planning", "Paused"] as const;

type StatusFilter = (typeof statusFilters)[number];

const statusStyles: Record<ProjectStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Planning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Paused: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [showCreatePanel, setShowCreatePanel] = useState(false);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      const matchesQuery =
        !normalizedQuery ||
        project.name.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery) ||
        project.stack.some((technology) =>
          technology.toLowerCase().includes(normalizedQuery),
        );

      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  return (
    <Container className="py-8 lg:py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-muted text-sm font-medium">Workspace</p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Projects
          </h1>

          <p className="text-muted mt-3 text-base leading-7">
            Organize your engineering work and keep application development
            visible from one place.
          </p>
        </div>

        <Button onClick={() => setShowCreatePanel(true)}>Create project</Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border-border bg-background rounded-xl border p-5">
          <p className="text-muted text-sm font-medium">Total projects</p>
          <p className="mt-3 text-2xl font-semibold">{projects.length}</p>
        </div>

        <div className="border-border bg-background rounded-xl border p-5">
          <p className="text-muted text-sm font-medium">Active</p>
          <p className="mt-3 text-2xl font-semibold">
            {projects.filter((project) => project.status === "Active").length}
          </p>
        </div>

        <div className="border-border bg-background rounded-xl border p-5">
          <p className="text-muted text-sm font-medium">In planning</p>
          <p className="mt-3 text-2xl font-semibold">
            {projects.filter((project) => project.status === "Planning").length}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-muted text-sm font-medium">Project workspace</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Your projects
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects"
              className="border-border bg-background placeholder:text-muted h-10 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />

            <div className="border-border bg-background flex h-10 rounded-md border p-1">
              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
                  className={cn(
                    "rounded px-3 text-xs font-medium transition-colors",
                    statusFilter === filter
                      ? "bg-surface-muted text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="border-border bg-background rounded-xl border p-6 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold">{project.name}</h3>

                    <p className="text-muted mt-2 text-sm leading-6">
                      {project.description}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset",
                      statusStyles[project.status],
                    )}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      className="bg-surface-muted text-muted rounded-md px-2.5 py-1 text-xs font-medium"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="border-border text-muted mt-6 border-t pt-4 text-xs">
                  Updated {project.updated}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border-border bg-background mt-5 rounded-xl border p-10 text-center">
            <h3 className="font-semibold">No projects found</h3>

            <p className="text-muted mx-auto mt-2 max-w-md text-sm leading-6">
              Try changing your search or status filter to find another project.
            </p>

            <Button
              variant="outline"
              className="mt-5"
              onClick={() => {
                setQuery("");
                setStatusFilter("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>

      {showCreatePanel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-6"
          role="presentation"
          onClick={() => setShowCreatePanel(false)}
        >
          <div
            className="border-border bg-background w-full max-w-md rounded-xl border p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-project-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="create-project-title"
              className="text-xl font-semibold tracking-tight"
            >
              Create a project
            </h2>

            <p className="text-muted mt-2 text-sm leading-6">
              Project creation will be connected to the backend workspace
              service next.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCreatePanel(false)}
              >
                Cancel
              </Button>

              <Button onClick={() => setShowCreatePanel(false)}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

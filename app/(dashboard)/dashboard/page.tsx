import { Container } from "@/components/ui/container";

const stats = [
  {
    label: "API Status",
    value: "Operational",
    description: "All systems are running normally.",
  },
  {
    label: "AI Requests",
    value: "0",
    description: "Requests made this month.",
  },
  {
    label: "Projects",
    value: "0",
    description: "Active projects in your workspace.",
  },
];

export default function DashboardPage() {
  return (
    <Container className="py-8">
      <div>
        <p className="text-muted text-sm font-medium">Dashboard</p>

        <h1 className="text-foreground mt-2 text-3xl font-semibold tracking-tight">
          Overview
        </h1>

        <p className="text-muted mt-2 max-w-2xl text-sm leading-6">
          Monitor your AI platform, projects, and API activity from one place.
        </p>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="border-border bg-surface rounded-xl border p-5"
          >
            <p className="text-muted text-sm font-medium">{stat.label}</p>

            <p className="text-foreground mt-3 text-2xl font-semibold">
              {stat.value}
            </p>

            <p className="text-muted mt-2 text-sm leading-5">
              {stat.description}
            </p>
          </article>
        ))}
      </section>

      <section className="border-border bg-surface mt-8 rounded-xl border p-6">
        <h2 className="text-foreground text-lg font-semibold">Quick start</h2>

        <p className="text-muted mt-2 max-w-2xl text-sm leading-6">
          Start by connecting your API, creating a project, or opening the AI
          assistant.
        </p>
      </section>
    </Container>
  );
}

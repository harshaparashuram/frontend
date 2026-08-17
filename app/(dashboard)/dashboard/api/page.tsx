import { Container } from "@/components/ui/container";

const endpoints = [
  {
    method: "GET",
    path: "/api/health",
    description: "Check the current platform health status.",
    status: "Stable",
  },
  {
    method: "GET",
    path: "/api/projects",
    description: "Retrieve projects available to the current user.",
    status: "Planned",
  },
  {
    method: "POST",
    path: "/api/assistant",
    description: "Send a message to the AI engineering assistant.",
    status: "Planned",
  },
];

const methodStyles = {
  GET: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  POST: "bg-blue-50 text-blue-700 ring-blue-600/20",
};

export default function ApiPage() {
  return (
    <Container className="py-8 lg:py-10">
      <div className="max-w-3xl">
        <p className="text-muted text-sm font-medium">Developer Platform</p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">API</h1>

        <p className="text-muted mt-3 text-base leading-7">
          Explore the platform API, service health, and available endpoints from
          one place.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="border-border bg-background rounded-xl border p-6">
          <p className="text-muted text-sm font-medium">API status</p>

          <div className="mt-4 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

            <span className="text-sm font-medium">Operational</span>
          </div>

          <p className="text-muted mt-3 text-sm leading-6">
            Core API services are currently available.
          </p>
        </section>

        <section className="border-border bg-background rounded-xl border p-6">
          <p className="text-muted text-sm font-medium">API version</p>

          <p className="mt-4 text-2xl font-semibold">v1</p>

          <p className="text-muted mt-3 text-sm leading-6">
            Current public API version for the platform.
          </p>
        </section>

        <section className="border-border bg-background rounded-xl border p-6">
          <p className="text-muted text-sm font-medium">Base URL</p>

          <code className="bg-surface-muted mt-4 block rounded-md px-3 py-2 text-sm">
            /api
          </code>

          <p className="text-muted mt-3 text-sm leading-6">
            API requests are routed through the application API layer.
          </p>
        </section>
      </div>

      <section className="mt-10">
        <div>
          <p className="text-muted text-sm font-medium">Endpoints</p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Available endpoints
          </h2>
        </div>

        <div className="border-border bg-background mt-5 overflow-hidden rounded-xl border">
          {endpoints.map((endpoint, index) => {
            const methodStyle =
              methodStyles[endpoint.method as keyof typeof methodStyles];

            return (
              <div
                key={`${endpoint.method}-${endpoint.path}`}
                className={`p-5 ${
                  index !== endpoints.length - 1 ? "border-border border-b" : ""
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      className={`inline-flex shrink-0 items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${methodStyle}`}
                    >
                      {endpoint.method}
                    </span>

                    <div className="min-w-0">
                      <code className="text-sm font-medium break-all">
                        {endpoint.path}
                      </code>

                      <p className="text-muted mt-2 text-sm leading-6">
                        {endpoint.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-muted shrink-0 text-xs font-medium">
                    {endpoint.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-border bg-surface-muted mt-10 rounded-xl border p-6">
        <p className="text-sm font-semibold">Authentication</p>

        <p className="text-muted mt-2 max-w-2xl text-sm leading-6">
          Authentication and API key management will be connected when the
          backend authentication service is implemented.
        </p>
      </section>
    </Container>
  );
}

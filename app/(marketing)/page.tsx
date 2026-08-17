import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-border bg-background border-b">
        <Container className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20 lg:py-28">
          <div className="max-w-4xl">
            <div className="border-border bg-surface-muted text-muted-foreground mb-6 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
              Full-stack engineering · AI systems · Production quality
            </div>

            <h1 className="text-foreground max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
              Build reliable software for the{" "}
              <span className="text-muted-foreground">AI era.</span>
            </h1>

            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8 sm:text-xl">
              A practical engineering platform for building, testing, and
              shipping modern full-stack applications and AI-powered systems.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="#platform">Explore the platform</Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="#engineering">View engineering areas</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <div className="border-border bg-surface rounded-xl border p-6">
              <p className="text-muted-foreground text-sm font-medium">
                Architecture
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">
                Production-ready
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Clean boundaries, typed APIs, automated quality checks, and
                scalable foundations.
              </p>
            </div>

            <div className="border-border bg-surface rounded-xl border p-6">
              <p className="text-muted-foreground text-sm font-medium">
                Engineering
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">
                Full-stack
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Modern frontend, backend, databases, testing, CI, and
                containerized development.
              </p>
            </div>

            <div className="border-border bg-surface rounded-xl border p-6">
              <p className="text-muted-foreground text-sm font-medium">
                AI Systems
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">
                Built to evolve
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Foundations designed for intelligent features without
                compromising software quality.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="platform"
        className="border-border bg-surface-muted border-b"
      >
        <Container className="py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-muted text-sm font-semibold tracking-wider uppercase">
              Platform
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              One foundation for modern engineering.
            </h2>

            <p className="text-muted-foreground mt-4 text-lg leading-8">
              The platform brings the core pieces of professional software
              development together so every feature starts from a strong
              foundation.
            </p>
          </div>

          <div
            id="engineering"
            className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                title: "Frontend Engineering",
                description:
                  "React, Next.js, TypeScript, responsive interfaces, accessibility, and component architecture.",
              },
              {
                title: "Backend Engineering",
                description:
                  "FastAPI, Python, PostgreSQL, API design, validation, logging, and service boundaries.",
              },
              {
                title: "AI Engineering",
                description:
                  "Practical foundations for integrating intelligent capabilities into reliable applications.",
              },
              {
                title: "Testing & Quality",
                description:
                  "Unit tests, integration tests, coverage, linting, type safety, and automated quality gates.",
              },
              {
                title: "DevOps & Delivery",
                description:
                  "Docker, GitHub Actions, reproducible environments, and production-oriented workflows.",
              },
              {
                title: "Engineering Practices",
                description:
                  "Clear architecture, maintainable code, documentation, security, and incremental delivery.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="border-border bg-background rounded-xl border p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="about" className="bg-background">
        <Container className="py-20 lg:py-24">
          <div className="border-border bg-surface-muted rounded-2xl border p-8 sm:p-10 lg:p-12">
            <p className="text-muted text-sm font-semibold tracking-wider uppercase">
              Engineering mindset
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Start simple. Build correctly. Scale deliberately.
            </h2>

            <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-8">
              Every part of this platform is being built with maintainability,
              testability, and real-world engineering practices in mind.
            </p>

            <div id="get-started" className="mt-8">
              <Button>Start building</Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

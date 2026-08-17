import Link from "next/link";

import { Container } from "@/components/ui/container";

const navigation = [
  { label: "Platform", href: "#platform" },
  { label: "Engineering", href: "#engineering" },
  { label: "About", href: "#about" },
];

export function Header() {
  return (
    <header className="border-border/80 bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          aria-label="AI Engineering Platform home"
        >
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md text-xs font-bold">
            AI
          </span>
          <span>AI Engineering Platform</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="#get-started"
          className="bg-primary text-primary-foreground hover:bg-primary/90 hidden rounded-md px-4 py-2 text-sm font-medium transition-colors sm:inline-flex"
        >
          Get Started
        </Link>
      </Container>
    </header>
  );
}

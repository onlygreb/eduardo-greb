import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ResumeButton } from "@/components/site/resume-modal";

const LINKS = [
  { hash: "work", label: "Work" },
  { hash: "experience", label: "Experience" },
  { hash: "about", label: "About" },
  { hash: "contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome || typeof IntersectionObserver === "undefined") return;
    const sections = LINKS.map((l) => document.getElementById(l.hash)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveHash(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 md:px-10">
        <Link to="/" className="text-sm font-medium tracking-tight text-foreground">
          Eduardo Greb
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {LINKS.map((l) => {
            const active = onHome && activeHash === l.hash;
            return (
              <a
                key={l.hash}
                href={onHome ? `#${l.hash}` : `/#${l.hash}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative text-sm transition-colors duration-200",
                  active ? "text-foreground" : "text-subtle hover:text-foreground",
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-1/2 h-px w-3 -translate-x-1/2 bg-primary transition-opacity duration-200",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </a>
            );
          })}
          <ResumeButton className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Résumé
          </ResumeButton>
        </div>

        <div className="flex items-center gap-5 sm:hidden">
          <ResumeButton className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Résumé
          </ResumeButton>
          <a
            href={onHome ? "#contact" : "/#contact"}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

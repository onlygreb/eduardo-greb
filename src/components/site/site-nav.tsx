const LINKS = [
  { href: "#work", label: "/work" },
  { href: "#ai-workflow", label: "/ai-workflow" },
  { href: "#contact", label: "/contact" },
];

export function SiteNav() {
  return (
    <header className="relative z-10 border-b border-border">
      <nav
        aria-label="Primary"
        className="container-site flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4"
      >
        <a
          href="#top"
          className="group inline-flex min-h-11 items-center gap-2.5 font-mono text-[15px] text-foreground"
        >
          <span className="inline-block size-3 bg-accent transition-transform duration-300 group-hover:rotate-45" />
          eduardo.greb
        </a>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-sm">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="inline-flex min-h-11 items-center bg-accent px-5 text-[15px] font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          Hire me
        </a>
      </nav>
    </header>
  );
}

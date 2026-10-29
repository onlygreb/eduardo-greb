import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { AgentGraph } from "@/components/site/agent-graph";
import { ProjectVisual } from "@/components/site/project-visual";
import { ResumeButton } from "@/components/site/resume-modal";
import {
  CountUp,
  Marquee,
  Reveal,
  ScrollProgress,
  SplitWords,
  Stagger,
  StaggerItem,
  Typewriter,
} from "@/components/site/motion";
import {
  ABOUT,
  AI_TOOLS,
  AVAILABILITY,
  CONTACT,
  CONTACT_LINE,
  EXTRAS,
  FOOTER,
  HERO,
  HOW_I_BUILD,
  PROJECTS,
  ROLES,
  SITE,
  STACK_GROUPS,
  STATS,
} from "@/data/career";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
      { name: "twitter:image", content: SITE.ogImage },
    ],
  }),
  component: Index,
});

const btn =
  "inline-flex min-h-12 items-center gap-2 px-6 text-base font-medium transition-[transform,background-color,color,border-color] duration-200 hover:-translate-y-0.5 active:translate-y-0";

function SectionLabel({ children, className }: { children: string; className?: string }) {
  return <p className={cn("label mb-4 text-muted-foreground", className)}>{children}</p>;
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <AgentGraph className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-35 md:opacity-100" />

      <div className="container-site pb-16 pt-16 md:pb-20 md:pt-24">
        <p className="fade-up label flex items-start gap-3 text-sm text-muted-foreground">
          <span className="status-dot mt-[0.45em] shrink-0" aria-hidden />
          <span>{AVAILABILITY.join(" · ")}</span>
        </p>

        <SplitWords
          as="h1"
          immediate
          delay={0.1}
          text={HERO.headline}
          className="display-xl mt-7 max-w-[13ch] text-foreground"
        />

        <p
          className="fade-up mt-8 max-w-[680px] text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-relaxed text-foreground/80"
          style={{ animationDelay: "0.55s" }}
        >
          {HERO.subtitle}
        </p>

        <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.7s" }}>
          <a href="#work" className={cn(btn, "group bg-accent text-ink")}>
            See selected work
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
          <ResumeButton
            className={cn(
              btn,
              "border border-border-strong bg-background/60 text-foreground hover:border-foreground",
            )}
          >
            Download résumé
          </ResumeButton>
        </div>

        <Stagger className="mt-16 grid grid-cols-2 border-t border-border md:mt-20 md:grid-cols-4">
          {STATS.map((s) => (
            <StaggerItem key={s.label} className="pr-6 pt-6">
              <p className="text-[2.5rem] font-bold leading-none tracking-tight">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="label mt-2 text-muted-foreground">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ToolsTicker() {
  return (
    <div className="border-y border-border bg-surface">
      <div className="flex items-stretch">
        <p className="label hidden shrink-0 items-center border-r border-border px-6 text-muted-foreground sm:flex">
          // in daily use
        </p>
        <Marquee
          className="py-4"
          items={AI_TOOLS.map((tool) => (
            <span key={tool} className="flex items-center gap-6 pr-6 font-mono text-sm">
              <span className="whitespace-nowrap text-foreground">{tool}</span>
              <span aria-hidden className="inline-block size-1.5 bg-accent" />
            </span>
          ))}
        />
      </div>
    </div>
  );
}

function HowIBuild() {
  return (
    <section id="ai-workflow" className="on-light scroll-mt-4 bg-paper text-ink">
      <div className="container-site py-24 md:py-32">
        <SectionLabel className="text-ink/70">01 — How I build</SectionLabel>
        <SplitWords text={HOW_I_BUILD.headline} className="display-lg max-w-[820px]" />

        <Stagger className="mt-14 grid gap-px border border-ink bg-ink md:grid-cols-3">
          {HOW_I_BUILD.steps.map((step) => (
            <StaggerItem
              key={step.label}
              className="group bg-paper p-8 transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              <p className="label text-ink/70 transition-colors duration-300 group-hover:text-accent">
                {step.label}
              </p>
              <h3 className="mt-4 text-2xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/80 transition-colors duration-300 group-hover:text-paper/80">
                {step.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
          <Reveal>
            <div className="border border-ink bg-ink font-mono text-paper">
              <div className="flex items-center gap-2 border-b border-paper/15 px-4 py-3">
                <span className="size-2.5 rounded-full bg-paper/25" />
                <span className="size-2.5 rounded-full bg-paper/25" />
                <span className="size-2.5 rounded-full bg-paper/25" />
                <span className="ml-2 text-xs text-paper/70">workflow.log</span>
              </div>
              <Typewriter
                className="space-y-1.5 overflow-x-auto p-5 text-[13px] leading-relaxed sm:p-6"
                lineClassName="whitespace-pre"
                speed={16}
                lines={[
                  { key: "01 architect  ", text: "spec · boundaries · data model" },
                  {
                    key: "02 dispatch   ",
                    text: "claude code · cursor · copilot",
                    className: "text-accent",
                  },
                  { key: "03 verify     ", text: "tests ✓  types ✓  lint ✓" },
                  { key: "04 review     ", text: "every diff read by a human" },
                  { key: "05 ship       ", text: "ci/cd → production", className: "text-accent" },
                ]}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center">
            <p className="label text-ink/70">In production</p>
            <p className="mt-3 text-xl leading-relaxed md:text-2xl">{HOW_I_BUILD.inProduction}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="AI tools I use">
              {AI_TOOLS.map((tool) => (
                <li
                  key={tool}
                  className="border border-ink/30 px-3 py-1.5 font-mono text-xs transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-accent"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-4">
      <div className="container-site py-24 md:py-32">
        <SectionLabel>02 — Selected work</SectionLabel>
        <SplitWords text="Products, not tickets." className="display-lg" />

        <div className="mt-14 border-b border-border">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className="group grid gap-10 border-t border-border py-12 md:grid-cols-[1.15fr_1fr] md:gap-12 md:py-14"
            >
              <Reveal y={32}>
                <ProjectVisual kind={p.visual} />
              </Reveal>

              <Stagger className="min-w-0">
                <StaggerItem>
                  <p className="label text-muted-foreground">
                    {p.company} · {p.period} · {p.role}
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <h3 className="mt-3 text-[clamp(1.625rem,1.3rem+1.2vw,2rem)] font-bold leading-tight transition-transform duration-300 group-hover:translate-x-1">
                    {p.title}
                  </h3>
                </StaggerItem>
                <StaggerItem>
                  <p className="mt-4 text-[17px] leading-relaxed text-foreground/80">{p.body}</p>
                </StaggerItem>
                <StaggerItem>
                  <ul className="mt-5 space-y-2.5">
                    {p.results.map((r) => (
                      <li key={r} className="flex gap-3 leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-[0.6em] inline-block size-1.5 shrink-0 bg-accent"
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
                <StaggerItem>
                  <p className="label mt-6 text-accent">{p.stack.join(" · ")}</p>
                </StaggerItem>
                {p.link ? (
                  <StaggerItem>
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link mt-4 inline-flex min-h-11 items-center gap-2 border-b border-border-strong text-[15px] transition-colors hover:border-accent hover:text-accent"
                    >
                      {p.link.label}
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </a>
                  </StaggerItem>
                ) : null}
              </Stagger>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceAndStack() {
  return (
    <section id="experience" className="scroll-mt-4">
      <div className="container-site pb-24 md:pb-32">
        <h2 className="label mb-8 text-sm text-muted-foreground">03 — Experience &amp; stack</h2>

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <Reveal className="mb-10 max-w-[620px] space-y-4 text-[17px] leading-relaxed text-foreground/80">
              {ABOUT.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </Reveal>

            <Stagger as="ol" className="border-b border-border">
              {ROLES.map((r) => (
                <StaggerItem
                  as="li"
                  key={r.company}
                  className="group grid grid-cols-[7.5rem_1fr] gap-x-6 gap-y-1 border-t border-border py-4 transition-colors duration-200 hover:bg-surface sm:grid-cols-[9rem_1fr_auto]"
                >
                  <span className="label pt-0.5 text-muted-foreground transition-colors group-hover:text-accent">
                    {r.period}
                  </span>
                  <span className="text-[17px] transition-transform duration-300 group-hover:translate-x-1">
                    {r.company} <span className="text-muted-foreground">— {r.role}</span>
                  </span>
                  <span className="label col-start-2 text-muted-foreground sm:col-start-auto sm:pr-3 sm:pt-0.5">
                    {r.place}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Stagger className="flex min-w-0 flex-col gap-7">
            {STACK_GROUPS.map((g) => (
              <StaggerItem key={g.title}>
                <h3 className="label mb-2.5 text-accent">{g.title}</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="border border-border px-2.5 py-1 text-[15px] transition-colors duration-200 hover:border-accent hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
            <StaggerItem className="space-y-3 border-t border-border pt-6">
              {EXTRAS.map((e) => (
                <div key={e.label}>
                  <p className="label text-muted-foreground">{e.label}</p>
                  <p className="mt-1 text-[15px]">{e.value}</p>
                </div>
              ))}
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(CONTACT.email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${CONTACT.email}`;
        }
      }}
      className={cn(
        btn,
        "w-12 justify-center border-2 border-ink px-0 text-ink hover:bg-ink hover:text-accent",
      )}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

function Contact() {
  const outlined = cn(btn, "border-2 border-ink text-ink hover:bg-ink hover:text-accent");
  return (
    <section id="contact" className="on-accent scroll-mt-4 bg-accent text-ink">
      <div className="container-site py-24 md:py-32">
        <SplitWords
          text="Need a senior who ships fast — and right?"
          className="display-md max-w-[900px]"
        />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-[620px] text-[19px] leading-relaxed">{CONTACT_LINE}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className={cn(btn, "bg-ink text-paper hover:text-accent")}
            >
              {CONTACT.email}
            </a>
            <CopyEmailButton />
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className={outlined}>
              LinkedIn
            </a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className={outlined}>
              GitHub
            </a>
            <ResumeButton className={outlined}>Résumé</ResumeButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <SiteNav />
      <main>
        <Hero />
        <ToolsTicker />
        <HowIBuild />
        <SelectedWork />
        <ExperienceAndStack />
        <Contact />
      </main>
      <footer className="container-site label flex flex-wrap justify-between gap-3 py-7 text-muted-foreground">
        <span>{FOOTER.left}</span>
        <span>{FOOTER.right}</span>
      </footer>
    </div>
  );
}

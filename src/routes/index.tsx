import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { Reveal } from "@/components/site/primitives";
import { HeroParticles } from "@/components/site/hero-particles";
import { useReveal } from "@/hooks/use-reveal";
import { CONTACT, SKILL_GROUPS } from "@/data/career";
import { ResumeButton } from "@/components/site/resume-modal";
import { cn } from "@/lib/utils";

const TITLE = "Eduardo Greb — Tech Lead & Software Engineer";
const DESCRIPTION =
  "Tech Lead and software engineer with more than eight years across backend, web, cloud, games and real-time systems. Based in Brazil, available for international contractor / B2B roles.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PROJECTS = [
  {
    n: "01",
    label: "Gemina · 2025—Present",
    title: "Cybersecurity monitoring platform",
    role: "Tech Lead & Full-Stack Developer",
    body: "I joined the project at the beginning and built its technical foundation, choosing the initial stack and architecture and working across both the backend and frontend. Today I continue developing the product while leading its technical direction and reviewing implementation decisions with the team.",
    tech: "Node.js · TypeScript · React",
  },
  {
    n: "02",
    label: "S44 Energy · 2024—2025",
    title: "EV charging software",
    role: "Senior Full-Stack Developer",
    body: "I worked on software for EV charging operations in the CitrineOS ecosystem, building React interfaces and Node.js services backed by PostgreSQL, messaging and cloud infrastructure.",
    tech: "React · TypeScript · Node.js · PostgreSQL · AWS · RabbitMQ",
    link: { href: "https://github.com/citrineos", label: "CitrineOS on GitHub" },
  },
  {
    n: "03",
    label: "Ironbelly Studios · 2022—2024",
    title: "Backyard Adventures playground designer",
    role: "Senior Game & Back-End Developer",
    body: "I built and maintained a browser-based 3D playground designer in Unity, turning a physical product catalog into a tool customers could configure directly in the browser.",
    tech: "Unity · C# · WebGL",
    link: { href: "https://backyardadventures.com/designer", label: "Backyard Adventures Designer" },
  },
];

const ROLES = [
  {
    company: "Gemina",
    title: "Tech Lead & Full-Stack Developer",
    period: "Jul 2025 — Present",
    body: "Leading the technical development of a cybersecurity monitoring platform while remaining hands-on across the product.",
  },
  {
    company: "S44 Energy",
    title: "Senior Full-Stack Developer",
    period: "Oct 2024 — May 2025",
    body: "Full-stack work on EV charging software in the CitrineOS ecosystem.",
  },
  {
    company: "Evolution Ventures",
    title: "Senior Full-Stack Developer",
    period: "Mar 2024 — Jul 2024",
    body: "Sales web portals in React, React Native apps, and backend services in Node.js and .NET.",
  },
  {
    company: "Ironbelly Studios",
    title: "Senior Game & Back-End Developer",
    period: "Apr 2022 — Mar 2024",
    body: "Games, backends and interactive 3D products with C#, .NET, Unity, C++, Unreal Engine and Node.js.",
  },
  {
    company: "Earlier",
    title: "MTI Studio · VR Monkey · Smart Consulting",
    period: "2018 — 2022",
    body: "Mostly C#/.NET across backend, games and enterprise systems, plus TypeScript and Node.js at MTI Studio.",
  },
];

function Timeline() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.05);

  return (
    <div ref={ref} className="relative mt-12 pl-6 md:pl-8">
      <span
        aria-hidden
        className={cn(
          "timeline-line absolute left-0 top-1.5 h-[calc(100%-0.75rem)] w-px bg-border-strong",
          shown && "timeline-line-in",
        )}
      />
      <div className="space-y-10">
        {ROLES.map((r, i) => (
          <Reveal key={r.company} delay={Math.min(i * 60, 180)}>
            <div className="relative md:grid md:grid-cols-12 md:gap-10">
              <span
                aria-hidden
                className="absolute -left-6 top-2 size-1.5 rounded-full bg-border-strong md:-left-8"
              />
              <p className="font-mono text-xs text-subtle md:col-span-3">{r.period}</p>
              <div className="mt-2 md:col-span-9 md:mt-0">
                <h3 className="text-base font-medium text-foreground">
                  {r.company} — <span className="text-muted-foreground">{r.title}</span>
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{r.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}


function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <HeroParticles className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 55% at 30% 45%, var(--background) 0%, color-mix(in oklab, var(--background) 72%, transparent) 45%, transparent 78%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background"
          />

          <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-40 md:px-10 md:pb-36 md:pt-52">
            <div className="hero-enter">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Eduardo Greb
              </h1>
            </div>
            <div className="hero-enter" style={{ animationDelay: "120ms" }}>
              <p className="mt-2 text-base text-muted-foreground">Tech Lead &amp; Software Engineer</p>
            </div>

            <div className="hero-enter" style={{ animationDelay: "240ms" }}>
              <p className="mt-10 max-w-3xl text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed">
                I'm a Tech Lead and software engineer with more than eight years of experience across
                backend, web, cloud, games and real-time systems. Today I spend most of my time
                designing software, making technical decisions and working with the team to build it.
              </p>
            </div>

            <div className="hero-enter" style={{ animationDelay: "360ms" }}>
              <p className="mt-8 font-mono text-xs text-subtle">
                Brazil · UTC−3 · Available for international contractor / B2B roles
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href="#work"
                  className="border-b border-primary/70 pb-1 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  View my work
                </a>
                <ResumeButton className="border-b border-transparent pb-1 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground">
                  Résumé
                </ResumeButton>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-subtle transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-subtle transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Selected work */}
        <section id="work" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto w-full max-w-5xl px-6 py-24 md:px-10 md:py-32">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Selected work
              </h2>
            </Reveal>

            <div className="mt-12 md:mt-16">
              {PROJECTS.map((p) => (
                <Reveal key={p.n}>
                  <article className="group border-t border-border py-10 transition-colors duration-200 hover:border-border-strong md:grid md:grid-cols-12 md:gap-10 md:py-14">
                    <div className="md:col-span-4">
                      <p className="font-mono text-xs text-subtle">
                        {p.n} — {p.label}
                      </p>
                    </div>
                    <div className="mt-4 md:col-span-8 md:mt-0">
                      <h3 className="text-xl font-medium text-foreground transition-transform duration-300 ease-out group-hover:translate-x-1 md:text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-subtle">{p.role}</p>
                      <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
                        {p.body}
                      </p>
                      <p className="mt-6 font-mono text-xs text-subtle opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                        {p.tech}
                      </p>
                      {p.link ? (
                        <a
                          href={p.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group/link mt-6 inline-flex items-center gap-2 border-b border-border-strong pb-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                        >
                          {p.link.label}
                          <span
                            aria-hidden
                            className="transition-transform duration-200 group-hover/link:translate-x-1"
                          >
                            →
                          </span>
                        </a>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto w-full max-w-5xl px-6 py-24 md:px-10 md:py-32">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Experience
              </h2>
            </Reveal>

            <Timeline />

            <Reveal>
              <div className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-2">
                {SKILL_GROUPS.map((g) => (
                  <div key={g.title}>
                    <p className="font-mono text-xs text-subtle">{g.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {g.items.map((item, i) => (
                        <span key={item}>
                          {i > 0 ? " · " : null}
                          <span className="transition-colors duration-200 hover:text-foreground">
                            {item}
                          </span>
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto w-full max-w-5xl px-6 py-24 md:px-10 md:py-32">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                About
              </h2>
              <div className="mt-8 max-w-2xl space-y-6 leading-relaxed text-muted-foreground">
                <p>
                  I started working in tech at 16, and since then I've moved through very different
                  kinds of projects — from business applications to games, VR and real-time software.
                </p>
                <p>
                  I've worked extensively with both C#/.NET and TypeScript/Node.js, but I've never
                  been particularly attached to one stack. Moving between different kinds of projects
                  is probably what made me comfortable learning whatever the job actually needs.
                </p>
                <p>
                  I'm a Tech Lead today, but I still enjoy being involved in the technical work. I
                  don't want to stop building things just because my title has “Lead” in it.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto w-full max-w-5xl px-6 py-24 md:px-10 md:py-32">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Let's talk.
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                I'm open to remote Senior and Lead engineering roles, working from Brazil as an
                international contractor.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="border-b border-primary/70 pb-1 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Email me
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-subtle transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
                <ResumeButton className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Résumé
                </ResumeButton>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-border">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-10 md:px-10">
            <p className="font-mono text-xs text-subtle">Eduardo Greb · Brazil · Remote</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-mono text-xs text-subtle transition-colors hover:text-foreground"
            >
              {CONTACT.email}
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

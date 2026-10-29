// Every claim on the site lives here. Facts must match the résumé and the
// portfolio-facts skill (.claude/skills/portfolio-facts): never add numbers that aren't there.

export const SITE = {
  title: "Eduardo Greb — Tech Lead who ships production software with AI agents",
  description:
    "Tech Lead with 8+ years across backend, web, cloud and games. I design the architecture, direct AI agents to write the code, and own what reaches production. Remote from Brazil, available for contractor / B2B roles.",
  ogImage: "/og.png",
};

export const CONTACT = {
  email: "dgrebch@gmail.com",
  linkedin: "https://linkedin.com/in/eduardogreb",
  linkedinLabel: "linkedin.com/in/eduardogreb",
  github: "https://github.com/onlygreb",
  githubLabel: "github.com/onlygreb",
};

export const AVAILABILITY = ["Available now", "Remote", "Brazil (UTC−3)", "Contractor / B2B"];

export const HERO = {
  headline: "Tech Lead who ships production software with AI agents.",
  subtitle:
    "8+ years across backend, web, cloud and games. I design the architecture, direct AI agents to write the code, and own what reaches production.",
};

export const STATS = [
  { value: 8, suffix: "+", label: "years shipping software" },
  { value: 5, suffix: "", label: "platforms built from zero" },
  { value: 7, suffix: "", label: "companies, all remote" },
  { value: 3, suffix: "", label: "countries · BR · US · CA" },
];

export const AI_TOOLS = [
  "Claude Code",
  "Cursor",
  "GitHub Copilot",
  "OpenAI / ChatGPT",
  "Claude",
  "Gemini",
  "DeepSeek",
  "Lovable",
];

export const HOW_I_BUILD = {
  headline: "AI writes most of the code. I own the decisions.",
  steps: [
    {
      label: "step_01",
      title: "Architect",
      body: "Stack, boundaries, data model and the specs agents work from. The part that decides whether a product survives year two.",
    },
    {
      label: "step_02",
      title: "Orchestrate",
      body: "Coding agents (Claude Code, Cursor, GitHub Copilot) run on scoped tasks. Context files, tests first, small diffs.",
    },
    {
      label: "step_03",
      title: "Review & ship",
      body: "Every diff reviewed, security and performance checked, CI/CD to production. Speed without the 3 a.m. pages.",
    },
  ],
  inProduction:
    "Integrated a Claude-powered AI assistant chat into the Gemina cybersecurity monitoring dashboard, from the LLM API to the UI the analysts use.",
};

export type ProjectVisualKind = "gemina" | "s44" | "backyard";

export type Project = {
  id: string;
  company: string;
  period: string;
  role: string;
  title: string;
  body: string;
  results: string[];
  stack: string[];
  visual: ProjectVisualKind;
  link?: { href: string; label: string };
};

export const PROJECTS: Project[] = [
  {
    id: "gemina",
    company: "Gemina",
    period: "Jul 2025 — Nov 2026",
    role: "Tech Lead",
    title: "Cybersecurity monitoring platform",
    body: "Founding engineer and Tech Lead of a monitoring platform for security-sensitive client environments. Built from zero, hands-on across backend and frontend, then led the product's technical direction.",
    results: [
      "Chose the stack and defined the architecture and system boundaries from day one.",
      "Integrated a Claude-powered AI assistant chat inside the monitoring dashboard.",
      "Owned code review, testing expectations and release discipline for the team.",
    ],
    stack: ["Node.js", "TypeScript", "React", "Claude"],
    visual: "gemina",
  },
  {
    id: "s44",
    company: "S44 Energy",
    period: "2024 — 2025",
    role: "Senior Full-Stack",
    title: "EV charging software",
    body: "React interfaces and Node.js services for EV charging operations in the open-source CitrineOS ecosystem.",
    results: [
      "Built and maintained charging-station management dashboards in React and TypeScript.",
      "Designed PostgreSQL data structures and REST / GraphQL APIs in Node.js.",
      "Shipped with Docker, AWS, RabbitMQ and GitHub Actions.",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "GraphQL", "AWS", "RabbitMQ"],
    visual: "s44",
    link: { href: "https://github.com/citrineos", label: "CitrineOS on GitHub" },
  },
  {
    id: "backyard",
    company: "Ironbelly Studios",
    period: "2022 — 2024",
    role: "Senior Game & Back-End",
    title: "Backyard Adventures 3D designer",
    body: "A browser-based 3D configurator that turned a physical product catalog into something customers build themselves.",
    results: [
      "Built and maintained the Unity / C# configurator, compiled to WebGL for the browser.",
      "Real-time placement and configuration of playground equipment on a 3D canvas.",
    ],
    stack: ["Unity", "C#", "WebGL"],
    visual: "backyard",
    link: { href: "https://backyardadventures.com/designer", label: "Try it live" },
  },
];

export const ROLES = [
  { period: "2025 — 2026", company: "Gemina", role: "Tech Lead & Full-Stack", place: "Brazil" },
  {
    period: "2024 — 2025",
    company: "S44 Energy",
    role: "Senior Full-Stack",
    place: "New Jersey, USA",
  },
  {
    period: "2024",
    company: "Evolution Ventures",
    role: "Senior Full-Stack",
    place: "Colorado, USA",
  },
  {
    period: "2022 — 2024",
    company: "Ironbelly Studios",
    role: "Senior Game & Back-End",
    place: "Quebec, Canada",
  },
  { period: "2021 — 2022", company: "MTI Studio", role: "Full-Stack", place: "São Paulo, Brazil" },
  {
    period: "2020 — 2021",
    company: "VR Monkey",
    role: "Game Developer · PSVR port",
    place: "São Paulo, Brazil",
  },
  {
    period: "2018 — 2020",
    company: "Smart Consulting",
    role: "Full-Stack · .NET & Dynamics 365",
    place: "São Paulo, Brazil",
  },
];

export const STACK_GROUPS = [
  {
    title: "AI engineering",
    items: [
      "Coding agents",
      "LLM API integration",
      "Claude Code",
      "Cursor",
      "GitHub Copilot",
      "OpenAI",
      "Gemini",
      "DeepSeek",
      "Lovable",
    ],
  },
  {
    title: "Backend",
    items: ["TypeScript / Node.js", "C# / .NET", "REST", "GraphQL", "RabbitMQ", "Kafka"],
  },
  { title: "Frontend & mobile", items: ["React", "React Native", "Flutter"] },
  {
    title: "Cloud & data",
    items: ["AWS", "Azure", "GCP", "Docker", "PostgreSQL", "MongoDB", "CI/CD"],
  },
  { title: "Games & real-time", items: ["Unity", "Unreal Engine", "C++", "WebGL", "VR / PSVR"] },
];

export const ABOUT = [
  "I started working in tech at 16 and moved through very different kinds of projects, from business applications to games, VR and real-time software.",
  "I've never been attached to one stack. Today that shows up as how I work with AI: I pick the right model or agent for the job, keep the architecture in my head, and stay hands-on in the code that reaches production.",
];

export const EXTRAS = [
  {
    label: "Languages",
    value: "Portuguese (native) · English (fluent) · Spanish (intermediate) · German (basic)",
  },
  { label: "Education", value: "Systems Analysis & Development, UNINOVE" },
];

export const FOOTER = {
  left: "Eduardo Greb · Brazil · Remote",
  right: "Built with AI agents, reviewed by a human.",
};

import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { Typewriter } from "@/components/site/motion";
import type { ProjectVisualKind } from "@/data/career";

/** 16:10 panel with an editor-style title bar. */
function Panel({ file, children }: { file: string; children: ReactNode }) {
  return (
    <div className="flex aspect-[16/10] w-full min-w-0 flex-col border border-border bg-surface font-mono transition-colors duration-300 group-hover:border-border-strong">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="ml-2 truncate text-xs text-muted-foreground">{file}</span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function GeminaVisual() {
  return (
    <Panel file="gemina/platform.ts">
      <div className="flex h-full flex-col justify-center px-5 py-4 text-[clamp(11px,1.25vw,15px)] leading-relaxed sm:px-7">
        <Typewriter
          speed={14}
          lineClassName="whitespace-pre"
          lines={[
            { text: "// cybersecurity monitoring platform", className: "text-muted-foreground" },
            { key: "role:  ", text: "Tech Lead · founding engineer", className: "text-foreground" },
            {
              key: "scope: ",
              text: "architecture · backend · frontend",
              className: "text-foreground",
            },
            { key: "stack: ", text: "Node.js · TypeScript · React", className: "text-accent" },
            {
              key: "ai:    ",
              text: "Claude assistant chat in the dashboard",
              className: "text-accent",
            },
            { key: "built: ", text: "from day one to production", className: "text-foreground" },
          ]}
        />
        <p className="mt-4 flex items-center gap-2.5 text-muted-foreground">
          <span className="inline-block size-2 bg-accent" />
          UI under NDA · walkthrough on request
        </p>
      </div>
    </Panel>
  );
}

/** Illustrative data flow: charging stations → message bus → services → dashboard. */
function S44Visual() {
  const reduced = useReducedMotion();
  const stations = [70, 135, 200, 265];
  const services = [
    { y: 92, label: "api · graphql" },
    { y: 168, label: "postgresql" },
    { y: 244, label: "dashboard" },
  ];
  const paths = [
    ...stations.map((y) => `M 92 ${y} H 200 V 168 H 300`),
    ...services.map((s) => `M 340 168 H 420 V ${s.y} H 470`),
  ];

  return (
    <Panel file="s44/citrineos · charging data flow">
      <svg
        viewBox="0 0 640 340"
        className="h-full w-full"
        role="img"
        aria-label="Illustration: charging stations publish events over a message bus to API, database and dashboard services"
      >
        <g fontFamily="'JetBrains Mono Variable', monospace" fontSize="12">
          {paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1" />
          ))}

          {stations.map((y, i) => (
            <g key={y}>
              <rect
                x="40"
                y={y - 14}
                width="52"
                height="28"
                fill="var(--background)"
                stroke="var(--foreground)"
                strokeOpacity="0.7"
              />
              <rect x="49" y={y - 4} width="8" height="8" fill="var(--accent)">
                {reduced ? null : (
                  <animate
                    attributeName="opacity"
                    values="1;0.25;1"
                    dur="2.4s"
                    begin={`${i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                )}
              </rect>
              <text x="62" y={y + 4} fill="var(--muted-foreground)">
                {`CS${i + 1}`}
              </text>
            </g>
          ))}

          <rect
            x="300"
            y="146"
            width="40"
            height="44"
            fill="var(--background)"
            stroke="var(--accent)"
          />
          <text x="320" y="214" textAnchor="middle" fill="var(--accent)">
            rabbitmq
          </text>

          {services.map((s) => (
            <g key={s.label}>
              <rect
                x="470"
                y={s.y - 16}
                width="134"
                height="32"
                fill="var(--background)"
                stroke="var(--foreground)"
                strokeOpacity="0.7"
              />
              <text x="482" y={s.y + 4} fill="var(--foreground)">
                {s.label}
              </text>
            </g>
          ))}

          {reduced
            ? null
            : paths.map((d, i) => (
                <rect
                  key={`p${i}`}
                  x="-3"
                  y="-3"
                  width="6"
                  height="6"
                  fill={i < stations.length ? "var(--accent)" : "var(--foreground)"}
                >
                  <animateMotion
                    dur={`${2.6 + (i % 3) * 0.5}s`}
                    begin={`${i * 0.45}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </rect>
              ))}

          <text x="40" y="318" fill="var(--muted-foreground)" fontSize="11">
            illustrative · not production data
          </text>
        </g>
      </svg>
    </Panel>
  );
}

type Box = {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  accent?: boolean;
  delay: number;
};

function IsoBox({ x, y, w, d, h, accent, delay }: Box) {
  const face = (style: CSSProperties) => <span style={style} />;
  return (
    <div
      className={accent ? "iso-block is-accent" : "iso-block"}
      style={{ left: x, top: y, width: w, height: d, ["--delay" as string]: `${delay}s` }}
    >
      {face({ transform: `translateZ(${h}px)` })}
      {face({ top: 0, height: h, transformOrigin: "top", transform: "rotateX(90deg)" })}
      {face({ top: d, height: h, transformOrigin: "top", transform: "rotateX(90deg)" })}
      {face({ left: 0, width: h, transformOrigin: "left", transform: "rotateY(-90deg)" })}
      {face({ left: w, width: h, transformOrigin: "left", transform: "rotateY(-90deg)" })}
    </div>
  );
}

/** Pieces of a playground dropping onto a grid, in CSS 3D. Illustrative, not the real product. */
function BackyardVisual() {
  const boxes: Box[] = [
    { x: 30, y: 40, w: 70, d: 70, h: 90, accent: true, delay: 0 },
    { x: 100, y: 55, w: 70, d: 40, h: 50, delay: 0.35 },
    { x: 170, y: 60, w: 60, d: 30, h: 22, delay: 0.7 },
    { x: 40, y: 150, w: 26, d: 26, h: 70, delay: 1.05 },
    { x: 150, y: 150, w: 26, d: 26, h: 70, delay: 1.05 },
    { x: 40, y: 150, w: 136, d: 26, h: 8, delay: 1.4 },
    { x: 190, y: 160, w: 50, d: 50, h: 12, delay: 1.75 },
  ];

  return (
    <Panel file="backyard/designer · unity → webgl">
      <div className="iso-scene flex h-full items-center justify-center" aria-hidden>
        <div className="iso-stage relative size-[260px] scale-[0.72] sm:scale-90 lg:scale-100">
          <svg className="absolute inset-0" viewBox="0 0 260 260" width="260" height="260">
            <defs>
              <pattern id="iso-grid" width="26" height="26" patternUnits="userSpaceOnUse">
                <path
                  d="M 26 0 L 0 0 0 26"
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="260" height="260" fill="url(#iso-grid)" stroke="var(--border-strong)" />
          </svg>
          {boxes.map((b, i) => (
            <IsoBox key={i} {...b} />
          ))}
        </div>
      </div>
      <p className="absolute bottom-3 left-4 text-[11px] text-muted-foreground">
        illustrative · the real designer is live
      </p>
    </Panel>
  );
}

export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  if (kind === "gemina") return <GeminaVisual />;
  if (kind === "s44") return <S44Visual />;
  return <BackyardVisual />;
}

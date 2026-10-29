import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Fade + slide in once when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Children wrapped in StaggerItem animate in one after another. */
export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={staggerChild}>
      {children}
    </Tag>
  );
}

/** Headline that rises in word by word. The full sentence stays readable to screen readers. */
export function SplitWords({
  text,
  className,
  delay = 0,
  as = "h2",
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
  immediate?: boolean;
}) {
  const words = text.split(" ");

  // Above the fold: pure CSS so the words rise on first paint, before hydration (keeps LCP fast).
  if (immediate) {
    const Plain = as;
    return (
      <Plain className={className} aria-label={text}>
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 ? " " : null}
            <span aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
              <span
                className="word-rise inline-block"
                style={{ animationDelay: `${delay + i * 0.06}s` }}
              >
                {word}
              </span>
            </span>
          </Fragment>
        ))}
      </Plain>
    );
  }
  const Tag = m[as];
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <span aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
            <m.span
              className="inline-block"
              variants={{
                hidden: { y: "105%" },
                shown: { y: "0%", transition: { duration: 0.75, ease: EASE } },
              }}
            >
              {word}
            </m.span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}

/** Counts from 0 to `value` the first time it scrolls into view. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}

/**
 * Reveals lines one character at a time, like an agent streaming output.
 * Server-renders the full text so nothing is hidden without JS.
 */
export function Typewriter({
  lines,
  className,
  lineClassName,
  speed = 18,
}: {
  lines: { key?: string; text: string; className?: string }[];
  className?: string;
  lineClassName?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const full = lines.map((l) => (l.key ?? "") + l.text);
  const total = full.reduce((n, l) => n + l.length, 0);
  const [typed, setTyped] = useState(total);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduced) return;
    setTyped(0);
    setStarted(true);
  }, [reduced]);

  useEffect(() => {
    if (!started || !inView || typed >= total) return;
    const id = window.setTimeout(() => setTyped((t) => t + 1), speed);
    return () => window.clearTimeout(id);
  }, [started, inView, typed, total, speed]);

  let remaining = typed;
  const done = typed >= total;

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => {
        const text = full[i]!;
        const keyLength = line.key?.length ?? 0;
        const visible = text.slice(0, Math.max(0, remaining));
        const isCurrent = !done && remaining >= 0 && remaining <= text.length;
        remaining -= text.length;
        return (
          <p key={i} className={lineClassName}>
            <span className="sr-only">{text}</span>
            <span aria-hidden>
              {keyLength ? (
                <span className="text-muted-foreground">{visible.slice(0, keyLength)}</span>
              ) : null}
              <span className={line.className}>{visible.slice(keyLength)}</span>
              {visible ? null : " "}
              {isCurrent ? <span className="caret ml-0.5" /> : null}
            </span>
          </p>
        );
      })}
      {done ? (
        <p aria-hidden className={lineClassName}>
          <span className="caret" />
        </p>
      ) : null}
    </div>
  );
}

/** Infinite horizontal ticker. Pauses on hover/focus; wraps statically under reduced motion. */
export function Marquee({
  items,
  className,
  duration = 40,
}: {
  items: ReactNode[];
  className?: string;
  duration?: number;
}) {
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee overflow-hidden", className)}>
      <div className="marquee-track" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}

/** Thin accent bar at the very top that tracks page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

import { useEffect, useRef } from "react";

type Node = {
  kind: "lead" | "agent" | "task";
  angle: number;
  radius: number;
  wobble: number;
  x: number;
  y: number;
  parent: number;
  flash: number;
  label?: string;
};

type Pulse = { from: number; to: number; t: number; speed: number; back: boolean };

/**
 * Hero canvas: a lead node dispatching work to agent nodes, which fan out to tasks.
 * Accent pulses travel out (dispatch), tasks flash when done, light pulses return (review).
 * - one canvas, no React nodes per element
 * - pauses when the tab is hidden or the hero is off-screen
 * - draws a single static frame under prefers-reduced-motion
 */
export function AgentGraph({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const css = getComputedStyle(document.documentElement);
    const fg = css.getPropertyValue("--foreground").trim() || "#f2f1ea";
    const accent = css.getPropertyValue("--accent").trim() || "#d4ff3a";
    const mono = "500 10px 'JetBrains Mono Variable', ui-monospace, monospace";

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let scale = 1;
    let rotation = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;
    let active = true;
    const pointer = { x: -9999, y: -9999 };

    const AGENTS = 6;

    const build = () => {
      nodes = [{ kind: "lead", angle: 0, radius: 0, wobble: 0, x: 0, y: 0, parent: -1, flash: 0 }];
      for (let a = 0; a < AGENTS; a++) {
        const angle = (a / AGENTS) * Math.PI * 2 + 0.3;
        const agentIndex = nodes.length;
        nodes.push({
          kind: "agent",
          angle,
          radius: 0.42 + (a % 2) * 0.06,
          wobble: Math.random() * Math.PI * 2,
          x: 0,
          y: 0,
          parent: 0,
          flash: 0,
          label: `agent_0${a + 1}`,
        });
        const tasks = 2 + (a % 3);
        for (let t = 0; t < tasks; t++) {
          nodes.push({
            kind: "task",
            angle: angle + (t - (tasks - 1) / 2) * 0.28 + (Math.random() - 0.5) * 0.08,
            radius: 0.78 + Math.random() * 0.2,
            wobble: Math.random() * Math.PI * 2,
            x: 0,
            y: 0,
            parent: agentIndex,
            flash: 0,
          });
        }
      }
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const wide = w >= 900;
      cx = wide ? w * 0.74 : w * 0.78;
      cy = wide ? h * 0.46 : h * 0.22;
      scale = wide ? Math.min(w * 0.3, h * 0.42) : Math.min(w * 0.42, 220);
      layout(0);
      if (reduced) draw();
    };

    const layout = (time: number) => {
      for (const n of nodes) {
        if (n.kind === "lead") {
          n.x = cx;
          n.y = cy;
          continue;
        }
        const wob = Math.sin(time * 0.0007 + n.wobble) * 0.02;
        const r = (n.radius + wob) * scale;
        const a = n.angle + rotation;
        n.x = cx + Math.cos(a) * r;
        n.y = cy + Math.sin(a) * r * 0.82;
      }
    };

    const spawn = () => {
      // dispatch from the lead to a random agent, which then fans out to one of its tasks
      const agents = nodes.map((n, i) => (n.kind === "agent" ? i : -1)).filter((i) => i > 0);
      const to = agents[Math.floor(Math.random() * agents.length)]!;
      pulses.push({ from: 0, to, t: 0, speed: 0.0011 + Math.random() * 0.0006, back: false });
    };

    const near = (n: Node) => {
      const dx = n.x - pointer.x;
      const dy = n.y - pointer.y;
      return Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 160);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // dot grid
      ctx.fillStyle = fg;
      ctx.globalAlpha = 0.07;
      const gap = 32;
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) ctx.fillRect(x, y, 1, 1);
      }

      // edges
      ctx.lineWidth = 1;
      ctx.strokeStyle = fg;
      for (const n of nodes) {
        if (n.parent < 0) continue;
        const p = nodes[n.parent]!;
        ctx.globalAlpha = 0.1 + near(n) * 0.35;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      }

      // pulses
      for (const pulse of pulses) {
        const a = nodes[pulse.from]!;
        const b = nodes[pulse.to]!;
        const x = a.x + (b.x - a.x) * pulse.t;
        const y = a.y + (b.y - a.y) * pulse.t;
        ctx.globalAlpha = 1;
        ctx.fillStyle = pulse.back ? fg : accent;
        ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
      }

      // nodes
      ctx.font = mono;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]!;
        const hover = near(n);
        if (n.kind === "lead") {
          ctx.globalAlpha = 1;
          ctx.fillStyle = accent;
          ctx.fillRect(n.x - 7, n.y - 7, 14, 14);
          ctx.globalAlpha = 0.75;
          ctx.fillStyle = fg;
          ctx.fillText("lead", n.x + 14, n.y + 4);
        } else if (n.kind === "agent") {
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = "#0e0f0c";
          ctx.fillRect(n.x - 5, n.y - 5, 10, 10);
          ctx.strokeStyle = n.flash > 0 ? accent : fg;
          ctx.globalAlpha = 0.6 + hover * 0.4;
          ctx.strokeRect(n.x - 5, n.y - 5, 10, 10);
          ctx.globalAlpha = 0.35 + hover * 0.5;
          ctx.fillStyle = fg;
          ctx.fillText(n.label ?? "", n.x + 10, n.y - 8);
        } else {
          const flash = n.flash;
          ctx.globalAlpha = 0.35 + hover * 0.5 + flash * 0.6;
          ctx.fillStyle = flash > 0.05 ? accent : fg;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2.2 + flash * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    let spawnTimer = 0;
    const step = (time: number) => {
      const dt = Math.min(48, time - (last || time));
      last = time;
      rotation += dt * 0.00004;
      layout(time);

      spawnTimer -= dt;
      if (spawnTimer <= 0 && pulses.length < 10) {
        spawn();
        spawnTimer = 380 + Math.random() * 520;
      }

      const next: Pulse[] = [];
      for (const pulse of pulses) {
        pulse.t += pulse.speed * dt;
        if (pulse.t < 1) {
          next.push(pulse);
          continue;
        }
        const target = nodes[pulse.to]!;
        target.flash = 1;
        if (pulse.back) {
          // review returned to an agent: send it home to the lead
          if (target.kind === "agent") {
            next.push({ from: pulse.to, to: 0, t: 0, speed: pulse.speed, back: true });
          }
          continue;
        }
        if (target.kind === "agent") {
          const tasks = nodes.map((n, i) => (n.parent === pulse.to ? i : -1)).filter((i) => i > 0);
          const task = tasks[Math.floor(Math.random() * tasks.length)]!;
          next.push({ from: pulse.to, to: task, t: 0, speed: pulse.speed, back: false });
        } else if (target.kind === "task") {
          next.push({
            from: pulse.to,
            to: target.parent,
            t: 0,
            speed: pulse.speed * 0.8,
            back: true,
          });
        }
      }
      pulses = next;
      for (const n of nodes) n.flash = Math.max(0, n.flash - dt * 0.0012);

      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (reduced || raf) return;
      last = 0;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => {
      if (visible && active) start();
      else stop();
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onVisibility = () => {
      active = document.visibilityState === "visible";
      sync();
    };

    build();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        sync();
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    sync();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}

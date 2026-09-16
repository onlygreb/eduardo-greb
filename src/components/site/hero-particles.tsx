import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  layer: number; // 0 = far, 2 = near
  accent: boolean;
};

/**
 * Lightweight canvas particle field for the hero only.
 * - single canvas, no React nodes per particle
 * - pauses when tab hidden or hero scrolled out of view
 * - fully static under prefers-reduced-motion
 */
export function HeroParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles: P[] = [];
    let raf = 0;
    let visible = true;
    let active = true;

    const pointer = { x: -9999, y: -9999, on: false };

    const readColor = (name: string) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || "#ffffff";
    };
    const neutral = readColor("--foreground");
    const accent = readColor("--primary");

    const count = () => {
      const area = w * h;
      if (w < 640) return 18;
      const n = Math.round(area / 26000);
      return Math.max(30, Math.min(58, n));
    };

    const build = () => {
      const n = count();
      particles = Array.from({ length: n }, () => {
        const layer = Math.floor(Math.random() * 3);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * (0.045 + layer * 0.02),
          vy: (Math.random() - 0.5) * (0.045 + layer * 0.02),
          r: 0.6 + layer * 0.35 + Math.random() * 0.4,
          a: 0.17 + layer * 0.07 + Math.random() * 0.12,
          layer,
          accent: Math.random() < 0.12,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduced) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // sparse connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]!;
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 118 * 118) continue;
          const alpha = (1 - Math.sqrt(d2) / 118) * 0.085;
          ctx.strokeStyle = neutral;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        // fade out towards the bottom of the hero
        const fade = 1 - Math.min(1, Math.max(0, (p.y - h * 0.6) / (h * 0.4)));
        ctx.globalAlpha = p.a * fade;
        ctx.fillStyle = p.accent ? accent : neutral;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (pointer.on) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          const R = 130;
          if (d2 < R * R && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const push = ((R - d) / R) * (0.06 + p.layer * 0.05);
            p.x += (dx / d) * push;
            p.y += (dy / d) * push;
          }
        }

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (reduced || raf) return;
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
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
    };
    const onVisibility = () => {
      active = document.visibilityState === "visible";
      sync();
    };

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
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    sync();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}

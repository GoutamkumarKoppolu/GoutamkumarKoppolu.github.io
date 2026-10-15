import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks/useScrollEffect";

type Dot = { x: number; y: number; i: number; inCol: boolean };
type Pulse = { horiz: boolean; line: number; p: number; dir: 1 | -1 };

const G = 24; // grid spacing in px
const COLORS = {
  dark: { dot: "148,163,184", dotA: 0.35, acc: "34,197,94" },
  light: { dot: "71,85,105", dotA: 0.45, acc: "21,128,61" },
};
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

// Dot grid: faint dots in the side margins (10% each, none on phones) and right of the hero text; green pulses run along
// a row or column and light the dots they pass. In-column dots fade out after the hero; margin dots dim to half.
export function DotGridBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const hero = document.getElementById("about");
    const reduce = prefersReducedMotion();
    let W = 0, H = 0, cols = 0, rows = 0, dots: Dot[] = [], dotCols: number[] = [], glow = new Float32Array(0);
    let pulses: Pulse[] = [], next = 0, raf = 0, last = performance.now();

    function init() {
      const r = window.devicePixelRatio || 1;
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * r; cv.height = H * r;
      ctx.setTransform(r, 0, 0, r, 0, 0);
      const col = W > 700 ? W * 0.8 : W, edge = (W - col) / 2, gutter = edge > 60;
      cols = Math.floor(W / G); rows = Math.floor(H / G);
      glow = new Float32Array((cols + 1) * (rows + 1));
      dots = [];
      for (let ri = 0; ri <= rows; ri++) for (let ci = 0; ci <= cols; ci++) {
        const x = ci * G + G / 2, y = ri * G + G / 2;
        const inGutter = gutter && (x < edge - 10 || x > W - edge + 10);
        if (inGutter || (y > 80 && x > edge + col * (gutter ? 0.64 : 0.55))) dots.push({ x, y, i: ri * (cols + 1) + ci, inCol: !inGutter });
      }
      dotCols = [...new Set(dots.map((d) => Math.round((d.x - G / 2) / G)))];
      pulses = []; next = 0;
    }
    const spawn = () => {
      if (!dotCols.length) return;
      const dir = Math.random() < 0.5 ? 1 : -1;
      // Columns are picked from ones that have dots, so vertical pulses are always visible
      if (Math.random() < 0.6) pulses.push({ horiz: false, line: dotCols[Math.floor(rnd(0, dotCols.length))], p: dir > 0 ? 0 : H, dir });
      else pulses.push({ horiz: true, line: Math.floor(rnd(1, rows)), p: dir > 0 ? 0 : W, dir });
    };

    function draw(dt: number) {
      ctx.clearRect(0, 0, W, H);
      const c = document.documentElement.dataset.theme === "light" ? COLORS.light : COLORS.dark;
      const s = Math.min(1, window.scrollY / Math.max(1, hero?.offsetHeight ?? 1));
      next -= dt;
      if (next <= 0) { spawn(); next = rnd(500, 1100); }
      for (let k = 0; k < glow.length; k++) glow[k] = Math.max(0, glow[k] - dt / 900);
      pulses = pulses.filter((pl) => {
        pl.p += pl.dir * dt * 0.12;
        const along = Math.round((pl.p - G / 2) / G);
        const ci = pl.horiz ? along : pl.line, ri = pl.horiz ? pl.line : along;
        if (ci >= 0 && ci <= cols && ri >= 0 && ri <= rows) glow[ri * (cols + 1) + ci] = 1;
        return pl.p >= -G && pl.p <= (pl.horiz ? W : H) + G;
      });
      for (const d of dots) {
        const v = d.inCol ? 1 - s : 1 - s * 0.5;
        if (v < 0.02) continue;
        const g = glow[d.i], lit = g > 0.03, sz = lit ? 2 + g * 1.6 : 1.6;
        ctx.fillStyle = lit ? `rgba(${c.acc},${(0.3 + g * 0.7) * v})` : `rgba(${c.dot},${c.dotA * v})`;
        ctx.fillRect(d.x - sz / 2, d.y - sz / 2, sz, sz);
      }
    }
    // Reduced motion: one still frame with a few lit trails, redrawn on scroll and theme change only
    function still() {
      for (let k = 0; k < 6; k++) { spawn(); const pl = pulses[pulses.length - 1]; if (pl) pl.p = rnd(0.2, 0.8) * (pl.horiz ? W : H); }
      for (let k = 0; k < 12; k++) draw(40);
      next = 1e9;
    }
    const loop = (now: number) => {
      if (!document.hidden) draw(Math.min(now - last, 50));
      last = now;
      raf = requestAnimationFrame(loop);
    };

    let width = window.innerWidth;
    const onResize = () => { if (window.innerWidth === width) return; width = window.innerWidth; init(); if (reduce) still(); };
    const onScroll = () => draw(0);
    const themeWatch = new MutationObserver(() => { if (reduce) draw(0); });

    init();
    window.addEventListener("resize", onResize);
    if (reduce) {
      still();
      window.addEventListener("scroll", onScroll, { passive: true });
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    } else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      themeWatch.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas id="bg" ref={ref} aria-hidden="true" />;
}

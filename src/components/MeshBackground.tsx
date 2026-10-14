import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks/useScrollEffect";

type Node = { x: number; y: number; f: number; adj: number[]; inCol: boolean };
type Packet = { a: number; b: number; p: number; len: number };

const COLUMN = 880; // content column width; nodes stay in the side margins and right of the hero text
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

// Service mesh: fixed nodes, green packets hop along links. In-column nodes fade out after the hero; margin nodes dim to half.
export function MeshBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const hero = document.getElementById("about");
    const reduce = prefersReducedMotion();
    let W = 0, H = 0, nodes: Node[] = [], edges: [number, number][] = [], packets: Packet[] = [], next = 0, raf = 0, last = performance.now();
    let mouse: { x: number; y: number } | null = null;

    function init() {
      const r = window.devicePixelRatio || 1;
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * r; cv.height = H * r;
      ctx.setTransform(r, 0, 0, r, 0, 0);
      const col = Math.min(COLUMN, W), edge = (W - col) / 2, gutter = edge > 60;
      const ok = (x: number, y: number) => (gutter && (x < edge - 10 || x > W - edge + 10)) || (y > 80 && x > edge + col * (gutter ? 0.64 : 0.55));
      const N = Math.max(7, Math.min(22, Math.round((W * H) / 34000)));
      nodes = [];
      for (let k = 0; nodes.length < N && k < 1000; k++) {
        const x = rnd(16, W - 16), y = rnd(80, H - 20);
        if (ok(x, y) && nodes.every((q) => Math.hypot(x - q.x, y - q.y) > 90)) nodes.push({ x, y, f: 0, adj: [], inCol: !(gutter && (x < edge || x > W - edge)) });
      }
      edges = [];
      nodes.forEach((a, i) =>
        nodes
          .map((b, j) => [j, Math.hypot(a.x - b.x, a.y - b.y)] as const)
          .filter(([j]) => j !== i)
          .sort((p, q) => p[1] - q[1])
          .slice(0, 2)
          .forEach(([j]) => {
            if (!a.adj.includes(j)) { a.adj.push(j); nodes[j].adj.push(i); edges.push([i, j]); }
          }),
      );
      packets = []; next = 0;
    }
    const send = (a: number, b: number, p = 0) => packets.push({ a, b, p, len: Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y) || 1 });
    const spawn = () => {
      if (!edges.length) return;
      const [i, j] = edges[Math.floor(rnd(0, edges.length))];
      if (Math.random() < 0.5) send(i, j); else send(j, i);
    };

    function draw(dt: number) {
      ctx.clearRect(0, 0, W, H);
      const s = Math.min(1, window.scrollY / Math.max(1, hero?.offsetHeight ?? 1));
      const vis = (n: Node) => (n.inCol ? 1 - s : 1 - s * 0.5);
      const hov = mouse ? nodes.findIndex((n) => Math.hypot(n.x - mouse!.x, n.y - mouse!.y) < 36 && vis(n) > 0.2) : -1;
      for (const [i, j] of edges) {
        const v = Math.min(vis(nodes[i]), vis(nodes[j]));
        if (v < 0.02) continue;
        ctx.strokeStyle = hov === i || hov === j ? `rgba(34,197,94,${0.45 * v})` : `rgba(148,163,184,${0.13 * v})`;
        ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
      }
      next -= dt;
      if (next <= 0) { spawn(); next = rnd(350, 800); }
      for (let k = packets.length - 1; k >= 0; k--) {
        const pk = packets[k];
        pk.p += (dt * 0.09) / pk.len;
        if (pk.p >= 1) {
          packets.splice(k, 1);
          const b = nodes[pk.b];
          b.f = 1;
          if (Math.random() < 0.55) {
            const o = b.adj.filter((j) => j !== pk.a);
            if (o.length) send(pk.b, o[Math.floor(rnd(0, o.length))]);
          }
          continue;
        }
        const A = nodes[pk.a], B = nodes[pk.b], v = Math.min(vis(A), vis(B));
        if (v < 0.02) continue;
        ctx.fillStyle = `rgba(34,197,94,${0.85 * v})`;
        ctx.beginPath(); ctx.arc(A.x + (B.x - A.x) * pk.p, A.y + (B.y - A.y) * pk.p, 2, 0, 7); ctx.fill();
      }
      nodes.forEach((n, i) => {
        n.f = Math.max(0, n.f - dt / 700);
        const v = vis(n);
        if (v < 0.02) return;
        const sz = i === hov ? 7 : 5;
        ctx.fillStyle = n.f > 0.05 || i === hov ? `rgba(34,197,94,${(0.35 + n.f * 0.6) * v})` : `rgba(148,163,184,${0.4 * v})`;
        ctx.fillRect(n.x - sz / 2, n.y - sz / 2, sz, sz);
      });
    }
    // Reduced motion: one still frame with packets mid-flight, redrawn on scroll/hover only
    function still() {
      for (let k = 0; k < 8; k++) { spawn(); if (packets.length) packets[packets.length - 1].p = rnd(0.2, 0.8); }
      next = 1e9;
      draw(0);
    }
    const loop = (now: number) => {
      if (!document.hidden) draw(Math.min(now - last, 50));
      last = now;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => { mouse = e.pointerType === "mouse" ? { x: e.clientX, y: e.clientY } : null; if (reduce) draw(0); };
    const onLeave = () => { mouse = null; };
    let width = window.innerWidth;
    const onResize = () => { if (window.innerWidth === width) return; width = window.innerWidth; init(); if (reduce) still(); };
    const onScroll = () => draw(0);

    init();
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    if (reduce) { still(); window.addEventListener("scroll", onScroll, { passive: true }); }
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas id="mesh" ref={ref} aria-hidden="true" />;
}

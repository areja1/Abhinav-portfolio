import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useInView from "../../hooks/useInView.js";

// A stylized Phoenix style street grid with traffic count points. Animates the
// real selection rule: busiest point first, skip anything within the overlap
// radius of a chosen point, stop at the sign count. Illustrative data.

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function buildWorld() {
  const rnd = seeded(7);
  const cols = 9;
  const rows = 6;
  const points = [];
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      const major = i % 3 === 0 || j % 3 === 0;
      const both = i % 3 === 0 && j % 3 === 0;
      const base = both ? 38000 : major ? 18000 : 4000;
      const aadt = Math.round(base * (0.6 + rnd() * 0.9));
      points.push({ gx: i, gy: j, aadt, freeway: j === 3 && i >= 2 && i <= 7 });
    }
  }
  // Greedy fill, exactly like the engine: rank by traffic, keep if >= 3000
  // and not a freeway and farther than the overlap radius from any pick.
  const ranked = [...points].filter((p) => !p.freeway && p.aadt >= 3000).sort((a, b) => b.aadt - a.aadt);
  const picks = [];
  const R = 1.6; // grid units, the "200 m" of the illustration
  for (const p of ranked) {
    if (picks.length >= 12) break;
    const clash = picks.some((q) => Math.hypot(q.gx - p.gx, q.gy - p.gy) < R);
    if (!clash) picks.push(p);
  }
  return { cols, rows, points, picks, R };
}

const WORLD = buildWorld();

export default function SignMap({ accent }) {
  const canvasRef = useRef(null);
  const [inViewRef, inView] = useInView(0.3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return undefined;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let t0 = performance.now();
    const STEP = 520; // ms per pick
    const REST = 2400;
    const total = WORLD.picks.length * STEP + REST;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now) => {
      const { width: W, height: H } = canvas.getBoundingClientRect();
      const pad = 26;
      const cw = (W - pad * 2) / WORLD.cols;
      const ch = (H - pad * 2) / WORLD.rows;
      const X = (gx) => pad + gx * cw;
      const Y = (gy) => pad + gy * ch;
      const elapsed = reduce ? total - REST : (now - t0) % total;
      const shown = Math.min(WORLD.picks.length, Math.floor(elapsed / STEP) + 1);

      ctx.clearRect(0, 0, W, H);

      // streets
      for (let i = 0; i <= WORLD.cols; i++) {
        const major = i % 3 === 0;
        ctx.strokeStyle = major ? "#2d3440" : "#1b2029";
        ctx.lineWidth = major ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(X(i), pad);
        ctx.lineTo(X(i), H - pad);
        ctx.stroke();
      }
      for (let j = 0; j <= WORLD.rows; j++) {
        const major = j % 3 === 0;
        ctx.strokeStyle = major ? "#2d3440" : "#1b2029";
        ctx.lineWidth = major ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(pad, Y(j));
        ctx.lineTo(W - pad, Y(j));
        ctx.stroke();
      }
      // freeway
      ctx.strokeStyle = "#3a3f4a";
      ctx.lineWidth = 6;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(X(2), Y(3));
      ctx.lineTo(X(7), Y(3));
      ctx.stroke();
      ctx.fillStyle = "#5a6170";
      ctx.font = "10px ui-monospace, Menlo, monospace";
      ctx.fillText("US-60  excluded", X(2) + 4, Y(3) - 7);

      // points
      const picked = new Set(WORLD.picks.slice(0, shown));
      for (const p of WORLD.points) {
        const r = 1.5 + Math.sqrt(p.aadt) / 38;
        ctx.beginPath();
        ctx.arc(X(p.gx), Y(p.gy), r, 0, Math.PI * 2);
        if (picked.has(p)) {
          ctx.fillStyle = accent;
        } else if (p.freeway) {
          ctx.fillStyle = "#3a3f4a";
        } else {
          ctx.fillStyle = "#5a6170";
        }
        ctx.fill();
      }
      // overlap radius rings for picks
      for (const p of WORLD.picks.slice(0, shown)) {
        ctx.beginPath();
        ctx.arc(X(p.gx), Y(p.gy), WORLD.R * Math.min(cw, ch) * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = accent + "55";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      // current pick pulse
      const cur = WORLD.picks[shown - 1];
      if (cur && !reduce) {
        const phase = ((now - t0) % STEP) / STEP;
        ctx.beginPath();
        ctx.arc(X(cur.gx), Y(cur.gy), 8 + phase * 14, 0, Math.PI * 2);
        ctx.strokeStyle = accent + Math.round((1 - phase) * 150).toString(16).padStart(2, "0");
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      // legend
      ctx.fillStyle = "#b4bcc9";
      ctx.font = "11px ui-monospace, Menlo, monospace";
      const top = WORLD.picks[shown - 1];
      ctx.fillText(`sign ${shown}/${WORLD.picks.length}`, pad, 14);
      if (top) ctx.fillText(`${top.aadt.toLocaleString()} cars/day`, pad + 84, 14);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [inView, accent]);

  return (
    <div ref={inViewRef} style={{ position: "absolute", inset: 0 }}>
      <canvas ref={canvasRef} className="demo-canvas" />
      <span className="demo-note">illustrative grid · real engine runs on ADOT data in PostGIS</span>
    </div>
  );
}

SignMap.propTypes = { accent: PropTypes.string.isRequired };

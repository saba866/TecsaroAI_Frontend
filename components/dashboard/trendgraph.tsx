"use client";

const DATA_POINTS = [22, 26, 24, 29, 31, 28, 33, 31, 35, 34, 38, 38];
const LABELS = ["Jan 18","Jan 20","Jan 22","Jan 24","Jan 26","Jan 28","Jan 30","Feb 1","Feb 5","Feb 10","Feb 15","Today"];

function buildPath(points: number[], w: number, h: number, pad = 16): string {
  const min = Math.min(...points) - 5;
  const max = Math.max(...points) + 5;
  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (w - pad * 2));
  const ys = points.map((v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2));
  return xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
}

function buildArea(points: number[], w: number, h: number, pad = 16): string {
  const path = buildPath(points, w, h, pad);
  const lastX = (pad + (1) * (w - pad * 2)).toFixed(1);
  const firstX = pad.toFixed(1);
  return `${path} L${lastX},${h} L${firstX},${h} Z`;
}

export default function TrendGraph() {
  const W = 480;
  const H = 160;

  return (
    <div className="rounded-2xl bg-card border border-border p-6 h-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground mb-1">Visibility Trend</h3>
          <p className="text-xs text-muted-foreground">AEO score over the last 30 days</p>
        </div>
        <div className="flex items-center gap-1">
          {["7d","30d","90d"].map((p, i) => (
            <button key={p}
              className={`px-2.5 py-1 rounded-md text-xs transition-all duration-150
                ${i === 1 ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative overflow-hidden rounded-xl bg-muted/20">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 160 }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0FBF9A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0FBF9A" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[25, 50, 75].map((pct) => {
            const y = 16 + (1 - pct / 100) * (H - 32);
            return (
              <line key={pct} x1="16" y1={y} x2={W - 16} y2={y}
                stroke="#2A3038" strokeWidth="1" strokeDasharray="4 4" />
            );
          })}

          {/* Area fill */}
          <path d={buildArea(DATA_POINTS, W, H)} fill="url(#areaGrad)" />

          {/* Line */}
          <path d={buildPath(DATA_POINTS, W, H)}
            fill="none" stroke="#0FBF9A" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />

          {/* Last point dot */}
          {(() => {
            const pad = 16;
            const min = Math.min(...DATA_POINTS) - 5;
            const max = Math.max(...DATA_POINTS) + 5;
            const x = pad + W - pad * 2;
            const last = DATA_POINTS[DATA_POINTS.length - 1];
            const y = H - pad - ((last - min) / (max - min)) * (H - pad * 2);
            return (
              <g>
                <circle cx={x} cy={y} r="6" fill="#0FBF9A" opacity="0.3" />
                <circle cx={x} cy={y} r="3" fill="#0FBF9A" />
              </g>
            );
          })()}
        </svg>
      </div>

      {/* X Labels */}
      <div className="flex justify-between mt-2 px-1">
        {[LABELS[0], LABELS[3], LABELS[6], LABELS[9], LABELS[11]].map((l) => (
          <span key={l} className="text-[10px] text-muted-foreground">{l}</span>
        ))}
      </div>
    </div>
  );
}
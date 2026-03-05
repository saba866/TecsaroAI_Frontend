"use client";

const ENGINES = [
  { name: "ChatGPT",    score: 48, color: "#0FBF9A" },
  { name: "Gemini",     score: 31, color: "#6C63FF" },
  { name: "Perplexity", score: 22, color: "#F4B740" },
];

export default function VisibilityScoreCard() {
  const overallScore = 38;
  const change = +6;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="rounded-2xl bg-card border border-border p-6 h-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground mb-1">AEO Visibility Score</h3>
          <p className="text-xs text-muted-foreground">Across all tracked AI engines · last 7 days</p>
        </div>
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
          ${change >= 0 ? "bg-emerald/10 text-emerald" : "bg-destructive/10 text-destructive"}`}>
          {change >= 0 ? "↑" : "↓"} {Math.abs(change)} pts
        </span>
      </div>

      <div className="flex items-center gap-8">
        {/* Circular progress */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" stroke="#1A1F26" strokeWidth="10" fill="none" />
            <circle cx="60" cy="60" r="52"
              stroke="#0FBF9A" strokeWidth="10" fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-3xl font-bold text-foreground leading-none">{overallScore}</span>
            <span className="text-xs text-muted-foreground mt-0.5">/ 100</span>
          </div>
        </div>

        {/* Per-engine breakdown */}
        <div className="flex-1 space-y-3.5">
          {ENGINES.map((eng) => (
            <div key={eng.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">{eng.name}</span>
                <span className="text-xs font-mono text-muted-foreground">{eng.score}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${eng.score}%`, backgroundColor: eng.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer stat row */}
      <div className="mt-6 pt-5 border-t border-border grid grid-cols-3 gap-4">
        {[
          { label: "Prompts tracked", value: "14" },
          { label: "Mentioned in",    value: "6/14" },
          { label: "Competitor avg",  value: "54" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-heading text-lg font-semibold text-foreground">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
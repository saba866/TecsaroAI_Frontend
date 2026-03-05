"use client";

const ENGINES = [
  { name: "ChatGPT",    score: 48, mentions: 8,  total: 14, color: "#0FBF9A", change: +4 },
  { name: "Gemini",     score: 31, mentions: 5,  total: 14, color: "#6C63FF", change: +8 },
  { name: "Perplexity", score: 22, mentions: 3,  total: 14, color: "#F4B740", change: -2 },
];

export default function AIEngineBreakdown() {
  return (
    <div className="rounded-2xl bg-card border border-border p-6 h-full">
      <div className="mb-5">
        <h3 className="font-heading text-sm font-semibold text-foreground mb-1">AI Engine Breakdown</h3>
        <p className="text-xs text-muted-foreground">Visibility per engine this week</p>
      </div>

      <div className="space-y-4">
        {ENGINES.map((eng) => {
          const pct = (eng.mentions / eng.total) * 100;
          return (
            <div key={eng.name} className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-border transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${eng.color}20` }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: eng.color }} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{eng.name}</span>
                </div>
                <span className={`text-xs font-mono ${eng.change >= 0 ? "text-emerald" : "text-destructive"}`}>
                  {eng.change >= 0 ? "+" : ""}{eng.change}%
                </span>
              </div>

              {/* Score ring small */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-heading text-2xl font-bold text-foreground leading-none">{eng.score}%</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    mentioned in {eng.mentions}/{eng.total} prompts
                  </div>
                </div>
                <div className="w-10 h-10 relative">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="16" stroke="#1A1F26" strokeWidth="5" fill="none"/>
                    <circle cx="20" cy="20" r="16"
                      stroke={eng.color} strokeWidth="5" fill="none"
                      strokeDasharray={2 * Math.PI * 16}
                      strokeDashoffset={2 * Math.PI * 16 * (1 - pct / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
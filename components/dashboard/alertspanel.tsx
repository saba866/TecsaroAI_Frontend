"use client";

type Alert = { id: string; type: "gap" | "win" | "schema" | "suggest"; title: string; body: string; action?: string; time: string };

const ALERTS: Alert[] = [
  {
    id: "1", type: "gap",
    title: "Visibility gap detected",
    body: "You're not appearing in 3 high-intent prompts where Notion ranks #1.",
    action: "View gaps",
    time: "2h ago",
  },
  {
    id: "2", type: "win",
    title: "New mention on ChatGPT",
    body: "You appeared in 2 new prompts this week. Score up +6 pts.",
    time: "1d ago",
  },
  {
    id: "3", type: "schema",
    title: "Schema issues found",
    body: "4 pages are missing FAQPage schema. Fix these to boost AI citation likelihood.",
    action: "View schema",
    time: "2d ago",
  },
  {
    id: "4", type: "suggest",
    title: "2 new prompt suggestions",
    body: "Based on competitor analysis, we found 2 new high-value queries to track.",
    action: "Review",
    time: "3d ago",
  },
];

const TYPE_STYLES: Record<Alert["type"], { dot: string; border: string; bg: string }> = {
  gap:     { dot: "bg-destructive",  border: "border-destructive/20",  bg: "bg-destructive/5"  },
  win:     { dot: "bg-emerald",      border: "border-emerald/20",      bg: "bg-emerald/5"      },
  schema:  { dot: "bg-amber",        border: "border-amber/20",        bg: "bg-amber/5"        },
  suggest: { dot: "bg-violet-light", border: "border-violet/20",       bg: "bg-violet/5"       },
};

export default function AlertsPanel() {
  return (
    <div className="rounded-2xl bg-card border border-border flex flex-col h-full">
      <div className="px-5 py-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground mb-1">Alerts</h3>
          <p className="text-xs text-muted-foreground">Insights that need attention</p>
        </div>
        <span className="w-5 h-5 rounded-full bg-destructive/20 text-destructive text-[10px] font-semibold flex items-center justify-center">
          {ALERTS.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {ALERTS.map((alert) => {
          const s = TYPE_STYLES[alert.type];
          return (
            <div key={alert.id}
              className={`p-4 ${s.bg} border-l-2 ${s.border} hover:bg-muted/10 transition-colors duration-100 cursor-pointer`}>
              <div className="flex items-start gap-2.5">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${s.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground mb-0.5">{alert.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{alert.body}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground/60">{alert.time}</span>
                    {alert.action && (
                      <button className="text-[11px] text-emerald hover:text-emerald-light transition-colors font-medium">
                        {alert.action} →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <button className="w-full text-xs text-center text-muted-foreground hover:text-foreground transition-colors">
          View all activity →
        </button>
      </div>
    </div>
  );
}
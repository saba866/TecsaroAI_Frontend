
import { cn } from "@/lib/utils"
export function RateBadge({ score }: { score: number }) {
  const pct      = Math.round(score * 100)
  const color    = pct >= 80 ? "text-destructive" : pct >= 50 ? "text-amber" : "text-muted-foreground"
  const barColor = pct >= 80 ? "bg-destructive"   : pct >= 50 ? "bg-amber"   : "bg-muted-foreground"
  return (
    <div>
      <p className={cn("text-sm font-bold font-mono", color)}>{pct}%</p>
      <div className="mt-1 h-1.5 w-20 bg-muted rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full", barColor)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

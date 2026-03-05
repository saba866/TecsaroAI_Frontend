import { Brain, Search, BarChart3, Zap } from "lucide-react"

const engines = [
  { name: "ChatGPT",    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { name: "Gemini",     color: "bg-blue-500/10 text-blue-400 border-blue-500/20"         },
  { name: "Perplexity", color: "bg-violet-500/10 text-violet-400 border-violet-500/20"   },
]

const pillars = [
  {
    icon: Search,
    title: "Track AI Visibility",
    description:
      "Monitor whether your brand, products, and content appear in AI-generated answers across ChatGPT, Gemini, and Perplexity.",
  },
  {
    icon: BarChart3,
    title: "Analyse Competitor Presence",
    description:
      "See exactly which competitors are being recommended by AI engines instead of you — and on which prompts.",
  },
  {
    icon: Brain,
    title: "Optimise for AI Search",
    description:
      "Get actionable recommendations to improve your content so AI engines cite and recommend your brand more often.",
  },
  {
    icon: Zap,
    title: "Automate Daily Monitoring",
    description:
      "Automated daily scans keep your visibility data fresh without any manual work, with alerts when rankings change.",
  },
]

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-24 px-6 bg-background border-t border-border/50"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(15,191,154,0.04),transparent)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">

        {/* ── Primary explanation — visible text Google reads first ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-emerald-500 mb-4">
            What is Tecsaro AI
          </p>

          {/* This <h2> + <p> is the primary visible signal Google verifies */}
          <h2
            id="about-heading"
            className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight"
          >
            An Answer Engine Optimization platform
            <br className="hidden sm:block" />
            <span className="text-emerald-500"> built for AI search</span>
          </h2>

          {/* Clear, crawlable description — no marketing fluff */}
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Tecsaro AI is an <strong className="text-foreground">Answer Engine Optimization (AEO) platform</strong> that
            helps businesses track, analyse, and improve their visibility across AI search engines.
            When users ask ChatGPT, Gemini, or Perplexity a question in your industry, Tecsaro AI
            tells you whether your brand appears in the answer — and what to do if it doesn't.
          </p>

          {/* Engine chips — machine-readable and human-readable */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-mono mr-1">Tracks visibility on:</span>
            {engines.map(e => (
              <span
                key={e.name}
                className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold font-mono ${e.color}`}
              >
                {e.name}
              </span>
            ))}
          </div>
        </div>

        {/* ── Four pillars — further visible content ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map(p => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="flex gap-4 p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Plain-language summary — easiest for crawlers to parse ── */}
        <div className="mt-12 p-6 rounded-xl border border-border bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Tecsaro AI is used by marketing teams and SEO professionals to monitor brand mentions in
            AI-generated answers, identify gaps where competitors appear instead of them, and receive
            structured recommendations to improve AI search rankings. The platform supports ChatGPT
            (GPT-4o), Google Gemini, and Perplexity AI.
          </p>
        </div>

      </div>
    </section>
  )
}
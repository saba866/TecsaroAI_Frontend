"use client";

import { useState } from "react";

type PromptRow = {
  id: string;
  prompt: string;
  intent: string;
  chatgpt: boolean;
  gemini: boolean;
  perplexity: boolean;
  position: number | null;
  change: number;
};

const PROMPTS: PromptRow[] = [
  { id:"1", prompt:"What are the best all-in-one workspace tools for remote startup teams?", intent:"best-of",       chatgpt:true,  gemini:false, perplexity:true,  position:2, change:+1  },
  { id:"2", prompt:"What's the difference between Notion and Confluence for small teams?",  intent:"comparison",    chatgpt:true,  gemini:true,  perplexity:false, position:3, change:0   },
  { id:"3", prompt:"I'm looking for an alternative to Notion that has better database views",intent:"alternative",  chatgpt:false, gemini:false, perplexity:false, position:null, change:0 },
  { id:"4", prompt:"Can you recommend a project management platform for an engineering team?",intent:"recommendation",chatgpt:true, gemini:false, perplexity:true,  position:4, change:-1  },
  { id:"5", prompt:"My team struggles with keeping documentation up to date",               intent:"problem",       chatgpt:false, gemini:true,  perplexity:false, position:5, change:+2  },
  { id:"6", prompt:"What are the top knowledge management tools for SaaS companies?",       intent:"best-of",       chatgpt:true,  gemini:true,  perplexity:true,  position:1, change:+3  },
  { id:"7", prompt:"We're switching from Confluence — what do startups use for wikis?",     intent:"switching",     chatgpt:false, gemini:false, perplexity:false, position:null, change:0 },
];

const INTENT_COLORS: Record<string, string> = {
  "best-of":       "text-emerald bg-emerald/10 border-emerald/20",
  "comparison":    "text-violet-light bg-violet/10 border-violet/20",
  "alternative":   "text-amber bg-amber/10 border-amber/20",
  "recommendation":"text-blue-400 bg-blue-500/10 border-blue-500/20",
  "problem":       "text-rose-400 bg-rose-500/10 border-rose-500/20",
  "switching":     "text-orange-400 bg-orange-500/10 border-orange-500/20",
};

export default function PromptTable() {
  const [filter, setFilter] = useState<"all" | "visible" | "missing">("all");

  const filtered = PROMPTS.filter((p) => {
    const visible = p.chatgpt || p.gemini || p.perplexity;
    if (filter === "visible") return visible;
    if (filter === "missing") return !visible;
    return true;
  });

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground mb-1">Prompt Performance</h3>
          <p className="text-xs text-muted-foreground">Which queries mention your brand · latest run</p>
        </div>
        <div className="flex items-center gap-1">
          {(["all","visible","missing"] as const).map((f) => (
            <button key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 capitalize
                ${filter === f ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              {["Prompt", "Intent", "ChatGPT", "Gemini", "Perplexity", "Position", "Change"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((row) => {
              const visible = row.chatgpt || row.gemini || row.perplexity;
              return (
                <tr key={row.id} className="hover:bg-muted/20 transition-colors duration-100 group">
                  <td className="px-4 py-3.5 max-w-xs">
                    <p className="text-xs text-foreground leading-relaxed line-clamp-2">{row.prompt}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border whitespace-nowrap
                      ${INTENT_COLORS[row.intent] || "text-graphite bg-muted border-border"}`}>
                      {row.intent}
                    </span>
                  </td>
                  {[row.chatgpt, row.gemini, row.perplexity].map((mentioned, i) => (
                    <td key={i} className="px-4 py-3.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center
                        ${mentioned ? "bg-emerald/20" : "bg-muted"}`}>
                        {mentioned ? (
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#0FBF9A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                        )}
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-3.5">
                    {row.position ? (
                      <span className={`text-xs font-mono font-medium ${row.position <= 2 ? "text-emerald" : row.position <= 4 ? "text-amber" : "text-muted-foreground"}`}>
                        #{row.position}
                      </span>
                    ) : (
                      <span className="text-xs text-destructive/70">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    {row.change !== 0 ? (
                      <span className={`text-xs font-mono ${row.change > 0 ? "text-emerald" : "text-destructive"}`}>
                        {row.change > 0 ? `↑${row.change}` : `↓${Math.abs(row.change)}`}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Showing {filtered.length} of {PROMPTS.length} prompts
        </span>
        <button className="text-xs text-emerald hover:text-emerald-light transition-colors font-medium">
          Manage prompts →
        </button>
      </div>
    </div>
  );
}
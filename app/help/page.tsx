"use client";

import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { useState } from "react";

const STEPS = [
  {
    number: "01",
    title: "Login to Cloudflare",
    description: "Go to dash.cloudflare.com and sign in to your account.",
    code: null,
    tag: "ACCOUNT",
  },
  {
    number: "02",
    title: "Select your domain",
    description: "From the dashboard, click on the website domain you want to allow TecsaroBot to crawl.",
    code: null,
    tag: "DOMAIN",
  },
  {
    number: "03",
    title: "Open WAF Custom Rules",
    description: "Navigate to Security → WAF → Custom Rules in the left sidebar.",
    code: null,
    tag: "SECURITY",
  },
  {
    number: "04",
    title: "Create a new rule",
    description: 'Click "Create Rule" and set up the following configuration exactly as shown.',
    code: {
      field:    "User Agent",
      operator: "contains",
      value:    "TecsaroBot",
      action:   "Allow",
    },
    tag: "WAF RULE",
  },
  {
    number: "05",
    title: "Deploy the rule",
    description: 'Set the Action to "Allow", give it a name like "Allow TecsaroBot", then click Deploy.',
    code: null,
    tag: "DEPLOY",
  },
  {
    number: "06",
    title: "Update your robots.txt",
    description: "Also add TecsaroBot to your robots.txt file so it knows it's welcome.",
    code: "robots",
    tag: "ROBOTS.TXT",
  },
];

export default function CloudflareHelpPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B0F14",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        color: "#F7F9FC",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header is fixed/position:fixed so we need pt-16 to push content below it */}
      <Header />

      {/* ── Ambient background ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-20%", left: "-10%",
          width: "60vw", height: "60vw",
          background: "radial-gradient(circle, rgba(15,191,154,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", right: "-10%",
          width: "50vw", height: "50vw",
          background: "radial-gradient(circle, rgba(244,183,64,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(15,191,154,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,191,154,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* ── Main content — pt-16 offsets fixed header height ── */}
      <main style={{
        position: "relative", zIndex: 1,
        flex: 1,
        paddingTop: "64px", // matches Header h-16
      }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 24px 80px", width: "100%" }}>

          {/* ── Hero ── */}
          <div style={{ paddingTop: "64px", paddingBottom: "56px" }}>

            {/* Status badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(244,183,64,0.1)", border: "1px solid rgba(244,183,64,0.25)",
              borderRadius: "100px", padding: "6px 14px", marginBottom: "28px",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F4B740" }} />
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#F4B740", letterSpacing: "0.05em" }}>
                CLOUDFLARE CONFIGURATION
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: "700",
              lineHeight: "1.1",
              marginBottom: "20px",
              letterSpacing: "-0.03em",
            }}>
              Allow{" "}
              <span style={{
                background: "linear-gradient(135deg, #0FBF9A, #14D4AB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>TecsaroBot</span>
              <br />to crawl your site
            </h1>

            <p style={{ fontSize: "17px", color: "#8A93A6", lineHeight: "1.7", maxWidth: "560px", marginBottom: "36px" }}>
              Your website's Cloudflare protection is blocking TecsaroBot from reading your content.
              Follow these steps to whitelist it — takes less than 2 minutes.
            </p>

            {/* Bot identity card */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "16px",
              background: "rgba(15,191,154,0.06)", border: "1px solid rgba(15,191,154,0.15)",
              borderRadius: "14px", padding: "14px 20px", flexWrap: "wrap",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "rgba(15,191,154,0.15)", border: "1px solid rgba(15,191,154,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
              }}>🤖</div>
              <div>
                <p style={{ fontSize: "12px", color: "#8A93A6", marginBottom: "2px" }}>Bot User-Agent string</p>
                <code style={{ fontSize: "14px", color: "#0FBF9A", fontFamily: "monospace" }}>
                  TecsaroBot/1.0 (+https://ai.tecsaro.com/bot)
                </code>
              </div>
              <button
                onClick={() => copy("TecsaroBot/1.0 (+https://ai.tecsaro.com/bot)", "ua")}
                style={{
                  background: copied === "ua" ? "rgba(15,191,154,0.2)" : "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px", padding: "6px 12px",
                  color: copied === "ua" ? "#0FBF9A" : "#8A93A6",
                  fontSize: "12px", cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {copied === "ua" ? "Copied ✓" : "Copy"}
              </button>
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #2A3038, transparent)", marginBottom: "56px" }} />

          {/* ── Steps ── */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: "27px", top: "20px", bottom: "20px", width: "1px",
              background: "linear-gradient(180deg, rgba(15,191,154,0.4), rgba(15,191,154,0.1), transparent)",
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {STEPS.map((step, i) => (
                <StepCard key={i} step={step} index={i} copy={copy} copied={copied} />
              ))}
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #2A3038, transparent)", margin: "56px 0" }} />

          {/* ── FAQ ── */}
          <div style={{ marginBottom: "56px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "24px", letterSpacing: "-0.02em" }}>
              Common questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                {
                  q: "Is it safe to allow TecsaroBot?",
                  a: "Yes. TecsaroBot is a read-only crawler owned by Tecsaro. It only reads publicly available pages and never submits forms, modifies content, or performs any write operations.",
                },
                {
                  q: "What if I want to block TecsaroBot later?",
                  a: "Simply go back to Cloudflare → Security → WAF → Custom Rules and delete or disable the rule you created. The bot will be blocked immediately.",
                },
                {
                  q: "Will this affect my other security rules?",
                  a: "No. This rule only applies to requests with 'TecsaroBot' in the User-Agent. All other traffic continues to be processed normally by your existing rules.",
                },
                {
                  q: "I don't use Cloudflare — do I need to do anything?",
                  a: "No action needed! If your site doesn't use Cloudflare, TecsaroBot can already crawl your website without any configuration.",
                },
              ].map((faq, i) => (
                <div key={i} style={{
                  background: "rgba(26,31,38,0.6)", border: "1px solid #2A3038",
                  borderRadius: "12px", padding: "20px 24px",
                }}>
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#F7F9FC", marginBottom: "8px" }}>{faq.q}</p>
                  <p style={{ fontSize: "14px", color: "#8A93A6", lineHeight: "1.7" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div style={{
            background: "linear-gradient(135deg, rgba(15,191,154,0.08), rgba(15,191,154,0.03))",
            border: "1px solid rgba(15,191,154,0.2)",
            borderRadius: "20px", padding: "40px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "24px", flexWrap: "wrap",
          }}>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                Done with the setup?
              </h3>
              <p style={{ fontSize: "14px", color: "#8A93A6" }}>
                Go back to ai.tecsaro.com and retry the scan — it should work now.
              </p>
            </div>
            <a href="https://ai.tecsaro.com" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#0FBF9A", color: "#0B0F14",
              fontWeight: "700", fontSize: "14px",
              padding: "14px 28px", borderRadius: "12px",
              textDecoration: "none", whiteSpace: "nowrap",
              boxShadow: "0 0 32px rgba(15,191,154,0.3)",
              transition: "all 0.2s",
            }}>
              Retry scan →
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

// ── Individual step card ──────────────────────────────────────────
function StepCard({
  step, index, copy, copied,
}: {
  step: typeof STEPS[0];
  index: number;
  copy: (text: string, key: string) => void;
  copied: string | null;
}) {
  const robotsTxt = `User-agent: TecsaroBot\nAllow: /`;

  return (
    <div style={{
      display: "flex", gap: "24px", alignItems: "flex-start",
      padding: "24px 0",
    }}>
      {/* Step number bubble */}
      <div style={{
        width: "56px", height: "56px", flexShrink: 0,
        borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(15,191,154,0.15), rgba(15,191,154,0.05))",
        border: "1px solid rgba(15,191,154,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "13px", fontWeight: "700", color: "#0FBF9A",
        fontFamily: "monospace", letterSpacing: "-0.02em",
        position: "relative", zIndex: 1,
      }}>
        {step.number}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingTop: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#F7F9FC", letterSpacing: "-0.01em" }}>
            {step.title}
          </h3>
          <span style={{
            fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em",
            color: "#8A93A6", background: "rgba(138,147,166,0.1)",
            border: "1px solid #2A3038", borderRadius: "4px",
            padding: "2px 8px",
          }}>
            {step.tag}
          </span>
        </div>

        <p style={{ fontSize: "14px", color: "#8A93A6", lineHeight: "1.7", marginBottom: step.code ? "16px" : "0" }}>
          {step.description}
        </p>

        {/* WAF rule card */}
        {step.code && typeof step.code === "object" && (
          <div style={{
            background: "#0B0F14", border: "1px solid #2A3038",
            borderRadius: "12px", overflow: "hidden",
          }}>
            <div style={{
              display: "flex", alignItems: "center",
              padding: "10px 16px", borderBottom: "1px solid #2A3038",
              background: "rgba(42,48,56,0.4)",
            }}>
              <span style={{ fontSize: "11px", color: "#8A93A6", fontWeight: "600", letterSpacing: "0.06em" }}>
                WAF RULE CONFIGURATION
              </span>
            </div>
            <div style={{ padding: "16px", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Field", "Operator", "Value", "Action"].map((h) => (
                      <th key={h} style={{
                        textAlign: "left", fontSize: "11px", fontWeight: "600",
                        color: "#8A93A6", letterSpacing: "0.06em",
                        padding: "0 12px 10px 0",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {[step.code.field, step.code.operator, step.code.value, step.code.action].map((val, ci) => (
                      <td key={ci} style={{ padding: "0 12px 0 0" }}>
                        <span style={{
                          display: "inline-block",
                          background: ci === 2
                            ? "rgba(15,191,154,0.1)"
                            : ci === 3
                            ? "rgba(15,191,154,0.15)"
                            : "rgba(42,48,56,0.6)",
                          border: `1px solid ${ci === 2 || ci === 3 ? "rgba(15,191,154,0.25)" : "#2A3038"}`,
                          borderRadius: "6px", padding: "5px 10px",
                          fontSize: "13px", fontFamily: "monospace",
                          color: ci === 2 || ci === 3 ? "#0FBF9A" : "#F7F9FC",
                          fontWeight: ci === 3 ? "700" : "400",
                          whiteSpace: "nowrap",
                        }}>
                          {val}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* robots.txt snippet */}
        {step.code === "robots" && (
          <div style={{
            background: "#0B0F14", border: "1px solid #2A3038",
            borderRadius: "12px", overflow: "hidden",
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 16px", borderBottom: "1px solid #2A3038",
              background: "rgba(42,48,56,0.4)",
            }}>
              <span style={{ fontSize: "11px", color: "#8A93A6", fontWeight: "600", letterSpacing: "0.06em" }}>
                /robots.txt
              </span>
              <button
                onClick={() => copy(robotsTxt, "robots")}
                style={{
                  background: copied === "robots" ? "rgba(15,191,154,0.2)" : "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px", padding: "4px 10px",
                  color: copied === "robots" ? "#0FBF9A" : "#8A93A6",
                  fontSize: "11px", cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {copied === "robots" ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <pre style={{ margin: 0, padding: "16px", fontSize: "13px", fontFamily: "monospace", color: "#0FBF9A", lineHeight: "1.8" }}>
{`User-agent: TecsaroBot
Allow: /`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
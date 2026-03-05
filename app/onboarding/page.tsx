



"use client";

import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-[#0a0d12] relative overflow-hidden">

      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="dark min-h-screen bg-[#0a0d12] relative overflow-hidden"></div>
        <div className="absolute -top-56 -left-32 w-[700px] h-[700px] rounded-full bg-emerald-500/5 blur-[160px]" />
        <div className="absolute -bottom-56 -right-32 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/3 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(52,211,153,0.35) 1px, transparent 1px)",
            backgroundSize:  "48px 48px",
          }}
        />
      </div>

      {/* ── Wizard ── */}
      <OnboardingWizard />

    </div>
  );
}
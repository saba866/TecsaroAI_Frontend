






// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import Step1ProjectSetup  from "../bar/Step1ProjectSetup";
// import Step2Competitors   from "../bar/Step2Competitors";
// import Step3Pipeline      from "../bar/Step3Pipeline";
// import Step4PromptSelection from "../bar/Step4PromptSelection";
// import Step5AICompetitors from "../bar/Step5AICompetitors";
// import Step6Success       from "../bar/Step6Success";

// export type ProjectData = {
//   planId?:         string;
//   brandName:       string;
//   websiteUrl:      string;
//   country:         string;
//   language:        string;
//   competitors:     string[];
//   selectedPrompts: string[];
//   aiCompetitors:   { name: string; domain: string; confidence: number; accepted: boolean }[];
// };

// const STEPS = ["Project Setup", "Competitors", "Analyzing", "Prompts", "AI Competitors", "Ready"];

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// export default function OnboardingWizard() {
//   const searchParams = useSearchParams();
//   const [step, setStep] = useState(1);
//   const [data, setData] = useState<ProjectData>({
//     brandName: "", websiteUrl: "", country: "US", language: "en",
//     competitors: [], selectedPrompts: [], aiCompetitors: [],
//   });

//   // ── Resume from URL params (set by auth/callback) ──────────
//   useEffect(() => {
//     const urlStep  = searchParams.get("step");
//     const urlPlanId = searchParams.get("planId");

//     if (urlPlanId) {
//       setData((d) => ({ ...d, planId: urlPlanId }));
//     }
//     if (urlStep) {
//       const parsed = parseInt(urlStep, 10);
//       if (parsed >= 1 && parsed <= 6) setStep(parsed);
//     }
//   }, []);

//   const next   = () => setStep((s) => Math.min(s + 1, 6));
//   const back   = () => setStep((s) => Math.max(s - 1, 1));
//   const update = (patch: Partial<ProjectData>) => setData((d) => ({ ...d, ...patch }));

//   // ── Save step to backend ─────────────────────────────────────
//   const saveStep = async (stepNum: number, planId?: string) => {
//     const id = planId ?? data.planId;
//     if (!id) return;
//     try {
//       const { supabaseBrowser } = await import("@/lib/supabaseClient");
//       const { data: s } = await supabaseBrowser.auth.getSession();
//       const token = s?.session?.access_token;
//       if (!token) return;

//       await fetch(`${BACKEND_URL}/aeo/onboarding-step`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ planId: id, step: stepNum }),
//       });
//     } catch (err) {
//       console.error("[Wizard] saveStep failed:", err);
//     }
//   };

//   return (
//     <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-12 px-4 pb-16">

//       {/* Logo */}
//       <div className="mb-10 flex items-center gap-2.5">
//         <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center">
//           <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//             <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" />
//           </svg>
//         </div>
//         <span className="font-heading font-semibold text-lg text-white">Tecsaro AI</span>
//       </div>

//       {/* Step indicator */}
//       {step < 6 && (
//         <div className="mb-8 flex items-center gap-2">
//           {STEPS.slice(0, 5).map((label, i) => {
//             const num    = i + 1;
//             const done   = step > num;
//             const active = step === num;
//             return (
//               <div key={num} className="flex items-center gap-2">
//                 <div className={`flex items-center gap-1.5 transition-all duration-300
//                   ${active ? "opacity-100" : done ? "opacity-60" : "opacity-30"}`}>
//                   <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold font-heading transition-all duration-300
//                     ${done
//                       ? "bg-emerald text-charcoal"
//                       : active
//                       ? "bg-emerald/20 border border-emerald text-emerald"
//                       : "bg-charcoal-light border border-border text-white/40"}`}>
//                     {done ? (
//                       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//                         <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                     ) : num}
//                   </div>
//                   <span className={`text-xs font-medium hidden sm:block ${active ? "text-white" : "text-white/40"}`}>
//                     {label}
//                   </span>
//                 </div>
//                 {i < 4 && (
//                   <div className={`w-6 h-px transition-all duration-500 ${done ? "bg-emerald" : "bg-white/10"}`} />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Step content */}
//       <div className="w-full max-w-xl">
//         {step === 1 && (
//           <Step1ProjectSetup
//             data={data}
//             onUpdate={update}
//             onNext={(planId) => {
//               setData((d) => ({ ...d, ...(planId ? { planId } : {}) }));
//               saveStep(1, planId);   // ← save step 1 complete
//               setStep(2);
//             }}
//           />
//         )}

//         {step === 2 && (
//           <Step2Competitors
//             data={data}
//             onUpdate={update}
//             onBack={back}
//             onNext={() => {
//               saveStep(2);           // ← save step 2 complete
//               next();
//             }}
//           />
//         )}

//         {step === 3 && (
//           <Step3Pipeline
//             data={data}
//             onNext={() => {
//               saveStep(3);           // ← save step 3 complete
//               next();
//             }}
//           />
//         )}

//         {step === 4 && (
//           <Step4PromptSelection
//             data={data}
//             onUpdate={update}
//             onNext={() => {
//               saveStep(4);           // ← save step 4 complete
//               next();
//             }}
//           />
//         )}

//         {step === 5 && (
//           <Step5AICompetitors
//             data={data}
//             onUpdate={update}
//             onNext={() => {
//               saveStep(5);           // ← save step 5 complete → Phase 3 runs server-side
//               next();
//             }}
//           />
//         )}

//         {step === 6 && <Step6Success data={data} />}
//       </div>

//     </div>
//   );
// }




"use client";
import Image from "next/image"
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Step1ProjectSetup    from "../bar/Step1ProjectSetup";
import Step2Competitors     from "../bar/Step2Competitors";
import Step3Pipeline        from "../bar/Step3Pipeline";
import Step4PromptSelection from "../bar/Step4PromptSelection";
import Step5AICompetitors   from "../bar/Step5AICompetitors";
import Step6Success         from "../bar/Step6Success";

export type ProjectData = {
  planId?:         string;
  brandName:       string;
  websiteUrl:      string;
  country:         string;
  language:        string;
  competitors:     string[];
  selectedPrompts: string[];
  aiCompetitors:   { name: string; domain: string; confidence: number; accepted: boolean }[];
};

const STEPS = ["Project Setup", "Competitors", "Analyzing", "Prompts", "AI Competitors", "Ready"];
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function OnboardingWizardInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ProjectData>({
    brandName: "", websiteUrl: "", country: "US", language: "en",
    competitors: [], selectedPrompts: [], aiCompetitors: [],
  });

  useEffect(() => {
    const urlStep   = searchParams.get("step");
    const urlPlanId = searchParams.get("planId");
    if (urlPlanId) setData((d) => ({ ...d, planId: urlPlanId }));
    if (urlStep) {
      const parsed = parseInt(urlStep, 10);
      if (parsed >= 1 && parsed <= 6) setStep(parsed);
    }
  }, []);

  const next   = () => setStep((s) => Math.min(s + 1, 6));
  const back   = () => setStep((s) => Math.max(s - 1, 1));
  const update = (patch: Partial<ProjectData>) => setData((d) => ({ ...d, ...patch }));

  const saveStep = async (stepNum: number, planId?: string) => {
    const id = planId ?? data.planId;
    if (!id) return;
    try {
      const { supabaseBrowser } = await import("@/lib/supabaseClient");
      const { data: s } = await supabaseBrowser.auth.getSession();
      const token = s?.session?.access_token;
      if (!token) return;
      await fetch(`${BACKEND_URL}/aeo/onboarding-step`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ planId: id, step: stepNum }),
      });
    } catch (err) {
      console.error("[Wizard] saveStep failed:", err);
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-12 px-4 pb-16">

      {/* Logo */}
    <div className="mb-10 flex items-center gap-2">
  <Image src="/logoicon.png" alt="Tecsaro AI" width={36} height={36} priority />
  <span className="font-heading font-semibold text-lg text-white">Tecsaro AI</span>
</div>

      {/* Step indicator */}
      {step < 6 && (
        <div className="mb-8 flex items-center gap-2">
          {STEPS.slice(0, 5).map((label, i) => {
            const num    = i + 1;
            const done   = step > num;
            const active = step === num;
            return (
              <div key={num} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 transition-all duration-300
                  ${active ? "opacity-100" : done ? "opacity-60" : "opacity-30"}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold font-heading transition-all duration-300
                    ${done
                      ? "bg-emerald text-charcoal"
                      : active
                      ? "bg-emerald/20 border border-emerald text-emerald"
                      : "bg-charcoal-light border border-border text-white/40"}`}>
                    {done ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : num}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${active ? "text-white" : "text-white/40"}`}>
                    {label}
                  </span>
                </div>
                {i < 4 && (
                  <div className={`w-6 h-px transition-all duration-500 ${done ? "bg-emerald" : "bg-white/10"}`} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Step content */}
      <div className="w-full max-w-xl">
        {step === 1 && (
          <Step1ProjectSetup
            data={data}
            onUpdate={update}
            onNext={(planId) => {
              setData((d) => ({ ...d, ...(planId ? { planId } : {}) }));
              saveStep(1, planId);
              setStep(2);
            }}
          />
        )}
        {step === 2 && (
          <Step2Competitors
            data={data}
            onUpdate={update}
            onBack={back}
            onNext={() => { saveStep(2); next(); }}
          />
        )}
        {step === 3 && (
          <Step3Pipeline
            data={data}
            onNext={() => { saveStep(3); next(); }}
          />
        )}
        {step === 4 && (
          <Step4PromptSelection
            data={data}
            onUpdate={update}
            onNext={() => { saveStep(4); next(); }}
          />
        )}
        {step === 5 && (
          <Step5AICompetitors
            data={data}
            onUpdate={update}
            onNext={() => { saveStep(5); next(); }}
          />
        )}
        {step === 6 && <Step6Success data={data} />}
      </div>

    </div>
  );
}

export default function OnboardingWizard() {
  return (
    <Suspense fallback={null}>
      <OnboardingWizardInner />
    </Suspense>
  );
}
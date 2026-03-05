



"use client";

import { useState, useEffect } from "react";
import { countries } from "@/lib/countries";
import { getLanguagesByCountry } from "@/lib/languages";
import { GlobeIcon, ChevronDown, Spinner, ErrorMsg } from "@/components/ui/icons";
import { supabaseBrowser } from "@/lib/supabaseClient";
import type { ProjectData } from "@/components/onboarding/OnboardingWizard";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type Props = {
  data: ProjectData;
  onUpdate: (p: Partial<ProjectData>) => void;
  onNext: (planId?: string) => void;
};



export default function Step1ProjectSetup({ data, onUpdate, onNext }: Props) {
  const [errors,  setErrors]  = useState<Partial<Record<"brandName" | "websiteUrl" | "country", string>>>({});
  const [apiErr,  setApiErr]  = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const languages = getLanguagesByCountry(data.country);

  // ── Reset language when country changes ──────────────────────
  useEffect(() => {
    const isValid = languages.some((l) => l.value === data.language); // ✅ l.value not l.code
    if (!isValid && languages.length > 0) {
      onUpdate({ language: languages[0].value }); // ✅ l.value not l.code
    }
  }, [data.country]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Validation ───────────────────────────────────────────────
  const validate = () => {
    const e: typeof errors = {};

    if (!data.brandName.trim()) {
      e.brandName = "Brand name is required";
    } else if (data.brandName.trim().length < 2) {
      e.brandName = "Must be at least 2 characters";
    }

    if (!data.websiteUrl.trim()) {
      e.websiteUrl = "Website URL is required";
    } else if (!/^https?:\/\/.+\..+/.test(data.websiteUrl.trim())) {
      e.websiteUrl = "Enter a valid URL — e.g. https://yoursite.com";
    }

    if (!data.country) {
      e.country = "Please select a country";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ───────────────────────────────────────────────────
  const handleNext = async () => {
    if (!validate()) return;

    setLoading(true);
    setApiErr(null);

    try {
      const { data: sessionData } = await supabaseBrowser.auth.getSession();
      const token = sessionData?.session?.access_token;

      if (!token) {
        setApiErr("Session expired — please sign in again.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${BACKEND_URL}/plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name:        data.brandName.trim(),
          website_url: data.websiteUrl.trim(),
          country:     data.country,
          language:    data.language,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setApiErr(json?.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const planId: string = json?.plan?.id;
      onUpdate({ planId });
      onNext(planId);
    } catch (err) {
      console.error("[Step1] submit error:", err);
      setApiErr("Network error — check your connection and try again.");
      setLoading(false);
    }
  };

  const clearFieldErr = (key: keyof typeof errors) => {
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (apiErr) setApiErr(null);
  };

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-dark rounded-2xl border border-white/10 p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
            <span className="text-xs font-medium text-emerald">Step 1 of 5</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-white mb-2">
            Set up your project
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Tell us about your brand so we can generate the right AI visibility queries for your market.
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-5">

          {/* Brand name */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">
              Brand / Project Name
            </label>
            <input
              type="text"
              value={data.brandName}
              onChange={(e) => { onUpdate({ brandName: e.target.value }); clearFieldErr("brandName"); }}
              placeholder="e.g. Acme Corp, MyStartup"
              disabled={loading}
              className={`w-full px-4 py-3 rounded-xl border text-sm
                focus:outline-none focus:ring-2 focus:ring-emerald/40
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                ${errors.brandName ? "border-red-500/60 focus:ring-red-500/30" : "border-white/10 hover:border-white/20"}`}
            />
            {errors.brandName && <ErrorMsg msg={errors.brandName} />}
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">
              Website URL
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                <GlobeIcon />
              </div>
              <input
                type="url"
                value={data.websiteUrl}
                onChange={(e) => { onUpdate({ websiteUrl: e.target.value }); clearFieldErr("websiteUrl"); }}
                placeholder="https://yourwebsite.com"
                disabled={loading}
                className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm
                  focus:outline-none focus:ring-2 focus:ring-emerald/40
                  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                  ${errors.websiteUrl ? "border-red-500/60 focus:ring-red-500/30" : "border-white/10 hover:border-white/20"}`}
              />
            </div>
            {errors.websiteUrl && <ErrorMsg msg={errors.websiteUrl} />}
          </div>

          {/* Country + Language */}
          <div className="grid grid-cols-2 gap-4">

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Country</label>
              <div className="relative">
                <select
                  value={data.country}
                  onChange={(e) => { onUpdate({ country: e.target.value }); clearFieldErr("country"); }}
                  disabled={loading}
                  className={`w-full appearance-none px-4 py-3 pr-9 rounded-xl border text-sm
                    focus:outline-none focus:ring-2 focus:ring-emerald/40
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer
                    ${errors.country ? "border-red-500/60 focus:ring-red-500/30" : "border-white/10 hover:border-white/20"}`}
                >
                  <option value="" disabled>Select country…</option>
                  {countries.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                  <ChevronDown />
                </div>
              </div>
              {errors.country && <ErrorMsg msg={errors.country} />}
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Language</label>
              <div className="relative">
                <select
                  value={data.language}
                  onChange={(e) => onUpdate({ language: e.target.value })}
                  disabled={loading || languages.length === 0}
                  className="w-full appearance-none px-4 py-3 pr-9 rounded-xl border border-white/10
                    text-sm focus:outline-none focus:ring-2 focus:ring-emerald/40
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200 cursor-pointer hover:border-white/20"
                >
                  {languages.length === 0 ? (
                    <option value="">Select country first</option>
                  ) : (
                    languages.map((l) => (
                      <option key={l.value} value={l.value}>{l.label}</option>
                    ))
                  )}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                  <ChevronDown />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* API error */}
        {apiErr && (
          <div className="mt-5 flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25">
            <svg className="flex-shrink-0 mt-0.5 text-red-400" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 4V7.5M7 9.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <p className="text-xs text-red-400 leading-relaxed">{apiErr}</p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleNext}
          disabled={loading}
          className="mt-7 w-full py-3.5 rounded-xl font-semibold text-sm
            transition-all duration-200 active:scale-[0.98]
            bg-emerald hover:bg-emerald-light text-charcoal
            hover:shadow-[0_0_24px_rgba(15,191,154,0.4)]
            disabled:opacity-70 disabled:cursor-not-allowed
            disabled:hover:shadow-none disabled:hover:bg-emerald"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner />
              Creating project…
            </span>
          ) : (
            "Continue →"
          )}
        </button>

      </div>
    </div>
  );
}
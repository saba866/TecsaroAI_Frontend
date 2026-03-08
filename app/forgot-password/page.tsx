


"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react"
import { supabaseBrowser } from "@/lib/supabaseClient"

export default function ForgotPasswordPage() {
  const [isLoading,   setIsLoading]   = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email,       setEmail]       = useState("")
  const [error,       setError]       = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) { setError(error.message); setIsLoading(false); return }
    setIsLoading(false)
    setIsSubmitted(true)
  }

  const handleResend = async () => {
    setIsLoading(true)
    setError("")
    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) setError(error.message)
    else setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-cloud flex">

      {/* ── Left panel ── */}
<div className="hidden lg:flex lg:w-[52%] bg-charcoal relative overflow-hidden flex-col justify-between px-14 py-12">
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald/8 blur-[120px]" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet/8 blur-[120px]" />
  </div>

  {/* Logo + content grouped */}
  <div className="relative flex flex-col gap-10">
    <div className="flex items-center gap-2">
      <Image src="/logoicon.png" alt="Tecsaro AI" width={80} height={80} priority />
      <span
        className="font-heading font-bold text-white"
        style={{ fontSize: "50px", lineHeight: "50px" }}
      >
        Tecsaro AI
      </span>
    </div>

    <div className="max-w-md">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
        <span className="text-[11px] font-mono font-bold text-emerald tracking-widest uppercase">
          Account Recovery
        </span>
      </div>
      <h2 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">
        Get back to tracking
        <span className="text-emerald"> your AI visibility</span>
      </h2>
      <p className="text-graphite text-sm leading-relaxed">
        Reset your password and continue monitoring your brand across
        ChatGPT, Gemini and Perplexity. Your data and reports are waiting.
      </p>
    </div>
  </div>

  {/* Footer pinned to bottom */}
  <div className="relative">
    <p className="text-xs text-graphite">
      Need help? Contact us at support@tecsaro.com
    </p>
  </div>
</div>
      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 bg-white">
        <div className="mx-auto w-full max-w-sm">

          {/* Mobile logo */}
             <div className="flex items-center gap-2 lg:hidden mb-8">
            <Image src="/logoicon.png" alt="Tecsaro AI" width={50} height={50} priority />
            <span
              className="font-heading font-bold text-charcoal"
              style={{ fontSize: "30px", lineHeight: "30px" }}
            >
              Tecsaro AI
            </span>
          </div>

          {!isSubmitted ? (
            <>
              <Link href="/login"
                className="inline-flex items-center gap-1.5 text-sm text-graphite hover:text-charcoal transition-colors mb-8">
                <ArrowLeft className="h-4 w-4" /> Back to login
              </Link>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-emerald/10 border border-emerald/20 flex items-center justify-center mb-6">
                <Mail className="h-5 w-5 text-emerald" />
              </div>

              <div className="mb-7">
                <h1 className="font-heading text-2xl font-bold text-charcoal mb-1">
                  Forgot your password?
                </h1>
                <p className="text-graphite text-sm">
                  No worries — enter your email and we'll send reset instructions.
                </p>
              </div>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-charcoal text-sm font-medium">
                    Email address
                  </Label>
                  <Input
                    id="email" type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-1.5 h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 focus:border-emerald focus:ring-emerald/20"
                  />
                </div>

                <button
                  type="submit" disabled={isLoading}
                  className="w-full h-12 bg-emerald text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : "Send reset link"}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success state */}
              <div className="w-12 h-12 rounded-2xl bg-emerald/10 border border-emerald/20 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-5 w-5 text-emerald" />
              </div>

              <div className="mb-7">
                <h1 className="font-heading text-2xl font-bold text-charcoal mb-1">
                  Check your inbox
                </h1>
                <p className="text-graphite text-sm leading-relaxed">
                  We sent a reset link to{" "}
                  <span className="font-semibold text-charcoal">{email}</span>.
                  Click the link in the email to set a new password.
                </p>
              </div>

              <Link href="/login"
                className="w-full h-12 bg-emerald text-white rounded-xl font-semibold text-sm flex items-center justify-center hover:bg-emerald-dark transition-colors mb-4">
                Back to login
              </Link>

              <p className="text-sm text-graphite text-center">
                Didn't receive it?{" "}
                <button onClick={handleResend} disabled={isLoading}
                  className="text-emerald hover:underline font-medium disabled:opacity-50">
                  Resend email
                </button>
              </p>
            </>
          )}

          <p className="mt-10 text-center text-sm text-graphite">
            Remember your password?{" "}
            <Link href="/login" className="text-emerald hover:underline font-semibold">
              Log in
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
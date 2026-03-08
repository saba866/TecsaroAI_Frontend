


"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, CheckCircle2, KeyRound } from "lucide-react"
import { supabaseBrowser } from "@/lib/supabaseClient"

export default function ResetPasswordPage() {
  const [password,        setPassword]        = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword,    setShowPassword]    = useState(false)
  const [showConfirm,     setShowConfirm]     = useState(false)
  const [loading,         setLoading]         = useState(false)
  const [error,           setError]           = useState("")
  const [success,         setSuccess]         = useState(false)

  useEffect(() => {
    supabaseBrowser.auth.getSession()
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password !== confirmPassword) { setError("Passwords do not match"); return }
    setLoading(true)
    const { error } = await supabaseBrowser.auth.updateUser({ password })
    if (error) setError(error.message)
    else setSuccess(true)
    setLoading(false)
  }

  return (
    //Left panel
    <div className="min-h-screen bg-cloud flex">

      <div className="hidden lg:flex lg:w-[52%] bg-charcoal relative overflow-hidden flex-col justify-between px-14 py-12">
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald/8 blur-[120px]" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet/8 blur-[120px]" />
  </div>

  {/* Logo + content grouped — no gap between them */}
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
          Password Reset
        </span>
      </div>
      <h2 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">
        Almost there —
        <span className="text-emerald"> set a new password</span>
      </h2>
      <p className="text-graphite text-sm leading-relaxed">
        Once updated, you'll be back to tracking your brand visibility
        across ChatGPT, Gemini and Perplexity in seconds.
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

          {!success ? (
            <>
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-emerald/10 border border-emerald/20 flex items-center justify-center mb-6">
                <KeyRound className="h-5 w-5 text-emerald" />
              </div>

              <div className="mb-7">
                <h1 className="font-heading text-2xl font-bold text-charcoal mb-1">
                  Set new password
                </h1>
                <p className="text-graphite text-sm">
                  Choose a strong password for your Tecsaro AI account.
                </p>
              </div>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <Label className="text-charcoal text-sm font-medium">New password</Label>
                  <div className="relative mt-1.5">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      required value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 pr-12 focus:border-emerald focus:ring-emerald/20"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-graphite hover:text-charcoal transition-colors">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="text-charcoal text-sm font-medium">Confirm new password</Label>
                  <div className="relative mt-1.5">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter password"
                      required value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 bg-white border-gray-200 text-charcoal placeholder:text-graphite/50 pr-12 focus:border-emerald focus:ring-emerald/20"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-graphite hover:text-charcoal transition-colors">
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit" disabled={loading}
                  className="w-full h-12 bg-emerald text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Updating…
                    </span>
                  ) : "Update password"}
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
                  Password updated
                </h1>
                <p className="text-graphite text-sm leading-relaxed">
                  Your password has been changed successfully.
                  You can now log in with your new password.
                </p>
              </div>

              <Link href="/login"
                className="w-full h-12 bg-emerald text-white rounded-xl font-semibold text-sm flex items-center justify-center hover:bg-emerald-dark transition-colors">
                Go to login →
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
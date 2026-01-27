





"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { supabaseBrowser } from "@/lib/supabaseClient"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

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
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-4">
            <Image
              src="/TecsaroAIfulllogo.png"
              alt="Tecsaro AI"
              width={220}
              height={60}
              priority
            />
          </Link>


        {!isSubmitted ? (
          <>
            {/* Back link */}
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>

            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald/10 flex items-center justify-center mb-6">
                <Mail className="h-8 w-8 text-emerald" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-white mb-2">
                Forgot your password?
              </h1>
              <p className="text-gray-400">
                No worries, we&apos;ll send you reset instructions.
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald focus:ring-emerald"
                  placeholder="Enter your email"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-emerald hover:bg-emerald-dark text-charcoal font-semibold"
              >
                {isLoading ? "Sending..." : "Reset password"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald/10 flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-emerald" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-white mb-2">
              Check your email
            </h1>
            <p className="text-gray-400 mb-8">
              We sent a password reset link to
              <br />
              <span className="text-white font-medium">{email}</span>
            </p>

            <Button
              asChild
              className="w-full h-12 bg-emerald hover:bg-emerald-dark text-charcoal font-semibold mb-4"
            >
              <Link href="/login">Back to login</Link>
            </Button>

            <p className="text-sm text-gray-500">
              Didn&apos;t receive the email?{" "}
              <button
                onClick={handleResend}
                disabled={isLoading}
                className="text-emerald hover:underline disabled:opacity-50"
              >
                Click to resend
              </button>
            </p>
          </div>
        )}

        <p className="mt-12 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link href="/login" className="text-emerald hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

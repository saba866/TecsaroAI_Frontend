





"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { supabaseBrowser } from "@/lib/supabaseClient"

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // ======================
  // Email/Password Login
  // ======================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { data, error } = await supabaseBrowser.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (!data.user?.email_confirmed_at) {
        setError("Please verify your email before logging in.")
        setIsLoading(false)
        return
      }

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  // ======================
  // Google Login
  // ======================


// Google Login with Supabase
const loginWithGoogle = async () => {
  const { data, error } = await supabaseBrowser.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      scopes:
        "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly",
    },
  });

  if (error) {
    console.error("Google login error:", error.message);
  }
};



  return (
    <div className="min-h-screen bg-charcoal flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:flex-1 bg-charcoal-light relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet/10 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald/10 blur-[100px]" />
        </div>

        <div className="relative flex flex-col justify-center px-12 py-12">
          <div className="max-w-md">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Welcome back
            </h2>
            <p className="text-gray-400 mb-12">
              Continue optimizing your AI search visibility and growing your organic reach.
            </p>

            <div className="space-y-6">
              {[
                { title: "Real-time Analytics", description: "Track your AI search performance 24/7" },
                { title: "Smart Automation", description: "Set it and let AI handle the optimization" },
                { title: "Direct Publishing", description: "Push changes live with one click" },
              ].map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">

          <Link href="/" className="flex justify-center mb-4">
            <Image
              src="/TecsaroAIfulllogo.png"
              alt="Tecsaro AI"
              width={220}
              height={60}
              priority
            />
          </Link>

          <h1 className="font-heading text-3xl font-bold text-white text-center">
            Log in to your account
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Enter your credentials to access your dashboard
          </p>

          {/* Google Login */}
          <Button
            onClick={loginWithGoogle}
            variant="outline"
            className="w-full h-12 border-white/20 text-white hover:bg-white/10 mb-6"
          >
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-charcoal text-gray-500">or continue with email</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5 h-12 bg-white/5 border-white/10 text-white"
              />
            </div>

            <div>
  <div className="flex items-center justify-between">
    <Label htmlFor="password" className="text-gray-300">
      Password
    </Label>
    <Link
      href="/forgot-password"
      className="text-sm text-emerald hover:underline"
    >
      Forgot password?
    </Link>
  </div>

  <div className="relative mt-1.5">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="h-12 bg-white/5 border-white/10 text-white pr-12"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showPassword ? <EyeOff /> : <Eye />}
    </button>
  </div>
</div>


            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-emerald text-charcoal font-semibold mt-6"
            >
              {isLoading ? "Logging in..." : "Log in"}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-emerald hover:underline font-medium">
              Start free trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}






"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"


import { supabaseBrowser} from "@/lib/supabaseClient"

export default function SignupPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setSuccess("")

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match")
    return
  }

  try {
    setIsLoading(true)

    const { data, error } = await supabaseBrowser.auth.signUp({
  email: form.email,
  password: form.password,
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
    data: {
      name: `${form.firstName} ${form.lastName}`,
    },
  },
})


    if (error) throw error

    // if email confirmation disabled → auto login
    if (data.user && data.session) {
      window.location.href = "/dashboard"
      return
    }

    setSuccess(
      "We’ve sent a verification link to your email. Please verify to continue."
    )
  } catch (err: any) {
    setError(err.message || "Signup failed")
  } finally {
    setIsLoading(false)
  }
}

  // GOOGLE SIGNUP (AUTO VERIFIED)
const handleGoogleSignup = async () => {
  await supabaseBrowser.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      scopes:
        "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly",
    },
  });
};




  return (
    <div className="min-h-screen bg-charcoal flex">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">

          {/* Logo */}
          <Link href="/" className="flex justify-center mb-2">
            <Image
              src="/TecsaroAIfulllogo.png"
              alt="Tecsaro AI"
              width={160}
              height={80}
              priority
            />
          </Link>

          <h1 className="text-3xl font-bold text-white text-center mb-1">
            Create your Tecsaro AI account
          </h1>

          <p className="text-gray-400 text-center mb-6">
            Start optimizing your website for SEO & AI search
          </p>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="bg-emerald/10 text-emerald text-sm p-4 rounded mb-4">
              {success}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-500/10 text-red-400 text-sm p-4 rounded mb-4">
              {error}
            </div>
          )}

          {/* GOOGLE SIGNUP */}
          <Button
  onClick={handleGoogleSignup}
  variant="outline"
  className="w-full h-12 mb-6"
>
  Continue with Google
</Button>


          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-charcoal text-gray-500">or use email</span>
            </div>
          </div>

          {/* FORM */}
         <form onSubmit={handleSubmit} className="space-y-4">

  {/* First / Last name */}
  <div className="grid grid-cols-2 gap-4">
    <Input
      name="firstName"
      placeholder="First name"
      required
      onChange={handleChange}
      className="h-12 bg-white/5 text-white placeholder:text-gray-500 border-white/10 focus:border-emerald focus:ring-emerald"
    />
    <Input
      name="lastName"
      placeholder="Last name"
      required
      onChange={handleChange}
      className="h-12 bg-white/5 text-white placeholder:text-gray-500 border-white/10 focus:border-emerald focus:ring-emerald"
    />
  </div>

  {/* Email */}
  <Input
    name="email"
    type="email"
    placeholder="Work email"
    required
    onChange={handleChange}
    className="h-12 bg-white/5 text-white placeholder:text-gray-500 border-white/10 focus:border-emerald focus:ring-emerald"
  />

  {/* Password */}
  <div>
    <Label className="text-gray-300">Password</Label>
    <div className="relative">
      <Input
        name="password"
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
        required
        placeholder="Create a strong password"
        className="h-12 bg-white/5 text-white placeholder:text-gray-500 border-white/10 pr-12 focus:border-emerald focus:ring-emerald"
        autoComplete="new-password"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  </div>

  {/* Confirm Password */}
  <div>
    <Label className="text-gray-300">Confirm Password</Label>
    <div className="relative">
      <Input
        name="confirmPassword"
        type={showConfirm ? "text" : "password"}
        onChange={handleChange}
        required
        placeholder="Re-enter password"
        className="h-12 bg-white/5 text-white placeholder:text-gray-500 border-white/10 pr-12 focus:border-emerald focus:ring-emerald"
        autoComplete="new-password"
      />

      <button
        type="button"
        onClick={() => setShowConfirm(!showConfirm)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  </div>

  {/* Submit */}
  <Button
    type="submit"
    disabled={isLoading}
    className="w-full h-12 bg-emerald hover:bg-emerald-dark text-charcoal font-semibold"
  >
    {isLoading ? "Creating account..." : "Create account"}
    <ArrowRight className="ml-2 h-4 w-4" />
  </Button>
</form>


          {/* TERMS */}
          <p className="mt-4 text-center text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-emerald hover:underline">Terms</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-emerald hover:underline">Privacy Policy</Link>
          </p>

          {/* SECURITY */}
          <div className="mt-6 flex items-start gap-2 text-sm text-gray-400">
            <ShieldCheck className="h-5 w-5 text-emerald" />
            <p>
              <strong className="text-white">Security Note:</strong><br />
              🔐 Your data is encrypted and secure. You control what gets published.
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

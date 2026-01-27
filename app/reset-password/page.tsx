

"use client"
import { useEffect } from "react"

import { useState } from "react"
import Image from "next/image"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
  supabaseBrowser.auth.getSession()
}, [])


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    const { error } = await supabaseBrowser.auth.updateUser({ password })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal">
      <form
        onSubmit={handleUpdate}
        className="bg-white/5 p-8 rounded-lg w-full max-w-sm space-y-4"
      >
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Image
            src="/TecsaroAIfulllogo.png"
            alt="Tecsaro AI"
            width={180}
            height={60}
            priority
          />
        </div>

        <h1 className="text-xl font-bold text-white text-center">
          Set new password
        </h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {success && (
          <p className="text-green-500 text-sm text-center">
            ✅ Your password is updated. You can login now.
          </p>
        )}

        {/* Password */}
        <div className="relative">
         <Input
  type={showPassword ? "text" : "password"}
  placeholder="New password"
  required
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="text-white placeholder:text-gray-400 bg-white/5 border-white/10"
/>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Input
  type={showConfirmPassword ? "text" : "password"}
  placeholder="Confirm password"
  required
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="text-white placeholder:text-gray-400 bg-white/5 border-white/10"
/>

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Button disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update password"}
        </Button>

        {success && (
          <p className="text-center text-sm text-white">
            <a href="/login" className="text-emerald hover:underline">
              Go to login
            </a>
          </p>
        )}
      </form>
    </div>
  )
}

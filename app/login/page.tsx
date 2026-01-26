// "use client"

// import React from "react"

// import { useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Eye, EyeOff, ArrowRight } from "lucide-react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import router from "next/router"


// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [email, setEmail] = useState("")
// const [password, setPassword] = useState("")
// const [error, setError] = useState("")

// const handleGoogleLogin = async (credential: string) => {
//   const { error } = await supabaseBrowser.auth.signInWithIdToken({
//     provider: "google",
//     token: credential,
//   })

//   if (!error) router.push("/dashboard")
// }


//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault()
//   setError("")
//   setIsLoading(true)

//   try {
//     const { data, error } = await supabaseBrowser.auth.signInWithPassword({
//       email,
//       password
//     })

//     if (error) throw error

//     // Optional: check email verified
//     if (!data.user.email_confirmed_at) {
//       setError("Please verify your email before logging in.")
//       return
//     }

//     router.push("/dashboard")
//   } catch (err: any) {
//     setError(err.message || "Login failed")
//   } finally {
//     setIsLoading(false)
//   }
// }

//   return (
//     <div className="min-h-screen bg-charcoal flex">
//       {/* Left side - Feature showcase */}
//       <div className="hidden lg:flex lg:flex-1 bg-charcoal-light relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet/10 blur-[100px]" />
//           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald/10 blur-[100px]" />
//         </div>

//         <div className="relative flex flex-col justify-center px-12 py-12">
//           <div className="max-w-md">
//             <h2 className="font-heading text-3xl font-bold text-white mb-4">
//               Welcome back
//             </h2>
//             <p className="text-gray-400 mb-12">
//               Continue optimizing your AI search visibility and growing your organic reach.
//             </p>

//             {/* Feature highlights */}
//             <div className="space-y-6">
//               {[
//                 { title: "Real-time Analytics", description: "Track your AI search performance 24/7" },
//                 { title: "Smart Automation", description: "Set it and let AI handle the optimization" },
//                 { title: "Direct Publishing", description: "Push changes live with one click" },
//               ].map((feature) => (
//                 <div key={feature.title} className="flex items-start gap-4">
//                   <div className="w-10 h-10 rounded-lg bg-emerald/20 flex items-center justify-center shrink-0">
//                     <div className="w-2 h-2 rounded-full bg-emerald" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-white">{feature.title}</h3>
//                     <p className="text-sm text-gray-400">{feature.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right side - Form */}
//       <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           {/* Logo */}
//           <Link href="/" className="flex justify-center mb-0">
//   <Image
//     src="/TecsaroAIfulllogo.png"
//     alt="Tecsaro AI"
//     width={220}
//     height={60}
//     priority
//     className="object-contain"
//   />
// </Link>


//           <h1 className="font-heading text-3xl font-bold text-white text-center mb-0">
//             Log in to your account
//           </h1>
//           <p className="text-gray-400 text-center mb-8">
//             Enter your credentials to access your dashboard
//           </p>

//           {/* Google Sign In */}
//           <Button
//             variant="outline"
//             className="w-full h-12 border-white/20 text-white hover:bg-white/10 mb-6 bg-transparent"
//           >
//             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Continue with Google
//           </Button>

//           <div className="relative mb-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-white/10" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-charcoal text-gray-500">or continue with email</span>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="email" className="text-gray-300">
//                 Email address
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 required
//                 className="mt-1.5 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald focus:ring-emerald"
//                 placeholder="john@company.com"
//               />
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password" className="text-gray-300">
//                   Password
//                 </Label>
//                 <Link
//                   href="/forgot-password"
//                   className="text-sm text-emerald hover:underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative mt-1.5">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald focus:ring-emerald pr-12"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full h-12 bg-emerald hover:bg-emerald-dark text-charcoal font-semibold mt-6"
//             >
//               {isLoading ? (
//                 <span className="flex items-center gap-2">
//                   <span className="h-4 w-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
//                   Logging in...
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-2">
//                   Log in
//                   <ArrowRight className="h-5 w-5" />
//                 </span>
//               )}
//             </Button>
//           </form>

//           <p className="mt-8 text-center text-sm text-gray-400">
//             Don&apos;t have an account?{" "}
//             <Link href="/signup" className="text-emerald hover:underline font-medium">
//               Start free trial
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }






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
// const handleGoogleLogin = async () => {
//  await supabaseBrowser.auth.signInWithOAuth({
//   provider: "google",
//   options: {
//     redirectTo: `${location.origin}/auth/callback`,
//   },
// })
// }

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



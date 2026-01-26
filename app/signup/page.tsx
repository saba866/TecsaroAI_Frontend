

// "use client"

// import React, { useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react"

// export default function SignupPage() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirm, setShowConfirm] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     await new Promise((r) => setTimeout(r, 1500))
//     setIsLoading(false)
//   }

//   return (
//     <div className="min-h-screen bg-charcoal flex">
//       {/* Left side */}
//       <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">

//           {/* Logo */}
//           <Link href="/" className="flex justify-center mb-0">
//             <Image
//               src="/TecsaroAIfulllogo.png"
//               alt="Tecsaro AI"
//               width={140}
//               height={100}
//               priority
//             />
           
//           </Link>

//           <h1 className="text-3xl font-bold text-white text-center mb-0">
//             Create your Tecsaro AI account
//           </h1>
//           <p className="text-gray-400 text-center mb-8">
//             Start optimizing your website for SEO & AI search
//           </p>

//           {/* Google signup */}
//           <Button
//             variant="outline"
//             className="w-full h-12 border-white/20 text-white hover:bg-white/10 mb-4 bg-transparent"
//           >
//             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//               <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.3-1.5 3.8-5.1 3.8-3.1 0-5.6-2.6-5.6-5.6s2.5-5.6 5.6-5.6c1.8 0 3 .7 3.7 1.3l2.5-2.5C16.5 3.4 14.4 2.4 12 2.4 6.9 2.4 2.7 6.6 2.7 11.8S6.9 21.2 12 21.2c6 0 9.9-4.2 9.9-10.1 0-.7-.1-1.2-.2-1.7H12z"/>
//             </svg>
//             Continue with Google
//           </Button>

//           <p className="text-xs text-gray-500 text-center mb-6">
//             We use Google Sign-in for secure authentication and email verification
//           </p>

//           <div className="relative mb-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-white/10" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-charcoal text-gray-500">or use email</span>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <Input placeholder="First name" required className="bg-white/5 text-white h-12" />
//               <Input placeholder="Last name" required className="bg-white/5 text-white h-12" />
//             </div>

//             <Input
//               type="email"
//               placeholder="Work email"
//               required
//               className="bg-white/5 text-white h-12"
//             />

//             {/* Password */}
//             <div>
//               <Label className="text-gray-300">Password</Label>
//               <div className="relative">
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Create a strong password"
//                   className="bg-white/5 text-white h-12 pr-12"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
//                 >
//                   {showPassword ? <EyeOff /> : <Eye />}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 Use 8+ characters with number & symbol
//               </p>
//             </div>

//             {/* Confirm password */}
//             <div>
//               <Label className="text-gray-300">Confirm Password</Label>
//               <div className="relative">
//                 <Input
//                   type={showConfirm ? "text" : "password"}
//                   placeholder="Re-enter password"
//                   className="bg-white/5 text-white h-12 pr-12"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
//                 >
//                   {showConfirm ? <EyeOff /> : <Eye />}
//                 </button>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full h-12 bg-emerald hover:bg-emerald-dark text-charcoal font-semibold mt-4"
//             >
//               {isLoading ? "Creating account..." : "Create account"}
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </form>

//           {/* Terms & Privacy (ADDED BACK) */}
//           <p className="mt-4 text-center text-xs text-gray-500">
//             By creating an account, you agree to our{" "}
//             <Link href="/terms" className="text-emerald hover:underline">
//               Terms of Service
//             </Link>{" "}
//             and{" "}
//             <Link href="/privacy" className="text-emerald hover:underline">
//               Privacy Policy
//             </Link>
//           </p>

//           {/* Security note */}
//           <div className="mt-6 flex items-start gap-2 text-sm text-gray-400">
//             <ShieldCheck className="h-5 w-5 text-emerald" />
//             <p>
//               <strong className="text-white">Security Note:</strong><br />
//               🔐 Your data is encrypted and secure. You control what gets published.
//             </p>
//           </div>

//           <p className="mt-8 text-center text-sm text-gray-400">
//             Already have an account?{" "}
//             <Link href="/login" className="text-emerald font-medium hover:underline">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Right side */}
//       <div className="hidden lg:flex lg:flex-1 bg-charcoal-light items-center justify-center px-12">
//         <div className="max-w-md">
//           <h2 className="text-3xl font-bold text-white mb-4">
//             Built for SEO + AI Search
//           </h2>
//           <p className="text-gray-400 mb-6">
//             Tecsaro AI helps you optimize, publish, and track visibility across
//             Google, ChatGPT, Gemini, and AI-powered search engines — from one dashboard.
//           </p>

//           <ul className="space-y-3 text-gray-300 text-sm">
//             <li>✔ Website health scores</li>
//             <li>✔ AI-ready content optimization</li>
//             <li>✔ Safe publishing with rollback</li>
//             <li>✔ SEO, GEO & AEO in one place</li>
//             <li>✔ Built for founders, teams & agencies</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }




// "use client"

// import React, { useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react"
// import api from "@/lib/api"
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation"

// export default function SignupPage() {
//   const router = useRouter()

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirm, setShowConfirm] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (form.password !== form.confirmPassword) {
//       return setError("Passwords do not match")
//     }

//     try {
//       setIsLoading(true)

//       const res = await api.post("/auth/signup", form)

//       // save token
//       Cookies.set("token", res.data.token)

//       router.push("/dashboard")
//     } catch (err: any) {
//       setError(err?.response?.data?.error || "Signup failed")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-charcoal flex">
//       {/* Left side */}
//       <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">

//           {/* Logo */}
//           <Link href="/" className="flex justify-center mb-2">
//             <Image
//               src="/TecsaroAIfulllogo.png"
//               alt="Tecsaro AI"
//               width={160}
//               height={80}
//               priority
//             />
//           </Link>

//           <h1 className="text-3xl font-bold text-white text-center mb-1">
//             Create your Tecsaro AI account
//           </h1>
//           <p className="text-gray-400 text-center mb-6">
//             Start optimizing your website for SEO & AI search
//           </p>

//           {/* Error */}
//           {error && (
//             <p className="bg-red-500/10 text-red-400 text-sm px-4 py-2 rounded mb-4">
//               {error}
//             </p>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">

//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 name="firstName"
//                 placeholder="First name"
//                 required
//                 onChange={handleChange}
//                 className="bg-white/5 text-white h-12"
//               />
//               <Input
//                 name="lastName"
//                 placeholder="Last name"
//                 required
//                 onChange={handleChange}
//                 className="bg-white/5 text-white h-12"
//               />
//             </div>

//             <Input
//               name="email"
//               type="email"
//               placeholder="Work email"
//               required
//               onChange={handleChange}
//               className="bg-white/5 text-white h-12"
//             />

//             {/* Password */}
//             <div>
//               <Label className="text-gray-300">Password</Label>
//               <div className="relative">
//                 <Input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Create a strong password"
//                   onChange={handleChange}
//                   className="bg-white/5 text-white h-12 pr-12"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
//                 >
//                   {showPassword ? <EyeOff /> : <Eye />}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <Label className="text-gray-300">Confirm Password</Label>
//               <div className="relative">
//                 <Input
//                   name="confirmPassword"
//                   type={showConfirm ? "text" : "password"}
//                   placeholder="Re-enter password"
//                   onChange={handleChange}
//                   className="bg-white/5 text-white h-12 pr-12"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
//                 >
//                   {showConfirm ? <EyeOff /> : <Eye />}
//                 </button>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full h-12 bg-emerald hover:bg-emerald-dark text-charcoal font-semibold"
//             >
//               {isLoading ? "Creating account..." : "Create account"}
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </form>

//           {/* Terms */}
//           <p className="mt-4 text-center text-xs text-gray-500">
//             By creating an account, you agree to our{" "}
//             <Link href="/terms" className="text-emerald hover:underline">Terms</Link>{" "}
//             and{" "}
//             <Link href="/privacy" className="text-emerald hover:underline">Privacy Policy</Link>
//           </p>

//           {/* Security */}
//           <div className="mt-6 flex items-start gap-2 text-sm text-gray-400">
//             <ShieldCheck className="h-5 w-5 text-emerald" />
//             <p>
//               <strong className="text-white">Security Note:</strong><br />
//               🔐 Your data is encrypted and secure. You control what gets published.
//             </p>
//           </div>

//           <p className="mt-8 text-center text-sm text-gray-400">
//             Already have an account?{" "}
//             <Link href="/login" className="text-emerald font-medium hover:underline">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Right side */}
//       <div className="hidden lg:flex lg:flex-1 bg-charcoal-light items-center justify-center px-12">
//         <div className="max-w-md">
//           <h2 className="text-3xl font-bold text-white mb-4">Built for SEO + AI Search</h2>
//           <p className="text-gray-400 mb-6">
//             Optimize, publish, and track visibility across Google, ChatGPT, and AI search.
//           </p>

//           <ul className="space-y-3 text-gray-300 text-sm">
//             <li>✔ Website health scores</li>
//             <li>✔ AI-ready content optimization</li>
//             <li>✔ Safe publishing</li>
//             <li>✔ SEO, GEO & AEO</li>
//             <li>✔ Built for founders & teams</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }






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
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
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

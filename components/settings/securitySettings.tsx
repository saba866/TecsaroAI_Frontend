// "use client"

// import { useState } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { Loader2, Eye, EyeOff, Check } from "lucide-react"

// export function SecuritySettings() {
//   const [newPw,     setNewPw]     = useState("")
//   const [confirmPw, setConfirmPw] = useState("")
//   const [showNew,   setShowNew]   = useState(false)
//   const [showConf,  setShowConf]  = useState(false)
//   const [saving,    setSaving]    = useState(false)
//   const [success,   setSuccess]   = useState(false)
//   const [error,     setError]     = useState<string | null>(null)

//   const strength = !newPw ? 0 : newPw.length < 8 ? 1 : newPw.length < 12 ? 2 : 3
//   const strengthLabel = ["", "Weak", "Good", "Strong"][strength]
//   const strengthColor = ["", "bg-red-400", "bg-amber", "bg-emerald"][strength]

//   const handleUpdate = async () => {
//     setError(null)
//     if (!newPw || newPw.length < 8) {
//       setError("Password must be at least 8 characters")
//       return
//     }
//     if (newPw !== confirmPw) {
//       setError("Passwords do not match")
//       return
//     }
//     setSaving(true)
//     try {
//       const { error: updateErr } = await supabaseBrowser.auth.updateUser({ password: newPw })
//       if (updateErr) throw updateErr
//       setSuccess(true)
//       setNewPw("")
//       setConfirmPw("")
//       setTimeout(() => setSuccess(false), 3000)
//     } catch (err: any) {
//       setError(err.message ?? "Failed to update password")
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleSignOutAll = async () => {
//     await supabaseBrowser.auth.signOut({ scope: "global" })
//     window.location.href = "/login"
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="font-heading text-lg font-semibold text-charcoal mb-0.5">Security</h2>
//         <p className="text-sm text-graphite">Manage your password and active sessions</p>
//       </div>

//       {/* Change password */}
//       <div className="border border-gray-200 rounded-xl overflow-hidden">
//         <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
//           <p className="text-sm font-semibold text-charcoal">Change Password</p>
//           <p className="text-xs text-graphite mt-0.5">
//             Must be at least 8 characters
//           </p>
//         </div>
//         <div className="p-5 space-y-3">
//           {/* New password */}
//           <div>
//             <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
//               New Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showNew ? "text" : "password"}
//                 value={newPw}
//                 onChange={e => setNewPw(e.target.value)}
//                 placeholder="Min. 8 characters"
//                 className="w-full pr-10 px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm
//                   text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald/40 transition-all"
//               />
//               <button type="button" onClick={() => setShowNew(v => !v)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite hover:text-charcoal">
//                 {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//             {/* Strength bar */}
//             {newPw && (
//               <div className="mt-2 flex items-center gap-2">
//                 <div className="flex gap-1 flex-1">
//                   {[1, 2, 3].map(i => (
//                     <div key={i}
//                       className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor : "bg-gray-200"}`}
//                     />
//                   ))}
//                 </div>
//                 <span className={`text-[11px] font-mono font-semibold
//                   ${strength === 1 ? "text-red-500" : strength === 2 ? "text-amber" : "text-emerald"}`}>
//                   {strengthLabel}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Confirm */}
//           <div>
//             <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showConf ? "text" : "password"}
//                 value={confirmPw}
//                 onChange={e => setConfirmPw(e.target.value)}
//                 placeholder="Repeat password"
//                 className="w-full pr-10 px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm
//                   text-charcoal focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald/40 transition-all"
//               />
//               <button type="button" onClick={() => setShowConf(v => !v)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite hover:text-charcoal">
//                 {showConf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//             {confirmPw && newPw !== confirmPw && (
//               <p className="text-[11px] text-red-500 mt-1">Passwords do not match</p>
//             )}
//           </div>

//           {error && (
//             <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
//               {error}
//             </p>
//           )}
//           {success && (
//             <p className="flex items-center gap-1.5 text-xs text-emerald bg-emerald/5 border border-emerald/20 rounded-lg px-3 py-2">
//               <Check className="h-3.5 w-3.5" /> Password updated successfully
//             </p>
//           )}

//           <button
//             onClick={handleUpdate}
//             disabled={saving}
//             className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-charcoal text-white
//               text-sm font-semibold hover:bg-charcoal/90 transition-colors disabled:opacity-60"
//           >
//             {saving ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Updating…</> : "Update Password"}
//           </button>
//         </div>
//       </div>

//       {/* Sessions */}
//       <div className="border border-gray-200 rounded-xl overflow-hidden">
//         <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
//           <p className="text-sm font-semibold text-charcoal">Active Sessions</p>
//           <p className="text-xs text-graphite mt-0.5">
//             Sign out of all browsers and devices simultaneously
//           </p>
//         </div>
//         <div className="p-5">
//           <button
//             onClick={handleSignOutAll}
//             className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-200
//               text-red-600 bg-white text-sm font-semibold hover:bg-red-50 transition-colors"
//           >
//             Sign Out All Devices
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { Loader2, Eye, EyeOff, Check } from "lucide-react"

export function SecuritySettings() {
  const [newPw,     setNewPw]     = useState("")
  const [confirmPw, setConfirmPw] = useState("")
  const [showNew,   setShowNew]   = useState(false)
  const [showConf,  setShowConf]  = useState(false)
  const [saving,    setSaving]    = useState(false)
  const [success,   setSuccess]   = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  const strength      = !newPw ? 0 : newPw.length < 8 ? 1 : newPw.length < 12 ? 2 : 3
  const strengthLabel = ["", "Weak", "Good", "Strong"][strength]
  const strengthBg    = ["", "#f87171", "#F4B740", "#0FBF9A"][strength]
  const strengthText  = ["", "#dc2626", "#b45309", "#0d9970"][strength]

  const handleUpdate = async () => {
    setError(null)
    if (!newPw || newPw.length < 8) { setError("Password must be at least 8 characters"); return }
    if (newPw !== confirmPw)         { setError("Passwords do not match"); return }
    setSaving(true)
    try {
      const { error: updateErr } = await supabaseBrowser.auth.updateUser({ password: newPw })
      if (updateErr) throw updateErr
      setSuccess(true)
      setNewPw("")
      setConfirmPw("")
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message ?? "Failed to update password")
    } finally {
      setSaving(false)
    }
  }

  const handleSignOutAll = async () => {
    await supabaseBrowser.auth.signOut({ scope: "global" })
    window.location.href = "/login"
  }

  const inputClass = `
    w-full pr-10 px-3 py-2.5 rounded-lg border border-gray-200 bg-white
    text-sm text-gray-900
    placeholder:text-gray-400
    focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400
    transition-all
  `

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-0.5">Security</h2>
        <p className="text-sm text-gray-500">Manage your password and active sessions</p>
      </div>

      {/* Change password card */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
          <p className="text-sm font-semibold text-gray-900">Change Password</p>
          <p className="text-xs text-gray-500 mt-0.5">Must be at least 8 characters</p>
        </div>

        <div className="p-5 space-y-4" style={{ backgroundColor: "#FFFFFF" }}>

          {/* New password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
                placeholder="Min. 8 characters"
                className={inputClass}
                style={{ color: "#111827" }}
              />
              <button type="button" onClick={() => setShowNew(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {/* Strength bar */}
            {newPw && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-1 flex-1 rounded-full transition-colors"
                      style={{ backgroundColor: i <= strength ? strengthBg : "#E5E7EB" }}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-semibold" style={{ color: strengthText }}>
                  {strengthLabel}
                </span>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConf ? "text" : "password"}
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                placeholder="Repeat password"
                className={inputClass}
                style={{ color: "#111827" }}
              />
              <button type="button" onClick={() => setShowConf(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                {showConf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {confirmPw && newPw !== confirmPw && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {success && (
            <p className="flex items-center gap-1.5 text-xs bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2"
              style={{ color: "#0FBF9A" }}>
              <Check className="h-3.5 w-3.5" /> Password updated successfully
            </p>
          )}

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors disabled:opacity-60"
            style={{ backgroundColor: "#111827" }}
          >
            {saving ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Updating…</> : "Update Password"}
          </button>
        </div>
      </div>

      {/* Sessions card */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
          <p className="text-sm font-semibold text-gray-900">Active Sessions</p>
          <p className="text-xs text-gray-500 mt-0.5">Sign out of all browsers and devices simultaneously</p>
        </div>
        <div className="p-5" style={{ backgroundColor: "#FFFFFF" }}>
          <button
            onClick={handleSignOutAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-200
              bg-white text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            Sign Out All Devices
          </button>
        </div>
      </div>

    </div>
  )
}
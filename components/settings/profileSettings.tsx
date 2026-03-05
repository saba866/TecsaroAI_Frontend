


// "use client"

// import { useState, useEffect } from "react"
// import { supabaseBrowser } from "@/lib/supabaseClient"
// import { Loader2, Save, Check } from "lucide-react"

// export function ProfileSettings() {
//   const [loading, setLoading] = useState(true)
//   const [saving,  setSaving]  = useState(false)
//   const [saved,   setSaved]   = useState(false)
//   const [error,   setError]   = useState<string | null>(null)

//   // Matches actual DB columns: name, email, company
//   const [name,    setName]    = useState("")
//   const [email,   setEmail]   = useState("")
//   const [company, setCompany] = useState("")

//   const initial     = (name || email).charAt(0).toUpperCase()

//   // ── Load from profiles table ────────────────────────────────────────
//   useEffect(() => {
//     const load = async () => {
//       const { data: { user }, error: authErr } = await supabaseBrowser.auth.getUser()
//       if (authErr || !user) { setLoading(false); return }

//       // Always use auth email as source of truth
//       setEmail(user.email ?? "")

//       const { data: profile, error: dbErr } = await supabaseBrowser
//         .from("profiles")
//         .select("name, email, company")
//         .eq("id", user.id)
//         .single()

//       if (profile) {
//         setName(profile.name    ?? "")
//         setCompany(profile.company ?? "")
//       } else {
//         // Fallback for Google OAuth users — read from user_metadata
//         const meta = user.user_metadata ?? {}
//         setName(meta.full_name ?? meta.name ?? "")
//       }

//       setLoading(false)
//     }
//     load()
//   }, [])

//   // ── Save ────────────────────────────────────────────────────────────
//   const handleSave = async () => {
//     setSaving(true)
//     setError(null)
//     try {
//       const { data: { user } } = await supabaseBrowser.auth.getUser()
//       if (!user) throw new Error("Not authenticated")

//       const { error: upsertErr } = await supabaseBrowser
//         .from("profiles")
//         .upsert(
//           {
//             id:         user.id,
//             name:       name.trim(),
//             email:      user.email,          // keep in sync
//             company:    company.trim(),
//             updated_at: new Date().toISOString(),
//           },
//           { onConflict: "id" }
//         )

//       if (upsertErr) throw upsertErr

//       // Sync name into Supabase auth metadata → sidebar reads this
//       await supabaseBrowser.auth.updateUser({
//         data: { full_name: name.trim() },
//       })

//       setSaved(true)
//       setTimeout(() => setSaved(false), 2500)
//     } catch (err: any) {
//       setError(err.message ?? "Save failed")
//     } finally {
//       setSaving(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-16">
//         <Loader2 className="h-6 w-6 animate-spin" style={{ color: "#0FBF9A" }} />
//       </div>
//     )
//   }

//   const inputClass = `
//     w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white
//     text-sm text-gray-900 font-normal
//     placeholder:text-gray-400
//     focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400
//     transition-all
//   `

//   const disabledClass = `
//     w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-100
//     text-sm text-gray-500 cursor-not-allowed
//   `

//   const labelClass = "block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide"

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <div>
//         <h2 className="text-lg font-semibold text-gray-900 mb-0.5">
//           Profile Information
//         </h2>
//         <p className="text-sm text-gray-500">
//           Update your name, company, and account details
//         </p>
//       </div>

//       {/* Avatar row */}
//       <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//         <div
//           className="h-14 w-14 rounded-full flex items-center justify-center shrink-0 text-xl font-bold"
//           style={{
//             backgroundColor: "rgba(15,191,154,0.15)",
//             border: "2px solid rgba(15,191,154,0.3)",
//             color: "#0FBF9A",
//           }}
//         >
//           {initial || "?"}
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-gray-900 leading-tight">
//             {name || "Your Name"}
//           </p>
//           <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "monospace" }}>
//             {email}
//           </p>
//           <p className="text-xs text-gray-400 mt-1">
//             Avatar is auto-generated from your name initial
//           </p>
//         </div>
//       </div>

//       {/* Form fields */}
//       <div className="grid grid-cols-1 gap-4">

//         {/* Full Name — single field matching DB column `name` */}
//         <div>
//           <label className={labelClass}>Full Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={e => setName(e.target.value)}
//             placeholder="e.g. Sabab Ahmed"
//             className={inputClass}
//           />
//         </div>

//         {/* Email — read only */}
//         <div>
//           <label className={labelClass}>Email Address</label>
//           <input
//             type="email"
//             value={email}
//             disabled
//             className={disabledClass}
//           />
//           <p className="text-xs text-gray-400 mt-1">
//             Email changes require identity verification — contact support
//           </p>
//         </div>

//         {/* Company — DB column `company` already exists */}
//         <div>
//           <label className={labelClass}>Company</label>
//           <input
//             type="text"
//             value={company}
//             onChange={e => setCompany(e.target.value)}
//             placeholder="e.g. Acme Inc."
//             className={inputClass}
//           />
//         </div>

//       </div>

//       {/* Error */}
//       {error && (
//         <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
//           {error}
//         </p>
//       )}

//       {/* Footer */}
//       <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
//         {saved && (
//           <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#0FBF9A" }}>
//             <Check className="h-3.5 w-3.5" /> Changes saved
//           </span>
//         )}
//         <div className="ml-auto">
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors disabled:opacity-60"
//             style={{ backgroundColor: "#0FBF9A" }}
//             onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0da885")}
//             onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0FBF9A")}
//           >
//             {saving ? (
//               <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</>
//             ) : (
//               <><Save className="h-3.5 w-3.5" /> Save Changes</>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { supabaseBrowser } from "@/lib/supabaseClient"
import { Loader2, Save, Check } from "lucide-react"

export function ProfileSettings() {
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const [name,    setName]    = useState("")
  const [email,   setEmail]   = useState("")
  const [company, setCompany] = useState("")

  const initial = (name || email).charAt(0).toUpperCase()

  useEffect(() => {
    const load = async () => {
      const { data: { user }, error: authErr } = await supabaseBrowser.auth.getUser()
      if (authErr || !user) { setLoading(false); return }

      setEmail(user.email ?? "")

      const { data: profile } = await supabaseBrowser
        .from("profiles")
        .select("name, email, company")
        .eq("id", user.id)
        .single()

      if (profile) {
        setName(profile.name    ?? "")
        setCompany(profile.company ?? "")
      } else {
        const meta = user.user_metadata ?? {}
        setName(meta.full_name ?? meta.name ?? "")
      }

      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error: upsertErr } = await supabaseBrowser
        .from("profiles")
        .upsert(
          { id: user.id, name: name.trim(), email: user.email, company: company.trim(), updated_at: new Date().toISOString() },
          { onConflict: "id" }
        )
      if (upsertErr) throw upsertErr

      await supabaseBrowser.auth.updateUser({ data: { full_name: name.trim() } })

      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err: any) {
      setError(err.message ?? "Save failed")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "64px 0" }}>
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: "#0FBF9A" }} />
      </div>
    )
  }

  // ── Shared input styles — fully inline so global CSS cannot override ──
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    backgroundColor: "#FFFFFF",
    color: "#111827",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  }

  const disabledInputStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundColor: "#F3F4F6",
    color: "#6B7280",
    cursor: "not-allowed",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Header */}
      <div>
        <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#111827", margin: 0 }}>
          Profile Information
        </h2>
        <p style={{ fontSize: "14px", color: "#6B7280", marginTop: "4px" }}>
          Update your name, company, and account details
        </p>
      </div>

      {/* Avatar row */}
      <div style={{
        display: "flex", alignItems: "center", gap: "16px",
        padding: "16px", backgroundColor: "#F9FAFB",
        borderRadius: "12px", border: "1px solid #E5E7EB",
      }}>
        <div style={{
          width: "56px", height: "56px", borderRadius: "50%", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          backgroundColor: "rgba(15,191,154,0.15)",
          border: "2px solid rgba(15,191,154,0.3)",
          color: "#0FBF9A", fontSize: "22px", fontWeight: 700,
        }}>
          {initial || "?"}
        </div>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827", margin: 0 }}>
            {name || "Your Name"}
          </p>
          <p style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px", fontFamily: "monospace" }}>
            {email}
          </p>
          <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>
            Avatar is auto-generated from your name initial
          </p>
        </div>
      </div>

      {/* Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Full Name */}
        <div>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Sabab Ahmed"
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = "#0FBF9A"; e.target.style.boxShadow = "0 0 0 3px rgba(15,191,154,0.1)" }}
            onBlur={e =>  { e.target.style.borderColor = "#D1D5DB"; e.target.style.boxShadow = "none" }}
          />
        </div>

        {/* Email — disabled */}
        <div>
          <label style={labelStyle}>Email Address</label>
          <input
            type="email"
            value={email}
            disabled
            style={disabledInputStyle}
          />
          <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "4px" }}>
            Email changes require identity verification — contact support
          </p>
        </div>

        {/* Company */}
        <div>
          <label style={labelStyle}>Company</label>
          <input
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="e.g. Acme Inc."
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = "#0FBF9A"; e.target.style.boxShadow = "0 0 0 3px rgba(15,191,154,0.1)" }}
            onBlur={e =>  { e.target.style.borderColor = "#D1D5DB"; e.target.style.boxShadow = "none" }}
          />
        </div>

      </div>

      {/* Error */}
      {error && (
        <p style={{
          fontSize: "12px", color: "#DC2626",
          backgroundColor: "#FEF2F2", border: "1px solid #FECACA",
          borderRadius: "8px", padding: "8px 12px", margin: 0,
        }}>
          {error}
        </p>
      )}

      {/* Footer */}
      <div style={{
        paddingTop: "16px", borderTop: "1px solid #E5E7EB",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {saved ? (
          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 500, color: "#0FBF9A" }}>
            <Check className="h-3.5 w-3.5" /> Changes saved
          </span>
        ) : <span />}

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "8px",
            backgroundColor: "#0FBF9A", color: "#FFFFFF",
            fontSize: "14px", fontWeight: 600, border: "none",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.6 : 1,
          }}
          onMouseEnter={e => !saving && (e.currentTarget.style.backgroundColor = "#0da885")}
          onMouseLeave={e => !saving && (e.currentTarget.style.backgroundColor = "#0FBF9A")}
        >
          {saving ? (
            <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</>
          ) : (
            <><Save className="h-3.5 w-3.5" /> Save Changes</>
          )}
        </button>
      </div>

    </div>
  )
}
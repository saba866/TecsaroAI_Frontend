"use client";

import { useState } from "react";
import { countries } from "@/lib/countries";
import { goals } from "@/lib/goals";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { getLanguagesByCountry } from "@/lib/languages";


export default function ProjectCreateForm({ onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    website_url: "",
    country: "",
    language: "en",
    goal: ""
  });

const submit = async () => {
  setLoading(true)
  const { data } = await supabaseBrowser.auth.getSession()

  const res = await fetch("http://localhost:5000/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data?.session?.access_token}`
    },
    body: JSON.stringify(form)
  })

  const result = await res.json()

  onSuccess(result.project) // project saved here
  setLoading(false)
}

const languages = getLanguagesByCountry(form.country);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Create Project</h2>

      <input
        placeholder="Project Name"
        className="border p-2 w-full text-black"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Website domain (example.com)"
        className="border p-2 w-full text-black"
        value={form.website_url}
        onChange={(e) => setForm({ ...form, website_url: e.target.value })}
      />

      <select
        className="border p-2 w-full text-black"
        value={form.country}
        onChange={(e) => setForm({ ...form, country: e.target.value })}
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
        </select>
         
         <select
  className="border p-2 w-full text-black"
  value={form.language}
  onChange={(e) => setForm({ ...form, language: e.target.value })}
  disabled={!form.country}
>
  <option value="">Select Language</option>

  {languages.map((l) => (
    <option key={l.value} value={l.value}>
      {l.label}
    </option>
  ))}
</select>


      <select
        className="border p-2 w-full text-black"
        value={form.goal}
        onChange={(e) => setForm({ ...form, goal: e.target.value })}
      >
        <option value="">Select Goal</option>
        {goals.map((g) => (
          <option key={g.value} value={g.value}>{g.label}</option>
        ))}
      </select>

      <button
        disabled={loading}
        onClick={submit}
        className="bg-emerald-500 px-4 py-2 rounded text-black w-full"
      >
        {loading ? "Creating Project..." : "Next → Detect Website"}
      </button>
    </div>
  );
}

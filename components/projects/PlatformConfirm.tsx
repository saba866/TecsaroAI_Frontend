"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function PlatformConfirm({ project, onConfirmed }: any) {
  const [platform, setPlatform] = useState(project.platform);
  const [loading, setLoading] = useState(false);

  const confirm = async () => {
    setLoading(true);
    const { data } = await supabaseBrowser.auth.getSession();

    await fetch(`http://localhost:5000/projects/${project.projectId}/confirm-platform`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.session?.access_token}`
      },
      body: JSON.stringify({ platform })
    });

    onConfirmed();
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Confirm Website Platform</h2>

      <p className="text-gray-400">
        We detected: <span className="text-emerald-400 font-semibold">{platform}</span>
      </p>

      <select
        className="border p-2 w-full text-black"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="wordpress">WordPress</option>
        <option value="shopify">Shopify</option>
        <option value="webflow">Webflow</option>
        <option value="custom">Custom Code</option>
      </select>

      <button
        disabled={loading}
        onClick={confirm}
        className="bg-green-500 px-4 py-2 rounded text-black w-full"
      >
        {loading ? "Confirming..." : "Confirm & Continue"}
      </button>
    </div>
  );
}

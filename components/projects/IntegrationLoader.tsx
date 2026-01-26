"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function IntegrationLoader({ projectId }: any) {
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabaseBrowser.auth.getSession();

      const res = await fetch(
        `http://localhost:5000/projects/${projectId}/integration-steps`,
        {
          headers: {
            Authorization: `Bearer ${data?.session?.access_token}`
          }
        }
      );

      const result = await res.json();
      setSteps(result.steps);
    };

    load();
  }, [projectId]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Integration Steps</h2>

      <ol className="list-decimal pl-6 space-y-2 text-gray-300">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

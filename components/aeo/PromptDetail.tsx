"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function PromptDetail({ promptId, onClose }: any) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api(`/aeo/prompts/${promptId}`).then(setData);
  }, [promptId]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-full md:w-[450px] bg-card p-6 overflow-y-auto">
        <button onClick={onClose} className="mb-4 text-sm">Close</button>

        <h2 className="text-xl font-bold mb-4">Prompt Analysis</h2>

        <h3 className="font-semibold mb-2">Visibility</h3>
        {data.visibility.map((v: any, i: number) => (
          <div key={i} className="border p-2 rounded mb-2 text-sm">
            {v.engine}: {v.mentioned ? "Visible" : "Not visible"}
          </div>
        ))}

        <h3 className="font-semibold mt-4 mb-2">Answer Gaps</h3>
        {data.gaps.map((g: any) => (
          <div key={g.id} className="border p-3 rounded text-sm mb-2">
            {g.suggestion}
          </div>
        ))}
      </div>
    </div>
  );
}








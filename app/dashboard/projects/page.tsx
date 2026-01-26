// "use client";

// import { useEffect, useState } from "react";
// import { supabaseBrowser } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function ProjectsPage() {
//   const router = useRouter();
//   const [projects, setProjects] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState({
//     name: "",
//     domain: "",
//     country: "",
//     language: "",
//   });

//   // ======================
//   // Fetch projects
//   // ======================
//   useEffect(() => {
//     const fetchProjects = async () => {
//       const { data } = await supabaseBrowser.auth.getSession();
//       if (!data.session) {
//         router.push("/login");
//         return;
//       }

//       const res = await fetch("http://localhost:5000/projects", {
//         headers: {
//           Authorization: `Bearer ${data.session.access_token}`,
//         },
//       });

//       const result = await res.json();
//       setProjects(result);
//       setLoading(false);
//     };

//     fetchProjects();
//   }, [router]);

//   // ======================
//   // Create project
//   // ======================
//   const createProject = async () => {
//     const { data } = await supabaseBrowser.auth.getSession();
//     if (!data.session) return;

//     await fetch("http://localhost:5000/projects", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${data.session.access_token}`,
//       },
//       body: JSON.stringify(form),
//     });

//     setForm({ name: "", domain: "", country: "", language: "" });

//     // reload projects
//     const res = await fetch("http://localhost:5000/projects", {
//       headers: {
//         Authorization: `Bearer ${data.session.access_token}`,
//       },
//     });
//     const result = await res.json();
//     setProjects(result);
//   };

//   // ======================
//   // UI
//   // ======================
//   return (
//     <div className="p-10 text-white">
//       <h1 className="text-2xl font-bold mb-6">Your Projects</h1>

//       {/* Create Project */}
//       <div className="mb-8 space-y-2">
//         <input
//           placeholder="Project Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="border p-2 w-full text-black"
//         />
//         <input
//           placeholder="Domain (example.com)"
//           value={form.domain}
//           onChange={(e) => setForm({ ...form, domain: e.target.value })}
//           className="border p-2 w-full text-black"
//         />
//         <input
//           placeholder="Country"
//           value={form.country}
//           onChange={(e) => setForm({ ...form, country: e.target.value })}
//           className="border p-2 w-full text-black"
//         />
//         <input
//           placeholder="Language"
//           value={form.language}
//           onChange={(e) => setForm({ ...form, language: e.target.value })}
//           className="border p-2 w-full text-black"
//         />
//         <button
//           onClick={createProject}
//           className="bg-green-500 text-black px-4 py-2 rounded"
//         >
//           Create Project
//         </button>
//       </div>

//       {/* Project List */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="space-y-3">
//           {projects.map((p) => (
//             <div
//               key={p.id}
//               className="border border-white/20 p-4 rounded flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-semibold">{p.name}</p>
//                 <p className="text-sm text-gray-400">{p.domain}</p>
//               </div>
//               <button
//                 onClick={() => router.push(`/overview?projectId=${p.id}`)}
//                 className="text-emerald-400"
//               >
//                 Open Overview →
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }






"use client";

import { useState } from "react";
import ProjectCreateForm from "@/components/projects/ProjectCreateForm";
import PlatformConfirm from "@/components/projects/PlatformConfirm";
import IntegrationLoader from "@/components/projects/IntegrationLoader";

export default function ProjectsPage() {
  const [step, setStep] = useState<"create" | "confirm" | "integration">("create");
  const [project, setProject] = useState<any>(null);

  return (
    <div className="max-w-3xl mx-auto p-10 text-white">
      {step === "create" && (
        <ProjectCreateForm
          onSuccess={(data: any) => {
  setProject(data.project); // IMPORTANT
  setStep("confirm");
}}

        />
      )}

      {step === "confirm" && (
        <PlatformConfirm
          project={project}
          onConfirmed={() => setStep("integration")}
        />
      )}

      {step === "integration" && <IntegrationLoader projectId={project.projectId} />}
    </div>
  );
}

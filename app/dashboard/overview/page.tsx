



// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { supabaseBrowser } from "@/lib/supabaseClient";

// import SummaryTab from "@/components/Overview/SummaryTab";
// import PerformanceTab from "@/components/Overview/PerformanceTab";
// import KeywordsTab from "@/components/Overview/KeywordsTab";
// import PagesTab from "@/components/Overview/PagesTab";
// import GeoTab from "@/components/Overview/GeoTab";
// import DevicesTab from "@/components/Overview/DevicesTab";
// import AppearanceTab from "@/components/Overview/AppearanceTab";
// import IndexingTab from "@/components/Overview/IndexingTab";
// import SitemapsTab from "@/components/Overview/SitemapsTab";
// import AITab from "@/components/Overview/AITab";
// import CrawlTab from "@/components/Overview/CrawlTab";
// import SEOScoreTab from "@/components/Overview/SEOScoreTab";
// import AlertsTab from "@/components/Overview/AlertsTab";
// import ReportsTab from "@/components/Overview/ReportsTab";
// import IntegrationsTab from "@/components/Overview/IntegrationsTab";
// import PageSpeedTab from "@/components/Overview/PageSpeedTab";
// import AITrackingTab from "@/components/Overview/AITrackingTab";


// const TABS = [
//   "Summary",
//   "Performance",
//   "Keywords",
//   "Pages",
//   "Geo",
//   "Devices",
//   "Appearance",
//   "Indexing",
//   "Sitemaps",
//   "AI",
//   "Crawl",
//   "SEO Score",
//   "Alerts",
//   "Reports",
//   "Integrations",
//   "PageSpeed",
//   "AI Tracking",
// ];

// export default function OverviewPage() {
//   const params = useSearchParams();
//   const router = useRouter();
//   const projectId = params.get("projectId");

//   const [activeTab, setActiveTab] = useState("Summary");

//   const [data, setData] = useState<any>({
//     project: { name: "", domain: "" },
//     summary: {},
//     performance: [],
//     keywords: [],
//     pages: [],
//     geo: [],
//     devices: [],
//     appearance: [],
//     indexing: {},
//     sitemaps: [],
//     aiInsights: [],
//   });

//   useEffect(() => {
//     if (!projectId) return;

//     const load = async () => {
//       const { data: session } = await supabaseBrowser.auth.getSession();
//       if (!session.session) return router.push("/login");

//       const res = await fetch(`http://localhost:5000/overview/${projectId}`, {
//         headers: { Authorization: `Bearer ${session.session.access_token}` },
//       });

//       const json = await res.json();

//       setData({
//         project: json.project ?? { name: "", domain: "" },
//         summary: json.summary ?? {},
//         performance: json.performance ?? [],
//         keywords: json.keywords ?? [],
//         pages: json.pages ?? [],
//         geo: json.geo ?? [],
//         devices: json.devices ?? [],
//         appearance: json.appearance ?? [],
//         indexing: json.indexing ?? {},
//         sitemaps: json.sitemaps ?? [],
//         aiInsights: json.aiInsights ?? [],
//       });
//     };

//     load();
//   }, [projectId, router]);

//   const tabs: any = {
//     Summary: <SummaryTab data={data.summary} />,
//     Performance: <PerformanceTab rows={data.performance} />,
//     Keywords: <KeywordsTab rows={data.keywords} />,
//     Pages: <PagesTab rows={data.pages} />,
//     Geo: <GeoTab rows={data.geo} />,
//     Devices: <DevicesTab rows={data.devices} />,
//     Appearance: <AppearanceTab rows={data.appearance} />,
//     Indexing: <IndexingTab data={data.indexing} />,
//     Sitemaps: <SitemapsTab rows={data.sitemaps} />,
//       Crawl: <CrawlTab data={data.crawl} />,
//   "SEO Score": <SEOScoreTab data={data.seoScore} />,
//   Alerts: <AlertsTab data={data.alerts} />,
//   Reports: <ReportsTab />,
//   Integrations: <IntegrationsTab />,
//   PageSpeed: <PageSpeedTab data={data.pageSpeed} />,
//   "AI Tracking": <AITrackingTab data={data.aiTracking} />,
//    AI: <AITab rows={data.aiInsights} />,
//   };

//   return (
//     <div className="min-h-screen bg-zinc-950 p-10 text-gray-200">
//       <h1 className="text-2xl font-bold text-white">{data.project.name}</h1>
//       <p className="text-gray-400 mb-6">{data.project.domain}</p>

//       <div className="flex gap-2 mb-8 flex-wrap">
//         {TABS.map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-lg ${
//               activeTab === tab
//                 ? "bg-emerald-500 text-black"
//                 : "bg-zinc-800 text-gray-300"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       <div className="bg-zinc-900 p-6 rounded-xl">
//         {tabs[activeTab]}
//       </div>
//     </div>
//   );
// }




"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";

/* TABS */
import SummaryTab from "@/components/Overview/SummaryTab";
import PerformanceTab from "@/components/Overview/PerformanceTab";
import KeywordsTab from "@/components/Overview/KeywordsTab";
import PagesTab from "@/components/Overview/PagesTab";
import GeoTab from "@/components/Overview/GeoTab";
import DevicesTab from "@/components/Overview/DevicesTab";
import AppearanceTab from "@/components/Overview/AppearanceTab";
import IndexingTab from "@/components/Overview/IndexingTab";
import SitemapsTab from "@/components/Overview/SitemapsTab";
import AITab from "@/components/Overview/AITab";
import CrawlTab from "@/components/Overview/CrawlTab";
import PageSpeedTab from "@/components/Overview/PageSpeedTab";
import AITrackingTab from "@/components/Overview/AITrackingTab";

/* =========================
   TAB GROUPS (FINAL)
========================= */
const MAIN_TABS = [
  "Summary",
  "Performance",
  "Keywords",
  "Pages",
  "Geo",
  "Devices",
  "Indexing",
  "AI",
];

const MORE_TABS = [
  "Appearance",
  "Crawl",
  "Sitemaps",
  "PageSpeed",
  "AI Tracking",
];

export default function OverviewPage() {
  const params = useSearchParams();
  const router = useRouter();
  const projectId = params.get("projectId");

  const [activeTab, setActiveTab] = useState("Summary");
  const [showMore, setShowMore] = useState(false);

  const [data, setData] = useState<any>({
    project: { name: "", domain: "" },
    summary: {},
    performance: [],
    keywords: [],
    pages: [],
    geo: [],
    devices: [],
    appearance: [],
    indexing: {},
    sitemaps: [],
    aiInsights: [],
    crawl: {},
    pageSpeed: {},
    aiTracking: {},
  });

  useEffect(() => {
    if (!projectId) return;

    const load = async () => {
      const { data: session } = await supabaseBrowser.auth.getSession();
      if (!session.session) return router.push("/login");

      const res = await fetch(`http://localhost:5000/overview/${projectId}`, {
        headers: { Authorization: `Bearer ${session.session.access_token}` },
      });

      const json = await res.json();

      setData({
        project: json.project ?? { name: "", domain: "" },
        summary: json.summary ?? {},
        performance: json.performance ?? [],
        keywords: json.keywords ?? [],
        pages: json.pages ?? [],
        geo: json.geo ?? [],
        devices: json.devices ?? [],
        appearance: json.appearance ?? [],
        indexing: json.indexing ?? {},
        sitemaps: json.sitemaps ?? [],
        aiInsights: json.aiInsights ?? [],
        crawl: json.crawl ?? {},
        pageSpeed: json.pageSpeed ?? {},
        aiTracking: json.aiTracking ?? {},
      });
    };

    load();
  }, [projectId, router]);

  /* =========================
     TAB CONTENT MAP
  ========================= */
  const tabs: any = {
    Summary: <SummaryTab data={data.summary} />,
    Performance: <PerformanceTab rows={data.performance} />,
    Keywords: <KeywordsTab rows={data.keywords} />,
    Pages: <PagesTab rows={data.pages} />,
    Geo: <GeoTab rows={data.geo} />,
    Devices: <DevicesTab rows={data.devices} />,
    Indexing: <IndexingTab data={data.indexing} />,
    AI: <AITab rows={data.aiInsights} />,

    /* More */
    Appearance: <AppearanceTab rows={data.appearance} />,
    Crawl: <CrawlTab data={data.crawl} />,
    Sitemaps: <SitemapsTab rows={data.sitemaps} />,
    PageSpeed: <PageSpeedTab data={data.pageSpeed} />,
    "AI Tracking": <AITrackingTab data={data.aiTracking} />,
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-10 text-gray-200">
      <h1 className="text-2xl font-bold text-white">{data.project.name}</h1>
      <p className="text-gray-400 mb-6">{data.project.domain}</p>

      {/* =========================
         MAIN TABS
      ========================= */}
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        {MAIN_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setShowMore(false);
            }}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab
                ? "bg-emerald-500 text-black"
                : "bg-zinc-800 text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}

        {/* More dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-gray-300"
          >
            More ▾
          </button>

          {showMore && (
            <div className="absolute right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg w-48 z-50">
              {MORE_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setShowMore(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-zinc-800"
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================
         CONTENT
      ========================= */}
      <div className="bg-zinc-900 p-6 rounded-xl">
        {tabs[activeTab]}
      </div>
    </div>
  );
}

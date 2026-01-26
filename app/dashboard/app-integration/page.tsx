"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { CheckCircle, Plug, ExternalLink } from "lucide-react";

const platforms = [
  { key: "shopify", name: "Shopify", desc: "Ecommerce store integration" },
  { key: "webflow", name: "Webflow", desc: "SaaS & marketing websites" },
  { key: "wordpress", name: "WordPress", desc: "Blogs & content sites" },
  { key: "custom", name: "Custom Website", desc: "Any HTML website" },
];

export default function IntegrationsPage() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data: session } = await supabaseBrowser.auth.getSession();
    const res = await fetch("http://localhost:5000/integrations", {
      headers: { Authorization: `Bearer ${session.session.access_token}` },
    });
    const json = await res.json();
    setList(json);
    setLoading(false);
  };

  const connect = (key: string) => {
    if (key === "shopify") {
      const shop = prompt("Enter shop domain (example.myshopify.com)");
      if (!shop) return;
      window.location.href = `http://localhost:5000/shopify/connect?shop=${shop}`;
    }

    if (key === "webflow") {
      window.location.href = `http://localhost:5000/webflow/connect`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold">App Integrations</h1>
        <p className="text-gray-400 mt-1">
          Connect your platform to enable publishing, optimization and tracking
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-gray-500">Loading integrations...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {platforms.map(p => {
            const connected = list.find(i => i.platform === p.key);

            return (
              <div
                key={p.key}
                className="bg-[#0f1424] border border-white/5 rounded-xl p-6 hover:border-emerald-500/30 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{p.name}</h3>

                  {connected ? (
                    <CheckCircle className="text-emerald-400 w-5 h-5" />
                  ) : (
                    <Plug className="text-gray-500 w-5 h-5" />
                  )}
                </div>

                <p className="text-gray-400 text-sm mb-6">{p.desc}</p>

                {connected ? (
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 text-sm font-medium">
                      Connected
                    </span>
                    <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                      Manage <ExternalLink size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => connect(p.key)}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-2 rounded-lg transition"
                  >
                    Connect
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

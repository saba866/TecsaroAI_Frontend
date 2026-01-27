"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { CheckCircle, Plug, ExternalLink } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const { data: sessionData } = await supabaseBrowser.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(`${BACKEND_URL}/integrations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      setList(json);
    } catch (err) {
      console.error("Failed to load integrations", err);
    } finally {
      setLoading(false);
    }
  };

  const connect = (key: string) => {
    if (key === "shopify") {
      const shop = prompt("Enter your shop domain (example.myshopify.com)");
      if (!shop) return;

      window.location.href = `${BACKEND_URL}/shopify/install?shop=${shop}`;
      return;
    }

    if (key === "webflow") {
      window.location.href = `${BACKEND_URL}/webflow/connect`;
      return;
    }

    alert("Integration coming soon");
  };

  return (
    <div className="space-y-8">
      {/* Title */}
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
          {platforms.map((p) => {
            const connected = list.find((i) => i.platform === p.key);

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
                    <button
                      className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                      onClick={() =>
                        window.location.href = `/dashboard/${p.key}`
                      }
                    >
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

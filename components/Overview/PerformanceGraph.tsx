"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function PerformanceGraph({ rows = [] }: any) {
  const data = rows.map((r: any) => ({
    date: r.keys?.[0],
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
  }));

  if (!data.length) {
    return <p className="text-gray-400">No performance data available</p>;
  }

  return (
    <div className="bg-zinc-800 p-4 rounded-xl">
      <h3 className="text-white font-semibold mb-4">Performance Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line type="monotone" dataKey="clicks" stroke="#10b981" />
          <Line type="monotone" dataKey="impressions" stroke="#6366f1" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

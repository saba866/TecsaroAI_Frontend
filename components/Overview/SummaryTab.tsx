import MetricCard from "./MetricCard";

export default function SummaryTab({ data }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard title="Clicks" value={data.clicks ?? 0} />
      <MetricCard title="Impressions" value={data.impressions ?? 0} />
      <MetricCard title="CTR" value={`${data.ctr ?? 0}%`} />
      <MetricCard title="Position" value={data.position ?? 0} />
    </div>
  );
}

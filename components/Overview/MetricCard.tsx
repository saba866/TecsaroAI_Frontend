export default function MetricCard({ title, value }: any) {
  return (
    <div className="bg-zinc-800 p-5 rounded-xl">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

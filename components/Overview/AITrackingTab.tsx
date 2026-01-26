export default function AITrackingTab({ data = [] }: any) {
  if (!data.length) return <p className="text-gray-400">No tracking data yet</p>;

  return (
    <ul className="space-y-2">
      {data.map((d: any, i: number) => (
        <li key={i} className="bg-zinc-800 p-3 rounded">
          {d.title} → {d.change}%
        </li>
      ))}
    </ul>
  );
}

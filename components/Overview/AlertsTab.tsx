export default function AlertsTab({ data = [] }: any) {
  if (!data.length) return <p className="text-gray-400">No alerts yet</p>;

  return (
    <ul className="space-y-2">
      {data.map((a: any, i: number) => (
        <li key={i} className="bg-zinc-800 p-3 rounded">
          ⚠️ {a.message}
        </li>
      ))}
    </ul>
  );
}

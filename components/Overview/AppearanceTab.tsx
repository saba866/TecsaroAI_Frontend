export default function DataTable({ rows = [] }: any) {
  if (!rows.length) return <p className="text-gray-400">No data</p>;

  return (
    <ul className="space-y-2">
      {rows.map((r: any, i: number) => (
        <li
          key={i}
          className="bg-zinc-800 p-3 rounded-lg flex justify-between"
        >
          <span>{r.keys?.join(" / ")}</span>
          <span className="text-emerald-400">{r.clicks ?? 0} clicks</span>
        </li>
      ))}
    </ul>
  );
}

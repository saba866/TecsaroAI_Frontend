export default function AITab({ rows = [] }: any) {
  if (!rows.length) return <p className="text-gray-400">No AI insights yet</p>;

  return (
    <ul className="space-y-2">
      {rows.map((i: string, idx: number) => (
        <li key={idx} className="bg-zinc-800 p-3 rounded">🤖 {i}</li>
      ))}
    </ul>
  );
}

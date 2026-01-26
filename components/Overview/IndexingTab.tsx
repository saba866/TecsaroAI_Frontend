export default function IndexingTab({ data }: any) {
  return (
    <pre className="text-xs bg-zinc-800 p-4 rounded overflow-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

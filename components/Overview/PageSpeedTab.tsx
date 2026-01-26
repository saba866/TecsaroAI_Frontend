export default function PageSpeedTab({ data = {} }: any) {
  return (
    <pre className="bg-zinc-800 p-4 rounded text-xs overflow-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

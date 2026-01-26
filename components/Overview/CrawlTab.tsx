export default function CrawlTab({ data = {} }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold">Crawl Stats</h3>
      <pre className="bg-zinc-800 p-4 rounded text-xs overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

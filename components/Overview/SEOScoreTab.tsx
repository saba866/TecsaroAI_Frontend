export default function SEOScoreTab({ data = {} }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <Score title="Overall" value={data.overall ?? 0} />
      <Score title="Performance" value={data.performance ?? 0} />
      <Score title="Index" value={data.index ?? 0} />
      <Score title="CTR" value={data.ctr ?? 0} />
      <Score title="Crawl" value={data.crawl ?? 0} />
    </div>
  );
}

function Score({ title, value }: any) {
  return (
    <div className="bg-zinc-800 p-4 rounded text-center">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-emerald-400">{value}</p>
    </div>
  );
}

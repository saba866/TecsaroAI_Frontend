import DataTable from "./DataTable";

export default function KeywordsTab({ rows = [] }: any) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4">Keyword Intelligence</h3>
      <DataTable rows={rows} />
    </div>
  );
}

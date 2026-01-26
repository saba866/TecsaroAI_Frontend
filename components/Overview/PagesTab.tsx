import DataTable from "./DataTable";

export default function PagesTab({ rows = [] }: any) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4">Page Performance</h3>
      <DataTable rows={rows} />
    </div>
  );
}

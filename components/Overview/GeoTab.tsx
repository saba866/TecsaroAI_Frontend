import DataTable from "./DataTable";

export default function GeoTab({ rows = [] }: any) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4">Country Performance</h3>
      <DataTable rows={rows} />
    </div>
  );
}

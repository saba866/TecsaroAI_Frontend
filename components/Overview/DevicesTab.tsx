import DataTable from "./DataTable";

export default function DevicesTab({ rows = [] }: any) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4">Device Performance</h3>
      <DataTable rows={rows} />
    </div>
  );
}

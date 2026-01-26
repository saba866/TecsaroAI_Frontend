import PerformanceGraph from "./PerformanceGraph";
import DataTable from "./DataTable";

export default function PerformanceTab({ rows }: any) {
  return (
    <div className="space-y-6">
      <PerformanceGraph rows={rows} />
      <DataTable rows={rows} />
    </div>
  );
}

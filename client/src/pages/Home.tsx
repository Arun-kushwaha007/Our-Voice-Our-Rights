import React, { useEffect, useState } from "react";
import { getDistricts, getDistrictSummary } from "../utils/api";
import DistrictSelector from "../components/DistrictSelector";
import PerformanceCard from "../components/PerformanceCard";

export default function Home() {
  const [districts, setDistricts] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    getDistricts().then((d) => setDistricts(d)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selected) return;
    getDistrictSummary(selected).then((s) => setSummary(s)).catch(console.error);
  }, [selected]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Our Voice — MGNREGA District Dashboard</h1>
      <DistrictSelector options={districts} value={selected} onChange={setSelected} />
      {summary ? (
        <PerformanceCard summary={summary} />
      ) : (
        <div className="mt-6 text-gray-500">Select a district to view summary</div>
      )}
    </div>
  );
}

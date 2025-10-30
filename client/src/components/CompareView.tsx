import React from "react";
import type { IDistrictSnapshot } from "../../../server/src/models/District";
import PerformanceCard from "./PerformanceCard";

interface CompareViewProps {
  comparison: {
    a: { latest: IDistrictSnapshot };
    b: { latest: IDistrictSnapshot };
  };
}

const CompareView: React.FC<CompareViewProps> = ({ comparison }) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-bold mb-4">{comparison.a.latest.districtName}</h2>
        <PerformanceCard summary={comparison.a} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">{comparison.b.latest.districtName}</h2>
        <PerformanceCard summary={comparison.b} />
      </div>
    </div>
  );
};

export default CompareView;

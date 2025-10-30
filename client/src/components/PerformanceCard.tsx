import React from "react";
import TrendChart from "./TrendChart";

export default function PerformanceCard({ summary }: any) {
  const latest = summary.latest;
  const trend = summary.trend?.map((t: any) => ({
    label: `${t.month}/${t.year}`,
    value: t.metrics?.fundsReleased || 0
  })).reverse();

  return (
    <div className="mt-6 p-4 border rounded shadow-sm bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{latest.districtName}</h2>
          <div className="text-sm text-gray-500">{latest.state}</div>
        </div>
        <div className="text-sm text-gray-600">
          Last updated: {new Date(latest.fetchedAt).toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Beneficiaries</div>
          <div className="text-2xl font-bold">{latest.metrics.beneficiaries}</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Person-days</div>
          <div className="text-2xl font-bold">{latest.metrics.daysWorked}</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Funds Released</div>
          <div className="text-2xl font-bold">{latest.metrics.fundsReleased}</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-sm text-gray-500">Payments on time</div>
          <div className="text-2xl font-bold">{latest.metrics.paymentsOnTimePct || 0}%</div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm text-gray-600 mb-2">12-month trend (Funds Released)</h3>
        <TrendChart data={trend} />
      </div>
    </div>
  );
}

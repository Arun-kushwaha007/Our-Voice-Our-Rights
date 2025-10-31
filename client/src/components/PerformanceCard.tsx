import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { IDistrictSnapshot } from "../types";
import { PERFORMANCE_THRESHOLDS } from "../utils/constants";

interface PerformanceCardProps {
  summary: {
    districtName: string;
    latest: IDistrictSnapshot;
  };
}

const getPerformanceLevel = (metric: keyof typeof PERFORMANCE_THRESHOLDS, value: number) => {
  if (value >= PERFORMANCE_THRESHOLDS[metric].good) return "good";
  if (value <= PERFORMANCE_THRESHOLDS[metric].poor) return "poor";
  return "needsImprovement";
};

const PerformanceCard: React.FC<PerformanceCardProps> = ({ summary }) => {
  const { t } = useTranslation();
  const { metrics } = summary.latest;

  const performanceData = [
    { label: "beneficiaries", value: metrics.beneficiaries, unit: "" },
    { label: "fundsReleased", value: metrics.fundsReleased, unit: "Cr" },
    { label: "daysWorked", value: metrics.daysWorked, unit: "" },
    { label: "paymentsOnTime", value: metrics.paymentsOnTimePct || 0, unit: "%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white mb-4">{summary.districtName}</h3>
        <dl className="space-y-4">
          {performanceData.map(({ label, value, unit }) => {
            const level = getPerformanceLevel(label as keyof typeof PERFORMANCE_THRESHOLDS, value);
            return (
              <div key={label} className="flex justify-between items-center">
                <dt className="text-sm font-medium text-gray-400">{t(label)}</dt>
                <dd className="flex items-baseline text-lg font-semibold text-white">
                  {value.toLocaleString()} {unit}
                  <span className={`ml-3 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    level === "good" ? "bg-green-900 text-green-200" :
                    level === "poor" ? "bg-red-900 text-red-200" :
                    "bg-yellow-900 text-yellow-200"
                  }`}>
                    {t(level)}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </motion.div>
  );
};

export default PerformanceCard;

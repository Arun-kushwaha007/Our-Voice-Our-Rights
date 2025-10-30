import React from "react";
import { useTranslation } from "react-i18next";
import type { IDistrictSnapshot } from "../../../server/src/models/District";
import { PERFORMANCE_THRESHOLDS } from "../utils/constants";

interface PerformanceCardProps {
  summary: {
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
    { label: "beneficiaries", value: metrics.beneficiaries },
    { label: "fundsReleased", value: metrics.fundsReleased },
    { label: "daysWorked", value: metrics.daysWorked },
    { label: "paymentsOnTime", value: metrics.paymentsOnTimePct || 0 },
  ];

  return (
    <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{t("performanceSummary")}</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {performanceData.map(({ label, value }) => {
            const level = getPerformanceLevel(label as keyof typeof PERFORMANCE_THRESHOLDS, value);
            return (
              <div
                key={label}
                className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt className="text-sm font-medium text-gray-500">{t(label)}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {value}
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    level === "good" ? "bg-green-100 text-green-800" :
                    level === "poor" ? "bg-red-100 text-red-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {t(level)}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
};

export default PerformanceCard;

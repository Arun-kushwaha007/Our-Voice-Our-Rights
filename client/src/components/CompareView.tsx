import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { IDistrictSnapshot } from "../types";
import PerformanceCard from "./PerformanceCard";

interface CompareViewProps {
  comparison: {
    a: { districtName: string; latest: IDistrictSnapshot };
    b: { districtName: string; latest: IDistrictSnapshot };
  };
}

const CompareView: React.FC<CompareViewProps> = ({ comparison }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        {t("compareDistricts")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PerformanceCard summary={comparison.a} />
        <PerformanceCard summary={comparison.b} />
      </div>
    </motion.div>
  );
};

export default CompareView;

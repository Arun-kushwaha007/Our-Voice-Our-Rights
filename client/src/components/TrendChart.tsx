import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { IDistrictSnapshot } from "../types";

interface TrendChartProps {
  trendData: IDistrictSnapshot[];
}

const TrendChart: React.FC<TrendChartProps> = ({ trendData }) => {
  const { t } = useTranslation();

  const data = trendData.map((d) => ({
    name: `${d.month}/${d.year}`,
    [t("beneficiaries")]: d.metrics.beneficiaries,
    [t("fundsReleased")]: d.metrics.fundsReleased,
  })).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-4">{t("trend")}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="name" stroke="#A0AEC0" />
          <YAxis stroke="#A0AEC0" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(26, 32, 44, 0.8)",
              borderColor: "#4A5568",
              color: "#E2E8F0",
            }}
          />
          <Legend wrapperStyle={{ color: "#E2E8F0" }} />
          <Line type="monotone" dataKey={t("beneficiaries")} stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey={t("fundsReleased")} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default TrendChart;

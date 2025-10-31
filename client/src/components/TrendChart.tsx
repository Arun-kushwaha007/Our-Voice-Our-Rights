import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { IDistrictSnapshot } from '@/types';
import { formatNumber } from '@/utils/formatters';

interface TrendChartProps {
  trendData: IDistrictSnapshot[];
  districtName: string;
}

const TrendChart: React.FC<TrendChartProps> = ({ trendData, districtName }) => {
  const { t } = useTranslation();

  // Define a stable order for months
  const monthOrder: { [key: string]: number } = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12,
  };

  // Sort data chronologically for a proper time-series chart
  const sortedData = [...trendData].sort((a, b) => {
    const yearA = parseInt(a.fin_year.split('-')[0]);
    const yearB = parseInt(b.fin_year.split('-')[0]);
    if (yearA !== yearB) return yearA - yearB;

    const monthA = monthOrder[a.month.toUpperCase()];
    const monthB = monthOrder[b.month.toUpperCase()];
    return monthA - monthB;
  });

   const chartData = sortedData.map(d => ({
    name: `${d.month.substring(0, 3)} ${d.fin_year}`,
    performanceIndex: d.performanceIndex,
    avgDaysEmployment: d.Average_days_of_employment_provided_per_Household,
    womenParticipation: d.women_persondays_percent,
    timelyPayments: d.percentage_payments_gererated_within_15_days,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-4">{t('trendFor', { district: districtName })}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="name" stroke="#A0AEC0" />
          <YAxis stroke="#A0AEC0" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(26, 32, 44, 0.8)',
              borderColor: '#4A5568',
              color: '#E2E8F0',
            }}
            formatter={(value: number) => formatNumber(value)}
          />
          <Legend wrapperStyle={{ color: '#E2E8F0' }} />
          <Line type="monotone" dataKey="performanceIndex" name={t('performanceIndex')} stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="avgDaysEmployment" name={t('avgDaysEmployment')} stroke="#82ca9d" />
          <Line type="monotone" dataKey="womenParticipation" name={t('womenParticipation')} stroke="#ffc658" />
          <Line type="monotone" dataKey="timelyPayments" name={t('timelyPayments')} stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default TrendChart;

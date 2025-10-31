import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type{ IDistrictSnapshot } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { formatNumber } from '../utils/formatters';

interface CompareViewProps {
  district1Data: IDistrictSnapshot;
  district2Data: IDistrictSnapshot;
}

const CompareView: React.FC<CompareViewProps> = ({ district1Data, district2Data }) => {
  const { t } = useTranslation();

  const metricsToCompare = [
    { key: 'performanceIndex', name: t('performanceIndex') },
    { key: 'average_days_of_employment_provided_per_household', name: t('avgDaysEmployment') },
    { key: 'women_persondays_percent', name: t('womenParticipation') },
    { key: 'percentage_payments_generated_within_15_days', name: t('timelyPayments') },
    { key: 'total_no_of_jobcards_issued', name: t('jobCardsIssued') },
  ];

  const comparisonData = metricsToCompare.map(metric => ({
    name: metric.name,
    [district1Data.district_name]: district1Data[metric.key as keyof IDistrictSnapshot],
    [district2Data.district_name]: district2Data[metric.key as keyof IDistrictSnapshot],
  }));

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="mt-12"
    >
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        {`${district1Data.district_name} vs ${district2Data.district_name}`}
      </h2>
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
            <XAxis type="number" stroke="#9CA3AF" />
            <YAxis type="category" dataKey="name" stroke="#9CA3AF" width={150} tick={{ fill: '#E5E7EB' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#E5E7EB' }}
              formatter={(value: number) => formatNumber(value)}
            />
            <Legend wrapperStyle={{ color: '#E5E7EB' }} />
            <Bar dataKey={district1Data.district_name} fill="#3B82F6" radius={[0, 10, 10, 0]} />
            <Bar dataKey={district2Data.district_name} fill="#10B981" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {metricsToCompare.map((metric, index) => {
            const value1 = district1Data[metric.key as keyof IDistrictSnapshot] as number;
            const value2 = district2Data[metric.key as keyof IDistrictSnapshot] as number;
            const winner = value1 > value2 ? district1Data.district_name : district2Data.district_name;

            return (
                 <motion.div key={metric.key} custom={index} variants={cardVariants} className="bg-gray-800/50 p-5 rounded-xl shadow-md">
                     <h4 className="text-lg font-semibold text-gray-300">{metric.name}</h4>
                     <div className="flex justify-between items-baseline mt-2">
                         <span className="text-2xl font-bold text-blue-400">{formatNumber(value1)}</span>
                         <span className="text-sm text-gray-500">{district1Data.district_name}</span>
                     </div>
                     <div className="flex justify-between items-baseline mt-1">
                         <span className="text-2xl font-bold text-green-400">{formatNumber(value2)}</span>
                         <span className="text-sm text-gray-500">{district2Data.district_name}</span>
                     </div>
                     <p className="text-right text-xs mt-2 text-gray-400">
                         {t('highlight')}: <span className="font-bold text-yellow-400">{winner}</span>
                     </p>
                 </motion.div>
            );
        })}
      </div>
    </motion.div>
  );
};

export default CompareView;

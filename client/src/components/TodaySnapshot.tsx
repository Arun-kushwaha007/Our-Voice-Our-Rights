import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { IDistrictSnapshot } from '../types';
import { formatNumber } from '../utils/formatters';
import { Users, Briefcase, IndianRupee } from 'lucide-react';
import AudioGuide from './AudioGuide';

interface TodaySnapshotProps {
  districtData: IDistrictSnapshot;
}

const TodaySnapshot: React.FC<TodaySnapshotProps> = ({ districtData }) => {
  const { t } = useTranslation();

  const metrics = [
    {
      label: t('workersEmployed'),
      value: districtData.Total_No_of_Workers,
      icon: Users,
      color: 'text-india-green',
    },
    {
      label: t('projectsRunning'),
      value: districtData.Number_of_Ongoing_Works,
      icon: Briefcase,
      color: 'text-india-blue',
    },
    {
      label: t('wagesPaid'),
      value: districtData.Wages,
      icon: IndianRupee,
      color: 'text-saffron',
      isCurrency: true,
    },
  ];

  const summaryText = `
    ${t('todaySnapshot')}.
    ${t('workersEmployed')}: ${districtData.Total_No_of_Workers}.
    ${t('projectsRunning')}: ${districtData.Number_of_Ongoing_Works}.
    ${t('wagesPaid')}: ${formatNumber(districtData.Wages, true)}.
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-dark-text">{t('todaySnapshot')}</h3>
        <AudioGuide text={summaryText} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map(metric => (
          <div key={metric.label} className="bg-light-bg p-4 rounded-lg">
            <div className="flex items-center">
              <metric.icon className={`w-8 h-8 mr-4 ${metric.color}`} />
              <div>
                <p className="text-sm text-gray-500">{metric.label}</p>
                <p className="text-2xl font-semibold text-dark-text">
                  {formatNumber(metric.value, metric.isCurrency)}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <AudioGuide text={`${metric.label}: ${formatNumber(metric.value, metric.isCurrency)}`} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TodaySnapshot;

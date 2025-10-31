import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { IDistrictSnapshot } from '../types';
import { formatNumber } from '../utils/formatters';
import { TrendingUp, TrendingDown, Clock, Users, DollarSign, Percent } from 'lucide-react';
import AudioGuide from './AudioGuide';

interface PerformanceCardProps {
  districtData: IDistrictSnapshot;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ districtData }) => {
  const { t } = useTranslation();
  const metrics = [
    {
      label: t('performanceIndex'),
      value: districtData.performanceIndex,
      icon: districtData.performanceIndex > 50 ? TrendingUp : TrendingDown,
      color: districtData.performanceIndex > 50 ? 'text-green-500' : 'text-red-500',
    },
    {
      label: t('avgDaysEmployment'),
      value: districtData.Average_days_of_employment_provided_per_Household,
      icon: Clock,
      color: 'text-blue-500',
    },
    {
      label: t('jobCardsIssued'),
      value: districtData.Total_No_of_JobCards_issued,
      icon: Users,
      color: 'text-indigo-500',
    },
    {
      label: t('totalExpenditure'),
      value: districtData.total_expenditure,
      icon: DollarSign,
      color: 'text-purple-500',
      isCurrency: true,
    },
    {
      label: t('womenParticipation'),
      value: districtData.women_persondays_percent,
      icon: Percent,
      color: 'text-pink-500',
    },
  ];

  const summaryText = `
    ${districtData.district_name}.
    ${t('performanceIndex')}: ${districtData.performanceIndex}.
    ${t('avgDaysEmployment')}: ${districtData.Average_days_of_employment_provided_per_Household}.
    ${t('jobCardsIssued')}: ${districtData.Total_No_of_JobCards_issued}.
    ${t('totalExpenditure')}: ${formatNumber(districtData.total_expenditure, true)}.
    ${t('womenParticipation')}: ${districtData.women_persondays_percent}%.
  `;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-dark-text">{districtData.district_name}</h3>
        <AudioGuide text={summaryText} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map(metric => (
          <motion.div
            key={metric.label}
            variants={itemVariants}
            className="bg-light-bg p-4 rounded-lg flex items-center"
          >
            <metric.icon className={`w-8 h-8 mr-4 ${metric.color}`} />
            <div>
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className="text-2xl font-semibold text-dark-text">
                {formatNumber(metric.value, metric.isCurrency)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PerformanceCard;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { IDistrictSnapshot } from '@/types';
import { formatNumber } from '@/utils/formatters';
import { TrendingUp, TrendingDown, Clock, Users, DollarSign, Percent } from 'lucide-react';

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
      color: districtData.performanceIndex > 50 ? 'text-green-400' : 'text-red-400',
    },
    {
      label: t('avgDaysEmployment'),
      value: districtData.Average_days_of_employment_provided_per_Household,
      icon: Clock,
      color: 'text-blue-400',
    },
    {
      label: t('jobCardsIssued'),
      value: districtData.Total_No_of_JobCards_issued,
      icon: Users,
      color: 'text-indigo-400',
    },
    {
      label: t('totalExpenditure'),
      value: districtData.Total_Exp,
      icon: DollarSign,
      color: 'text-purple-400',
      isCurrency: true,
    },
     {
      label: t('womenParticipation'),
      value: districtData.women_persondays_percent,
      icon: Percent,
      color: 'text-pink-400',
    },
  ];

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
      className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-lg shadow-lg p-6"
    >
      <h3 className="text-2xl font-bold text-white mb-6">{districtData.district_name}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map(metric => (
          <motion.div
            key={metric.label}
            variants={itemVariants}
            className="bg-gray-900/50 p-4 rounded-lg flex items-center"
          >
            <metric.icon className={`w-8 h-8 mr-4 ${metric.color}`} />
            <div>
              <p className="text-sm text-gray-400">{metric.label}</p>
              <p className="text-2xl font-semibold text-white">
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

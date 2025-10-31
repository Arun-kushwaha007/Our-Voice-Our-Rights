import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { IDistrictSnapshot } from '../types';
import AudioGuide from './AudioGuide';
import PictogramChart from './PictogramChart';
import { Users } from 'lucide-react';

interface YearlyComparisonProps {
  yearlyData: IDistrictSnapshot[];
}

const YearlyComparison: React.FC<YearlyComparisonProps> = ({ yearlyData }) => {
  const { t } = useTranslation();

  // TODO: Replace dummy data with real data from the backend.
  // The backend currently only provides data for the current year.
  // A new endpoint will be needed to fetch data for the previous year.
  const thisYearData = yearlyData[0];
  const lastYearData = { ...thisYearData, Total_No_of_Workers: thisYearData.Total_No_of_Workers * 0.8 };

  const summaryText = `
    ${t('yearlyComparison')}.
    ${t('thisYear')}: ${thisYearData.Total_No_of_Workers}.
    ${t('lastYear')}: ${lastYearData.Total_No_of_Workers}.
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mt-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-dark-text">{t('yearlyComparison')}</h3>
        <AudioGuide text={summaryText} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-dark-text mb-4">{t('thisYear')}</h4>
          <PictogramChart value={thisYearData.Total_No_of_Workers} icon={Users} color="text-india-green" />
          <div className="mt-4">
            <AudioGuide text={`${t('thisYear')}: ${thisYearData.Total_No_of_Workers}`} />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-dark-text mb-4">{t('lastYear')}</h4>
          <PictogramChart value={lastYearData.Total_No_of_Workers} icon={Users} color="text-saffron" />
          <div className="mt-4">
            <AudioGuide text={`${t('lastYear')}: ${lastYearData.Total_No_of_Workers}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default YearlyComparison;

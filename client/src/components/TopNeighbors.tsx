import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const TopNeighbors: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mt-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-dark-text">{t('topNeighbors')}</h3>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <Shield className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-500">{t('comingSoon')}</p>
      </div>
    </motion.div>
  );
};

export default TopNeighbors;

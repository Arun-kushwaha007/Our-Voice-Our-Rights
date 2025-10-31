import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StateTileProps {
  stateName: string;
}

const StateTile: React.FC<StateTileProps> = ({ stateName }) => {
  const { t } = useTranslation();

  return (
    <Link to={`/state/${stateName}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center"
      >
        <MapPin className="w-16 h-16 text-india-blue mb-4" />
        <h3 className="text-xl font-bold text-dark-text">{stateName}</h3>
        <p className="text-gray-500 font-devanagari">{t(stateName)}</p>
      </motion.div>
    </Link>
  );
};

export default StateTile;

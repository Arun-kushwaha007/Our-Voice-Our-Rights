import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface PictogramChartProps {
  value: number;
  icon: React.ElementType;
  color: string;
}

const PictogramChart: React.FC<PictogramChartProps> = ({ value, icon: Icon, color }) => {
  const numIcons = Math.ceil(value / 1000); // 1 icon per 1000 people

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="flex flex-wrap"
    >
      {Array.from({ length: numIcons }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="m-1"
        >
          <Icon className={`w-8 h-8 ${color}`} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PictogramChart;

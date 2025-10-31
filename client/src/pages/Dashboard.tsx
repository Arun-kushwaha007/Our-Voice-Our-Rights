import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import TodaySnapshot from '../components/TodaySnapshot';
import YearlyComparison from '../components/YearlyComparison';
import TopNeighbors from '../components/TopNeighbors';
import type { IDistrictSnapshot } from '../types';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { stateName, districtName } = useParams<{ stateName: string; districtName: string }>();

  // Component State
  const [districtData, setDistrictData] = useState<IDistrictSnapshot | null>(null);
  const [trendData, setTrendData] = useState<IDistrictSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch district data on component mount
  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        setError(null);
        const response = await axios.get<{ data: IDistrictSnapshot[] }>(`/api/districts/states/${stateName}/districts/${districtName}`);
        const fetchedDistrictData = response.data.data || [];

        if (Array.isArray(fetchedDistrictData) && fetchedDistrictData.length > 0) {
          setDistrictData(fetchedDistrictData[0]);
          setTrendData(fetchedDistrictData);
        } else {
          throw new Error('API response for district data is not a valid array.');
        }
      } catch (err) {
        setError(t('errorFetchingDistrictData'));
      } finally {
        setLoading(false);
      }
    };
    fetchDistrictData();
  }, [stateName, districtName, t]);

  return (
    <main className="min-h-screen bg-light-bg text-dark-text p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center my-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-devanagari">{districtName}</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto font-devanagari">{stateName}</p>
        </motion.header>

        {loading && <Loader />}
        
        {error && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-10 text-red-500">
            <p>{error}</p>
          </motion.div>
        )}

        {!loading && districtData && (
          <div>
            <TodaySnapshot districtData={districtData} />
            <YearlyComparison yearlyData={trendData} />
            <TopNeighbors />
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;

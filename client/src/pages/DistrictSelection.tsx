import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { MapPin } from 'lucide-react';
import type { IDistrictSnapshot } from '../types';

interface DistrictTileProps {
  districtName: string;
  stateName: string;
}

const DistrictTile: React.FC<DistrictTileProps> = ({ districtName, stateName }) => {
  const { t } = useTranslation();

  return (
    <Link to={`/state/${stateName}/district/${districtName}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center"
      >
        <MapPin className="w-16 h-16 text-india-blue mb-4" />
        <h3 className="text-xl font-bold text-dark-text">{districtName}</h3>
        <p className="text-gray-500 font-devanagari">{t(districtName)}</p>
      </motion.div>
    </Link>
  );
};

const DistrictSelection: React.FC = () => {
  const { t } = useTranslation();
  const { stateName } = useParams<{ stateName: string }>();

  // Component State
  const [districts, setDistricts] = useState<IDistrictSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch districts on component mount
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setError(null);
        const response = await axios.get<{ data: IDistrictSnapshot[] }>(`/api/districts/states/${stateName}`);
        const fetchedDistricts = response.data.data || [];

        if (Array.isArray(fetchedDistricts)) {
          setDistricts(fetchedDistricts);
        } else {
          throw new Error('API response for districts is not a valid array.');
        }
      } catch (err) {
        setError(t('errorFetchingDistrictData'));
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, [stateName, t]);

  return (
    <main className="min-h-screen bg-light-bg text-dark-text p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center my-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-devanagari">{t('selectDistrict')}</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto font-devanagari">{t(stateName || '')}</p>
        </motion.header>

        {loading && <Loader />}
        
        {error && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-10 text-red-500">
            <p>{error}</p>
          </motion.div>
        )}

        {!loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {districts.map(district => (
              <DistrictTile key={district.district_name} districtName={district.district_name} stateName={stateName!} />
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default DistrictSelection;

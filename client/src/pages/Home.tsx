import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loader from '../components/Loader';
import StateTile from '../components/StateTile';
import useGeolocation from '../hooks/useGeolocation';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { location, error: geoError } = useGeolocation();

  // Component State
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch states on component mount
  useEffect(() => {
    console.log("Fetching states...");
    const fetchStates = async () => {
      try {
        setError(null);
        const response = await axios.get<{ data: string[] }>('/api/districts/states');
        console.log("API response:", response);
        const fetchedStates = response.data.data || [];

        if (Array.isArray(fetchedStates)) {
          const uniqueStates = [...new Set(fetchedStates)];
          setStates(uniqueStates);
        } else {
          throw new Error('API response for states is not a valid array.');
        }
      } catch (err) {
        console.error("Error fetching states:", err);
        setError(t('errorFetchingStates'));
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, [t]);

  // Handle geolocation
  useEffect(() => {
    if (location) {
      // TODO: Implement reverse geocoding to get state and district from location
      // For now, we'll just log the location
      console.log('User location:', location);
    }
  }, [location]);

  return (
    <main className="min-h-screen bg-light-bg text-dark-text p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center my-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-devanagari">{t('appTitle')}</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto font-devanagari">{t('appSubtitle')}</p>
        </motion.header>

        {loading && <Loader />}
        
        {(error || geoError) && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-10 text-red-500">
            <p>{error || geoError}</p>
          </motion.div>
        )}

        {!loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {states.map(state => (
              <StateTile key={state} stateName={state} />
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Home;

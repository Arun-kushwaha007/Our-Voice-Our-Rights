import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import StateSelector from '../components/StateSelector';
import DistrictSelector from '../components/DistrictSelector';
import PerformanceCard from '../components/PerformanceCard';
import TrendChart from '../components/TrendChart';
import Loader from '../components/Loader';
import type{ IDistrictSnapshot } from '../types';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const {
    state: { selectedDistrict },
    dispatch,
  } = useAppContext();

  // Component State
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>('UTTAR PRADESH');
  const [districtsInState, setDistrictsInState] = useState<IDistrictSnapshot[]>([]);
  const [trendData, setTrendData] = useState<IDistrictSnapshot[]>([]);

  // Loading States
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingStateData, setLoadingStateData] = useState(false);
  const [loadingTrendData, setLoadingTrendData] = useState(false);
  
  // Error State
  const [error, setError] = useState<string | null>(null);

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setError(null);
        const response = await axios.get<{ data: string[] }>('/api/v1/districts/states');
        setStates(response.data.data || []);
      } catch (err) {
        setError(t('errorFetchingStates'));
        console.error('Error fetching states:', err);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, [t]);

  // Fetch latest district data when a state is selected
  useEffect(() => {
    if (!selectedState) return;

    const fetchStateData = async () => {
      setLoadingStateData(true);
      setError(null);
      dispatch({ type: 'SET_SELECTED_DISTRICT', payload: '' }); // Clear district selection
      setTrendData([]); // Clear old trend data

      try {
        const response = await axios.get<{ data: IDistrictSnapshot[] }>(`/api/v1/districts/states/${selectedState}`);
        setDistrictsInState(response.data.data || []);
      } catch (err) {
        setError(t('errorFetchingDistrictData'));
        console.error(`Error fetching data for state ${selectedState}:`, err);
        setDistrictsInState([]);
      } finally {
        setLoadingStateData(false);
      }
    };

    fetchStateData();
  }, [selectedState, t, dispatch]);

  // Fetch trend data when a district is selected
  useEffect(() => {
    if (!selectedDistrict || !selectedState) return;

    const fetchTrendData = async () => {
      setLoadingTrendData(true);
      setError(null);
      try {
        const response = await axios.get<{ data: IDistrictSnapshot[] }>(`/api/v1/districts/states/${selectedState}/districts/${selectedDistrict}`);
        setTrendData(response.data.data || []);
      } catch (err) {
        setError(t('errorFetchingTrendData'));
        console.error(`Error fetching trend data for ${selectedDistrict}:`, err);
        setTrendData([]);
      } finally {
        setLoadingTrendData(false);
      }
    };

    fetchTrendData();
  }, [selectedDistrict, selectedState, t]);

  // Memoized data for selectors and performance card
  const districtOptions = useMemo(
    () => districtsInState.map(d => d.district_name).sort(),
    [districtsInState]
  );

  const selectedDistrictData = useMemo(
    () => districtsInState.find(d => d.district_name === selectedDistrict),
    [districtsInState, selectedDistrict]
  );
  
  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center my-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">{t('appTitle')}</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">{t('appSubtitle')}</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
        >
          <StateSelector
            states={states}
            selectedState={selectedState}
            onStateChange={setSelectedState}
            />
          <DistrictSelector
            options={districtOptions}
            value={selectedDistrict || ''}
            onChange={(value) => dispatch({ type: 'SET_SELECTED_DISTRICT', payload: value })}
            label={t('selectDistrict')}
            disabled={loadingStateData || !selectedState}
            />
        </motion.div>

        {(loadingStates || loadingStateData) && <Loader />}
        
        {error && !loadingStateData && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-10 text-red-400">
            <p>{error}</p>
          </motion.div>
        )}

        {!loadingStateData && selectedDistrictData && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10">
            <PerformanceCard districtData={selectedDistrictData} />
            {loadingTrendData && (
              <>
              <Loader />
              <p className="text-center text-gray-400 mt-2">{t('loadingTrendData')}</p>
              </>
            )}
            {!loadingTrendData && trendData.length > 0 && (
              <TrendChart trendData={trendData} districtName={selectedDistrict || ''} />
            )}
            </motion.div>
        )}
      </div>
    </main>
  );
};

export default Home;

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import StateSelector from '../components/StateSelector';
import DistrictSelector from '../components/DistrictSelector';
import CompareView from '../components/CompareView';
import Loader from '../components/Loader';
import type{ IDistrictSnapshot } from '../types';

const Compare: React.FC = () => {
  const { t } = useTranslation();
  const {
    state: { comparisonDistricts },
    dispatch,
  } = useAppContext();
  const [d1, d2] = comparisonDistricts;

  // Component State
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [districtsInState, setDistrictsInState] = useState<IDistrictSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get<{ data: string[] }>('/api/districts/states');
        setStates(response.data.data || []);
      } catch (err) {
        setError(t('errorFetchingStates'));
        console.error('Error fetching states:', err);
      }
    };
    fetchStates();
  }, [t]);

  // Fetch latest district data when a state is selected
  useEffect(() => {
    if (!selectedState) return;

    const fetchStateData = async () => {
      setLoading(true);
      setError(null);
      dispatch({ type: 'SET_COMPARISON_DISTRICT', payload: { index: 0, districtId: null } });
      dispatch({ type: 'SET_COMPARISON_DISTRICT', payload: { index: 1, districtId: null } }); // Clear selections on state change
      try {
        const response = await axios.get<{ data: IDistrictSnapshot[] }>(`/api/v1/districts/states/${selectedState}`);
        setDistrictsInState(response.data.data || []);
      } catch (err) {
        setError(t('errorFetchingDistrictData'));
        console.error(`Error fetching data for state ${selectedState}:`, err);
        setDistrictsInState([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStateData();
  }, [selectedState, t, dispatch]);

  // Memoized data for selectors and comparison view
  const districtOptions = useMemo(
    () => districtsInState.map(d => d.district_name).sort(),
    [districtsInState]
  );

  const district1Data = useMemo(() => districtsInState.find(d => d.district_name === d1), [districtsInState, d1]);
  const district2Data = useMemo(() => districtsInState.find(d => d.district_name === d2), [districtsInState, d2]);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center my-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">{t('compareDistricts')}</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">{t('compareSubtitle')}</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <StateSelector
            states={states}
            selectedState={selectedState}
            onStateChange={setSelectedState}
            />
          <DistrictSelector
            options={districtOptions}
            value={d1 || ''}
            onChange={(value) => dispatch({ type: 'SET_COMPARISON_DISTRICT', payload: { index: 0, districtId: value } })}
            label={t('selectDistrict1')}
            disabled={loading || !selectedState}
            />
          <DistrictSelector
            options={districtOptions.filter(opt => opt !== d1)}
            value={d2 || ''}
            onChange={(value) => dispatch({ type: 'SET_COMPARISON_DISTRICT', payload: { index: 1, districtId: value } })}
            label={t('selectDistrict2')}
            disabled={loading || !selectedState || !d1}
            />
        </motion.div>

        {loading && <Loader />}
        
        {error && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-10 text-red-400">
            <p>{error}</p>
          </motion.div>
        )}

        {!loading && !error && district1Data && district2Data && (
          <CompareView district1Data={district1Data} district2Data={district2Data} />
        )}
      </div>
    </main>
  );
};

export default Compare;
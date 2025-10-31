import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useFetch } from "../hooks/useFetch";
import { getDistricts, getDistrictSummary } from "../utils/api";
import { useAppContext } from "../context/AppContext";
import { useGeolocation } from "../hooks/useGeolocation";
import DistrictSelector from "../components/DistrictSelector";
import PerformanceCard from "../components/PerformanceCard";
import TrendChart from "../components/TrendChart";
import Loader from "../components/Loader";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const {
    state: { selectedDistrict },
    dispatch,
  } = useAppContext();
  const { district: geoDistrict } = useGeolocation();

  const { data: districts, loading: districtsLoading } = useFetch(getDistricts);
  const {
    data: summary,
    loading: summaryLoading,
    error: summaryError,
  } = useFetch(
    () =>
      selectedDistrict
        ? getDistrictSummary(selectedDistrict)
        : Promise.resolve(null),
    [selectedDistrict]
  );

  useEffect(() => {
    if (geoDistrict && districts) {
      const found = (districts as any[]).find(
        (d) => d.districtName.toLowerCase() === geoDistrict.toLowerCase()
      );
      if (found) {
        dispatch({ type: "SET_SELECTED_DISTRICT", payload: found.districtId });
      }
    }
  }, [geoDistrict, districts, dispatch]);

  const districtOptions = useMemo(
    () =>
      districts
        ? (districts as any[]).map(({ districtId, districtName }) => ({
            districtId: districtId,
            districtName: districtName,
          }))
        : [],
    [districts]
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {t("appTitle")}
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            {t("appSubtitle")}
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          {districtsLoading ? (
            <div className="h-10 bg-gray-700/50 rounded-md animate-pulse" />
          ) : (
            <DistrictSelector
              options={districtOptions}
              value={selectedDistrict || ""}
              onChange={(value) =>
                dispatch({ type: "SET_SELECTED_DISTRICT", payload: value })
              }
              label={t("selectDistrict")}
            />
          )}
        </motion.div>

        {summaryLoading && <Loader />}

        {summaryError && !summaryLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-10 text-red-400"
          >
            <p>{t("errorFetchingSummary")}</p>
          </motion.div>
        )}

        {summary && !summaryLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10"
          >
            <PerformanceCard summary={summary} />
            <TrendChart trendData={summary.trend} />
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Home;

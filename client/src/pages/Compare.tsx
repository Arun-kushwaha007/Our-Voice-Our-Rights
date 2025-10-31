import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useFetch } from "../hooks/useFetch";
import { getDistricts, compareDistricts } from "../utils/api";
import { useAppContext } from "../context/AppContext";
import DistrictSelector from "../components/DistrictSelector";
import CompareView from "../components/CompareView";
import AudioSummary from "../components/AudioSummary";
import Loader from "../components/Loader";

const Compare: React.FC = () => {
  const { t } = useTranslation();
  const {
    state: { comparisonDistricts },
    dispatch,
  } = useAppContext();
  const [d1, d2] = comparisonDistricts;

  const { data: districts, loading: districtsLoading } = useFetch(getDistricts);
  const {
    data: comparison,
    loading: comparisonLoading,
    error: comparisonError,
  } = useFetch(
    () => (d1 && d2 ? compareDistricts(d1, d2) : Promise.resolve(null)),
    [d1, d2]
  );

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
            {t("compareDistricts")}
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            {t("compareSubtitle")}
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {districtsLoading ? (
            <>
              <div className="h-10 bg-gray-700/50 rounded-md animate-pulse" />
              <div className="h-10 bg-gray-700/50 rounded-md animate-pulse" />
            </>
          ) : (
            <>
              <DistrictSelector
                options={districtOptions}
                value={d1 || ""}
                onChange={(value) =>
                  dispatch({ type: "SET_COMPARISON_DISTRICT", payload: { index: 0, districtId: value } })
                }
                label={t("selectDistrict1")}
              />
              <DistrictSelector
                options={districtOptions.filter(opt => opt.districtId !== d1)}
                value={d2 || ""}
                onChange={(value) =>
                  dispatch({ type: "SET_COMPARISON_DISTRICT", payload: { index: 1, districtId: value } })
                }
                label={t("selectDistrict2")}
              />
            </>
          )}
        </motion.div>

        {comparisonLoading && <Loader />}

        {comparisonError && !comparisonLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-10 text-red-400"
          >
            <p>{t("errorFetchingComparison")}</p>
          </motion.div>
        )}

        {comparison && !comparisonLoading && (
          <>
            <CompareView comparison={comparison} />
            <AudioSummary summaryA={comparison.a} summaryB={comparison.b} />
          </>
        )}
      </div>
    </main>
  );
};

export default Compare;

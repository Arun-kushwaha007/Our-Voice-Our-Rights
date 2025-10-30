import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFetch } from "../hooks/useFetch";
import { getDistricts, getDistrictSummary } from "../utils/api";
import { useAppContext } from "../context/AppContext";
import { useGeolocation } from "../hooks/useGeolocation";
import DistrictSelector from "../components/DistrictSelector";
import PerformanceCard from "../components/PerformanceCard";
import TrendChart from "../components/TrendChart";
import AudioSummary from "../components/AudioSummary";
import Loader from "../components/Loader";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { district, setDistrict } = useAppContext();
  const { district: geoDistrict, loading: geoLoading } = useGeolocation();

  const { data: districts, loading: districtsLoading } = useFetch(getDistricts);
  const { data: summary, loading: summaryLoading } = useFetch(
    () => (district ? getDistrictSummary(district) : Promise.resolve(null)),
    [district]
  );

  useEffect(() => {
    if (geoDistrict && districts) {
      const found = (districts as any[]).find(d => d.districtName.toLowerCase() === geoDistrict.toLowerCase());
      if (found) {
        setDistrict(found.districtId);
      }
    }
  }, [geoDistrict, districts, setDistrict]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{t("appTitle")}</h1>
      
      {districtsLoading || geoLoading ? <Loader /> : (
        <DistrictSelector
          options={districts || []}
          value={district || ""}
          onChange={setDistrict}
          label={t("selectDistrict")}
        />
      )}

      {summaryLoading ? <Loader /> : summary ? (
        <>
          <PerformanceCard summary={summary} />
          <AudioSummary summary={summary} />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{t("trend")}</h2>
            <TrendChart trendData={summary.trend} />
          </div>
        </>
      ) : (
        <div className="mt-6 text-center text-gray-500">{t("selectDistrict")}</div>
      )}
    </div>
  );
};

export default Home;

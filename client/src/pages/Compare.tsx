import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetch } from "../hooks/useFetch";
import { getDistricts, compareDistricts } from "../utils/api";
import DistrictSelector from "../components/DistrictSelector";
import CompareView from "../components/CompareView";
import Loader from "../components/Loader";

const Compare: React.FC = () => {
  const { t } = useTranslation();
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");

  const { data: districts, loading: districtsLoading } = useFetch(getDistricts);
  const { data: comparison, loading: comparisonLoading } = useFetch(
    () => (d1 && d2 ? compareDistricts(d1, d2) : Promise.resolve(null)),
    [d1, d2]
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{t("compareDistricts")}</h1>
      
      {districtsLoading ? <Loader /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DistrictSelector
            options={districts || []}
            value={d1}
            onChange={setD1}
            label={t("selectDistrict1")}
          />
          <DistrictSelector
            options={districts || []}
            value={d2}
            onChange={setD2}
            label={t("selectDistrict2")}
          />
        </div>
      )}

      {comparisonLoading ? <Loader /> : comparison ? (
        <CompareView comparison={comparison} />
      ) : null}
    </div>
  );
};

export default Compare;

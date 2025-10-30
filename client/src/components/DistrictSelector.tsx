import React from "react";
import { useTranslation } from "react-i18next";

interface DistrictSelectorProps {
  options: { districtId: string; districtName: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({ options, value, onChange, label }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">{t("selectDistrict")}</option>
        {options.map((option) => (
          <option key={option.districtId} value={option.districtId}>
            {option.districtName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictSelector;

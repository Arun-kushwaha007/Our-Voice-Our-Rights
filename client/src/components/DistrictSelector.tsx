import React from 'react';
import { useTranslation } from 'react-i18next';

interface DistrictSelectorProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({ options, value, onChange, label, disabled = false }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full bg-gray-700/50 border-gray-600 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" disabled>{t('pleaseSelect')}</option>
        {options.map((districtName) => (
          <option key={districtName} value={districtName}>
            {districtName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictSelector;

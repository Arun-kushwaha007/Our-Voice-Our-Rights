import React from 'react';
import { useTranslation } from 'react-i18next';

interface StateSelectorProps {
  states: string[];
  selectedState: string;
  onStateChange: (state: string) => void;
}

const StateSelector: React.FC<StateSelectorProps> = ({ states, selectedState, onStateChange }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label htmlFor="state-selector" className="block text-sm font-medium text-gray-400 mb-2">
        {t('selectState')}
      </label>
      <select
        id="state-selector"
        value={selectedState}
        onChange={(e) => onStateChange(e.target.value)}
        className="w-full bg-gray-700/50 border-gray-600 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>{t('pleaseSelect')}</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateSelector;

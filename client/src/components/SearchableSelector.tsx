import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchableSelectorProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
}

const SearchableSelector: React.FC<SearchableSelectorProps> = ({
  options,
  value,
  onChange,
  label,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(
    () =>
      options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [options, searchTerm]
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <input
        type="text"
        value={searchTerm || value}
        onChange={e => {
          setSearchTerm(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={t('searchPlaceholder')}
        className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      />
      {isOpen && !disabled && (
        <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-md mt-1 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-700"
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">{t('noResults')}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelector;

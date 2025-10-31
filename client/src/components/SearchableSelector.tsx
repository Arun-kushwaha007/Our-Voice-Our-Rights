import React, { useState, useMemo, useRef } from 'react';
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
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    if (!isOpen) setIsOpen(true);

    // If user clears the input, clear the selection
    if (newValue === '') {
      onChange('');
    }
  };

  // Display logic: show searchTerm while typing, otherwise show selected value
  const displayValue = isOpen ? searchTerm : (searchTerm || value);

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 250)}
        placeholder={t('searchPlaceholder')}
        className={`
          w-full 
          bg-white 
          text-gray-900 
          placeholder-gray-500 
          border border-gray-300 
          rounded-md 
          py-2 px-3 
          shadow-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-blue-500 
          disabled:bg-gray-100 
          disabled:text-gray-400
        `}
        disabled={disabled}
      />

      {/* Dropdown options */}
      {isOpen && !disabled && filteredOptions.length > 0 && (
        <ul className="
          absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 
          max-h-60 overflow-y-auto shadow-lg
        ">
          {filteredOptions.map(option => (
            <li
              key={option}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent blur from firing before click
                handleSelect(option);
              }}
              className="
                px-3 py-2 cursor-pointer 
                hover:bg-blue-50 
                text-gray-800
              "
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {isOpen && !disabled && filteredOptions.length === 0 && searchTerm && (
        <ul className="
          absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1
        ">
          <li className="px-3 py-2 text-gray-500">{t('noResults')}</li>
        </ul>
      )}
    </div>
  );
};

export default SearchableSelector;

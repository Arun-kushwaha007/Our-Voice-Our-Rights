import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

interface DistrictSelectorProps {
  options: { districtId: string; districtName: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({ options, value, onChange, label }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(() =>
    options.filter((option) =>
      option.districtName.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [options, searchTerm]
  );

  const selectedOption = options.find((option) => option.districtId === value);

  return (
    <div className="relative">
      <label htmlFor={label} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <button
        type="button"
        id={label}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-700/50 backdrop-blur-xl border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
      >
        <span className="block truncate">{selectedOption?.districtName || t("selectDistrict")}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-gray-800 shadow-lg z-10">
          <div className="p-2">
            <input
              type="text"
              placeholder={t("searchDistrict")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
            />
          </div>
          <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <li
                key={option.districtId}
                onClick={() => {
                  onChange(option.districtId);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="text-white hover:bg-gray-700 cursor-pointer select-none relative py-2 pl-3 pr-9"
              >
                {option.districtName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DistrictSelector;

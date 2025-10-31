import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 bg-white p-2 rounded-full shadow-md"
    >
      <span className="text-xl">{i18n.language === 'en' ? '🇮🇳' : '🇬🇧'}</span>
    </button>
  );
};

export default LanguageToggle;

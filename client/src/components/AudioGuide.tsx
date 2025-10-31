import React from 'react';
import { useTranslation } from 'react-i18next';
import { Volume2 } from 'lucide-react';

interface AudioGuideProps {
  text: string;
}

const AudioGuide: React.FC<AudioGuideProps> = ({ text }) => {
  const { i18n } = useTranslation();

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      onClick={speak}
      className="flex items-center space-x-2 text-gray-500 hover:text-india-blue"
    >
      <Volume2 size={20} />
      <span>{i18n.t('playAudio')}</span>
    </button>
  );
};

export default AudioGuide;

import { useState, useCallback } from "react";

export const useAudioSummary = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = useCallback((text: string, lang: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  }, []);

  return { isPlaying, speak };
};

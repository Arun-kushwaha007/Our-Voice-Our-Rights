import React from "react";
import { useTranslation } from "react-i18next";
import { useAudioSummary } from "../hooks/useAudioSummary";
import type { IDistrictSnapshot } from "../../../server/src/models/District";

interface AudioSummaryProps {
  summary: {
    latest: IDistrictSnapshot;
  };
}

const AudioSummary: React.FC<AudioSummaryProps> = ({ summary }) => {
  const { t, i18n } = useTranslation();
  const { isPlaying, speak } = useAudioSummary();
  const { metrics, districtName } = summary.latest;

  const generateSummaryText = () => {
    return `
      ${t("performanceSummary")} for ${districtName}.
      ${t("beneficiaries")}: ${metrics.beneficiaries}.
      ${t("fundsReleased")}: ${metrics.fundsReleased} ${t("crores")}.
      ${t("daysWorked")}: ${metrics.daysWorked}.
      ${t("paymentsOnTime")}: ${metrics.paymentsOnTimePct || 0}%.
    `;
  };

  const handleSpeak = () => {
    const text = generateSummaryText();
    speak(text, i18n.language);
  };

  return (
    <button
      onClick={handleSpeak}
      disabled={isPlaying}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
    >
      {isPlaying ? t("playing") : t("speakSummary")}
    </button>
  );
};

export default AudioSummary;

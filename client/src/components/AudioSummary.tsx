import React, { useState, useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import useSay from "react-say";
import { motion } from "framer-motion";
import { Volume2, Loader2 } from "lucide-react";
import type { IDistrictSnapshot } from "../types";
import { LanguageContext } from "../context/LanguageContext";

interface AudioSummaryProps {
  summaryA: {
    districtName: string;
    latest: IDistrictSnapshot;
  };
  summaryB: {
    districtName: string;
    latest: IDistrictSnapshot;
  };
}

const AudioSummary: React.FC<AudioSummaryProps> = ({ summaryA, summaryB }) => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext)!;
  const { say, isSpeaking } = useSay();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummaryText = useCallback(() => {
    const a = summaryA.latest.metrics;
    const b = summaryB.latest.metrics;
    let text = `${t("comparisonSummary")} ${summaryA.districtName} ${t("and")} ${summaryB.districtName}. `;

    if (a.beneficiaries > b.beneficiaries) {
      text += `${summaryA.districtName} ${t("hasMoreBeneficiaries")}. `;
    } else {
      text += `${summaryB.districtName} ${t("hasMoreBeneficiaries")}. `;
    }

    if ((a.paymentsOnTimePct || 0) > (b.paymentsOnTimePct || 0)) {
      text += `${t("higherPaymentsOnTime")} ${summaryA.districtName}.`;
    } else {
      text += `${t("higherPaymentsOnTime")} ${summaryB.districtName}.`;
    }
    return text;
  }, [t, summaryA, summaryB]);

  const handleSpeak = useCallback(async () => {
    setIsGenerating(true);
    const textToSpeak = generateSummaryText();
    // Small delay to simulate generation
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsGenerating(false);
    say({ text: textToSpeak, lang: language === "hi" ? "hi-IN" : "en-US" });
  }, [generateSummaryText, say, language]);

  return (
    <motion.div
      className="flex justify-center my-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={handleSpeak}
        disabled={isSpeaking || isGenerating}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600/80 backdrop-blur-xl border border-indigo-500 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Volume2 />
        )}
        {isSpeaking ? t("speaking") : isGenerating ? t("generating") : t("listenSummary")}
      </button>
    </motion.div>
  );
};

export default AudioSummary;

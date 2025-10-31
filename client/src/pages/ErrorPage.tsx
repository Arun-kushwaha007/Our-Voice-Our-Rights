import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ErrorPage: React.FC = () => {
  const { t } = useTranslation();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-light-bg text-dark-text flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-white border border-gray-200 rounded-lg p-10 shadow-lg"
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl font-semibold mt-4 font-devanagari">{t("pageNotFound")}</p>
        <p className="text-gray-500 mt-2 font-devanagari">{t("pageNotFoundSubtitle")}</p>
        <div className="flex justify-center mt-8 space-x-4">
          <Link to="/">
            <button className="px-6 py-3 bg-india-blue text-white font-semibold rounded-full hover:bg-opacity-90 transition-colors">
              {t("goHome")}
            </button>
          </Link>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-mint-green text-dark-text font-semibold rounded-full hover:bg-opacity-90 transition-colors"
          >
            {t("retry")}
          </button>
        </div>
      </motion.div>
    </main>
  );
};

export default ErrorPage;

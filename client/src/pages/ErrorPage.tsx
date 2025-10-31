import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ErrorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-lg p-10 shadow-lg"
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="text-2xl font-semibold mt-4">{t("pageNotFound")}</p>
        <p className="text-gray-400 mt-2">{t("pageNotFoundSubtitle")}</p>
        <Link to="/">
          <button className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-500 transition-colors">
            {t("goHome")}
          </button>
        </Link>
      </motion.div>
    </main>
  );
};

export default ErrorPage;

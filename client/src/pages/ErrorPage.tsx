import React from "react";
import { useTranslation } from "react-i18next";

const ErrorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">{t("error")}</h1>
    </div>
  );
};

export default ErrorPage;

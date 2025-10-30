import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  district: string | null;
  setDistrict: (district: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [district, setDistrict] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ district, setDistrict }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

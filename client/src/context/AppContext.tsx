import React, { createContext, useContext, useReducer } from "react";
import type { Dispatch } from "react";

type State = {
  theme: "dark" | "light";
  selectedDistrict: string | null;
  comparisonDistricts: [string | null, string | null];
};

type Action =
  | { type: "TOGGLE_THEME" }
  | { type: "SET_SELECTED_DISTRICT"; payload: string | null }
  | { type: "SET_COMPARISON_DISTRICT"; payload: { index: 0 | 1; districtId: string | null } };

const initialState: State = {
  theme: "dark",
  selectedDistrict: null,
  comparisonDistricts: [null, null],
};

const AppReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
    case "SET_SELECTED_DISTRICT":
      return { ...state, selectedDistrict: action.payload };
    case "SET_COMPARISON_DISTRICT":
      const newComparisonDistricts = [...state.comparisonDistricts] as [string | null, string | null];
      newComparisonDistricts[action.payload.index] = action.payload.districtId;
      return { ...state, comparisonDistricts: newComparisonDistricts };
    default:
      return state;
  }
};

const AppContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
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

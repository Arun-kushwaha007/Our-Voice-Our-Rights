import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import ErrorPage from "./pages/ErrorPage";
import LanguageToggle from "./components/LanguageToggle";
import OfflineBanner from "./components/OfflineBanner";
import DistrictSelection from "./pages/DistrictSelection";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
        <AppProvider>
          <OfflineBanner />
          <LanguageToggle />
          <nav className="bg-white text-dark-text p-4 shadow-md">
            <ul className="flex space-x-4">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/compare">Compare</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/state/:stateName" element={<DistrictSelection />} />
            <Route path="/state/:stateName/district/:districtName" element={<Dashboard />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AppProvider>
    </Router>
  );
};

export default App;

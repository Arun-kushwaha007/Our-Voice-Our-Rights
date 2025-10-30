import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import ErrorPage from "./pages/ErrorPage";

const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <AppProvider>
          <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/compare">Compare</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AppProvider>
      </LanguageProvider>
    </Router>
  );
};

export default App;

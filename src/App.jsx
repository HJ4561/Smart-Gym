import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmartGymHome from './pages/SmartGymHome';
import FacilitiesShowcase from './pages/FacilitiesShowcase';
import ServicesCatalog from './pages/ServicesCatalog';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SmartGymHome />} />
        <Route path="/facilities" element={<FacilitiesShowcase />} />
        <Route path="/services" element={<ServicesCatalog />} />
      </Routes>
    </Router>
  );
}

export default App;
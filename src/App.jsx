// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SmartGymHome from './pages/SmartGymHome';
import FacilitiesShowcase from './pages/FacilitiesShowcase';
import ServicesCatalog from './pages/ServicesCatalog';
import MembershipSignup from './pages/MembershipSignup';
import './App.css';

/* Reset scroll + re-run page boot animations on every navigation.
   Without this, React Router keeps the previous page's scroll
   position and pages can load already-scrolled (skipping their
   hero reveals). */
const ScrollManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Support hash links like /#pricing from other pages
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        // wait a tick so the page's boot preloader doesn't block layout
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 1200);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<SmartGymHome />} />
        <Route path="/facilities" element={<FacilitiesShowcase />} />
        <Route path="/services" element={<ServicesCatalog />} />
        <Route path="/join" element={<MembershipSignup />} />
        {/* Fallback — unknown URLs land on home
        <Route path="*" element={<SmartGymHome />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SmartGymHome from './pages/SmartGymHome';
import FacilitiesShowcase from './pages/FacilitiesShowcase';
import ServicesCatalog from './pages/ServicesCatalog';
import InsightsBlog from './pages/InsightsBlog';
import ContactSupport from './pages/ContactSupport';
import MembershipSignup from './pages/MembershipSignup';
import PaymentCallback from './pages/PaymentCallback';
import ArticlePage from './pages/ArticlePage';
import NotFound from './pages/NotFound';
import CustomCursor from './components/CustomCursor';
import './App.css';

const ScrollManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
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
      <CustomCursor />
      <Routes>
        <Route path="/" element={<SmartGymHome />} />
        <Route path="/facilities" element={<FacilitiesShowcase />} />
        <Route path="/services" element={<ServicesCatalog />} />
        <Route path="/insights" element={<InsightsBlog />} />
        <Route path="/insights/:slug" element={<ArticlePage />} />
        <Route path="/contact" element={<ContactSupport />} />
        <Route path="/join" element={<MembershipSignup />} />
        <Route path="/join/payment-callback" element={<PaymentCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
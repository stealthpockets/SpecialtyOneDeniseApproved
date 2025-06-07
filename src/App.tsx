import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import ManufacturedHousingPage from './pages/ManufacturedHousingPage';
import RVParksPage from './pages/RVParksPage';
import SelfStoragePage from './pages/SelfStoragePage';
import ExchangePage from './pages/ExchangePage';
import InsightsPage from './pages/InsightsPage';
import SuccessPage from './pages/SuccessPage';
import AdvantagePage from './pages/AdvantagePage';
import AboutPage from './pages/AboutPage';
import MarketReportsPage from './pages/MarketReportsPage';
import ContactPage from './pages/ContactPage';
import ExclusiveBuyerNetworkPage from './pages/ExclusiveBuyerNetworkPage';
import ExclusiveSellerNetworkPage from './pages/ExclusiveSellerNetworkPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manufactured-housing" element={<ManufacturedHousingPage />} />
          <Route path="/rv-parks" element={<RVParksPage />} />
          <Route path="/self-storage" element={<SelfStoragePage />} />
          <Route path="/1031-exchange" element={<ExchangePage />} />
          <Route path="/success-stories" element={<SuccessPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/advantage" element={<AdvantagePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/market-reports" element={<MarketReportsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/exclusive-buyers" element={<ExclusiveBuyerNetworkPage />} />
          <Route path="/exclusive-sellers" element={<ExclusiveSellerNetworkPage />} />
          <Route path="/success/:slug" element={<CaseStudyDetailPage />} />
          {/* Add other routes as needed */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
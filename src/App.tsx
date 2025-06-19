import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import { MainLayout } from './components/Layout/MainLayout';
import ScrollToTop from './components/ui/ScrollToTop';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Critical pages - load immediately
import HomePage from './pages/HomePage';

// Non-critical pages - lazy load for better performance
const ManufacturedHousingPage = lazy(() => import('./pages/ManufacturedHousingPage'));
const RVParksPage = lazy(() => import('./pages/RVParksPage'));
const SelfStoragePage = lazy(() => import('./pages/SelfStoragePage'));
const ExchangePage = lazy(() => import('./pages/ExchangePage'));
const SuccessStoriesPage = lazy(() => import('./pages/SuccessStoriesPage'));
const AdvantagePage = lazy(() => import('./pages/AdvantagePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const MarketReportsPage = lazy(() => import('./pages/MarketReportsPage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ExclusiveBuyerNetworkPage = lazy(() => import('./pages/ExclusiveBuyerNetworkPage'));
const ExclusiveSellerNetworkPage = lazy(() => import('./pages/ExclusiveSellerNetworkPage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const ChartTest = lazy(() => import('./pages/ChartTest'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TrackRecordPage = lazy(() => import('./pages/TrackRecordPage'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />        <MainLayout>
          <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/manufactured-housing" element={<ManufacturedHousingPage />} />
              <Route path="/rv-parks" element={<RVParksPage />} />
              <Route path="/self-storage" element={<SelfStoragePage />} />
              <Route path="/1031-exchange" element={<ExchangePage />} />
              <Route path="/success-stories" element={<SuccessStoriesPage />} />
              <Route path="/success-stories/:slug" element={<CaseStudyDetailPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:slug" element={<ArticleDetail type="insights" />} />
              <Route path="/advantage" element={<AdvantagePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/market-reports" element={<MarketReportsPage />} />
              <Route path="/market-reports/:slug" element={<ArticleDetail type="market_reports" />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/exclusive-buyers" element={<ExclusiveBuyerNetworkPage />} />
              <Route path="/exclusive-sellers" element={<ExclusiveSellerNetworkPage />} />
              <Route path="/chart-test" element={<ChartTest />} />              <Route path="/track-record" element={<TrackRecordPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
            </Routes>
          </Suspense>
        </MainLayout>
    </Router>
    </HelmetProvider>
  );
}

export default App;

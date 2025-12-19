
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import AIConsultant from './components/AIConsultant';
import { ContentProvider } from './context/ContentContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tours" element={<ToursPage />} />
              <Route path="/tour/:slug" element={<TourDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* Fallback for undefined routes */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <AIConsultant />
        </div>
      </Router>
    </ContentProvider>
  );
};

export default App;

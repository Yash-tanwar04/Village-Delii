import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/motion/CustomCursor';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OfferingsPage } from './pages/OfferingsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { LocationsPage } from './pages/LocationsPage';
import { ExpansionPage } from './pages/ExpansionPage';
import { PartnerPage } from './pages/PartnerPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-12 max-w-xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-serif font-bold text-[#172B3A]">Something went wrong loading this view</h2>
          <p className="text-sm text-[#202321]/70">{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full bg-[#172B3A] text-white text-xs font-semibold"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomCursor />
      <div className="min-h-screen bg-[#F7F4ED] text-[#202321] font-sans antialiased selection:bg-[#C86B4A] selection:text-white flex flex-col justify-between overflow-x-hidden">
        <Navbar />

        <main className="flex-grow w-full">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/offerings" element={<OfferingsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/expansion" element={<ExpansionPage />} />
              <Route path="/partner" element={<PartnerPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Learn } from './pages/Learn';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { SavedCalculationsProvider } from './contexts/SavedCalculationsContext';
import { BasicFV } from './pages/More/BasicFV';
import { CompoundInterest } from './pages/More/CompoundInterest';
import { MonthlyContributions } from './pages/More/MonthlyContributions';
import { Withdrawals } from './pages/More/Withdrawals';
import { MutualFund } from './pages/More/MutualFund';
import { HomeValue } from './pages/More/HomeValue';
import { CarValue } from './pages/More/CarValue';
import { InflationAdjusted } from './pages/More/InflationAdjusted';
import { Annuity } from './pages/More/Annuity';
import { Retirement } from './pages/More/Retirement';
import { SIP } from './pages/More/SIP';

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]);

  return null;
}

function App() {
  return (
    <SavedCalculationsProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          <Header />
          <ScrollToTop /> {/* Add ScrollToTop component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/about" element={<About />} />
            <Route path="/More/BasicFV" element={<BasicFV />} />
            <Route path="/More/CompoundInterest" element={<CompoundInterest />} />
            <Route path="/More/MonthlyContributions" element={<MonthlyContributions />} />
            <Route path="/More/Withdrawals" element={<Withdrawals />} />
            <Route path="/More/MutualFund" element={<MutualFund />} />
            <Route path="/More/HomeValue" element={<HomeValue />} />
            <Route path="/More/CarValue" element={<CarValue />} />
            <Route path="/More/Inflation-Adjusted" element={<InflationAdjusted />} />
            <Route path="/More/Annuity" element={<Annuity />} />
            <Route path="/More/Retirement" element={<Retirement />} />
            <Route path="/More/SIP" element={<SIP />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </SavedCalculationsProvider>
  );
}

export default App;
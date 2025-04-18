import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calculator, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { BasicCalculator } from '../components/BasicCalculator';
import { CompoundCalculator } from '../components/CompoundCalculator';
import { AnnuityCalculator } from '../components/AnnuityCalculator';
import { RetirementCalculator } from '../components/RetirementCalculator';
import { SIPCalculator } from '../components/SIPCalculator';
import { InflationCalculator } from '../components/InflationCalculator';
import { MonthlyContributionsCalculator } from '../components/MonthlyContributionsCalculator';
import { WithdrawalsCalculator } from '../components/WithdrawalsCalculator';
import { MutualFundCalculator } from '../components/MutualFundCalculator';
import { HomeValueCalculator } from '../components/HomeValueCalculator';
import { CarValueCalculator } from '../components/CarValueCalculator';
import { FinancialTerms } from '../components/FinancialTerms';
import { SavedCalculations } from '../components/SavedCalculations';

export function Home() {
  const location = useLocation();
  const [activeCalculator, setActiveCalculator] = useState('basic');
  const [showInfo, setShowInfo] = useState(false);
  const [showGlossary, setShowGlossary] = useState(true);

  useEffect(() => {
    // Set active calculator based on navigation state
    if (location.state?.calculator) {
      setActiveCalculator(location.state.calculator);
    }
  }, [location]);

  const calculators = [
    { id: 'basic', label: 'Basic FV' },
    { id: 'compound', label: 'Compound Interest' },
    { id: 'monthly', label: 'Monthly Contributions' },
    { id: 'withdrawals', label: 'Withdrawals' },
    { id: 'mutual-fund', label: 'Mutual Fund' },
    { id: 'home-value', label: 'Home Value' },
    { id: 'car-value', label: 'Car Value' },
    { id: 'inflation', label: 'Inflation-Adjusted' },
    { id: 'annuity', label: 'Annuity' },
    { id: 'retirement', label: 'Retirement' },
    { id: 'sip', label: 'SIP' }
  ];

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'basic':
        return <BasicCalculator />;
      case 'compound':
        return <CompoundCalculator />;
      case 'monthly':
        return <MonthlyContributionsCalculator />;
      case 'withdrawals':
        return <WithdrawalsCalculator />;
      case 'mutual-fund':
        return <MutualFundCalculator />;
      case 'home-value':
        return <HomeValueCalculator />;
      case 'car-value':
        return <CarValueCalculator />;
      case 'inflation':
        return <InflationCalculator />;
      case 'annuity':
        return <AnnuityCalculator />;
      case 'retirement':
        return <RetirementCalculator />;
      case 'sip':
        return <SIPCalculator />;
      default:
        return <BasicCalculator />;
    }
  };

  return (
    <main className="container mx-auto px-4 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <SavedCalculations />
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6">
              <div className="flex items-center space-x-2">
                <Calculator className="w-6 h-6 text-indigo-600" />
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Financial Calculator</h1>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowGlossary(!showGlossary)}
                  className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors whitespace-nowrap"
                >
                  {showGlossary ? 'Hide Terms' : 'Show Terms'}
                </button>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  {showInfo ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {showInfo && (
              <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Calculate your financial future with our comprehensive suite of calculators.
                    From basic future value to retirement planning, we've got you covered.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
              {calculators.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all transform hover:scale-105
                    ${activeCalculator === calc.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {calc.label}
                </button>
              ))}
            </div>

            <div className="transition-all duration-300 ease-in-out">
              {renderCalculator()}
            </div>
          </div>
        </div>

        {showGlossary && <FinancialTerms />}
      </div>
    </main>
  );
}
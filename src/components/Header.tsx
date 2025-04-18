import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ChevronDown } from 'lucide-react';

export function Header() {
  const [showMore, setShowMore] = useState(false);

  const menuItems = [
    { label: 'Basic FV', path: '/More/BasicFV' },
    { label: 'Compound Interest', path: '/More/CompoundInterest' },
    { label: 'Monthly Contributions', path: '/More/MonthlyContributions' },
    { label: 'Withdrawals', path: '/More/Withdrawals' },
    { label: 'Mutual Fund', path: '/More/MutualFund' },
    { label: 'Home Value', path: '/More/HomeValue' },
    { label: 'Car Value', path: '/More/CarValue' },
    { label: 'Inflation-Adjusted', path: '/More/Inflation-Adjusted' },
    { label: 'Annuity', path: '/More/Annuity' },
    { label: 'Retirement', path: '/More/Retirement' },
    { label: 'SIP', path: '/More/SIP' }
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Calculator className="w-8 h-8 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
            <div>
              <span className="text-xl font-bold text-gray-900 block">Future Value Calculator</span>
              <span className="text-sm text-gray-600">Free Financial Planning Tools</span>
            </div>
          </Link>
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Learn
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={() => setShowMore(!showMore)}
                  onBlur={() => setTimeout(() => setShowMore(false), 200)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <span>More</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showMore && (
                  <div className="absolute right-0 mt-2 py-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setShowMore(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
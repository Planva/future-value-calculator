import React from 'react';
import { Calculator, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const friendlyLinks = [
    { name: 'Calculator App', url: 'https://www.calculator-app.org' },
    { name: 'Sending Prayers', url: 'https://www.sending-prayers.com' },
    { name: 'TAT Test', url: 'https://www.tat-test.com' },
    { name: 'Difficult Person Test', url: 'https://www.difficult-person-test.com' },
    { name: 'Thumbnail Tester', url: 'https://www.thumbnail-tester.com' },
    { name: 'Smart Test', url: 'https://www.smarttest.cc' },
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calculator className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Future Value Calculator</span>
            </div>
            <p className="text-sm text-gray-600">
              Your trusted companion for financial planning and calculations.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Calculators
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/More/BasicFV" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Basic FV Calculator
                </Link>
              </li>
              <li>
                <Link to="/More/CompoundInterest" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Compound Interest
                </Link>
              </li>
              <li>
                <Link to="/More/Retirement" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Retirement Planning
                </Link>
              </li>
              <li>
                <Link to="/More/SIP" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  SIP Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Partner Sites
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {friendlyLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <span>{link.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Future Value Calculator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
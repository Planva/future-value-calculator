import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react';

export function BasicFV() {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/', { state: { calculator: 'basic' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Calculator className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Understanding Future Value</h1>
          </div>

          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Future Value (FV) is a fundamental concept in finance that helps you understand how much your current investment will be worth at a specific point in the future, assuming a steady rate of return.
            </p>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Concepts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Present Value (PV)</h3>
                  </div>
                  <p className="text-gray-600">The current amount of money you're starting with or investing today.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Interest Rate (r)</h3>
                  </div>
                  <p className="text-gray-600">The annual rate at which your investment grows, expressed as a percentage.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Time Period (t)</h3>
                  </div>
                  <p className="text-gray-600">The length of time you plan to keep your money invested, typically in years.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Future Value (FV)</h3>
                  </div>
                  <p className="text-gray-600">The amount your investment will grow to after the specified time period.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">The Formula</h2>
              <div className="bg-white p-4 rounded-md font-mono text-lg text-center mb-4">
                FV = PV × (1 + r)^t
              </div>
              <p className="text-gray-600">
                This formula shows how your initial investment (PV) grows exponentially over time (t) at a given interest rate (r).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Calculation</h2>
              <p className="text-gray-600 mb-4">
                Let's say you invest $10,000 today at a 5% annual interest rate for 10 years:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Present Value (PV) = $10,000</li>
                <li>Interest Rate (r) = 5% = 0.05</li>
                <li>Time (t) = 10 years</li>
                <li>FV = $10,000 × (1 + 0.05)^10</li>
                <li>FV = $16,288.95</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Practical Applications</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Retirement Planning: Calculate how much your savings will grow by retirement.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Education Savings: Project college fund growth over time.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Investment Goals: Set realistic targets for your investments.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleCalculatorClick}
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Try the Calculator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
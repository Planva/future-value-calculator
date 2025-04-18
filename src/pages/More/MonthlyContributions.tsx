import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, PiggyBank, TrendingUp, Clock } from 'lucide-react';

export function MonthlyContributions() {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/', { state: { calculator: 'monthly' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <PiggyBank className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Understanding Monthly Contributions</h1>
          </div>

          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Regular monthly contributions to your investments can significantly accelerate your wealth building through the power of dollar-cost averaging and compound growth. This strategy combines the benefits of disciplined saving with long-term market growth potential.
            </p>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Concepts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <PiggyBank className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Initial Investment</h3>
                  </div>
                  <p className="text-gray-600">The starting amount in your investment account.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Monthly Contribution</h3>
                  </div>
                  <p className="text-gray-600">The fixed amount you invest each month.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Annual Return Rate</h3>
                  </div>
                  <p className="text-gray-600">The expected yearly return on your investments.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Investment Period</h3>
                  </div>
                  <p className="text-gray-600">The total time you plan to continue making contributions.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">The Formula</h2>
              <div className="bg-white p-4 rounded-md font-mono text-lg text-center mb-4">
                FV = PMT × ((1 + r)^n - 1) / r
              </div>
              <p className="text-gray-600">
                Where:<br />
                FV = Future Value<br />
                PMT = Monthly Payment<br />
                r = Monthly Interest Rate (Annual Rate ÷ 12)<br />
                n = Total Number of Months
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Calculation</h2>
              <p className="text-gray-600 mb-4">
                Let's say you start with $5,000 and invest $500 monthly at 8% annual return for 20 years:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Initial Investment = $5,000</li>
                <li>Monthly Contribution = $500</li>
                <li>Annual Return = 8% (0.08)</li>
                <li>Time Period = 20 years (240 months)</li>
                <li>Future Value ≈ $295,780</li>
                <li>Total Contributions = $125,000</li>
                <li>Investment Earnings = $170,780</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits of Regular Investing</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Dollar-Cost Averaging: Reduces the impact of market timing and volatility.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Disciplined Saving: Creates a consistent investment habit.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Compound Growth: Earnings on both contributions and previous gains.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Automated Investing: Reduces emotional decision-making.</span>
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
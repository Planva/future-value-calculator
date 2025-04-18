import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowDownCircle, TrendingDown, Clock } from 'lucide-react';

export function Withdrawals() {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/', { state: { calculator: 'withdrawals' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ArrowDownCircle className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Understanding Withdrawal Calculations</h1>
          </div>

          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Planning your withdrawals is crucial for managing retirement savings and investment distributions. Understanding how different withdrawal rates affect your portfolio's longevity helps ensure your savings last as long as you need them.
            </p>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Concepts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Initial Balance</h3>
                  </div>
                  <p className="text-gray-600">The starting amount in your investment or retirement account.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <ArrowDownCircle className="w-5 h-5 text-red-600" />
                    <h3 className="font-medium text-gray-900">Monthly Withdrawal</h3>
                  </div>
                  <p className="text-gray-600">The fixed amount you plan to withdraw each month.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Return Rate</h3>
                  </div>
                  <p className="text-gray-600">The expected annual return on your remaining investments.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Time Period</h3>
                  </div>
                  <p className="text-gray-600">How long you plan to make withdrawals or want your money to last.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">The Formula</h2>
              <div className="bg-white p-4 rounded-md font-mono text-lg text-center mb-4">
                Balance(t) = Balance(t-1) × (1 + r/12) - W
              </div>
              <p className="text-gray-600">
                Where:<br />
                Balance(t) = Account balance at time t<br />
                r = Annual return rate<br />
                W = Monthly withdrawal amount
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Calculation</h2>
              <p className="text-gray-600 mb-4">
                Let's say you start with $500,000 and withdraw $2,000 monthly with a 5% annual return:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Initial Balance = $500,000</li>
                <li>Monthly Withdrawal = $2,000</li>
                <li>Annual Return = 5% (0.05)</li>
                <li>Monthly Return = 0.417% (5% ÷ 12)</li>
                <li>First Month's Interest = $2,083 ($500,000 × 0.417%)</li>
                <li>First Month's Ending Balance = $500,083 ($500,000 + $2,083 - $2,000)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Considerations</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Withdrawal Rate: The percentage of your portfolio you withdraw annually affects how long your money lasts.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Market Returns: Variable returns can significantly impact portfolio longevity.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Inflation: Consider increasing withdrawals over time to maintain purchasing power.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Emergency Fund: Keep some funds easily accessible for unexpected expenses.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Common Applications</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Retirement Planning: Calculate how long your retirement savings will last.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Investment Distributions: Plan regular withdrawals from investment accounts.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Income Planning: Structure withdrawals to supplement other income sources.</span>
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
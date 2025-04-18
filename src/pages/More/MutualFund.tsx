import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, LineChart, PiggyBank, Percent } from 'lucide-react';

export function MutualFund() {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/', { state: { calculator: 'mutual-fund' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <LineChart className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Understanding Mutual Fund Investments</h1>
          </div>

          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Mutual funds are investment vehicles that pool money from multiple investors to purchase a diversified portfolio of stocks, bonds, or other securities. Understanding how fees, returns, and regular investments affect your mutual fund performance is crucial for successful investing.
            </p>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Concepts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <PiggyBank className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Initial Investment</h3>
                  </div>
                  <p className="text-gray-600">The lump sum amount you start investing with.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Monthly Investment</h3>
                  </div>
                  <p className="text-gray-600">Regular contributions to your mutual fund.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Percent className="w-5 h-5 text-red-600" />
                    <h3 className="font-medium text-gray-900">Expense Ratio</h3>
                  </div>
                  <p className="text-gray-600">Annual fees charged by the fund as a percentage of assets.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Expected Return</h3>
                  </div>
                  <p className="text-gray-600">The projected annual return on your investment.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Understanding Fund Fees</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Expense Ratio</h3>
                  <p className="text-gray-600">Annual fee covering fund management and operational costs, typically ranging from 0.1% to 2%.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Front-Load Fee</h3>
                  <p className="text-gray-600">One-time fee charged when purchasing fund shares, usually 0-5.75% of the investment.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Back-Load Fee</h3>
                  <p className="text-gray-600">Fee charged when selling shares, often decreasing over time.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Calculation</h2>
              <p className="text-gray-600 mb-4">
                Let's analyze a mutual fund investment with these parameters:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Initial Investment: $10,000</li>
                <li>Monthly Investment: $500</li>
                <li>Expected Annual Return: 8%</li>
                <li>Expense Ratio: 0.75%</li>
                <li>Front-Load Fee: 1%</li>
                <li>Investment Period: 20 years</li>
              </ul>
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">
                  After fees, your effective annual return would be approximately 7.25% (8% - 0.75%),
                  and your initial investment would be reduced to $9,900 due to the front-load fee.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Considerations</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Impact of Fees: Even small differences in expense ratios can significantly affect long-term returns.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Fund Performance: Past performance doesn't guarantee future results.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Investment Strategy: Consider your risk tolerance and investment timeline.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Tax Implications: Different types of mutual funds have varying tax consequences.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Types of Mutual Funds</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Equity Funds: Invest primarily in stocks for potential growth.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Bond Funds: Focus on fixed-income securities for steady returns.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Balanced Funds: Mix of stocks and bonds for moderate risk.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Index Funds: Track specific market indices with lower fees.</span>
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
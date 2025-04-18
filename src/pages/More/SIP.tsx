import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, RefreshCw, TrendingUp, Clock, DollarSign, LineChart } from 'lucide-react';

export function SIP() {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/', { state: { calculator: 'sip' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <RefreshCw className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Understanding Systematic Investment Plans (SIP)</h1>
          </div>

          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              A Systematic Investment Plan (SIP) is a disciplined investment strategy that allows you to invest fixed amounts at regular intervals. This method leverages the power of compounding and dollar-cost averaging to potentially enhance returns while reducing the impact of market volatility.
            </p>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Disciplined Investing</h3>
                  </div>
                  <p className="text-gray-600">Regular investments help build a long-term wealth creation habit.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Rupee Cost Averaging</h3>
                  </div>
                  <p className="text-gray-600">Reduces impact of market volatility by averaging purchase costs.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Power of Compounding</h3>
                  </div>
                  <p className="text-gray-600">Earnings on both principal and accumulated returns.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Flexible Investment</h3>
                  </div>
                  <p className="text-gray-600">Start with small amounts and increase over time.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">The Formula</h2>
              <div className="bg-white p-4 rounded-md font-mono text-lg text-center mb-4">
                FV = P × ((1 + r)^n - 1) / r × (1 + r)
              </div>
              <p className="text-gray-600">
                Where:<br />
                FV = Future Value<br />
                P = Monthly Investment Amount<br />
                r = Monthly Rate of Return (Annual Rate ÷ 12)<br />
                n = Total Number of Monthly Investments
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Calculation</h2>
              <p className="text-gray-600 mb-4">
                Let's calculate the future value of a SIP with these parameters:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Monthly Investment: $1,000</li>
                <li>Investment Period: 10 years</li>
                <li>Expected Annual Return: 12%</li>
                <li>Monthly Rate: 1% (12% ÷ 12)</li>
                <li>Number of Investments: 120 (10 years × 12 months)</li>
                <li>Future Value ≈ $230,387</li>
                <li>Total Investment: $120,000</li>
                <li>Wealth Generated: $110,387</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How SIP Works</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Regular Investments: Fixed amount invested at regular intervals (usually monthly).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Automated Process: Investments are automatically deducted and invested.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Unit Allocation: More units purchased when prices are low, fewer when high.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Long-term Benefits: Compound growth potential over extended periods.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Strategies</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Step-up SIP: Increase investment amount periodically to match income growth.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Trigger SIP: Additional investments triggered by market conditions.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Multi-scheme SIP: Diversify investments across multiple schemes.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Perpetual SIP: No end date, continues until explicitly stopped.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Best Practices</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Start Early: Take advantage of compounding over longer periods.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Stay Consistent: Avoid stopping or pausing investments during market volatility.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Review Periodically: Monitor performance and adjust strategy if needed.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Increase Gradually: Boost investment amount as income grows.</span>
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
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, TrendingDown, LineChart, Calculator } from 'lucide-react';

export function InflationAdjusted() {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/', { state: { calculator: 'inflation' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <DollarSign className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Understanding Inflation-Adjusted Returns</h1>
          </div>

          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Inflation-adjusted returns, also known as real returns, show the true purchasing power of your investments over time by accounting for the effects of inflation. This helps you make more informed investment decisions and better plan for your financial future.
            </p>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Concepts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Nominal Value</h3>
                  </div>
                  <p className="text-gray-600">The face value of your investment before adjusting for inflation.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <h3 className="font-medium text-gray-900">Inflation Rate</h3>
                  </div>
                  <p className="text-gray-600">The rate at which purchasing power decreases over time.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Real Value</h3>
                  </div>
                  <p className="text-gray-600">The actual purchasing power of your investment after inflation.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Real Return</h3>
                  </div>
                  <p className="text-gray-600">The investment return adjusted for inflation effects.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">The Formula</h2>
              <div className="bg-white p-4 rounded-md font-mono text-lg text-center mb-4">
                Real Return = ((1 + Nominal Rate) / (1 + Inflation Rate)) - 1
              </div>
              <p className="text-gray-600">
                For future value calculations:<br />
                Real FV = PV × ((1 + r) / (1 + i))^n<br />
                Where:<br />
                PV = Present Value<br />
                r = Nominal Interest Rate<br />
                i = Inflation Rate<br />
                n = Number of Years
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Calculation</h2>
              <p className="text-gray-600 mb-4">
                Let's analyze an investment with these parameters:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Initial Investment: $10,000</li>
                <li>Nominal Interest Rate: 7%</li>
                <li>Inflation Rate: 3%</li>
                <li>Time Period: 10 years</li>
                <li>Nominal Future Value: $19,672</li>
                <li>Real Future Value: $14,802</li>
                <li>Loss of Purchasing Power: $4,870</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Impact of Inflation</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Purchasing Power: A dollar today will buy less in the future due to inflation.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Investment Returns: High nominal returns might translate to modest real returns.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Long-term Planning: Critical for retirement and long-term financial goals.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Risk Assessment: Helps evaluate if returns truly outpace inflation.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Practical Applications</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Retirement Planning: Ensure savings maintain purchasing power through retirement.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Investment Selection: Compare investments based on real returns.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Goal Setting: Set realistic financial goals accounting for inflation.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Portfolio Management: Maintain investment value in real terms.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Strategies</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Inflation-Protected Securities: Government bonds that adjust with inflation.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Real Assets: Investments in property, commodities, or other tangible assets.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Dividend Growth: Companies that consistently increase dividends above inflation.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Dynamic Asset Allocation: Adjusting portfolio mix based on inflation trends.</span>
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
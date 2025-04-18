import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, TrendingDown, PenTool as Tool, LineChart } from 'lucide-react';

export function CarValue() {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/', { state: { calculator: 'car-value' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Car className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Understanding Car Value Depreciation</h1>
          </div>

          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Vehicle depreciation is the gradual decrease in a car's value over time due to various factors including age, mileage, condition, and market trends. Understanding these factors helps you make informed decisions about vehicle purchases and maintenance.
            </p>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Concepts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Car className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Base Depreciation</h3>
                  </div>
                  <p className="text-gray-600">The standard rate at which a vehicle loses value over time.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Tool className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Maintenance Impact</h3>
                  </div>
                  <p className="text-gray-600">How regular maintenance affects the vehicle's value retention.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Mileage Effect</h3>
                  </div>
                  <p className="text-gray-600">The impact of annual mileage on depreciation rate.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Market Trends</h3>
                  </div>
                  <p className="text-gray-600">How market conditions affect vehicle values.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">The Formula</h2>
              <div className="bg-white p-4 rounded-md font-mono text-lg text-center mb-4">
                FV = CV × (1 - DR)^Y × CM × MM × MT
              </div>
              <p className="text-gray-600">
                Where:<br />
                FV = Future Value<br />
                CV = Current Value<br />
                DR = Annual Depreciation Rate<br />
                Y = Years<br />
                CM = Condition Multiplier<br />
                MM = Mileage Multiplier<br />
                MT = Market Trend Factor
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Calculation</h2>
              <p className="text-gray-600 mb-4">
                Let's analyze a vehicle's depreciation with these parameters:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Current Value: $30,000</li>
                <li>Annual Depreciation: 15% (first year)</li>
                <li>Annual Mileage: 12,000 miles</li>
                <li>Condition: Excellent (1.1 multiplier)</li>
                <li>Market Trend: +2%</li>
                <li>First Year Value: $30,000 × (0.85) × 1.1 × 0.98 = $27,489</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Depreciation Factors</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Age-Based Depreciation: Most vehicles lose 15-25% value in the first year.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Mileage Impact: Every 1,000 miles above average reduces value by approximately 0.1-0.2%.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Maintenance Effect: Regular maintenance can increase value retention by 10-15%.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Market Conditions: Supply, demand, and economic factors can adjust values by ±5-10%.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Practical Applications</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Purchase Planning: Compare long-term costs of different vehicles.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Lease vs. Buy Decisions: Evaluate residual values and total ownership costs.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Maintenance Budgeting: Plan maintenance investments based on value retention.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Resale Timing: Determine optimal timing for vehicle sale or trade-in.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleCalculatorClick}
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Car className="w-5 h-5 mr-2" />
                Try the Calculator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
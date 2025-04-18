import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, TrendingUp, PenTool as Tool, LineChart } from 'lucide-react';

export function HomeValue() {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/', { state: { calculator: 'home-value' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Home className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Understanding Home Value Appreciation</h1>
          </div>

          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Home value appreciation is influenced by multiple factors including market trends, property improvements, location, and economic conditions. Understanding these factors helps you make informed decisions about your real estate investments.
            </p>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Factors</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Home className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Base Appreciation</h3>
                  </div>
                  <p className="text-gray-600">Natural increase in property value over time based on market conditions.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Tool className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Improvements</h3>
                  </div>
                  <p className="text-gray-600">Value added through renovations and property upgrades.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Market Trends</h3>
                  </div>
                  <p className="text-gray-600">Local real estate market conditions and economic factors.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Location Growth</h3>
                  </div>
                  <p className="text-gray-600">Impact of neighborhood development and area desirability.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Value-Adding Improvements</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Kitchen Remodeling</h3>
                  <p className="text-gray-600">Often returns 70-80% of investment through increased home value.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Bathroom Updates</h3>
                  <p className="text-gray-600">Can return 60-80% of investment in added value.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Energy Efficiency</h3>
                  <p className="text-gray-600">Modern upgrades can increase value while reducing operating costs.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Calculation</h2>
              <p className="text-gray-600 mb-4">
                Let's analyze a home's potential value growth with these parameters:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Current Value: $300,000</li>
                <li>Annual Appreciation: 3%</li>
                <li>Planned Improvements: $50,000</li>
                <li>Improvement Value Appreciation: 50%</li>
                <li>Market Trend Adjustment: +1%</li>
                <li>Time Period: 10 years</li>
              </ul>
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">
                  With these factors, the home could appreciate to approximately $450,000 after 10 years,
                  including both market appreciation and the value added by improvements.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Market Considerations</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Location Quality: School districts, amenities, and neighborhood development impact value.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Economic Factors: Interest rates, employment rates, and local economy affect property values.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Property Condition: Regular maintenance helps maintain and increase value.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Market Cycles: Real estate markets typically move in cycles of growth and correction.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Long-term Value Strategies</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Strategic Improvements: Focus on upgrades that add the most value relative to cost.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Regular Maintenance: Prevent depreciation through consistent upkeep.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Market Timing: Consider local market cycles when planning major improvements.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Professional Assessment: Regular appraisals help track value and identify improvement opportunities.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleCalculatorClick}
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Try the Calculator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
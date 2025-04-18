import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, PiggyBank, Clock, TrendingUp, DollarSign, Percent } from 'lucide-react';

export function Retirement() {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/', { state: { calculator: 'retirement' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <PiggyBank className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Understanding Retirement Planning</h1>
          </div>

          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Retirement planning is a crucial financial process that helps ensure you'll have enough money to live comfortably during your retirement years. Understanding the various factors that affect your retirement savings and how to calculate your needs is essential for creating an effective retirement strategy.
            </p>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Components</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Current Savings</h3>
                  </div>
                  <p className="text-gray-600">Your existing retirement savings and investments.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <PiggyBank className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Monthly Contributions</h3>
                  </div>
                  <p className="text-gray-600">Regular additions to your retirement accounts.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Expected Return</h3>
                  </div>
                  <p className="text-gray-600">Projected annual investment returns over time.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Time Horizon</h3>
                  </div>
                  <p className="text-gray-600">Years until and during retirement.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">The Formula</h2>
              <div className="bg-white p-4 rounded-md font-mono text-lg text-center mb-4">
                FV = PV(1 + r)^n + PMT × ((1 + r)^n - 1) / r
              </div>
              <p className="text-gray-600">
                Where:<br />
                FV = Future Value (retirement savings goal)<br />
                PV = Present Value (current savings)<br />
                PMT = Regular Payment (monthly contribution)<br />
                r = Expected Return Rate (annual)<br />
                n = Number of Years until Retirement
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Types</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                    <Percent className="w-5 h-5 text-indigo-600" />
                    <span>Traditional 401(k)</span>
                  </h3>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Pre-tax contributions reduce current taxable income</li>
                    <li>• Employer matching often available</li>
                    <li>• Withdrawals taxed as ordinary income</li>
                    <li>• Required minimum distributions (RMDs) at age 72</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                    <Percent className="w-5 h-5 text-green-600" />
                    <span>Roth IRA</span>
                  </h3>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• After-tax contributions</li>
                    <li>• Tax-free qualified withdrawals</li>
                    <li>• No required minimum distributions</li>
                    <li>• Income limits apply for contributions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                    <Percent className="w-5 h-5 text-blue-600" />
                    <span>Traditional IRA</span>
                  </h3>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Tax-deductible contributions (income limits apply)</li>
                    <li>• Tax-deferred growth</li>
                    <li>• Required minimum distributions</li>
                    <li>• Withdrawals taxed as ordinary income</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Calculation</h2>
              <p className="text-gray-600 mb-4">
                Let's calculate retirement savings with these parameters:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Current Age: 30 years</li>
                <li>Retirement Age: 65 years</li>
                <li>Current Savings: $50,000</li>
                <li>Monthly Contribution: $1,000</li>
                <li>Expected Annual Return: 7%</li>
                <li>Future Value ≈ $2,145,000</li>
                <li>Total Contributions: $470,000</li>
                <li>Investment Earnings: $1,675,000</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Considerations</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Inflation: Consider how inflation will affect your purchasing power in retirement.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Healthcare Costs: Plan for increasing medical expenses in retirement years.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Social Security: Factor in expected Social Security benefits as part of your retirement income.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Tax Planning: Consider the tax implications of different retirement accounts and withdrawal strategies.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Strategies</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Asset Allocation: Balance risk and return based on your time horizon and risk tolerance.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Diversification: Spread investments across different asset classes to reduce risk.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Rebalancing: Regularly adjust your portfolio to maintain your target asset allocation.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Risk Management: Adjust investment strategy as you approach retirement.</span>
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
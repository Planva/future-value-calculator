import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, PiggyBank, Clock, TrendingUp } from 'lucide-react';

export function Annuity() {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/', { state: { calculator: 'annuity' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <PiggyBank className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Understanding Annuities</h1>
          </div>

          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              An annuity is a financial product that provides regular payments at fixed intervals. Understanding how annuities work is crucial for retirement planning, investment strategies, and creating reliable income streams. The calculations help determine both the future value of regular payments and the payment amounts needed to reach specific financial goals.
            </p>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Concepts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <PiggyBank className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Regular Payments</h3>
                  </div>
                  <p className="text-gray-600">Fixed amounts paid or received at regular intervals (monthly, quarterly, annually).</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Payment Frequency</h3>
                  </div>
                  <p className="text-gray-600">How often payments are made, affecting the compound growth rate.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Interest Rate</h3>
                  </div>
                  <p className="text-gray-600">The annual rate at which the investment grows between payments.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Future Value</h3>
                  </div>
                  <p className="text-gray-600">The total value of all payments plus accumulated interest at the end of the term.</p>
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
                PMT = Payment Amount<br />
                r = Interest Rate per Period<br />
                n = Total Number of Periods<br /><br />
                For monthly payments with annual interest rate:<br />
                r = Annual Rate / 12<br />
                n = Years × 12
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Calculation</h2>
              <p className="text-gray-600 mb-4">
                Let's calculate the future value of monthly payments with these parameters:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Monthly Payment: $500</li>
                <li>Annual Interest Rate: 6% (0.5% monthly)</li>
                <li>Time Period: 20 years (240 months)</li>
                <li>Payment Frequency: Monthly</li>
                <li>Future Value ≈ $232,176</li>
                <li>Total Contributions: $120,000</li>
                <li>Interest Earned: $112,176</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Types of Annuities</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Ordinary Annuity: Payments made at the end of each period.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Annuity Due: Payments made at the beginning of each period.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Fixed Annuity: Payments remain constant throughout the term.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Variable Annuity: Payments may vary based on investment performance.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Practical Applications</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Retirement Planning: Calculate required monthly savings for retirement goals.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Education Savings: Plan for future education expenses through regular contributions.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Investment Planning: Determine the growth potential of regular investment contributions.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Mortgage Payments: Understand the long-term impact of regular mortgage payments.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Considerations</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Time Value of Money: Earlier contributions have more time to grow and compound.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Payment Frequency: More frequent payments can result in higher returns.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Interest Rate Environment: Market conditions affect potential returns.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Tax Implications: Different types of annuities have varying tax treatments.</span>
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
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, TrendingUp, Percent, Clock } from 'lucide-react';

export function CompoundInterest() {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/', { state: { calculator: 'compound' } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Understanding Compound Interest</h1>
          </div>

          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Compound interest is often called the "eighth wonder of the world" because it allows your money to grow exponentially by earning interest not only on your initial investment but also on the accumulated interest from previous periods.
            </p>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Concepts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Principal Amount</h3>
                  </div>
                  <p className="text-gray-600">The initial amount you invest or deposit.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Percent className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">Interest Rate</h3>
                  </div>
                  <p className="text-gray-600">The annual rate at which your investment earns returns.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Compounding Frequency</h3>
                  </div>
                  <p className="text-gray-600">How often interest is calculated and added to your principal (annually, monthly, etc.).</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Compound Growth</h3>
                  </div>
                  <p className="text-gray-600">The exponential increase in value over time due to earning interest on interest.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">The Formula</h2>
              <div className="bg-white p-4 rounded-md font-mono text-lg text-center mb-4">
                A = P(1 + r/n)^(nt)
              </div>
              <p className="text-gray-600">
                Where:<br />
                A = Final amount<br />
                P = Principal amount<br />
                r = Annual interest rate (decimal)<br />
                n = Number of times interest is compounded per year<br />
                t = Number of years
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Calculation</h2>
              <p className="text-gray-600 mb-4">
                Let's say you invest $10,000 at 6% annual interest, compounded monthly for 10 years:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Principal (P) = $10,000</li>
                <li>Annual rate (r) = 6% = 0.06</li>
                <li>Compounding frequency (n) = 12 (monthly)</li>
                <li>Time (t) = 10 years</li>
                <li>A = $10,000(1 + 0.06/12)^(12 × 10)</li>
                <li>Final Amount = $18,193.97</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">The Power of Compounding</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Earlier you start, the more time your money has to grow exponentially.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">More frequent compounding periods result in higher returns.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-gray-600">Small differences in interest rates can lead to significant differences over time.</span>
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
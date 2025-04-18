import React from 'react';
import { Info, Calculator, Users, Globe } from 'lucide-react';

export function About() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 mb-8">
          <Info className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">About Future Value Calculator</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At Future Value Calculator, we're dedicated to helping individuals and businesses make
              informed financial decisions through accurate, easy-to-use calculation tools and
              educational resources.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <Calculator className="w-8 h-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Precise Calculations</h3>
                <p className="text-gray-600">
                  Our calculators use industry-standard formulas to ensure accurate financial projections.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <Users className="w-8 h-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">User-Friendly</h3>
                <p className="text-gray-600">
                  Designed for everyone, from financial experts to beginners in investment planning.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <Globe className="w-8 h-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Global Access</h3>
                <p className="text-gray-600">
                  Free online tools accessible worldwide to help with financial planning.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Our financial calculators are designed with precision and user experience in mind.
                Whether you're planning for retirement, calculating investment returns, or analyzing
                loan payments, we provide the tools you need to make informed decisions.
              </p>
              <p className="text-gray-600">
                We understand that financial planning can be complex, which is why we've created
                intuitive tools that simplify the process while maintaining accuracy and reliability.
              </p>
            </div>

            <div className="mt-8 bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600">
                Have questions or suggestions? We'd love to hear from you. Visit our website at
                www.future-value-calculator.com for more information.
              </p>
              <p className="text-gray-600">
                Email:ethan.digiplanpro@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
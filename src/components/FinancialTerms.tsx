import React from 'react';
import { BookOpen, Calculator, DollarSign, TrendingUp, Clock, Percent } from 'lucide-react';

interface Term {
  title: string;
  icon: React.ElementType;
  description: string;
  example?: string;
  formula?: string;
}

const FINANCIAL_TERMS: Term[] = [
  {
    title: 'Future Value (FV)',
    icon: Calculator,
    description: 'The value of an asset or cash at a specified date in the future, assuming a specific growth rate.',
    formula: 'FV = PV × (1 + r)^n',
    example: '$1,000 invested at 5% annually for 3 years will have a future value of $1,157.63'
  },
  {
    title: 'Present Value (PV)',
    icon: DollarSign,
    description: 'The current worth of a future sum of money given a specified rate of return.',
    formula: 'PV = FV ÷ (1 + r)^n',
    example: 'To have $10,000 in 5 years at 6% interest, you need a present value of $7,472.58'
  },
  {
    title: 'Compound Interest',
    icon: TrendingUp,
    description: 'Interest calculated on both the initial principal and the accumulated interest from previous periods.',
    formula: 'A = P(1 + r/n)^(nt)',
    example: '$1,000 at 5% compounded monthly grows more than at 5% compounded annually'
  },
  {
    title: 'Annual Percentage Rate (APR)',
    icon: Percent,
    description: 'The yearly interest rate without taking into account compound interest within the year.',
    example: 'A 12% APR means 1% interest per month if compounded monthly'
  },
  {
    title: 'Time Value of Money',
    icon: Clock,
    description: 'The concept that money available now is worth more than the same amount in the future due to its potential earning capacity.',
    example: '$100 today is worth more than $100 a year from now due to potential investment returns'
  },
  {
    title: 'Annuity',
    icon: Calculator,
    description: 'A series of equal payments made at regular intervals.',
    formula: 'FV = PMT × ((1 + r)^n - 1) / r',
    example: 'Monthly deposits of $100 into a retirement account'
  }
];

export function FinancialTerms() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Financial Terms Glossary</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FINANCIAL_TERMS.map((term) => (
            <div key={term.title} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <term.icon className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-gray-900">{term.title}</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{term.description}</p>
              
              {term.formula && (
                <div className="bg-white rounded p-2 mb-2">
                  <p className="text-sm font-mono text-indigo-600">{term.formula}</p>
                </div>
              )}
              
              {term.example && (
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Example:</span> {term.example}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { Calculator, PiggyBank, TrendingUp, DollarSign, Save } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { useSavedCalculations } from '../contexts/SavedCalculationsContext';
import { SaveCalculationModal } from './SaveCalculationModal';
import { ShareResults } from './ShareResults';

interface CalculationResult {
  futureValue: number;
  totalInvestment: number;
  totalEarnings: number;
  effectiveReturn: number;
  yearByYearValues: Array<{
    year: number;
    value: number;
    investment: number;
    earnings: number;
  }>;
}

export function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(1000);
  const [annualRate, setAnnualRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [result, setResult] = useState<CalculationResult>({
    futureValue: 0,
    totalInvestment: 0,
    totalEarnings: 0,
    effectiveReturn: 0,
    yearByYearValues: []
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { saveCalculation } = useSavedCalculations();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateSIP = () => {
      const monthlyRate = (annualRate / 100) / 12;
      const months = years * 12;
      const yearByYearValues = [];
      let currentValue = 0;
      let totalInvestment = 0;

      for (let year = 1; year <= years; year++) {
        const yearStartValue = currentValue;
        const yearInvestment = monthlyInvestment * 12;
        totalInvestment += yearInvestment;

        // Calculate monthly compounding for the year
        for (let month = 1; month <= 12; month++) {
          currentValue += monthlyInvestment;
          currentValue *= (1 + monthlyRate);
        }

        yearByYearValues.push({
          year,
          value: Math.round(currentValue),
          investment: yearInvestment,
          earnings: Math.round(currentValue - yearStartValue - yearInvestment)
        });
      }

      const totalEarnings = currentValue - totalInvestment;
      const effectiveReturn = ((currentValue / totalInvestment) - 1) * 100;

      setResult({
        futureValue: Math.round(currentValue),
        totalInvestment: Math.round(totalInvestment),
        totalEarnings: Math.round(totalEarnings),
        effectiveReturn: Math.round(effectiveReturn * 100) / 100,
        yearByYearValues
      });
    };

    calculateSIP();
  }, [monthlyInvestment, annualRate, years]);

  const handleSave = (name: string) => {
    saveCalculation(
      'SIP',
      name,
      result,
      { monthlyInvestment, annualRate, years }
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Monthly Investment
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(monthlyInvestment)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[monthlyInvestment]}
              onValueChange={(value) => setMonthlyInvestment(value[0])}
              max={10000}
              min={100}
              step={100}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-indigo-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-indigo-600 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Monthly Investment"
              />
            </Slider.Root>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Annual Interest Rate
              </label>
              <span className="text-sm text-gray-500">{annualRate}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[annualRate]}
              onValueChange={(value) => setAnnualRate(value[0])}
              max={20}
              min={1}
              step={0.1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-green-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-green-600 rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Interest Rate"
              />
            </Slider.Root>
            <input
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Investment Period (Years)
              </label>
              <span className="text-sm text-gray-500">{years} years</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[years]}
              onValueChange={(value) => setYears(value[0])}
              max={30}
              min={1}
              step={1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Years"
              />
            </Slider.Root>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-medium text-gray-900">Results</h3>
            </div>
            <div className="flex items-center space-x-4">
              <ShareResults resultRef={resultRef} title="SIP Calculation" />
              <button
                onClick={() => setShowSaveModal(true)}
                className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>

          <div ref={resultRef} className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <PiggyBank className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-900">Future Value</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-600">
                {formatCurrency(result.futureValue)}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">Total Investment</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.totalInvestment)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {formatCurrency(monthlyInvestment)} × {years * 12} months
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Total Earnings</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(result.totalEarnings)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Effective Return: {result.effectiveReturn}%
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Investment vs Earnings</span>
                <span>
                  {((result.totalEarnings / result.futureValue) * 100).toFixed(1)}% Earnings
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(result.totalEarnings / result.futureValue) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="w-5 h-5 text-indigo-600" />
                <h3 className="font-medium text-gray-900">Year-by-Year Growth</h3>
              </div>
              <div className="space-y-2">
                {result.yearByYearValues.map((yearData, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Year {yearData.year}:</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-indigo-600">{formatCurrency(yearData.value)}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-green-600">+{formatCurrency(yearData.earnings)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-medium text-gray-700">Investment Summary</h4>
              </div>
              <p className="text-sm text-gray-600">
                By investing {formatCurrency(monthlyInvestment)} monthly at {annualRate}% annual return,
                your investment will grow to {formatCurrency(result.futureValue)} in {years} years.
                This represents a {result.effectiveReturn}% total return on your investment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SaveCalculationModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSave}
      />
    </div>
  );
}
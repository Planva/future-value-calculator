import React, { useState, useEffect, useRef } from 'react';
import { Calculator, PiggyBank, ArrowDownCircle, TrendingUp, Save } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { useSavedCalculations } from '../contexts/SavedCalculationsContext';
import { SaveCalculationModal } from './SaveCalculationModal';
import { ShareResults } from './ShareResults';

interface CalculationResult {
  futureValue: number;
  totalContributions: number;
  totalEarnings: number;
}

export function MonthlyContributionsCalculator() {
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualRate, setAnnualRate] = useState<number>(7);
  const [years, setYears] = useState<number>(10);
  const [result, setResult] = useState<CalculationResult>({
    futureValue: 0,
    totalContributions: 0,
    totalEarnings: 0
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { saveCalculation } = useSavedCalculations();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateFutureValue = () => {
      const monthlyRate = annualRate / 100 / 12;
      const months = years * 12;

      // Future value of initial amount
      const initialFV = initialAmount * Math.pow(1 + monthlyRate, months);

      // Future value of monthly contributions
      const contributionsFV = monthlyContribution * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

      const totalFV = initialFV + contributionsFV;
      const totalContributions = initialAmount + (monthlyContribution * months);
      const totalEarnings = totalFV - totalContributions;

      setResult({
        futureValue: Math.round(totalFV),
        totalContributions: Math.round(totalContributions),
        totalEarnings: Math.round(totalEarnings)
      });
    };

    calculateFutureValue();
  }, [initialAmount, monthlyContribution, annualRate, years]);

  const handleSave = (name: string) => {
    saveCalculation(
      'Monthly Contributions',
      name,
      result,
      { initialAmount, monthlyContribution, annualRate, years }
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
                Initial Investment
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(initialAmount)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[initialAmount]}
              onValueChange={(value) => setInitialAmount(value[0])}
              max={100000}
              min={0}
              step={100}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-indigo-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-indigo-600 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Initial Investment"
              />
            </Slider.Root>
            <input
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Monthly Contribution
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(monthlyContribution)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[monthlyContribution]}
              onValueChange={(value) => setMonthlyContribution(value[0])}
              max={5000}
              min={0}
              step={50}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-indigo-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-indigo-600 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Monthly Contribution"
              />
            </Slider.Root>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
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
              min={0}
              step={0.1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-indigo-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-indigo-600 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Annual Interest Rate"
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
              max={50}
              min={1}
              step={1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-indigo-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-indigo-600 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
              <ShareResults resultRef={resultRef} title="Monthly Contributions Calculation" />
              <button
                onClick={() => setShowSaveModal(true)}
                className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
          
          <div ref={resultRef} className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Future Value</p>
              <p className="text-2xl font-bold text-indigo-600">
                ${result.futureValue.toLocaleString()}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Total Contributions</p>
              <p className="text-xl font-semibold text-green-600">
                ${result.totalContributions.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Monthly: {formatCurrency(monthlyContribution)} × {years * 12} months
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Investment Earnings</p>
              <p className="text-xl font-semibold text-blue-600">
                ${result.totalEarnings.toLocaleString()}
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Principal vs Interest</span>
                <span>{((result.totalEarnings / result.futureValue) * 100).toFixed(1)}% Interest</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(result.totalContributions / result.futureValue) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Investment Summary</h4>
              <p className="text-sm text-gray-600">
                Starting with {formatCurrency(initialAmount)} and contributing {formatCurrency(monthlyContribution)} monthly,
                your investment will grow to {formatCurrency(result.futureValue)} in {years} years at {annualRate}% annual return.
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
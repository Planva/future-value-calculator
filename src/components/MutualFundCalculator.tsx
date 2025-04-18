import React, { useState, useEffect, useRef } from 'react';
import { Calculator, PiggyBank, TrendingUp, DollarSign, Percent, Save } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { useSavedCalculations } from '../contexts/SavedCalculationsContext';
import { SaveCalculationModal } from './SaveCalculationModal';
import { ShareResults } from './ShareResults';

interface CalculationResult {
  futureValue: number;
  totalInvestment: number;
  totalReturns: number;
  totalFees: number;
  effectiveReturn: number;
}

export function MutualFundCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(500);
  const [years, setYears] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [expenseRatio, setExpenseRatio] = useState<number>(0.75);
  const [frontLoad, setFrontLoad] = useState<number>(0);
  const [result, setResult] = useState<CalculationResult>({
    futureValue: 0,
    totalInvestment: 0,
    totalReturns: 0,
    totalFees: 0,
    effectiveReturn: 0
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { saveCalculation } = useSavedCalculations();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateMutualFund = () => {
      const monthlyRate = (expectedReturn / 100) / 12;
      const months = years * 12;
      const monthlyExpenseRate = (expenseRatio / 100) / 12;
      
      // Apply front-load fee to initial investment
      const initialAfterLoad = initialInvestment * (1 - frontLoad / 100);
      const monthlyAfterLoad = monthlyInvestment * (1 - frontLoad / 100);
      
      let balance = initialAfterLoad;
      let totalFees = initialInvestment - initialAfterLoad; // Front-load fees
      let totalInvested = initialInvestment;
      
      // Monthly calculations
      for (let i = 0; i < months; i++) {
        // Add monthly investment
        balance += monthlyAfterLoad;
        totalInvested += monthlyInvestment;
        
        // Calculate and subtract monthly expenses
        const monthlyFee = balance * monthlyExpenseRate;
        balance -= monthlyFee;
        totalFees += monthlyFee;
        
        // Add monthly returns
        balance *= (1 + monthlyRate);
      }

      const totalReturns = balance - totalInvested + totalFees;
      const effectiveReturn = ((balance / totalInvested) ** (1 / years) - 1) * 100;

      setResult({
        futureValue: Math.round(balance),
        totalInvestment: Math.round(totalInvested),
        totalReturns: Math.round(totalReturns),
        totalFees: Math.round(totalFees),
        effectiveReturn: Math.round(effectiveReturn * 100) / 100
      });
    };

    calculateMutualFund();
  }, [initialInvestment, monthlyInvestment, years, expectedReturn, expenseRatio, frontLoad]);

  const handleSave = (name: string) => {
    saveCalculation(
      'Mutual Fund',
      name,
      result,
      { initialInvestment, monthlyInvestment, years, expectedReturn, expenseRatio, frontLoad }
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
              <span className="text-sm text-gray-500">{formatCurrency(initialInvestment)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[initialInvestment]}
              onValueChange={(value) => setInitialInvestment(value[0])}
              max={100000}
              min={1000}
              step={1000}
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
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

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
              max={5000}
              min={0}
              step={50}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-green-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-green-600 rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
                Expected Annual Return
              </label>
              <span className="text-sm text-gray-500">{expectedReturn}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[expectedReturn]}
              onValueChange={(value) => setExpectedReturn(value[0])}
              max={20}
              min={0}
              step={0.1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Expected Return"
              />
            </Slider.Root>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Expense Ratio
              </label>
              <span className="text-sm text-gray-500">{expenseRatio}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[expenseRatio]}
              onValueChange={(value) => setExpenseRatio(value[0])}
              max={2}
              min={0}
              step={0.01}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-red-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-red-500 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Expense Ratio"
              />
            </Slider.Root>
            <input
              type="number"
              value={expenseRatio}
              onChange={(e) => setExpenseRatio(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Front-Load Fee
              </label>
              <span className="text-sm text-gray-500">{frontLoad}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[frontLoad]}
              onValueChange={(value) => setFrontLoad(value[0])}
              max={5}
              min={0}
              step={0.1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-red-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-red-500 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Front Load Fee"
              />
            </Slider.Root>
            <input
              type="number"
              value={frontLoad}
              onChange={(e) => setFrontLoad(Number(e.target.value))}
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
              max={40}
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
              <ShareResults resultRef={resultRef} title="Mutual Fund Calculation" />
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
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Total Investment</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(result.totalInvestment)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Initial: {formatCurrency(initialInvestment)} + Monthly: {formatCurrency(monthlyInvestment)}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">Total Returns</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.totalReturns)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Effective Annual Return: {result.effectiveReturn}%
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Percent className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-medium text-gray-900">Total Fees</h3>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(result.totalFees)}
              </p>
              <div className="text-sm text-gray-500 mt-1 space-y-1">
                <p>Front Load: {formatCurrency(initialInvestment * (frontLoad / 100))}</p>
                <p>Annual Expenses: {formatCurrency(result.totalFees - (initialInvestment * (frontLoad / 100)))}</p>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Investment vs Returns</span>
                <span>{((result.totalReturns / result.futureValue) * 100).toFixed(1)}% Returns</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(result.totalReturns / result.futureValue) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Investment Analysis</h4>
              <p className="text-sm text-gray-600">
                With {formatCurrency(initialInvestment)} initial investment and {formatCurrency(monthlyInvestment)} monthly contributions,
                your investment will grow to {formatCurrency(result.futureValue)} in {years} years at {expectedReturn}% return.
                Total fees of {formatCurrency(result.totalFees)} reduce your effective annual return to {result.effectiveReturn}%.
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
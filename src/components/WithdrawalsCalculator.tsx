import React, { useState, useEffect, useRef } from 'react';
import { Calculator, PiggyBank, ArrowDownCircle, TrendingUp, Save } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { useSavedCalculations } from '../contexts/SavedCalculationsContext';
import { SaveCalculationModal } from './SaveCalculationModal';
import { ShareResults } from './ShareResults';

interface CalculationResult {
  finalBalance: number;
  totalWithdrawals: number;
  totalEarnings: number;
  monthsUntilDepletion: number | null;
}

export function WithdrawalsCalculator() {
  const [initialBalance, setInitialBalance] = useState<number>(500000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(2000);
  const [annualRate, setAnnualRate] = useState<number>(5);
  const [years, setYears] = useState<number>(20);
  const [result, setResult] = useState<CalculationResult>({
    finalBalance: 0,
    totalWithdrawals: 0,
    totalEarnings: 0,
    monthsUntilDepletion: null
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { saveCalculation } = useSavedCalculations();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateWithdrawals = () => {
      const monthlyRate = annualRate / 100 / 12;
      const months = years * 12;
      let balance = initialBalance;
      let totalWithdrawals = 0;
      let monthsToDepletion = null;

      // Simulate month-by-month to track balance and find depletion point
      for (let i = 0; i < months; i++) {
        // Add monthly interest
        balance += balance * monthlyRate;
        // Subtract withdrawal
        balance -= monthlyWithdrawal;
        totalWithdrawals += monthlyWithdrawal;

        // Check for depletion
        if (balance <= 0 && monthsToDepletion === null) {
          monthsToDepletion = i + 1;
          break;
        }
      }

      const finalBalance = Math.max(0, balance);
      const actualWithdrawals = monthsToDepletion 
        ? monthsToDepletion * monthlyWithdrawal 
        : totalWithdrawals;
      const totalEarnings = Math.max(0, finalBalance + actualWithdrawals - initialBalance);

      setResult({
        finalBalance: Math.round(finalBalance),
        totalWithdrawals: Math.round(actualWithdrawals),
        totalEarnings: Math.round(totalEarnings),
        monthsUntilDepletion: monthsToDepletion
      });
    };

    calculateWithdrawals();
  }, [initialBalance, monthlyWithdrawal, annualRate, years]);

  const handleSave = (name: string) => {
    saveCalculation(
      'Withdrawals',
      name,
      result,
      { initialBalance, monthlyWithdrawal, annualRate, years }
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
                Initial Balance
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(initialBalance)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[initialBalance]}
              onValueChange={(value) => setInitialBalance(value[0])}
              max={2000000}
              min={10000}
              step={10000}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-indigo-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-indigo-600 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Initial Balance"
              />
            </Slider.Root>
            <input
              type="number"
              value={initialBalance}
              onChange={(e) => setInitialBalance(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Monthly Withdrawal
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(monthlyWithdrawal)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[monthlyWithdrawal]}
              onValueChange={(value) => setMonthlyWithdrawal(value[0])}
              max={10000}
              min={100}
              step={100}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-red-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-red-500 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Monthly Withdrawal"
              />
            </Slider.Root>
            <input
              type="number"
              value={monthlyWithdrawal}
              onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Annual Return Rate
              </label>
              <span className="text-sm text-gray-500">{annualRate}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[annualRate]}
              onValueChange={(value) => setAnnualRate(value[0])}
              max={15}
              min={0}
              step={0.1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-green-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-green-600 rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Annual Return Rate"
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
                Time Period (Years)
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
              <ShareResults resultRef={resultRef} title="Withdrawals Calculation" />
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
                <h3 className="text-lg font-medium text-gray-900">Final Balance</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-600">
                {formatCurrency(result.finalBalance)}
              </p>
              {result.monthsUntilDepletion && (
                <div className="mt-2 p-2 bg-red-50 rounded-md">
                  <p className="text-sm text-red-600">
                    ⚠️ Funds depleted after {Math.floor(result.monthsUntilDepletion / 12)} years and {result.monthsUntilDepletion % 12} months
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <ArrowDownCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-medium text-gray-900">Total Withdrawals</h3>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(result.totalWithdrawals)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Monthly: {formatCurrency(monthlyWithdrawal)}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">Investment Earnings</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.totalEarnings)}
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Remaining vs Withdrawn</span>
                <span>
                  {result.finalBalance > 0 
                    ? `${((result.finalBalance / (result.finalBalance + result.totalWithdrawals)) * 100).toFixed(1)}% Remaining`
                    : '0% Remaining'}
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ 
                    width: `${result.finalBalance > 0 
                      ? (result.finalBalance / (result.finalBalance + result.totalWithdrawals)) * 100 
                      : 0}%` 
                  }}
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Withdrawal Analysis</h4>
              <p className="text-sm text-gray-600">
                With {formatCurrency(monthlyWithdrawal)} monthly withdrawals and {annualRate}% annual returns,
                your initial {formatCurrency(initialBalance)} {result.monthsUntilDepletion 
                  ? `will last ${Math.floor(result.monthsUntilDepletion / 12)} years and ${result.monthsUntilDepletion % 12} months`
                  : `will grow to ${formatCurrency(result.finalBalance)} after ${years} years`}.
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
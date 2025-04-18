import React, { useState, useEffect, useRef } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock, Save } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { useSavedCalculations } from '../contexts/SavedCalculationsContext';
import { SaveCalculationModal } from './SaveCalculationModal';
import { ShareResults } from './ShareResults';

interface CalculationResult {
  futureValue: number;
  totalContributions: number;
  totalEarnings: number;
  effectiveYield: number;
  yearByYearValues: Array<{
    year: number;
    value: number;
    contribution: number;
    earnings: number;
  }>;
}

export function AnnuityCalculator() {
  const [principal, setPrincipal] = useState<number>(1000);
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(10);
  const [frequency, setFrequency] = useState<number>(12);
  const [result, setResult] = useState<CalculationResult>({
    futureValue: 0,
    totalContributions: 0,
    totalEarnings: 0,
    effectiveYield: 0,
    yearByYearValues: []
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { saveCalculation } = useSavedCalculations();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateAnnuity = () => {
      const yearByYearValues = [];
      let currentValue = 0;
      const ratePerPeriod = rate / 100 / frequency;
      const periodsPerYear = frequency;
      
      for (let year = 1; year <= time; year++) {
        let yearStart = currentValue;
        let yearContribution = 0;
        
        // Calculate each period within the year
        for (let period = 1; period <= periodsPerYear; period++) {
          currentValue += principal;
          yearContribution += principal;
          currentValue *= (1 + ratePerPeriod);
        }
        
        const yearEarnings = currentValue - yearStart - yearContribution;
        
        yearByYearValues.push({
          year,
          value: Math.round(currentValue),
          contribution: Math.round(yearContribution),
          earnings: Math.round(yearEarnings)
        });
      }

      const totalContributions = principal * frequency * time;
      const totalEarnings = currentValue - totalContributions;
      const effectiveYield = ((currentValue / totalContributions) - 1) * 100;

      setResult({
        futureValue: Math.round(currentValue),
        totalContributions: Math.round(totalContributions),
        totalEarnings: Math.round(totalEarnings),
        effectiveYield: Math.round(effectiveYield * 100) / 100,
        yearByYearValues
      });
    };

    calculateAnnuity();
  }, [principal, rate, time, frequency]);

  const handleSave = (name: string) => {
    saveCalculation(
      'Annuity',
      name,
      result,
      { principal, rate, time, frequency }
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
                Regular Payment Amount
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(principal)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[principal]}
              onValueChange={(value) => setPrincipal(value[0])}
              max={10000}
              min={100}
              step={100}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-indigo-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-indigo-600 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Payment Amount"
              />
            </Slider.Root>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Annual Interest Rate
              </label>
              <span className="text-sm text-gray-500">{rate}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[rate]}
              onValueChange={(value) => setRate(value[0])}
              max={20}
              min={0}
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
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Time Period (Years)
              </label>
              <span className="text-sm text-gray-500">{time} years</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[time]}
              onValueChange={(value) => setTime(value[0])}
              max={40}
              min={1}
              step={1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Time Period"
              />
            </Slider.Root>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={1}>Annually</option>
              <option value={2}>Semi-annually</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
              <option value={26}>Bi-weekly</option>
              <option value={52}>Weekly</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-medium text-gray-900">Results</h3>
            </div>
            <div className="flex items-center space-x-4">
              <ShareResults resultRef={resultRef} title="Annuity Calculation" />
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
                <Calculator className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-900">Future Value</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-600">
                {formatCurrency(result.futureValue)}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Total Contributions</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(result.totalContributions)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {formatCurrency(principal)} × {time * frequency} payments
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">Total Earnings</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.totalEarnings)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Effective Yield: {result.effectiveYield}%
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Contributions vs Earnings</span>
                <span>
                  {((result.totalEarnings / result.futureValue) * 100).toFixed(1)}% Earnings
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(result.totalEarnings / result.futureValue) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-indigo-600" />
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
                <Clock className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-medium text-gray-700">Payment Schedule</h4>
              </div>
              <p className="text-sm text-gray-600">
                Making {formatCurrency(principal)} payments {frequency === 1 ? 'annually' : 
                  frequency === 2 ? 'semi-annually' :
                  frequency === 4 ? 'quarterly' :
                  frequency === 12 ? 'monthly' :
                  frequency === 26 ? 'bi-weekly' : 'weekly'} 
                at {rate}% annual interest will grow to {formatCurrency(result.futureValue)} in {time} years.
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
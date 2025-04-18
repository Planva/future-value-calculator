import React, { useState, useEffect, useRef } from 'react';
import { Calculator, TrendingDown, LineChart, Save } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { useSavedCalculations } from '../contexts/SavedCalculationsContext';
import { SaveCalculationModal } from './SaveCalculationModal';
import { ShareResults } from './ShareResults';

interface CalculationResult {
  nominalValue: number;
  realValue: number;
  inflationImpact: number;
  yearByYearValues: Array<{
    year: number;
    nominal: number;
    real: number;
    impact: number;
  }>;
}

export function InflationCalculator() {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(3);
  const [years, setYears] = useState<number>(10);
  const [result, setResult] = useState<CalculationResult>({
    nominalValue: 0,
    realValue: 0,
    inflationImpact: 0,
    yearByYearValues: []
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { saveCalculation } = useSavedCalculations();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateRealFV = () => {
      const r = rate / 100;
      const i = inflationRate / 100;
      const yearByYearValues = [];
      
      let nominalValue = principal;
      let realValue = principal;
      
      for (let year = 1; year <= years; year++) {
        // Calculate nominal value (without inflation adjustment)
        nominalValue = principal * Math.pow(1 + r, year);
        
        // Calculate real value (inflation-adjusted)
        // Using Fisher equation: real rate = ((1 + nominal rate) / (1 + inflation rate)) - 1
        realValue = principal * Math.pow((1 + r) / (1 + i), year);
        
        // Calculate inflation impact
        const impact = nominalValue - realValue;
        
        yearByYearValues.push({
          year,
          nominal: Math.round(nominalValue),
          real: Math.round(realValue),
          impact: Math.round(impact)
        });
      }
      
      setResult({
        nominalValue: Math.round(nominalValue),
        realValue: Math.round(realValue),
        inflationImpact: Math.round(nominalValue - realValue),
        yearByYearValues
      });
    };

    calculateRealFV();
  }, [principal, rate, inflationRate, years]);

  const handleSave = (name: string) => {
    saveCalculation(
      'Inflation-Adjusted',
      name,
      result,
      { principal, rate, inflationRate, years }
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
                Principal Amount
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(principal)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[principal]}
              onValueChange={(value) => setPrincipal(value[0])}
              max={1000000}
              min={1000}
              step={1000}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-indigo-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-indigo-600 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Principal"
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
                Nominal Interest Rate
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
                Expected Inflation Rate
              </label>
              <span className="text-sm text-gray-500">{inflationRate}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[inflationRate]}
              onValueChange={(value) => setInflationRate(value[0])}
              max={15}
              min={0}
              step={0.1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-red-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-red-500 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Inflation Rate"
              />
            </Slider.Root>
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
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
              <ShareResults resultRef={resultRef} title="Inflation-Adjusted Calculation" />
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
                <h3 className="text-lg font-medium text-gray-900">Nominal Future Value</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-600">
                {formatCurrency(result.nominalValue)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Before inflation adjustment
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">Real Future Value</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.realValue)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Adjusted for inflation
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-medium text-gray-900">Impact of Inflation</h3>
              </div>
              <p className="text-2xl font-bold text-red-600">
                -{formatCurrency(result.inflationImpact)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Loss of purchasing power
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Real vs Nominal Value</span>
                <span>{((result.realValue / result.nominalValue) * 100).toFixed(1)}% of Nominal</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(result.realValue / result.nominalValue) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-2 mb-4">
                <LineChart className="w-5 h-5 text-indigo-600" />
                <h3 className="font-medium text-gray-900">Year-by-Year Forecast</h3>
              </div>
              <div className="space-y-2">
                {result.yearByYearValues.map((yearData, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Year {yearData.year}:</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-indigo-600">{formatCurrency(yearData.nominal)}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-green-600">{formatCurrency(yearData.real)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Understanding the Impact</h4>
              <p className="text-sm text-gray-600">
                While your investment grows at {rate}% nominally, inflation at {inflationRate}% reduces
                your actual purchasing power. Your {formatCurrency(principal)} investment will be worth {formatCurrency(result.realValue)} in
                today's purchasing power after {years} years.
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
import React, { useState, useEffect, useRef } from 'react';
import { Home, TrendingUp, PenTool as Tool, LineChart, Save } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { useSavedCalculations } from '../contexts/SavedCalculationsContext';
import { SaveCalculationModal } from './SaveCalculationModal';
import { ShareResults } from './ShareResults';

interface CalculationResult {
  futureValue: number;
  totalAppreciation: number;
  annualizedReturn: number;
  improvementValue: number;
}

export function HomeValueCalculator() {
  const [currentValue, setCurrentValue] = useState<number>(500000);
  const [annualAppreciation, setAnnualAppreciation] = useState<number>(3);
  const [years, setYears] = useState<number>(10);
  const [improvements, setImprovements] = useState<number>(25000);
  const [improvementAppreciation, setImprovementAppreciation] = useState<number>(50);
  const [marketAdjustment, setMarketAdjustment] = useState<number>(0);
  const [result, setResult] = useState<CalculationResult>({
    futureValue: 0,
    totalAppreciation: 0,
    annualizedReturn: 0,
    improvementValue: 0
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { saveCalculation } = useSavedCalculations();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateHomeValue = () => {
      // Calculate base appreciation
      const baseAppreciationRate = (annualAppreciation + marketAdjustment) / 100;
      const baseValue = currentValue * Math.pow(1 + baseAppreciationRate, years);
      
      // Calculate improvement value with its own appreciation
      const improvementAppreciationRate = (annualAppreciation + improvementAppreciation + marketAdjustment) / 100;
      const improvedValue = improvements * Math.pow(1 + improvementAppreciationRate, years);
      
      const totalValue = baseValue + improvedValue;
      const totalAppreciation = totalValue - currentValue - improvements;
      const annualizedReturn = (Math.pow(totalValue / (currentValue + improvements), 1 / years) - 1) * 100;

      setResult({
        futureValue: Math.round(totalValue),
        totalAppreciation: Math.round(totalAppreciation),
        annualizedReturn: Math.round(annualizedReturn * 100) / 100,
        improvementValue: Math.round(improvedValue)
      });
    };

    calculateHomeValue();
  }, [currentValue, annualAppreciation, years, improvements, improvementAppreciation, marketAdjustment]);

  const handleSave = (name: string) => {
    saveCalculation(
      'Home Value',
      name,
      result,
      { currentValue, annualAppreciation, years, improvements, improvementAppreciation, marketAdjustment }
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
                Current Home Value
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(currentValue)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[currentValue]}
              onValueChange={(value) => setCurrentValue(value[0])}
              max={2000000}
              min={100000}
              step={10000}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-indigo-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-indigo-600 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Current Value"
              />
            </Slider.Root>
            <input
              type="number"
              value={currentValue}
              onChange={(e) => setCurrentValue(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Annual Appreciation Rate
              </label>
              <span className="text-sm text-gray-500">{annualAppreciation}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[annualAppreciation]}
              onValueChange={(value) => setAnnualAppreciation(value[0])}
              max={15}
              min={-5}
              step={0.1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-green-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-green-600 rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Annual Appreciation"
              />
            </Slider.Root>
            <input
              type="number"
              value={annualAppreciation}
              onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Planned Improvements
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(improvements)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[improvements]}
              onValueChange={(value) => setImprovements(value[0])}
              max={200000}
              min={0}
              step={5000}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Improvements"
              />
            </Slider.Root>
            <input
              type="number"
              value={improvements}
              onChange={(e) => setImprovements(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Improvement Value Appreciation
              </label>
              <span className="text-sm text-gray-500">{improvementAppreciation}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[improvementAppreciation]}
              onValueChange={(value) => setImprovementAppreciation(value[0])}
              max={100}
              min={0}
              step={5}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-purple-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-purple-600 rounded-full hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Improvement Appreciation"
              />
            </Slider.Root>
            <input
              type="number"
              value={improvementAppreciation}
              onChange={(e) => setImprovementAppreciation(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Market Adjustment
              </label>
              <span className="text-sm text-gray-500">{marketAdjustment}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[marketAdjustment]}
              onValueChange={(value) => setMarketAdjustment(value[0])}
              max={10}
              min={-10}
              step={0.5}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-orange-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-orange-500 rounded-full hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label="Market Adjustment"
              />
            </Slider.Root>
            <input
              type="number"
              value={marketAdjustment}
              onChange={(e) => setMarketAdjustment(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Forecast Period (Years)
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
              <Home className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-medium text-gray-900">Results</h3>
            </div>
            <div className="flex items-center space-x-4">
              <ShareResults resultRef={resultRef} title="Home Value Calculation" />
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
                <Home className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-900">Future Home Value</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-600">
                {formatCurrency(result.futureValue)}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">Total Appreciation</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.totalAppreciation)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Annualized Return: {result.annualizedReturn}%
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Tool className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Future Improvement Value</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(result.improvementValue)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Initial Investment: {formatCurrency(improvements)}
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Initial vs Appreciation</span>
                <span>
                  {((result.totalAppreciation / result.futureValue) * 100).toFixed(1)}% Growth
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ 
                    width: `${(result.totalAppreciation / result.futureValue) * 100}%` 
                  }}
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <LineChart className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-medium text-gray-700">Value Forecast Analysis</h4>
              </div>
              <p className="text-sm text-gray-600">
                Your {formatCurrency(currentValue)} home with {formatCurrency(improvements)} in improvements
                is projected to be worth {formatCurrency(result.futureValue)} in {years} years.
                This includes market appreciation of {annualAppreciation + marketAdjustment}% annually
                and improvement value appreciation of {improvementAppreciation}%.
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
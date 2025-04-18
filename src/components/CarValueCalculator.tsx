import React, { useState, useEffect, useRef } from 'react';
import { Car, TrendingDown, PenTool as Tool, LineChart, Calendar, Save } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { useSavedCalculations } from '../contexts/SavedCalculationsContext';
import { SaveCalculationModal } from './SaveCalculationModal';
import { ShareResults } from './ShareResults';

interface CalculationResult {
  futureValue: number;
  totalDepreciation: number;
  annualDepreciation: number;
  maintenanceImpact: number;
  yearByYearValues: Array<{
    year: number;
    value: number;
    depreciation: number;
  }>;
}

export function CarValueCalculator() {
  const [currentValue, setCurrentValue] = useState<number>(30000);
  const [age, setAge] = useState<number>(0);
  const [years, setYears] = useState<number>(5);
  const [annualMileage, setAnnualMileage] = useState<number>(12000);
  const [condition, setCondition] = useState<string>('excellent');
  const [maintenanceBudget, setMaintenanceBudget] = useState<number>(1000);
  const [marketTrend, setMarketTrend] = useState<number>(0);
  const [result, setResult] = useState<CalculationResult>({
    futureValue: 0,
    totalDepreciation: 0,
    annualDepreciation: 0,
    maintenanceImpact: 0,
    yearByYearValues: []
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { saveCalculation } = useSavedCalculations();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateCarValue = () => {
      const yearByYearValues = [];
      let currentCarValue = currentValue;
      let totalDepreciation = 0;

      // Depreciation rates based on car age
      const getDepreciationRate = (carAge: number) => {
        if (carAge === 0) return 0.20; // First year
        if (carAge === 1) return 0.15; // Second year
        if (carAge <= 5) return 0.10; // Years 3-5
        return 0.07; // Years 6+
      };

      // Condition multiplier
      const conditionMultipliers = {
        excellent: 1.1,
        good: 1.0,
        fair: 0.9,
        poor: 0.8
      };

      // Mileage impact (per mile over/under 12,000)
      const mileageImpact = (annualMileage - 12000) * -0.0001;

      // Calculate year by year
      for (let year = 1; year <= years; year++) {
        const carAge = age + year;
        const baseDepreciation = getDepreciationRate(carAge);
        
        // Apply condition and mileage adjustments
        const adjustedDepreciation = baseDepreciation + 
          (mileageImpact / 100) + 
          (marketTrend / 100);

        // Calculate maintenance impact
        const maintenanceMultiplier = Math.min(
          1.1,
          maintenanceBudget / (currentValue * 0.05)
        );

        // Calculate this year's depreciation
        const yearDepreciation = currentCarValue * adjustedDepreciation;
        
        // Apply all multipliers
        currentCarValue = (currentCarValue - yearDepreciation) * 
          conditionMultipliers[condition as keyof typeof conditionMultipliers] *
          maintenanceMultiplier;

        totalDepreciation += yearDepreciation;

        yearByYearValues.push({
          year: carAge,
          value: Math.round(currentCarValue),
          depreciation: Math.round(yearDepreciation)
        });
      }

      const maintenanceImpact = maintenanceBudget * years * 0.5;

      setResult({
        futureValue: Math.round(currentCarValue + maintenanceImpact),
        totalDepreciation: Math.round(totalDepreciation),
        annualDepreciation: Math.round(totalDepreciation / years),
        maintenanceImpact: Math.round(maintenanceImpact),
        yearByYearValues
      });
    };

    calculateCarValue();
  }, [currentValue, age, years, annualMileage, condition, maintenanceBudget, marketTrend]);

  const handleSave = (name: string) => {
    saveCalculation(
      'Car Value',
      name,
      result,
      { currentValue, age, years, annualMileage, condition, maintenanceBudget, marketTrend }
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
                Current Vehicle Value
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(currentValue)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[currentValue]}
              onValueChange={(value) => setCurrentValue(value[0])}
              max={200000}
              min={1000}
              step={1000}
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
                Vehicle Age (Years)
              </label>
              <span className="text-sm text-gray-500">{age} years</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[age]}
              onValueChange={(value) => setAge(value[0])}
              max={20}
              min={0}
              step={1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Vehicle Age"
              />
            </Slider.Root>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Annual Mileage
              </label>
              <span className="text-sm text-gray-500">{annualMileage.toLocaleString()} miles</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[annualMileage]}
              onValueChange={(value) => setAnnualMileage(value[0])}
              max={50000}
              min={0}
              step={1000}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-yellow-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-yellow-500 rounded-full hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                aria-label="Annual Mileage"
              />
            </Slider.Root>
            <input
              type="number"
              value={annualMileage}
              onChange={(e) => setAnnualMileage(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Annual Maintenance Budget
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(maintenanceBudget)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[maintenanceBudget]}
              onValueChange={(value) => setMaintenanceBudget(value[0])}
              max={5000}
              min={0}
              step={100}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-green-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-green-600 rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Maintenance Budget"
              />
            </Slider.Root>
            <input
              type="number"
              value={maintenanceBudget}
              onChange={(e) => setMaintenanceBudget(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Market Trend Adjustment
              </label>
              <span className="text-sm text-gray-500">{marketTrend}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[marketTrend]}
              onValueChange={(value) => setMarketTrend(value[0])}
              max={10}
              min={-10}
              step={0.5}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-purple-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-purple-600 rounded-full hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Market Trend"
              />
            </Slider.Root>
            <input
              type="number"
              value={marketTrend}
              onChange={(e) => setMarketTrend(Number(e.target.value))}
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
              max={10}
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
              <Car className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-medium text-gray-900">Results</h3>
            </div>
            <div className="flex items-center space-x-4">
              <ShareResults resultRef={resultRef} title="Car Value Calculation" />
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
                <Car className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-900">Future Vehicle Value</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-600">
                {formatCurrency(result.futureValue)}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-medium text-gray-900">Total Depreciation</h3>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(result.totalDepreciation)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Annual Average: {formatCurrency(result.annualDepreciation)}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Tool className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">Maintenance Value Impact</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.maintenanceImpact)}
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Value Retention</span>
                <span>
                  {((result.futureValue / currentValue) * 100).toFixed(1)}% of Original Value
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(result.futureValue / currentValue) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <h3 className="font-medium text-gray-900">Year-by-Year Forecast</h3>
              </div>
              <div className="space-y-2">
                {result.yearByYearValues.map((yearData, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">Year {yearData.year}:</span>
                    <span className="font-medium">{formatCurrency(yearData.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <LineChart className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-medium text-gray-700">Value Analysis</h4>
              </div>
              <p className="text-sm text-gray-600">
                Your {formatCurrency(currentValue)} vehicle is projected to be worth {formatCurrency(result.futureValue)} after {years} years,
                considering {annualMileage.toLocaleString()} annual miles, {condition} condition, and {formatCurrency(maintenanceBudget)} annual maintenance.
                Market trends of {marketTrend}% have been factored into the calculation.
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
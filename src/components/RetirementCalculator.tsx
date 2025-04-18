import React, { useState, useEffect, useRef } from 'react';
import { Calculator, PiggyBank, DollarSign, TrendingUp, Info, Save } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { useSavedCalculations } from '../contexts/SavedCalculationsContext';
import { SaveCalculationModal } from './SaveCalculationModal';
import { ShareResults } from './ShareResults';

interface RetirementResult {
  futureValue: number;
  totalContributions: number;
  totalEarnings: number;
  taxSavings: number;
  yearByYearValues: Array<{
    year: number;
    age: number;
    balance: number;
    contribution: number;
    earnings: number;
  }>;
}

type AccountType = '401k' | 'rothIra' | 'general';

const ACCOUNT_LIMITS = {
  '401k': 22500, // 2024 limit
  rothIra: 7000, // 2024 limit
  general: Infinity
};

const TAX_BRACKETS = [
  { rate: 0.37, threshold: 578125 },
  { rate: 0.35, threshold: 231250 },
  { rate: 0.32, threshold: 182100 },
  { rate: 0.24, threshold: 95375 },
  { rate: 0.22, threshold: 44725 },
  { rate: 0.12, threshold: 11600 },
  { rate: 0.10, threshold: 0 }
];

const ACCOUNT_INFO = {
  '401k': {
    title: 'Traditional 401(k)',
    description: 'An employer-sponsored retirement plan that allows pre-tax contributions, reducing your current taxable income.',
    features: [
      'Pre-tax contributions up to $22,500 annually (2024)',
      'Tax-deferred growth until withdrawal',
      'Mandatory withdrawals (RMDs) starting at age 72',
      'Potential employer matching contributions',
      '10% early withdrawal penalty before age 59½',
      'Contributions reduce current taxable income',
      'Withdrawals taxed as ordinary income'
    ],
    pros: [
      'Immediate tax benefits',
      'Higher contribution limits',
      'Potential employer match',
      'Automatic payroll deductions'
    ],
    cons: [
      'Required minimum distributions',
      'Limited investment options',
      'Withdrawals taxed as income',
      'Early withdrawal penalties'
    ]
  },
  rothIra: {
    title: 'Roth IRA',
    description: 'An individual retirement account funded with after-tax dollars, offering tax-free growth and qualified withdrawals.',
    features: [
      'After-tax contributions up to $7,000 annually (2024)',
      'Tax-free growth and qualified withdrawals',
      'No required minimum distributions',
      'Income limits apply for contributions',
      'Flexible investment options',
      '5-year holding period for tax-free earnings withdrawal',
      'Principal can be withdrawn anytime'
    ],
    pros: [
      'Tax-free withdrawals in retirement',
      'No RMDs required',
      'More investment choices',
      'Flexible withdrawal rules'
    ],
    cons: [
      'No immediate tax benefits',
      'Lower contribution limits',
      'Income restrictions',
      'No employer matching'
    ]
  },
  general: {
    title: 'General Investment Account',
    description: 'A flexible, taxable investment account with no contribution limits or withdrawal restrictions.',
    features: [
      'No contribution limits',
      'No withdrawal restrictions',
      'Flexible investment options',
      'Capital gains tax applies',
      'No special tax advantages',
      'Can be used for any purpose',
      'No age-based penalties'
    ],
    pros: [
      'No contribution limits',
      'Complete flexibility',
      'No age restrictions',
      'No income limits'
    ],
    cons: [
      'No tax advantages',
      'Capital gains taxes apply',
      'No tax-deferred growth',
      'No employer contributions'
    ]
  }
};

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [accountType, setAccountType] = useState<AccountType>('401k');
  const [annualIncome, setAnnualIncome] = useState<number>(85000);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [result, setResult] = useState<RetirementResult>({
    futureValue: 0,
    totalContributions: 0,
    totalEarnings: 0,
    taxSavings: 0,
    yearByYearValues: []
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { saveCalculation } = useSavedCalculations();
  const resultRef = useRef<HTMLDivElement>(null);

  const calculateTaxSavings = (contribution: number) => {
    let remainingIncome = annualIncome;
    let totalTax = 0;
    let totalTaxWithDeduction = 0;

    for (const bracket of TAX_BRACKETS) {
      if (remainingIncome > bracket.threshold) {
        const taxableInThisBracket = remainingIncome - bracket.threshold;
        totalTax += taxableInThisBracket * bracket.rate;
        remainingIncome = bracket.threshold;
      }
    }

    remainingIncome = annualIncome - contribution;
    for (const bracket of TAX_BRACKETS) {
      if (remainingIncome > bracket.threshold) {
        const taxableInThisBracket = remainingIncome - bracket.threshold;
        totalTaxWithDeduction += taxableInThisBracket * bracket.rate;
        remainingIncome = bracket.threshold;
      }
    }

    return totalTax - totalTaxWithDeduction;
  };

  useEffect(() => {
    const calculateRetirement = () => {
      const years = retirementAge - currentAge;
      const monthlyRate = expectedReturn / 100 / 12;
      const yearByYearValues = [];
      
      // Adjust contribution to account limits
      const annualContribution = monthlyContribution * 12;
      const adjustedMonthlyContribution = Math.min(
        monthlyContribution,
        ACCOUNT_LIMITS[accountType] / 12
      );

      let currentBalance = currentSavings;
      let totalContributions = currentSavings;

      for (let year = 1; year <= years; year++) {
        const yearStartBalance = currentBalance;
        
        // Add monthly contributions and returns for the year
        for (let month = 1; month <= 12; month++) {
          currentBalance += adjustedMonthlyContribution;
          currentBalance *= (1 + monthlyRate);
        }

        const yearContribution = adjustedMonthlyContribution * 12;
        totalContributions += yearContribution;
        
        yearByYearValues.push({
          year,
          age: currentAge + year,
          balance: Math.round(currentBalance),
          contribution: Math.round(yearContribution),
          earnings: Math.round(currentBalance - yearStartBalance - yearContribution)
        });
      }

      const totalEarnings = currentBalance - totalContributions;

      // Calculate tax savings for traditional 401k
      const taxSavings = accountType === '401k' 
        ? calculateTaxSavings(Math.min(annualContribution, ACCOUNT_LIMITS[accountType]))
        : 0;

      setResult({
        futureValue: Math.round(currentBalance),
        totalContributions: Math.round(totalContributions),
        totalEarnings: Math.round(totalEarnings),
        taxSavings: Math.round(taxSavings),
        yearByYearValues
      });
    };

    calculateRetirement();
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, accountType, annualIncome]);

  const handleSave = (name: string) => {
    saveCalculation(
      'Retirement',
      name,
      result,
      {
        currentAge,
        retirementAge,
        currentSavings,
        monthlyContribution,
        expectedReturn,
        accountType,
        annualIncome
      }
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
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
          </div>
          <button
            onClick={() => setShowAccountInfo(!showAccountInfo)}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            {showAccountInfo ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
        
        {showAccountInfo && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">{ACCOUNT_INFO[accountType].title}</h4>
              <p className="mt-1 text-sm text-gray-600">{ACCOUNT_INFO[accountType].description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Key Features</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {ACCOUNT_INFO[accountType].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Advantages</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {ACCOUNT_INFO[accountType].pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Limitations</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {ACCOUNT_INFO[accountType].cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as AccountType)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="401k">Traditional 401(k)</option>
              <option value="rothIra">Roth IRA</option>
              <option value="general">General Investment Account</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Current Age
              </label>
              <span className="text-sm text-gray-500">{currentAge} years</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[currentAge]}
              onValueChange={(value) => setCurrentAge(value[0])}
              max={80}
              min={18}
              step={1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-indigo-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-indigo-600 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Current Age"
              />
            </Slider.Root>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Retirement Age
              </label>
              <span className="text-sm text-gray-500">{retirementAge} years</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[retirementAge]}
              onValueChange={(value) => setRetirementAge(value[0])}
              max={90}
              min={currentAge + 1}
              step={1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-green-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-green-600 rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Retirement Age"
              />
            </Slider.Root>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Current Savings
              </label>
              <span className="text-sm text-gray-500">{formatCurrency(currentSavings)}</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[currentSavings]}
              onValueChange={(value) => setCurrentSavings(value[0])}
              max={1000000}
              min={0}
              step={1000}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Current Savings"
              />
            </Slider.Root>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
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
              step={100}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-purple-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-purple-600 rounded-full hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Monthly Contribution"
              />
            </Slider.Root>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {monthlyContribution * 12 > ACCOUNT_LIMITS[accountType] && accountType !== 'general' && (
              <p className="mt-1 text-sm text-red-600">
                Contributions exceed annual limit of ${ACCOUNT_LIMITS[accountType].toLocaleString()}
              </p>
            )}
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
              max={15}
              min={1}
              step={0.1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-yellow-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg border-2 border-yellow-500 rounded-full hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
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

          {accountType === '401k' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Annual Income
                </label>
                <span className="text-sm text-gray-500">{formatCurrency(annualIncome)}</span>
              </div>
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={[annualIncome]}
                onValueChange={(value) => setAnnualIncome(value[0])}
                max={500000}
                min={30000}
                step={1000}
              >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                  <Slider.Range className="absolute bg-orange-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white shadow-lg border-2 border-orange-500 rounded-full hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  aria-label="Annual Income"
                />
              </Slider.Root>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-medium text-gray-900">Results</h3>
            </div>
            <div className="flex items-center space-x-4">
              <ShareResults resultRef={resultRef} title="Retirement Calculation" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <PiggyBank className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Future Value</h3>
                </div>
                <p className="text-2xl font-bold text-indigo-600">
                  {formatCurrency(result.futureValue)}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Total Contributions</h3>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(result.totalContributions)}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Investment Earnings</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(result.totalEarnings)}
                </p>
              </div>

              {accountType === '401k' && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calculator className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Annual Tax Savings</h3>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(result.taxSavings)}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Contributions vs Earnings</span>
                <span>
                  {((result.totalEarnings / result.futureValue) * 100).toFixed(1)}% Earnings
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
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
                  <div key={index} className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Age {yearData.age}:</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-indigo-600">{formatCurrency(yearData.balance)}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-green-600">+{formatCurrency(yearData.contribution)}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-blue-600">+{formatCurrency(yearData.earnings)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Retirement Summary</h4>
              <p className="text-sm text-gray-600">
                Starting at age {currentAge} with {formatCurrency(currentSavings)} and contributing {formatCurrency(monthlyContribution)} monthly,
                your {ACCOUNT_INFO[accountType].title} will grow to {formatCurrency(result.futureValue)} by age {retirementAge} assuming {expectedReturn}% annual return.
                {accountType === '401k' && ` Your contributions will save you ${formatCurrency(result.taxSavings)} in taxes annually.`}
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
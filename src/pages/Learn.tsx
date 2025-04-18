import React from 'react';
import { BookOpen, Calculator, DollarSign, TrendingUp, Clock, PiggyBank, LineChart, Wallet } from 'lucide-react';

export function Learn() {
  const topics = [
    {
      title: "Understanding Future Value",
      icon: Calculator,
      description: "Learn how money grows over time and the impact of compound interest on your investments.",
      content: `The future value (FV) is what your investment will be worth after a certain period, considering the effects of compound interest. The basic formula is: FV = PV(1 + r)^n, where PV is present value, r is interest rate, and n is the number of periods.`
    },
    {
      title: "Compound Interest Explained",
      icon: TrendingUp,
      description: "Discover how compound interest can accelerate your wealth building journey.",
      content: `Compound interest is interest earned on both the initial principal and previously accumulated interest. This creates an exponential growth effect that can significantly increase your investment over time.`
    },
    {
      title: "Investment Strategies",
      icon: DollarSign,
      description: "Explore different investment approaches and how to use our calculators effectively.",
      content: `Different investment strategies suit different goals. Whether you're saving for retirement, planning for education, or building wealth, understanding various investment vehicles and their characteristics is crucial.`
    }
  ];

  const articles = [
    {
      title: "Building an Emergency Fund",
      icon: PiggyBank,
      date: "March 15, 2025",
      readTime: "5 min read",
      preview: "Learn why having an emergency fund is crucial and how to build one effectively.",
      content: [
        "An emergency fund is your financial safety net, typically covering 3-6 months of expenses.",
        "Start small with automatic monthly contributions to build your fund gradually.",
        "Keep your emergency fund in an easily accessible, low-risk account.",
        "Regularly review and adjust your fund size as your circumstances change."
      ]
    },
    {
      title: "Retirement Planning Essentials",
      icon: Clock,
      date: "March 12, 2025",
      readTime: "7 min read",
      preview: "Essential steps to create a solid retirement plan and secure your future.",
      content: [
        "Start planning early to take advantage of compound interest.",
        "Diversify your retirement portfolio across different investment types.",
        "Consider both pre-tax and after-tax retirement accounts.",
        "Regularly review and adjust your retirement strategy as needed."
      ]
    },
    {
      title: "Smart Investment Strategies",
      icon: LineChart,
      date: "March 10, 2025",
      readTime: "6 min read",
      preview: "Learn effective investment strategies for long-term wealth building.",
      content: [
        "Understand your risk tolerance and investment timeline.",
        "Diversify across different asset classes to manage risk.",
        "Consider dollar-cost averaging for consistent investing.",
        "Regularly rebalance your portfolio to maintain your target allocation."
      ]
    },
    {
      title: "Budgeting for Success",
      icon: Wallet,
      date: "March 8, 2025",
      readTime: "4 min read",
      preview: "Create and maintain a budget that helps you achieve your financial goals.",
      content: [
        "Track your income and expenses to understand your spending patterns.",
        "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
        "Set specific, measurable financial goals.",
        "Review and adjust your budget regularly to stay on track."
      ]
    }
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 mb-8">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Financial Learning Center</h1>
        </div>

        <div className="space-y-8">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <topic.icon className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-900">{topic.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{topic.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Planning Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <article.icon className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{article.preview}</p>
                  <div className="space-y-2">
                    {article.content.map((point, i) => (
                      <p key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need More Help?</h3>
          <p className="text-gray-600">
            Our comprehensive calculators are designed to help you make informed financial decisions.
            Explore our various calculators and start planning your financial future today.
          </p>
        </div>
      </div>
    </main>
  );
}
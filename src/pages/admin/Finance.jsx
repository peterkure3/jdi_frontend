import { useState } from 'react';
import {
  ArrowDownTrayIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowTrendingUpIcon,
  WalletIcon,
  AcademicCapIcon,
  PlusCircleIcon,
  UserIcon,
  ComputerDesktopIcon,
  BoltIcon,
  MinusCircleIcon
} from '@heroicons/react/24/outline';

export default function Finance() {
  const [timeFilter, setTimeFilter] = useState('month');
  
  const transactions = [
    { id: 1, type: 'income', description: 'Tuition Payment - Alice Johnson', amount: 5000, date: '2025-01-08', category: 'tuition' },
    { id: 2, type: 'expense', description: 'Faculty Salary - Dr. Smith', amount: 8500, date: '2025-01-07', category: 'salary' },
    { id: 3, type: 'income', description: 'Lab Fee - Chemistry Department', amount: 1200, date: '2025-01-06', category: 'fees' },
    { id: 4, type: 'expense', description: 'Equipment Purchase - IT Department', amount: 15000, date: '2025-01-05', category: 'equipment' },
    { id: 5, type: 'income', description: 'Tuition Payment - Bob Chen', amount: 5000, date: '2025-01-04', category: 'tuition' },
    { id: 6, type: 'expense', description: 'Utilities - Campus Facilities', amount: 3200, date: '2025-01-03', category: 'utilities' },
  ];

  const getTransactionIcon = (type, category) => {
    if (type === 'income') {
      return category === 'tuition' ? 'fa-graduation-cap' : 'fa-plus-circle';
    } else {
      switch (category) {
        case 'salary': return 'fa-user-tie';
        case 'equipment': return 'fa-laptop';
        case 'utilities': return 'fa-bolt';
        default: return 'fa-minus-circle';
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Finance</h1>
          <p className="text-neutral-600 mt-1">Financial overview and transaction management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export Report
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
            <PlusIcon className="w-4 h-4" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-status-success to-accent-lime rounded-xl flex items-center justify-center">
              <ArrowUpIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">$284,590</div>
              <div className="text-sm text-neutral-500">Total Revenue</div>
              <div className="text-xs text-status-success mt-1">+12.5% from last month</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-status-error to-accent-redDark rounded-xl flex items-center justify-center">
              <ArrowDownIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">$156,230</div>
              <div className="text-sm text-neutral-500">Total Expenses</div>
              <div className="text-xs text-status-error mt-1">+5.2% from last month</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-xl flex items-center justify-center">
              <ArrowTrendingUpIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">$128,360</div>
              <div className="text-sm text-neutral-500">Net Profit</div>
              <div className="text-xs text-status-success mt-1">+18.7% from last month</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-pink rounded-xl flex items-center justify-center">
              <WalletIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">$45,890</div>
              <div className="text-sm text-neutral-500">Cash Flow</div>
              <div className="text-xs text-neutral-600 mt-1">Available balance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-800">Revenue vs Expenses</h3>
            <div className="flex gap-2">
              {['week', 'month', 'quarter', 'year'].map(period => (
                <button
                  key={period}
                  onClick={() => setTimeFilter(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all capitalize ${
                    timeFilter === period
                      ? 'bg-brand-primary text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-neutral-500">
              <i className="fas fa-chart-area text-4xl mb-3"></i>
              <div>Revenue vs Expenses Chart</div>
              <div className="text-sm">Chart visualization would go here</div>
            </div>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Budget Breakdown</h3>
          <div className="space-y-4">
            {[
              { category: 'Salaries', amount: 85000, percentage: 54, color: 'bg-accent-purple' },
              { category: 'Operations', amount: 32000, percentage: 21, color: 'bg-accent-cyan' },
              { category: 'Equipment', amount: 25000, percentage: 16, color: 'bg-status-warning' },
              { category: 'Utilities', amount: 14230, percentage: 9, color: 'bg-status-info' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">{item.category}</span>
                  <span className="text-sm text-neutral-600">${item.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-800">Recent Transactions</h3>
          <button className="text-sm text-brand-primary hover:text-brand-primaryDark transition-colors">
            View All Transactions
          </button>
        </div>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-status-success/10 text-status-success' 
                    : 'bg-status-error/10 text-status-error'
                }`}>
                  <i className={`fas ${getTransactionIcon(transaction.type, transaction.category)} text-sm`}></i>
                </div>
                <div>
                  <div className="font-medium text-neutral-800">{transaction.description}</div>
                  <div className="text-sm text-neutral-500 capitalize">{transaction.category} • {transaction.date}</div>
                </div>
              </div>
              <div className={`text-right ${
                transaction.type === 'income' ? 'text-status-success' : 'text-status-error'
              }`}>
                <div className="font-semibold">
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </div>
                <div className="text-xs text-neutral-500 capitalize">{transaction.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-status-success to-accent-lime rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-money-bill-wave text-2xl"></i>
            <h3 className="text-lg font-semibold">Generate Invoice</h3>
          </div>
          <p className="text-white/90 text-sm mb-4">Create and send invoices to students</p>
          <button className="w-full bg-white/20 hover:bg-white/30 text-white rounded-lg py-2 transition-colors">
            Create Invoice
          </button>
        </div>
        <div className="bg-gradient-to-br from-accent-purple to-accent-pink rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-chart-pie text-2xl"></i>
            <h3 className="text-lg font-semibold">Financial Reports</h3>
          </div>
          <p className="text-white/90 text-sm mb-4">Generate detailed financial reports</p>
          <button className="w-full bg-white/20 hover:bg-white/30 text-white rounded-lg py-2 transition-colors">
            Generate Report
          </button>
        </div>
        <div className="bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-calculator text-2xl"></i>
            <h3 className="text-lg font-semibold">Budget Planning</h3>
          </div>
          <p className="text-white/90 text-sm mb-4">Plan and manage department budgets</p>
          <button className="w-full bg-white/20 hover:bg-white/30 text-white rounded-lg py-2 transition-colors">
            Manage Budget
          </button>
        </div>
      </div>
    </div>
  );
}

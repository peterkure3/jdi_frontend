import { useState } from 'react';
import {
  ArrowDownTrayIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  CalculatorIcon,
  PercentBadgeIcon,
  BuildingLibraryIcon,
  EllipsisVerticalIcon,
  PrinterIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  HomeIcon,
  BookOpenIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

export default function Financial() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const accountBalance = {
    current: -2450.00,
    outstanding: 2450.00,
    paid: 15750.00,
    total: 18200.00
  };

  const transactions = [
    {
      id: 1,
      date: '2024-03-15',
      description: 'Tuition Payment - Spring 2024',
      amount: -7500.00,
      type: 'tuition',
      status: 'pending'
    },
    {
      id: 2,
      date: '2024-03-10',
      description: 'Financial Aid Disbursement',
      amount: 3500.00,
      type: 'aid',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-03-05',
      description: 'Housing Fee - Spring 2024',
      amount: -1200.00,
      type: 'housing',
      status: 'completed'
    },
    {
      id: 4,
      date: '2024-02-28',
      description: 'Meal Plan - Spring 2024',
      amount: -800.00,
      type: 'meal',
      status: 'completed'
    },
    {
      id: 5,
      date: '2024-02-20',
      description: 'Book Store Purchase',
      amount: -350.00,
      type: 'books',
      status: 'completed'
    },
    {
      id: 6,
      date: '2024-02-15',
      description: 'Late Payment Fee',
      amount: -50.00,
      type: 'fee',
      status: 'completed'
    }
  ];

  const paymentMethods = [
    { id: 1, type: 'card', last4: '4532', brand: 'Visa', isDefault: true },
    { id: 2, type: 'bank', last4: '7890', bank: 'Chase Bank', isDefault: false }
  ];

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'tuition': return { icon: AcademicCapIcon, color: 'text-blue-500' };
      case 'aid': return { icon: CurrencyDollarIcon, color: 'text-green-500' };
      case 'housing': return { icon: HomeIcon, color: 'text-purple-500' };
      case 'meal': return { icon: CurrencyDollarIcon, color: 'text-orange-500' };
      case 'books': return { icon: BookOpenIcon, color: 'text-indigo-500' };
      case 'fee': return { icon: ExclamationTriangleIcon, color: 'text-red-500' };
      default: return { icon: CurrencyDollarIcon, color: 'text-neutral-500' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-status-success/10 text-status-success';
      case 'pending': return 'bg-status-warning/10 text-status-warning';
      case 'failed': return 'bg-status-error/10 text-status-error';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Financial</h1>
          <p className="text-neutral-600 mt-1">Manage your account balance and payment history</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download Statement
          </button>
          {/* <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-primaryDark text-white rounded-xl hover:shadow-lg transition-all">
            <i className="fas fa-credit-card text-sm"></i>
            Make Payment
          </button> */}
        </div>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm text-neutral-500">Outstanding Balance</div>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(accountBalance.outstanding)}
              </div>
            </div>
          </div>
          <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
            Due: March 20, 2024
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm text-neutral-500">Paid This Year</div>
              <div className="text-2xl font-bold text-neutral-800">
                {formatCurrency(accountBalance.paid)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <CalculatorIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm text-neutral-500">Total Charges</div>
              <div className="text-2xl font-bold text-neutral-800">
                {formatCurrency(accountBalance.total)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <PercentBadgeIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm text-neutral-500">Payment Progress</div>
              <div className="text-2xl font-bold text-neutral-800">
                {Math.round((accountBalance.paid / accountBalance.total) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-800">Payment Methods</h2>
          <button className="bg-brand-primary hover:bg-brand-primary-dark text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-primaryDark transition-colors">
            Add Payment Method
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                    {method.type === 'card' ? <CreditCardIcon className="w-5 h-5" /> : <BuildingLibraryIcon className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-medium text-neutral-800">
                      {method.type === 'card' ? `${method.brand} ****${method.last4}` : `Bank ****${method.last4}`}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {method.type === 'card' ? 'Credit Card' : method.bank}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault && (
                    <span className="bg-brand-primary/10 text-brand-primary px-2 py-1 rounded text-xs">
                      Default
                    </span>
                  )}
                  <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                    <EllipsisVerticalIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-card">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-800">Recent Transactions</h2>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
            >
              <option value="current">Current Semester</option>
              <option value="last">Last Semester</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
            <button className="bg-brand-primary hover:bg-brand-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
              <PrinterIcon className="w-4 h-4 mr-2" />
              Print
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-50 rounded-lg flex items-center justify-center">
                    {(() => {
                      const { icon: IconComponent, color } = getTransactionIcon(transaction.type);
                      return <IconComponent className={`w-5 h-5 ${color}`} />;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-800">{transaction.description}</h4>
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mt-1">
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${transaction.amount > 0 ? 'text-status-success' : 'text-neutral-800'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                  <button className="text-sm text-brand-primary hover:text-brand-primaryDark transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-white border border-neutral-200 text-neutral-700 px-6 py-2 rounded-lg hover:bg-neutral-50 transition-colors">
              Load More Transactions
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all text-left">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <div className="font-medium text-neutral-800">Set Up Payment Plan</div>
              <div className="text-sm text-neutral-600">Break down payments into installments</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all text-left">
            <div className="w-10 h-10 bg-status-success/10 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon className="w-5 h-5 text-status-success" />
            </div>
            <div>
              <div className="font-medium text-neutral-800">Apply for Financial Aid</div>
              <div className="text-sm text-neutral-600">Get help with tuition costs</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all text-left">
            <div className="w-10 h-10 bg-accent-purple/10 rounded-lg flex items-center justify-center">
              <QuestionMarkCircleIcon className="w-5 h-5 text-accent-purple" />
            </div>
            <div>
              <div className="font-medium text-neutral-800">Contact Financial Aid</div>
              <div className="text-sm text-neutral-600">Get help with your account</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

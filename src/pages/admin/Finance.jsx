import { useState } from 'react';
import { ExportModal, FormModal, ViewModal, ConfirmationModal } from '../../components/shared/modals';
import {
  ArrowDownTrayIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  WalletIcon 
} from '@heroicons/react/24/outline';

export default function Finance() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);
  const [showGenerateReportModal, setShowGenerateReportModal] = useState(false);
  const [showManageBudgetModal, setShowManageBudgetModal] = useState(false);

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

  const handleExportReport = async (exportOptions) => {
    console.log('Exporting financial report with options:', exportOptions);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleAddTransaction = async (transactionData) => {
    console.log('Adding new transaction:', transactionData);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleCreateInvoice = async (invoiceData) => {
    console.log('Creating new invoice:', invoiceData);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleGenerateReport = async (reportData) => {
    console.log('Generating financial report:', reportData);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleManageBudget = async (budgetData) => {
    console.log('Managing budget:', budgetData);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };



  const transactionFields = [
    { name: 'type', label: 'Transaction Type', type: 'select', required: true, options: [
      { value: 'income', label: 'Income' },
      { value: 'expense', label: 'Expense' },
      { value: 'transfer', label: 'Transfer' }
    ]},
    { name: 'amount', label: 'Amount', type: 'number', required: true, step: '0.01' },
    { name: 'description', label: 'Description', type: 'text', required: true, fullWidth: true },
    { name: 'category', label: 'Category', type: 'select', required: true, options: [
      { value: 'tuition', label: 'Tuition Fees' },
      { value: 'salaries', label: 'Staff Salaries' },
      { value: 'utilities', label: 'Utilities' },
      { value: 'supplies', label: 'Supplies' },
      { value: 'maintenance', label: 'Maintenance' },
      { value: 'other', label: 'Other' }
    ]},
    { name: 'date', label: 'Transaction Date', type: 'date', required: true },
    { name: 'reference', label: 'Reference Number', type: 'text' }
  ];

  const invoiceFields = [
    { name: 'studentId', label: 'Student ID', type: 'text', required: true },
    { name: 'studentName', label: 'Student Name', type: 'text', required: true },
    { name: 'invoiceType', label: 'Invoice Type', type: 'select', required: true, options: [
      { value: 'tuition', label: 'Tuition Fee' },
      { value: 'accommodation', label: 'Accommodation' },
      { value: 'library', label: 'Library Fine' },
      { value: 'lab', label: 'Lab Fee' },
      { value: 'other', label: 'Other' }
    ]},
    { name: 'amount', label: 'Amount', type: 'number', required: true, step: '0.01' },
    { name: 'dueDate', label: 'Due Date', type: 'date', required: true },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3, fullWidth: true }
  ];

  const reportFields = [
    { name: 'reportType', label: 'Report Type', type: 'select', required: true, options: [
      { value: 'income_statement', label: 'Income Statement' },
      { value: 'balance_sheet', label: 'Balance Sheet' },
      { value: 'cash_flow', label: 'Cash Flow Statement' },
      { value: 'budget_analysis', label: 'Budget Analysis' },
      { value: 'student_fees', label: 'Student Fees Report' }
    ]},
    { name: 'period', label: 'Period', type: 'select', required: true, options: [
      { value: 'current_month', label: 'Current Month' },
      { value: 'current_quarter', label: 'Current Quarter' },
      { value: 'current_year', label: 'Current Year' },
      { value: 'custom', label: 'Custom Range' }
    ]},
    { name: 'startDate', label: 'Start Date', type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date' },
    { name: 'includeComparisons', label: 'Include Previous Period Comparison', type: 'checkbox' }
  ];

  const budgetFields = [
    { name: 'category', label: 'Budget Category', type: 'select', required: true, options: [
      { value: 'salaries', label: 'Staff Salaries' },
      { value: 'utilities', label: 'Utilities' },
      { value: 'supplies', label: 'Supplies & Equipment' },
      { value: 'maintenance', label: 'Maintenance' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'other', label: 'Other Expenses' }
    ]},
    { name: 'budgetAmount', label: 'Budget Amount', type: 'number', required: true, step: '0.01' },
    { name: 'period', label: 'Budget Period', type: 'select', required: true, options: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'yearly', label: 'Yearly' }
    ]},
    { name: 'notes', label: 'Notes', type: 'textarea', rows: 2, fullWidth: true }
  ];


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Finance</h1>
          <p className="text-neutral-600 mt-1">Financial overview and transaction management</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowExportModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export Report
          </button>
          <button 
            onClick={() => setShowAddTransactionModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            Add Transaction
          </button>
          <button 
            onClick={() => setShowCreateInvoiceModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-purple hover:bg-accent-purple-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <DocumentTextIcon className="w-4 h-4" />
            Create Invoice
          </button>
          <button 
            onClick={() => setShowGenerateReportModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-orange hover:bg-accent-orange-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <ChartBarIcon className="w-4 h-4" />
            Generate Report
          </button>
          <button 
            onClick={() => setShowManageBudgetModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-cyan hover:bg-accent-cyan-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <CurrencyDollarIcon className="w-4 h-4" />
            Manage Budget
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
              <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="View Details">
                <EyeIcon className="w-4 h-4" />
              </button>
              <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Edit">
                <PencilIcon className="w-4 h-4" />
              </button>
              <button className="p-2 text-status-error hover:bg-status-error/10 rounded-lg transition-colors" title="Delete">
                <TrashIcon className="w-4 h-4" />
              </button>
              {['week', 'month', 'quarter', 'year'].map(period => (
                <button
                  key={period}
                  onClick={() => setActiveTab(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all capitalize ${
                    activeTab === period
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

      {/* Modals */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExportReport}
        title="Export Financial Report"
        subtitle="Export financial data in your preferred format"
        entityName="financial records"
      />

      <FormModal
        isOpen={showAddTransactionModal}
        onClose={() => setShowAddTransactionModal(false)}
        onSubmit={handleAddTransaction}
        title="Add New Transaction"
        subtitle="Record a new financial transaction"
        fields={transactionFields}
        submitText="Add Transaction"
        mode="create"
      />

      <FormModal
        isOpen={showCreateInvoiceModal}
        onClose={() => setShowCreateInvoiceModal(false)}
        onSubmit={handleCreateInvoice}
        title="Create Invoice"
        subtitle="Generate a new invoice for a student"
        fields={invoiceFields}
        submitText="Create Invoice"
        mode="create"
      />

      <FormModal
        isOpen={showGenerateReportModal}
        onClose={() => setShowGenerateReportModal(false)}
        onSubmit={handleGenerateReport}
        title="Generate Financial Report"
        subtitle="Create a comprehensive financial report"
        fields={reportFields}
        submitText="Generate Report"
        mode="create"
      />

      <FormModal
        isOpen={showManageBudgetModal}
        onClose={() => setShowManageBudgetModal(false)}
        onSubmit={handleManageBudget}
        title="Manage Budget"
        subtitle="Set or update budget allocations"
        fields={budgetFields}
        submitText="Update Budget"
        mode="create"
      />

    </div>
  );
}

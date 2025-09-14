import { useState } from 'react';
import { FormModal, ViewModal, ConfirmationModal } from '../../components/shared/modals';
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
  QuestionMarkCircleIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

export default function Financial() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showPaymentPlanModal, setShowPaymentPlanModal] = useState(false);
  const [showFinancialAidModal, setShowFinancialAidModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

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

  // Handler functions
  const handleMakePayment = async (paymentData) => {
    console.log('Processing payment:', paymentData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowPaymentModal(false);
  };

  const handleAddPaymentMethod = async (methodData) => {
    console.log('Adding payment method:', methodData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowPaymentMethodModal(false);
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const handleDownloadStatement = () => {
    console.log('Downloading statement for period:', selectedPeriod);
    // Generate and download PDF statement
  };

  const handlePrintTransactions = () => {
    console.log('Printing transactions for period:', selectedPeriod);
    // Open print dialog
  };

  const handleSetupPaymentPlan = async (planData) => {
    console.log('Setting up payment plan:', planData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowPaymentPlanModal(false);
  };

  const handleApplyFinancialAid = async (aidData) => {
    console.log('Applying for financial aid:', aidData);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setShowFinancialAidModal(false);
  };

  const handleContactFinancialAid = async (contactData) => {
    console.log('Contacting financial aid:', contactData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowContactModal(false);
  };

  const handleEditPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethodModal(true);
  };

  const handleDeletePaymentMethod = (method) => {
    console.log('Deleting payment method:', method.id);
    // Show confirmation and delete
  };

  // Field definitions
  const paymentFields = [
    { name: 'amount', label: 'Payment Amount', type: 'number', required: true, step: '0.01', min: '0' },
    { name: 'paymentMethod', label: 'Payment Method', type: 'select', required: true, options: [
      { value: 'card_4532', label: 'Visa ****4532' },
      { value: 'bank_7890', label: 'Chase Bank ****7890' }
    ]},
    { name: 'description', label: 'Payment Description', type: 'select', required: true, options: [
      { value: 'tuition', label: 'Tuition Payment' },
      { value: 'housing', label: 'Housing Fee' },
      { value: 'meal', label: 'Meal Plan' },
      { value: 'books', label: 'Books & Supplies' },
      { value: 'other', label: 'Other' }
    ]},
    { name: 'notes', label: 'Additional Notes', type: 'textarea', rows: 3, fullWidth: true }
  ];

  const paymentMethodFields = [
    { name: 'type', label: 'Payment Type', type: 'select', required: true, options: [
      { value: 'card', label: 'Credit/Debit Card' },
      { value: 'bank', label: 'Bank Account' }
    ]},
    { name: 'cardNumber', label: 'Card Number', type: 'text', required: true, placeholder: '1234 5678 9012 3456' },
    { name: 'expiryDate', label: 'Expiry Date', type: 'text', required: true, placeholder: 'MM/YY' },
    { name: 'cvv', label: 'CVV', type: 'text', required: true, placeholder: '123' },
    { name: 'holderName', label: 'Cardholder Name', type: 'text', required: true, fullWidth: true },
    { name: 'billingAddress', label: 'Billing Address', type: 'textarea', rows: 3, fullWidth: true },
    { name: 'isDefault', label: 'Set as default payment method', type: 'checkbox' }
  ];

  const transactionViewFields = [
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'amount', label: 'Amount', type: 'currency' },
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'type', label: 'Type', type: 'text' },
    { name: 'status', label: 'Status', type: 'status' },
    { name: 'reference', label: 'Reference Number', type: 'text' },
    { name: 'paymentMethod', label: 'Payment Method', type: 'text' }
  ];

  const paymentPlanFields = [
    { name: 'totalAmount', label: 'Total Amount to Finance', type: 'number', required: true, step: '0.01', min: '0' },
    { name: 'installments', label: 'Number of Installments', type: 'select', required: true, options: [
      { value: '3', label: '3 months' },
      { value: '6', label: '6 months' },
      { value: '9', label: '9 months' },
      { value: '12', label: '12 months' }
    ]},
    { name: 'startDate', label: 'First Payment Date', type: 'date', required: true },
    { name: 'paymentMethod', label: 'Payment Method', type: 'select', required: true, options: [
      { value: 'card_4532', label: 'Visa ****4532' },
      { value: 'bank_7890', label: 'Chase Bank ****7890' }
    ]},
    { name: 'agreement', label: 'I agree to the payment plan terms and conditions', type: 'checkbox', required: true }
  ];

  const financialAidFields = [
    { name: 'aidType', label: 'Aid Type', type: 'select', required: true, options: [
      { value: 'grant', label: 'Federal Grant' },
      { value: 'loan', label: 'Student Loan' },
      { value: 'scholarship', label: 'Scholarship' },
      { value: 'workstudy', label: 'Work-Study Program' }
    ]},
    { name: 'requestedAmount', label: 'Requested Amount', type: 'number', required: true, step: '0.01', min: '0' },
    { name: 'academicYear', label: 'Academic Year', type: 'select', required: true, options: [
      { value: '2024-2025', label: '2024-2025' },
      { value: '2025-2026', label: '2025-2026' }
    ]},
    { name: 'reason', label: 'Reason for Request', type: 'textarea', rows: 4, required: true, fullWidth: true },
    { name: 'documents', label: 'Supporting Documents', type: 'file', multiple: true }
  ];

  const contactFields = [
    { name: 'subject', label: 'Subject', type: 'select', required: true, options: [
      { value: 'payment', label: 'Payment Issues' },
      { value: 'aid', label: 'Financial Aid Question' },
      { value: 'billing', label: 'Billing Inquiry' },
      { value: 'plan', label: 'Payment Plan' },
      { value: 'other', label: 'Other' }
    ]},
    { name: 'priority', label: 'Priority', type: 'select', required: true, options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' }
    ]},
    { name: 'message', label: 'Message', type: 'textarea', rows: 5, required: true, fullWidth: true },
    { name: 'attachments', label: 'Attachments', type: 'file', multiple: true }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Financial</h1>
          <p className="text-neutral-600 mt-1">Manage your account balance and payment history</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadStatement}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download Statement
          </button>
          <button 
            onClick={() => setShowPaymentModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <CreditCardIcon className="w-4 h-4" />
            Make Payment
          </button>
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
          <button 
            onClick={() => setShowPaymentMethodModal(true)}
            className="bg-brand-primary hover:bg-brand-primary-dark text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
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
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleEditPaymentMethod(method)}
                      className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeletePaymentMethod(method)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
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
            <button 
              onClick={handlePrintTransactions}
              className="bg-brand-primary hover:bg-brand-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
            >
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
                  <button 
                    onClick={() => handleViewTransaction(transaction)}
                    className="text-sm text-brand-primary hover:text-brand-primary-dark transition-colors"
                  >
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
          <button 
            onClick={() => setShowPaymentPlanModal(true)}
            className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all text-left"
          >
            <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <div className="font-medium text-neutral-800">Set Up Payment Plan</div>
              <div className="text-sm text-neutral-600">Break down payments into installments</div>
            </div>
          </button>
          
          <button 
            onClick={() => setShowFinancialAidModal(true)}
            className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all text-left"
          >
            <div className="w-10 h-10 bg-status-success/10 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon className="w-5 h-5 text-status-success" />
            </div>
            <div>
              <div className="font-medium text-neutral-800">Apply for Financial Aid</div>
              <div className="text-sm text-neutral-600">Get help with tuition costs</div>
            </div>
          </button>
          
          <button 
            onClick={() => setShowContactModal(true)}
            className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all text-left"
          >
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

      {/* Modals */}
      <FormModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSubmit={handleMakePayment}
        title="Make Payment"
        subtitle="Process a payment towards your account balance"
        fields={paymentFields}
        submitText="Process Payment"
        mode="create"
      />

      <FormModal
        isOpen={showPaymentMethodModal}
        onClose={() => setShowPaymentMethodModal(false)}
        onSubmit={handleAddPaymentMethod}
        title={selectedPaymentMethod ? "Edit Payment Method" : "Add Payment Method"}
        subtitle={selectedPaymentMethod ? "Update your payment method details" : "Add a new payment method to your account"}
        fields={paymentMethodFields}
        submitText={selectedPaymentMethod ? "Update Method" : "Add Method"}
        mode={selectedPaymentMethod ? "edit" : "create"}
        initialData={selectedPaymentMethod}
      />

      <ViewModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        title="Transaction Details"
        subtitle="View complete transaction information"
        data={selectedTransaction || {}}
        fields={transactionViewFields}
      />

      <FormModal
        isOpen={showPaymentPlanModal}
        onClose={() => setShowPaymentPlanModal(false)}
        onSubmit={handleSetupPaymentPlan}
        title="Set Up Payment Plan"
        subtitle="Create a payment plan to spread costs over multiple months"
        fields={paymentPlanFields}
        submitText="Create Payment Plan"
        mode="create"
      />

      <FormModal
        isOpen={showFinancialAidModal}
        onClose={() => setShowFinancialAidModal(false)}
        onSubmit={handleApplyFinancialAid}
        title="Apply for Financial Aid"
        subtitle="Submit an application for financial assistance"
        fields={financialAidFields}
        submitText="Submit Application"
        mode="create"
      />

      <FormModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onSubmit={handleContactFinancialAid}
        title="Contact Financial Aid"
        subtitle="Send a message to the financial aid office"
        fields={contactFields}
        submitText="Send Message"
        mode="create"
      />
    </div>
  );
}

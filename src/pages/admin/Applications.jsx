import { useState } from 'react';
import { ExportModal, FormModal, ViewModal, ConfirmationModal } from '../../components/shared/modals';
import {
  ArrowDownTrayIcon,
  PlusIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function Applications() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showNewApplicationModal, setShowNewApplicationModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showBulkApproveModal, setShowBulkApproveModal] = useState(false);
  const [showBulkRejectModal, setShowBulkRejectModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const applications = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', course: 'Computer Science', status: 'pending', date: '2025-01-08', gpa: '3.8' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@email.com', course: 'Engineering', status: 'approved', date: '2025-01-07', gpa: '3.9' },
    { id: 3, name: 'Emma Davis', email: 'emma.d@email.com', course: 'Business Admin', status: 'review', date: '2025-01-06', gpa: '3.7' },
    { id: 4, name: 'James Wilson', email: 'james.w@email.com', course: 'Mathematics', status: 'pending', date: '2025-01-05', gpa: '3.6' },
    { id: 5, name: 'Lisa Brown', email: 'lisa.b@email.com', course: 'Physics', status: 'rejected', date: '2025-01-04', gpa: '3.2' },
    { id: 6, name: 'David Miller', email: 'david.m@email.com', course: 'Chemistry', status: 'approved', date: '2025-01-03', gpa: '3.8' },
  ];

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.course.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-status-success/10 text-status-success';
      case 'pending': return 'bg-status-warning/10 text-status-warning';
      case 'review': return 'bg-status-info/10 text-status-info';
      case 'rejected': return 'bg-status-error/10 text-status-error';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    console.log(`Changing application ${id} to ${newStatus}`);
    // In a real app, this would update the backend
  };

  const handleExportApplications = async (exportOptions) => {
    console.log('Exporting applications:', exportOptions);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleNewApplication = async (applicationData) => {
    console.log('Creating new application:', applicationData);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowViewModal(true);
  };

  const handleBulkApprove = async () => {
    console.log('Bulk approving applications');
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleBulkReject = async () => {
    console.log('Bulk rejecting applications');
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const newApplicationFields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text', required: true },
    { name: 'course', label: 'Desired Course', type: 'select', required: true, options: [
      { value: 'computer_science', label: 'Computer Science' },
      { value: 'engineering', label: 'Engineering' },
      { value: 'business', label: 'Business Administration' },
      { value: 'mathematics', label: 'Mathematics' },
      { value: 'physics', label: 'Physics' }
    ]},
    { name: 'gpa', label: 'GPA', type: 'number', required: true, min: 0, max: 4, step: 0.1 },
    { name: 'previousEducation', label: 'Previous Education', type: 'textarea', rows: 2, fullWidth: true },
    { name: 'personalStatement', label: 'Personal Statement', type: 'textarea', rows: 4, fullWidth: true, required: true },
    { name: 'documents', label: 'Required Documents Submitted', type: 'checkbox', checkboxLabel: 'All required documents have been submitted' }
  ];

  const applicationViewFields = [
    { name: 'name', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'email' },
    { name: 'course', label: 'Applied Course', type: 'text' },
    { name: 'gpa', label: 'GPA', type: 'text' },
    { name: 'date', label: 'Application Date', type: 'date' },
    { name: 'status', label: 'Status', type: 'status' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Applications</h1>
          <p className="text-neutral-600 mt-1">Manage student applications and admissions</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowExportModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setShowNewApplicationModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            New Application
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-info to-accent-skyStrong rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">1,247</div>
              <div className="text-sm text-neutral-500">Total Applications</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-warning to-accent-amber rounded-lg flex items-center justify-center">
              <ClockIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">234</div>
              <div className="text-sm text-neutral-500">Pending Review</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">892</div>
              <div className="text-sm text-neutral-500">Approved</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-error to-accent-redDark rounded-lg flex items-center justify-center">
              <XMarkIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">121</div>
              <div className="text-sm text-neutral-500">Rejected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'review', 'approved', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  filter === status
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Applicant</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Course</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">GPA</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-neutral-600" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-800">{app.name}</div>
                        <div className="text-sm text-neutral-500">{app.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{app.course}</td>
                  <td className="px-6 py-4 text-sm font-medium text-neutral-800">{app.gpa}</td>
                  <td className="px-6 py-4 text-sm text-neutral-500">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStatusChange(app.id, 'approved')}
                        className="p-2 text-status-success hover:bg-status-success/10 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <CheckIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(app.id, 'rejected')}
                        className="p-2 text-status-error hover:bg-status-error/10 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleViewApplication(app)}
                        className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-xl shadow-card p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            Showing {filteredApplications.length} of {applications.length} applications
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-neutral-600 hover:text-neutral-800 transition-colors">
              Select All
            </button>
            <button 
              onClick={() => setShowBulkApproveModal(true)}
              className="px-4 py-2 bg-status-success text-white rounded-lg text-sm hover:bg-status-success/90 transition-colors"
            >
              Bulk Approve
            </button>
            <button 
              onClick={() => setShowBulkRejectModal(true)}
              className="px-4 py-2 bg-status-error text-white rounded-lg text-sm hover:bg-status-error/90 transition-colors"
            >
              Bulk Reject
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExportApplications}
        title="Export Applications"
        subtitle="Export application data and statistics"
        dataType="applications"
        availableFormats={['pdf', 'excel', 'csv']}
        includeFilters={true}
        currentFilters={{ status: filter, search: searchTerm }}
      />

      <FormModal
        isOpen={showNewApplicationModal}
        onClose={() => setShowNewApplicationModal(false)}
        onSubmit={handleNewApplication}
        title="New Application"
        subtitle="Create a new student application"
        fields={newApplicationFields}
        submitText="Submit Application"
        mode="create"
      />

      <ViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Application Details"
        subtitle="View complete application information"
        data={selectedApplication}
        fields={applicationViewFields}
        actions={[
          {
            label: 'Approve',
            onClick: () => {
              handleStatusChange(selectedApplication?.id, 'approved');
              setShowViewModal(false);
            },
            className: 'bg-status-success hover:bg-status-success/90 text-white',
            icon: CheckIcon
          },
          {
            label: 'Reject',
            onClick: () => {
              handleStatusChange(selectedApplication?.id, 'rejected');
              setShowViewModal(false);
            },
            className: 'bg-status-error hover:bg-status-error/90 text-white',
            icon: XMarkIcon
          }
        ]}
      />

      <ConfirmationModal
        isOpen={showBulkApproveModal}
        onClose={() => setShowBulkApproveModal(false)}
        onConfirm={handleBulkApprove}
        title="Bulk Approve Applications"
        message={`Are you sure you want to approve all selected applications? This action cannot be undone.`}
        confirmText="Approve All"
        type="info"
      />

      <ConfirmationModal
        isOpen={showBulkRejectModal}
        onClose={() => setShowBulkRejectModal(false)}
        onConfirm={handleBulkReject}
        title="Bulk Reject Applications"
        message={`Are you sure you want to reject all selected applications? This action cannot be undone.`}
        confirmText="Reject All"
        type="danger"
      />
    </div>
  );
}

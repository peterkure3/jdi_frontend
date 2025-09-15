import { useState } from 'react';
import { ExportModal, FormModal, ViewModal, ConfirmationModal } from '../../components/shared/modals';
import {
  ArrowDownTrayIcon,
  UserPlusIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  BookOpenIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  UserIcon,
  EyeIcon,
  PencilIcon,
  EnvelopeIcon,
  ClockIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

export default function Lecturers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddLecturerModal, setShowAddLecturerModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);

  const lecturers = [
    { id: 1, name: 'Prof. Maria Rodriguez', email: 'maria.rodriguez@university.edu', department: 'Architecture & Design', courses: 2, students: 47, experience: '12 years', status: 'active' },
    { id: 2, name: 'Dr. James Chen', email: 'james.chen@university.edu', department: 'Architecture & Design', courses: 3, students: 58, experience: '8 years', status: 'active' },
    { id: 3, name: 'Prof. Sarah Green', email: 'sarah.green@university.edu', department: 'Architecture & Design', courses: 2, students: 38, experience: '10 years', status: 'active' },
    { id: 4, name: 'Dr. Alex Thompson', email: 'alex.thompson@university.edu', department: 'Digital Design', courses: 3, students: 67, experience: '6 years', status: 'active' },
    { id: 5, name: 'Prof. Robert Kim', email: 'robert.kim@university.edu', department: 'Engineering Design', courses: 2, students: 39, experience: '15 years', status: 'active' },
    { id: 6, name: 'Dr. Lisa Wang', email: 'lisa.wang@university.edu', department: 'Engineering Design', courses: 2, students: 48, experience: '9 years', status: 'active' },
    { id: 7, name: 'Prof. David Martinez', email: 'david.martinez@university.edu', department: 'Engineering Design', courses: 1, students: 17, experience: '11 years', status: 'active' },
  ];

  const filteredLecturers = lecturers.filter(lecturer => {
    const matchesSearch = lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lecturer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || lecturer.department.toLowerCase().includes(departmentFilter.toLowerCase());
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-status-success/10 text-status-success';
      case 'sabbatical': return 'bg-status-warning/10 text-status-warning';
      case 'inactive': return 'bg-status-error/10 text-status-error';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  const handleExportLecturers = async (exportOptions) => {
    console.log('Exporting lecturers with options:', exportOptions);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleAddLecturer = async (lecturerData) => {
    console.log('Adding new lecturer:', lecturerData);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleViewLecturer = (lecturer) => {
    setSelectedLecturer(lecturer);
    setShowViewModal(true);
  };

  const handleEditLecturer = (lecturer) => {
    setSelectedLecturer(lecturer);
    setShowEditModal(true);
  };

  const handleUpdateLecturer = async (lecturerData) => {
    console.log('Updating lecturer:', selectedLecturer?.id, lecturerData);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleMessageLecturer = (lecturer) => {
    setSelectedLecturer(lecturer);
    setShowMessageModal(true);
  };

  const handleSendMessage = async (messageData) => {
    console.log('Sending message to lecturer:', selectedLecturer?.id, messageData);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const addLecturerFields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
    { name: 'department', label: 'Department', type: 'select', required: true, options: [
      { value: 'architecture_design', label: 'Architecture & Design' },
      { value: 'digital_design', label: 'Digital Design' },
      { value: 'engineering_design', label: 'Engineering Design' }
    ]},
    { name: 'position', label: 'Position', type: 'select', required: true, options: [
      { value: 'professor', label: 'Professor' },
      { value: 'associate_professor', label: 'Associate Professor' },
      { value: 'assistant_professor', label: 'Assistant Professor' },
      { value: 'lecturer', label: 'Lecturer' },
      { value: 'adjunct', label: 'Adjunct Faculty' }
    ]},
    { name: 'phone', label: 'Phone Number', type: 'text' },
    { name: 'office', label: 'Office Location', type: 'text' },
    { name: 'specialization', label: 'Specialization', type: 'text', fullWidth: true },
    { name: 'bio', label: 'Biography', type: 'textarea', rows: 3, fullWidth: true }
  ];

  const lecturerViewFields = [
    { name: 'name', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'email' },
    { name: 'department', label: 'Department', type: 'text' },
    { name: 'position', label: 'Position', type: 'text' },
    { name: 'courses', label: 'Courses Teaching', type: 'text' },
    { name: 'experience', label: 'Experience', type: 'text' },
    { name: 'office', label: 'Office Location', type: 'text' },
    { name: 'phone', label: 'Phone Number', type: 'text' }
  ];

  const messageFields = [
    { name: 'subject', label: 'Subject', type: 'text', required: true, fullWidth: true },
    { name: 'message', label: 'Message', type: 'textarea', required: true, rows: 5, fullWidth: true },
    { name: 'priority', label: 'Priority', type: 'select', required: true, options: [
      { value: 'low', label: 'Low' },
      { value: 'normal', label: 'Normal' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' }
    ]}
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Lecturers</h1>
          <p className="text-neutral-600 mt-1">Manage faculty and teaching staff</p>
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
            onClick={() => setShowAddLecturerModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <UserPlusIcon className="w-4 h-4" />
            Add Lecturer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <AcademicCapIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">127</div>
              <div className="text-sm text-neutral-500">Total Lecturers</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">119</div>
              <div className="text-sm text-neutral-500">Active</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-info to-accent-skyStrong rounded-lg flex items-center justify-center">
              <BookOpenIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">342</div>
              <div className="text-sm text-neutral-500">Total Courses</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <UsersIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">4.2k</div>
              <div className="text-sm text-neutral-500">Students Taught</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['all', 'architecture & design', 'digital design', 'engineering design'].map(dept => (
              <button
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  departmentFilter === dept
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search lecturers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lecturers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLecturers.map((lecturer) => (
          <div key={lecturer.id} className="bg-white rounded-xl shadow-card p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-pink rounded-xl flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">{lecturer.name}</h3>
                  <p className="text-sm text-neutral-500">{lecturer.department}</p>
                </div>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(lecturer.status)}`}>
                {lecturer.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="w-4 h-4 text-accent-skyStrong" />
                  <span className="text-neutral-600">Courses</span>
                </div>
                <span className="font-medium text-neutral-800">{lecturer.courses}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-4 h-4 text-accent-cyan" />
                  <span className="text-neutral-600">Students</span>
                </div>
                <span className="font-medium text-neutral-800">{lecturer.students}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-accent-amber" />
                  <span className="text-neutral-600">Experience</span>
                </div>
                <span className="font-medium text-neutral-800">{lecturer.experience}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <div className="text-xs text-neutral-500">{lecturer.email}</div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleViewLecturer(lecturer)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                    title="View Profile"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleEditLecturer(lecturer)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                    title="Edit"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleMessageLecturer(lecturer)}
                    className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors" 
                    title="Message"
                  >
                    <ChatBubbleLeftIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExportLecturers}
        title="Export Lecturers"
        subtitle="Export lecturer data in your preferred format"
        entityName="lecturers"
      />

      <FormModal
        isOpen={showAddLecturerModal}
        onClose={() => setShowAddLecturerModal(false)}
        onSubmit={handleAddLecturer}
        title="Add New Lecturer"
        subtitle="Register a new lecturer in the system"
        fields={addLecturerFields}
        submitText="Add Lecturer"
        mode="create"
      />

      <ViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Lecturer Profile"
        subtitle="View complete lecturer information"
        data={selectedLecturer}
        fields={lecturerViewFields}
        actions={[
          {
            label: 'Edit Profile',
            onClick: () => {
              setShowViewModal(false);
              handleEditLecturer(selectedLecturer);
            },
            className: 'bg-brand-primary hover:bg-brand-primary-dark text-white',
            icon: PencilIcon
          },
          {
            label: 'Send Message',
            onClick: () => {
              setShowViewModal(false);
              handleMessageLecturer(selectedLecturer);
            },
            className: 'bg-neutral-600 hover:bg-neutral-700 text-white',
            icon: ChatBubbleLeftIcon
          }
        ]}
      />

      <FormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdateLecturer}
        title="Edit Lecturer"
        subtitle="Update lecturer information"
        fields={addLecturerFields}
        initialData={selectedLecturer}
        submitText="Update Lecturer"
        mode="edit"
      />

      <FormModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        onSubmit={handleSendMessage}
        title={`Send Message to ${selectedLecturer?.name}`}
        subtitle="Compose and send a message"
        fields={messageFields}
        submitText="Send Message"
        mode="create"
      />
    </div>
  );
}

import { useState } from 'react';
import { ImportModal, FormModal, ViewModal, ConfirmationModal } from '../../components/shared/modals';
import {
  ArrowUpTrayIcon,
  UserPlusIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  UserIcon,
  EyeIcon,
  PencilIcon,
  PauseIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { id: 1, name: 'Alice Johnson', email: 'alice.j@student.edu', course: 'Computer Science', year: '3rd Year', gpa: '3.8', status: 'active', enrolled: '2022-09-01' },
    { id: 2, name: 'Bob Chen', email: 'bob.c@student.edu', course: 'Engineering', year: '2nd Year', gpa: '3.6', status: 'active', enrolled: '2023-09-01' },
    { id: 3, name: 'Carol Davis', email: 'carol.d@student.edu', course: 'Business Admin', year: '4th Year', gpa: '3.9', status: 'graduated', enrolled: '2021-09-01' },
    { id: 4, name: 'David Wilson', email: 'david.w@student.edu', course: 'Mathematics', year: '1st Year', gpa: '3.5', status: 'active', enrolled: '2024-09-01' },
    { id: 5, name: 'Eva Brown', email: 'eva.b@student.edu', course: 'Physics', year: '3rd Year', gpa: '3.7', status: 'suspended', enrolled: '2022-09-01' },
    { id: 6, name: 'Frank Miller', email: 'frank.m@student.edu', course: 'Chemistry', year: '2nd Year', gpa: '3.4', status: 'active', enrolled: '2023-09-01' },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-status-success/10 text-status-success';
      case 'suspended': return 'bg-status-warning/10 text-status-warning';
      case 'graduated': return 'bg-status-info/10 text-status-info';
      case 'dropped': return 'bg-status-error/10 text-status-error';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  const handleImportStudents = async (file) => {
    console.log('Importing students from file:', file.name);
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  const handleAddStudent = async (studentData) => {
    console.log('Adding new student:', studentData);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleUpdateStudent = async (studentData) => {
    console.log('Updating student:', selectedStudent?.id, studentData);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleSuspendStudent = (student) => {
    setSelectedStudent(student);
    setShowSuspendModal(true);
  };

  const handleConfirmSuspend = async () => {
    console.log('Suspending student:', selectedStudent?.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    console.log('Deleting student:', selectedStudent?.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const addStudentFields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'studentId', label: 'Student ID', type: 'text', required: true },
    { name: 'course', label: 'Course', type: 'select', required: true, options: [
      { value: 'computer_science', label: 'Computer Science' },
      { value: 'engineering', label: 'Engineering' },
      { value: 'business', label: 'Business Administration' },
      { value: 'mathematics', label: 'Mathematics' },
      { value: 'physics', label: 'Physics' }
    ]},
    { name: 'year', label: 'Academic Year', type: 'select', required: true, options: [
      { value: '1', label: '1st Year' },
      { value: '2', label: '2nd Year' },
      { value: '3', label: '3rd Year' },
      { value: '4', label: '4th Year' }
    ]},
    { name: 'phone', label: 'Phone Number', type: 'text' },
    { name: 'address', label: 'Address', type: 'textarea', rows: 2, fullWidth: true },
    { name: 'emergencyContact', label: 'Emergency Contact', type: 'text', fullWidth: true }
  ];

  const studentViewFields = [
    { name: 'name', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'email' },
    { name: 'course', label: 'Course', type: 'text' },
    { name: 'year', label: 'Academic Year', type: 'text' },
    { name: 'gpa', label: 'GPA', type: 'text' },
    { name: 'status', label: 'Status', type: 'status' },
    { name: 'enrolled', label: 'Enrollment Date', type: 'date' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Students</h1>
          <p className="text-neutral-600 mt-1">Manage student records and information</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <ArrowUpTrayIcon className="w-4 h-4" />
            Import
          </button>
          <button 
            onClick={() => setShowAddStudentModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <UserPlusIcon className="w-4 h-4" />
            Add Student
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <AcademicCapIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">3,892</div>
              <div className="text-sm text-neutral-500">Active Students</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-info to-accent-skyStrong rounded-lg flex items-center justify-center">
              <AcademicCapIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">1,247</div>
              <div className="text-sm text-neutral-500">Graduated</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-warning to-accent-amber rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">23</div>
              <div className="text-sm text-neutral-500">On Probation</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <UserPlusIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">156</div>
              <div className="text-sm text-neutral-500">New This Semester</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['all', 'active', 'suspended', 'graduated', 'dropped'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  statusFilter === status
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
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Student</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Course</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Year</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">GPA</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Enrolled</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-800">{student.name}</div>
                        <div className="text-sm text-neutral-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{student.course}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{student.year}</td>
                  <td className="px-6 py-4 text-sm font-medium text-neutral-800">{student.gpa}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500">{student.enrolled}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewStudent(student)}
                        className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                        title="View Profile"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditStudent(student)}
                        className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleSuspendStudent(student)}
                        className="p-2 text-status-warning hover:bg-status-warning/10 rounded-lg transition-colors" 
                        title="Suspend"
                      >
                        <PauseIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student)}
                        className="p-2 text-status-error hover:bg-status-error/10 rounded-lg transition-colors" 
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImportStudents}
        title="Import Students"
        subtitle="Upload a file to import student data"
        acceptedFormats={['.csv', '.xlsx']}
        maxFileSize={5}
        templateUrl="/templates/students-template.csv"
        sampleData={[
          'First Name,Last Name,Email,Student ID,Course,Year',
          'John,Doe,john.doe@email.com,STU001,Computer Science,1',
          'Jane,Smith,jane.smith@email.com,STU002,Engineering,2'
        ]}
      />

      <FormModal
        isOpen={showAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
        onSubmit={handleAddStudent}
        title="Add New Student"
        subtitle="Register a new student in the system"
        fields={addStudentFields}
        submitText="Add Student"
        mode="create"
      />

      <ViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Student Profile"
        subtitle="View complete student information"
        data={selectedStudent}
        fields={studentViewFields}
        actions={[
          {
            label: 'Edit Profile',
            onClick: () => {
              setShowViewModal(false);
              handleEditStudent(selectedStudent);
            },
            className: 'bg-brand-primary hover:bg-brand-primary-dark text-white',
            icon: PencilIcon
          }
        ]}
      />

      <FormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdateStudent}
        title="Edit Student"
        subtitle="Update student information"
        fields={addStudentFields}
        initialData={selectedStudent}
        submitText="Update Student"
        mode="edit"
      />

      <ConfirmationModal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={handleConfirmSuspend}
        title="Suspend Student"
        message={`Are you sure you want to suspend ${selectedStudent?.name}? They will not be able to access the system until reactivated.`}
        confirmText="Suspend Student"
        type="warning"
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Student"
        message={`Are you sure you want to permanently delete ${selectedStudent?.name}? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete Student"
        type="danger"
      />
    </div>
  );
}

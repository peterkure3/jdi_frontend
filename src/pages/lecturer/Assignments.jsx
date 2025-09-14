import { useState } from 'react';
import { FormModal, ViewModal, ConfirmationModal } from '../../components/shared/modals';
import {
  PlusIcon,
  QueueListIcon,
  ClockIcon,
  PaperAirplaneIcon,
  ChartBarIcon,
  PlayIcon,
  PencilIcon,
  CheckIcon,
  BookOpenIcon,
  CalendarIcon,
  StarIcon,
  EyeIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
  Squares2X2Icon,
  ChatBubbleLeftEllipsisIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

export default function Assignments() {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const assignments = {
    active: [
      {
        id: 1,
        title: 'Database Design Project',
        course: 'Database Systems',
        dueDate: '2024-03-25',
        submissions: 23,
        totalStudents: 30,
        status: 'active',
        type: 'project',
        points: 100,
        description: 'Design and implement a complete database system for a library management application.'
      },
      {
        id: 2,
        title: 'Algorithm Analysis Quiz',
        course: 'Data Structures',
        dueDate: '2024-03-20',
        submissions: 28,
        totalStudents: 32,
        status: 'active',
        type: 'quiz',
        points: 50,
        description: 'Multiple choice and short answer questions on time complexity analysis.'
      }
    ],
    draft: [
      {
        id: 3,
        title: 'Software Testing Assignment',
        course: 'Software Engineering',
        dueDate: '2024-04-01',
        submissions: 0,
        totalStudents: 25,
        status: 'draft',
        type: 'assignment',
        points: 75,
        description: 'Write comprehensive test cases for a given software application.'
      }
    ],
    completed: [
      {
        id: 4,
        title: 'Programming Fundamentals Exam',
        course: 'Computer Science 101',
        dueDate: '2024-03-10',
        submissions: 45,
        totalStudents: 45,
        status: 'completed',
        type: 'exam',
        points: 150,
        description: 'Comprehensive exam covering basic programming concepts and problem solving.'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-status-success/10 text-status-success';
      case 'draft':
        return 'bg-status-warning/10 text-status-warning';
      case 'completed':
        return 'bg-neutral-100 text-neutral-600';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'project':
        return { icon: Squares2X2Icon, color: 'text-blue-500' };
      case 'quiz':
        return { icon: ChatBubbleLeftEllipsisIcon, color: 'text-green-500' };
      case 'assignment':
        return { icon: ClipboardDocumentListIcon, color: 'text-purple-500' };
      case 'exam':
        return { icon: ClipboardDocumentCheckIcon, color: 'text-red-500' };
      default:
        return { icon: ClipboardDocumentListIcon, color: 'text-neutral-500' };
    }
  };

  const currentAssignments = assignments[activeTab] || [];

  // Handler functions
  const handleCreateAssignment = async (assignmentData) => {
    console.log('Creating assignment:', assignmentData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowCreateModal(false);
  };

  const handleEditAssignment = async (assignmentData) => {
    console.log('Editing assignment:', selectedAssignment?.id, assignmentData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowEditModal(false);
  };

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowViewModal(true);
  };

  const handleEditClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowEditModal(true);
  };

  const handleDuplicateAssignment = async (assignment) => {
    console.log('Duplicating assignment:', assignment.id);
    setSelectedAssignment({...assignment, title: assignment.title + ' (Copy)'});
    setShowCreateModal(true);
  };

  const handleDeleteClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    console.log('Deleting assignment:', selectedAssignment?.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowDeleteModal(false);
  };

  const handlePublishAssignment = async (assignment) => {
    console.log('Publishing assignment:', assignment.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleViewSubmissions = (assignment) => {
    console.log('Viewing submissions for:', assignment.id);
    // Navigate to submissions page or open submissions modal
  };

  const handleGradeAssignment = (assignment) => {
    console.log('Grading assignment:', assignment.id);
    // Navigate to grading interface
  };

  // Field definitions
  const assignmentFields = [
    { name: 'title', label: 'Assignment Title', type: 'text', required: true, fullWidth: true },
    { name: 'course', label: 'Course', type: 'select', required: true, options: [
      { value: 'cs101', label: 'Computer Science 101' },
      { value: 'ds201', label: 'Data Structures' },
      { value: 'db301', label: 'Database Systems' },
      { value: 'se401', label: 'Software Engineering' }
    ]},
    { name: 'type', label: 'Assignment Type', type: 'select', required: true, options: [
      { value: 'assignment', label: 'Assignment' },
      { value: 'quiz', label: 'Quiz' },
      { value: 'project', label: 'Project' },
      { value: 'exam', label: 'Exam' }
    ]},
    { name: 'points', label: 'Total Points', type: 'number', required: true },
    { name: 'dueDate', label: 'Due Date', type: 'datetime-local', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true, rows: 4, fullWidth: true },
    { name: 'allowLateSubmissions', label: 'Allow Late Submissions', type: 'checkbox' },
    { name: 'requireFileUpload', label: 'Require File Upload', type: 'checkbox' }
  ];

  const assignmentViewFields = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'course', label: 'Course', type: 'text' },
    { name: 'type', label: 'Type', type: 'text' },
    { name: 'points', label: 'Points', type: 'text' },
    { name: 'dueDate', label: 'Due Date', type: 'date' },
    { name: 'status', label: 'Status', type: 'status' },
    { name: 'submissions', label: 'Submissions', type: 'text' },
    { name: 'description', label: 'Description', type: 'text', fullWidth: true }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Assignments</h1>
          <p className="text-neutral-600 mt-1">Create and manage course assignments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
        >
          <PlusIcon className="w-4 h-4" />
          Create Assignment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-lg flex items-center justify-center">
              <QueueListIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">
                {Object.values(assignments).flat().length}
              </div>
              <div className="text-sm text-neutral-500">Total Assignments</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{assignments.active.length}</div>
              <div className="text-sm text-neutral-500">Active</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <PaperAirplaneIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">
                {Object.values(assignments).flat().reduce((sum, a) => sum + a.submissions, 0)}
              </div>
              <div className="text-sm text-neutral-500">Total Submissions</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">87%</div>
              <div className="text-sm text-neutral-500">Avg Completion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Assignments Section */}
      <div className="bg-white rounded-xl shadow-card">
        {/* Tabs */}
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'active', name: 'Active', icon: PlayIcon, count: assignments.active.length },
              { id: 'draft', name: 'Draft', icon: PencilIcon, count: assignments.draft.length },
              { id: 'completed', name: 'Completed', icon: CheckIcon, count: assignments.completed.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
                <span className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Assignments List */}
        <div className="p-6">
          <div className="space-y-4">
            {currentAssignments.map((assignment) => (
              <div key={assignment.id} className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center mr-4">
                      {(() => {
                        const { icon: IconComponent, color } = getTypeIcon(assignment.type);
                        return <IconComponent className={`w-4 h-4 ${color}`} />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-neutral-800">{assignment.title}</h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                      </div>
                      <p className="text-neutral-600 mb-3">{assignment.description}</p>
                      <div className="flex items-center gap-6 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          <BookOpenIcon className="w-3 h-3" />
                          {assignment.course}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <StarIcon className="w-3 h-3" />
                          {assignment.points} points
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleViewAssignment(assignment)}
                      className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                      title="View Details"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditClick(assignment)}
                      className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDuplicateAssignment(assignment)}
                      className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                      title="Duplicate"
                    >
                      <DocumentDuplicateIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(assignment)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium text-neutral-800">{assignment.submissions}</span>
                      <span className="text-neutral-500"> / {assignment.totalStudents} submissions</span>
                    </div>
                    <div className="w-32 bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-brand-primary to-brand-primary-dark h-2 rounded-full transition-all"
                        style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-neutral-600">
                      {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                    </span>
                  </div>
                  
                  {assignment.status === 'active' && (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewSubmissions(assignment)}
                        className="bg-brand-primary hover:bg-brand-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                      >
                        View Submissions
                      </button>
                      <button 
                        onClick={() => handleGradeAssignment(assignment)}
                        className="bg-white border border-neutral-200 text-neutral-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
                      >
                        Grade
                      </button>
                    </div>
                  )}
                  
                  {assignment.status === 'draft' && (
                    <button 
                      onClick={() => handlePublishAssignment(assignment)}
                      className="bg-status-success text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-status-success/80 transition-colors"
                    >
                      Publish
                    </button>
                  )}
                  
                  {assignment.status === 'completed' && (
                    <button 
                      onClick={() => handleViewSubmissions(assignment)}
                      className="bg-neutral-100 text-neutral-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
                    >
                      View Results
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {currentAssignments.length === 0 && (
            <div className="text-center py-12">
              <ClipboardDocumentListIcon className="w-16 h-16 text-neutral-300 mb-4 mx-auto" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">No assignments found</h3>
              <p className="text-neutral-500">Create your first assignment to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <FormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateAssignment}
        title="Create Assignment"
        subtitle="Create a new assignment for your students"
        fields={assignmentFields}
        initialData={selectedAssignment || {}}
        submitText="Create Assignment"
        mode="create"
      />

      <FormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditAssignment}
        title="Edit Assignment"
        subtitle="Update assignment details"
        fields={assignmentFields}
        initialData={selectedAssignment || {}}
        submitText="Update Assignment"
        mode="edit"
      />

      <ViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Assignment Details"
        subtitle="View assignment information"
        data={selectedAssignment || {}}
        fields={assignmentViewFields}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Assignment"
        message={`Are you sure you want to delete "${selectedAssignment?.title}"? This action cannot be undone.`}
        confirmText="Delete Assignment"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

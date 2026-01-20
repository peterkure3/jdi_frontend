import { useMemo, useState } from 'react';
import { ExportModal, ImportModal, ViewModal, ConfirmationModal, FormModal } from '../../components/shared/modals';
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  BookOpenIcon,
  CalendarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  PlayIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  UserIcon,
  UsersIcon,
  PercentBadgeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    department: '',
    lecturer: '',
    credits: '',
    capacity: '',
    semester: '',
    schedule: '',
    description: ''
  });

  const [courses, setCourses] = useState([
    { 
      id: 1, 
      code: 'ARCH301', 
      name: '3D Architectural Design', 
      department: 'Architecture & Design',
      lecturer: 'Prof. Maria Rodriguez',
      credits: 4,
      capacity: 25,
      enrolled: 22,
      status: 'active',
      semester: 'Fall 2024',
      schedule: 'Mon/Wed 9:00-12:00'
    },
    { 
      id: 2, 
      code: 'INTR201', 
      name: 'Interior Design', 
      department: 'Architecture & Design',
      lecturer: 'Dr. James Chen',
      credits: 3,
      capacity: 30,
      enrolled: 28,
      status: 'active',
      semester: 'Fall 2024',
      schedule: 'Tue/Thu 10:00-12:30'
    },
    { 
      id: 3, 
      code: 'LAND101', 
      name: 'Landscape Design', 
      department: 'Architecture & Design',
      lecturer: 'Prof. Sarah Green',
      credits: 3,
      capacity: 20,
      enrolled: 18,
      status: 'active',
      semester: 'Fall 2024',
      schedule: 'Mon/Wed/Fri 2:00-3:30'
    },
    { 
      id: 4, 
      code: 'GRPH201', 
      name: 'Graphics Design', 
      department: 'Digital Design',
      lecturer: 'Dr. Alex Thompson',
      credits: 3,
      capacity: 35,
      enrolled: 32,
      status: 'active',
      semester: 'Fall 2024',
      schedule: 'Tue/Thu 1:00-3:30'
    },
    { 
      id: 5, 
      code: 'STRU301', 
      name: 'Structural Design', 
      department: 'Engineering Design',
      lecturer: 'Prof. Robert Kim',
      credits: 4,
      capacity: 20,
      enrolled: 19,
      status: 'active',
      semester: 'Fall 2024',
      schedule: 'Wed/Fri 9:00-12:00'
    },
    { 
      id: 6, 
      code: 'ELEC201', 
      name: 'Electrical & Wiring Design', 
      department: 'Engineering Design',
      lecturer: 'Dr. Lisa Wang',
      credits: 3,
      capacity: 25,
      enrolled: 23,
      status: 'active',
      semester: 'Fall 2024',
      schedule: 'Mon/Wed 1:00-3:30'
    },
    { 
      id: 7, 
      code: 'MECH301', 
      name: 'Mechanical & Plumbing Design', 
      department: 'Engineering Design',
      lecturer: 'Prof. David Martinez',
      credits: 4,
      capacity: 20,
      enrolled: 17,
      status: 'draft',
      semester: 'Spring 2025',
      schedule: 'Tue/Thu 9:00-12:00'
    }
  ]);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesFilter = departmentFilter === 'all' || course.department === departmentFilter;
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.department.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [courses, departmentFilter, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-status-success/10 text-status-success';
      case 'inactive': return 'bg-neutral-100 text-neutral-600';
      case 'completed': return 'bg-status-info/10 text-status-info';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    console.log('Adding course:', newCourse);
    const nextId = courses.reduce((max, c) => Math.max(max, c.id), 0) + 1;
    const nextCourse = {
      id: nextId,
      code: (newCourse.code || `NEW${nextId}`).toUpperCase(),
      name: newCourse.name || `New Course ${nextId}`,
      department: newCourse.department || 'Digital Design',
      lecturer: newCourse.lecturer || 'TBD',
      credits: Number(newCourse.credits) || 3,
      capacity: Number(newCourse.capacity) || 30,
      enrolled: 0,
      status: 'draft',
      semester: newCourse.semester || 'Fall 2024',
      schedule: newCourse.schedule || 'TBD'
    };
    setCourses(prev => [nextCourse, ...prev]);
    setShowAddModal(false);
    setNewCourse({ name: '', code: '', department: '', credits: '', lecturer: '', description: '' });
  };

  const handleExportCourses = async (exportOptions) => {
    console.log('Exporting courses with options:', exportOptions);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleImportCourses = async (file) => {
    console.log('Importing courses from file:', file.name);
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setShowViewModal(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleUpdateCourse = async (courseData) => {
    console.log('Updating course:', selectedCourse?.id, courseData);
    await new Promise(resolve => setTimeout(resolve, 600));
    setCourses(prev => prev.map(c => (
      c.id === selectedCourse?.id
        ? {
            ...c,
            code: courseData?.code ?? c.code,
            name: courseData?.name ?? c.name,
            department: courseData?.department ?? c.department,
            lecturer: courseData?.lecturer ?? c.lecturer,
            credits: courseData?.credits !== undefined ? Number(courseData.credits) : c.credits,
            capacity: courseData?.capacity !== undefined ? Number(courseData.capacity) : c.capacity,
            semester: courseData?.semester ?? c.semester,
            schedule: courseData?.schedule ?? c.schedule,
            status: courseData?.status ?? c.status
          }
        : c
    )));
    setShowEditModal(false);
  };

  const handleDuplicateCourse = (course) => {
    setSelectedCourse(course);
    setShowDuplicateModal(true);
  };

  const handleConfirmDuplicate = async () => {
    console.log('Duplicating course:', selectedCourse?.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (!selectedCourse) return;
    const nextId = courses.reduce((max, c) => Math.max(max, c.id), 0) + 1;
    const cloned = {
      ...selectedCourse,
      id: nextId,
      code: `${selectedCourse.code}-COPY`,
      name: `${selectedCourse.name} (Copy)`,
      enrolled: 0,
      status: 'draft'
    };
    setCourses(prev => [cloned, ...prev]);
    setShowDuplicateModal(false);
  };

  const handleDeleteCourse = (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    console.log('Deleting course:', selectedCourse?.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCourses(prev => prev.filter(c => c.id !== selectedCourse?.id));
    setShowDeleteModal(false);
  };

  const courseViewFields = [
    { name: 'name', label: 'Course Name', type: 'text' },
    { name: 'code', label: 'Course Code', type: 'text' },
    { name: 'department', label: 'Department', type: 'text' },
    { name: 'credits', label: 'Credits', type: 'text' },
    { name: 'lecturer', label: 'Lecturer', type: 'text' },
    { name: 'students', label: 'Enrolled Students', type: 'text' },
    { name: 'schedule', label: 'Schedule', type: 'text' },
    { name: 'status', label: 'Status', type: 'status' }
  ];

  const courseEditFields = [
    { name: 'code', label: 'Course Code', type: 'text', required: true },
    { name: 'name', label: 'Course Name', type: 'text', required: true, fullWidth: true },
    { name: 'department', label: 'Department', type: 'select', required: true, options: [
      { value: 'Architecture & Design', label: 'Architecture & Design' },
      { value: 'Digital Design', label: 'Digital Design' },
      { value: 'Engineering Design', label: 'Engineering Design' }
    ]},
    { name: 'lecturer', label: 'Lecturer', type: 'text', required: true },
    { name: 'credits', label: 'Credits', type: 'number', required: true },
    { name: 'capacity', label: 'Capacity', type: 'number', required: true },
    { name: 'semester', label: 'Semester', type: 'text' },
    { name: 'schedule', label: 'Schedule', type: 'text' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'active', label: 'Active' },
      { value: 'draft', label: 'Draft' },
      { value: 'inactive', label: 'Inactive' }
    ]}
  ];

  const getDepartmentColor = (department) => {
    const colors = {
      'Architecture & Design': 'bg-blue-100 text-blue-700',
      'Digital Design': 'bg-purple-100 text-purple-700',
      'Engineering Design': 'bg-cyan-100 text-cyan-700'
    };
    return colors[department] || 'bg-gray-100 text-gray-700';
  };

  const getEnrollmentPercentage = (enrolled, capacity) => {
    return Math.round((enrolled / capacity) * 100);
  };

  const stats = {
    totalCourses: courses.length,
    activeCourses: courses.filter(c => c.status === 'active').length,
    totalEnrolled: courses.reduce((sum, c) => sum + c.enrolled, 0),
    averageEnrollment: Math.round(courses.reduce((sum, c) => sum + (c.enrolled / c.capacity * 100), 0) / courses.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Courses</h1>
          <p className="text-neutral-600 mt-1">Manage course offerings and enrollment</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button 
            onClick={() => setShowExportModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <ArrowUpTrayIcon className="w-4 h-4" />
            Import
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            Add Course
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{stats.totalCourses}</div>
              <div className="text-sm text-neutral-500">Total Courses</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-cyan hover:bg-accent-cyan-dark rounded-xl flex items-center justify-center">
              <PlayIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{stats.activeCourses}</div>
              <div className="text-sm text-neutral-500">Active Courses</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{stats.totalEnrolled}</div>
              <div className="text-sm text-neutral-500">Total Enrolled</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <PercentBadgeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{stats.averageEnrollment}%</div>
              <div className="text-sm text-neutral-500">Avg Enrollment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['all', 'Architecture & Design', 'Digital Design', 'Engineering Design'].map(department => (
              <button
                key={department}
                onClick={() => setDepartmentFilter(department)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  departmentFilter === department
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {department}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-card border border-neutral-300 overflow-hidden hover:shadow-lg hover:border-brand-primary transition-all">
            <div className="p-6">
              {/* Course Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-neutral-800">{course.code}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-1">{course.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(course.department)}`}>
                    {course.department}
                  </span>
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <UserIcon className="w-4 h-4" />
                  <span>{course.lecturer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <AcademicCapIcon className="w-4 h-4" />
                  <span>{course.credits} Credits • {course.semester}</span>
                </div>
              </div>

              {/* Enrollment Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-neutral-600">Enrollment</span>
                  <span className="font-medium text-neutral-800">
                    {course.enrolled}/{course.capacity} ({getEnrollmentPercentage(course.enrolled, course.capacity)}%)
                  </span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      getEnrollmentPercentage(course.enrolled, course.capacity) >= 90 ? 'bg-red-500' :
                      getEnrollmentPercentage(course.enrolled, course.capacity) >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${getEnrollmentPercentage(course.enrolled, course.capacity)}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleViewCourse(course)}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                  title="View Details"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleEditCourse(course)}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                  title="Edit"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDuplicateCourse(course)}
                  className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors" 
                  title="Duplicate"
                >
                  <DocumentDuplicateIcon className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course)}
                  className="p-2 text-status-error hover:bg-status-error/10 rounded-lg transition-colors" 
                  title="Delete"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-xl shadow-card p-12 text-center">
          <MagnifyingGlassIcon className="w-16 h-16 text-neutral-300 mb-4" />
          <h3 className="text-lg font-medium text-neutral-600 mb-2">No courses found</h3>
          <p className="text-neutral-500">Try adjusting your search terms or filters</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <PlusIcon className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Create Course</h4>
          <p className="text-sm text-neutral-600 mb-4">Add a new course to the curriculum</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all"
          >
            New Course
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-accent-cyan hover:bg-accent-cyan-dark rounded-xl flex items-center justify-center mx-auto mb-3">
            <UsersIcon className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Manage Enrollment</h4>
          <p className="text-sm text-neutral-600 mb-4">View and manage student enrollments</p>
          <button 
            onClick={() => window.alert('Enrollment management is not implemented in demo mode.')}
            className="w-full bg-accent-cyan hover:bg-accent-cyan-dark text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all"
          >
            View Enrollments
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Schedule Builder</h4>
          <p className="text-sm text-neutral-600 mb-4">Create and manage course schedules</p>
          <button 
            onClick={() => window.alert('Schedule builder is not implemented in demo mode.')}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all"
          >
            Build Schedule
          </button>
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-500/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                  <PlusIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-neutral-800">Add New Course</h2>
                  <p className="text-sm text-neutral-600">Create a new course in the system</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddCourse} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Code */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Course Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={newCourse.code}
                    onChange={handleInputChange}
                    placeholder="e.g., CS101"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                    required
                  />
                </div>

                {/* Course Name */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newCourse.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Introduction to Computer Science"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                    required
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={newCourse.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Architecture & Design">Architecture & Design</option>
                    <option value="Digital Design">Digital Design</option>
                    <option value="Engineering Design">Engineering Design</option>
                  </select>
                </div>

                {/* Lecturer */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Lecturer
                  </label>
                  <input
                    type="text"
                    name="lecturer"
                    value={newCourse.lecturer}
                    onChange={handleInputChange}
                    placeholder="e.g., Dr. Sarah Smith"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>

                {/* Credits */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Credits
                  </label>
                  <input
                    type="number"
                    name="credits"
                    value={newCourse.credits}
                    onChange={handleInputChange}
                    placeholder="e.g., 4"
                    min="1"
                    max="6"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={newCourse.capacity}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    min="1"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={newCourse.semester}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option value="">Select Semester</option>
                    <option value="Fall 2024">Fall 2024</option>
                    <option value="Spring 2025">Spring 2025</option>
                    <option value="Summer 2025">Summer 2025</option>
                  </select>
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Schedule
                  </label>
                  <input
                    type="text"
                    name="schedule"
                    value={newCourse.schedule}
                    onChange={handleInputChange}
                    placeholder="e.g., Mon/Wed 9:00-10:30"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Course Description
                </label>
                <textarea
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  placeholder="Enter course description..."
                  rows={4}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg transition-all"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modals */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExportCourses}
        title="Export Courses"
        subtitle="Export course data in your preferred format"
        entityName="courses"
      />

      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImportCourses}
        title="Import Courses"
        subtitle="Upload a file to import course data"
        acceptedFormats={['.csv', '.xlsx']}
        maxFileSize={5}
        templateUrl="/templates/courses-template.csv"
        sampleData={[
          'Course Name,Course Code,Department,Credits,Lecturer,Description',
          'Introduction to Programming,CS101,Computer Science,3,Dr. Smith,Basic programming concepts',
          'Calculus I,MATH101,Mathematics,4,Prof. Johnson,Differential and integral calculus'
        ]}
      />

      <ViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Course Details"
        subtitle="View complete course information"
        data={selectedCourse}
        fields={courseViewFields}
        actions={[
          {
            label: 'Edit Course',
            onClick: () => {
              setShowViewModal(false);
              handleEditCourse(selectedCourse);
            },
            className: 'bg-brand-primary hover:bg-brand-primary-dark text-white',
            icon: PencilIcon
          },
          {
            label: 'Duplicate Course',
            onClick: () => {
              setShowViewModal(false);
              handleDuplicateCourse(selectedCourse);
            },
            className: 'bg-neutral-600 hover:bg-neutral-700 text-white',
            icon: DocumentDuplicateIcon
          }
        ]}
      />

      <FormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdateCourse}
        title="Edit Course"
        subtitle="Update course information"
        fields={courseEditFields}
        initialData={selectedCourse}
        submitText="Update Course"
        mode="edit"
      />

      <ConfirmationModal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        onConfirm={handleConfirmDuplicate}
        title="Duplicate Course"
        message={`Are you sure you want to create a duplicate of "${selectedCourse?.name}"? A new course will be created with the same details.`}
        confirmText="Duplicate Course"
        type="info"
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        message={`Are you sure you want to permanently delete "${selectedCourse?.name}"? This action cannot be undone and will affect all enrolled students.`}
        confirmText="Delete Course"
        type="danger"
      />
    </div>
  );
}

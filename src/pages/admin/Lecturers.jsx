import { useState } from 'react';
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
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function Lecturers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const lecturers = [
    { id: 1, name: 'Dr. Sarah Smith', email: 'sarah.smith@university.edu', department: 'Computer Science', courses: 4, students: 156, experience: '8 years', status: 'active' },
    { id: 2, name: 'Prof. Michael Johnson', email: 'michael.j@university.edu', department: 'Engineering', courses: 3, students: 89, experience: '12 years', status: 'active' },
    { id: 3, name: 'Dr. Emily Brown', email: 'emily.b@university.edu', department: 'Mathematics', courses: 5, students: 203, experience: '6 years', status: 'active' },
    { id: 4, name: 'Prof. David Wilson', email: 'david.w@university.edu', department: 'Physics', courses: 2, students: 67, experience: '15 years', status: 'sabbatical' },
    { id: 5, name: 'Dr. Lisa Davis', email: 'lisa.d@university.edu', department: 'Chemistry', courses: 3, students: 124, experience: '4 years', status: 'active' },
    { id: 6, name: 'Prof. James Miller', email: 'james.m@university.edu', department: 'Business', courses: 4, students: 178, experience: '10 years', status: 'active' },
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Lecturers</h1>
          <p className="text-neutral-600 mt-1">Manage faculty and teaching staff</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
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
            {['all', 'computer science', 'engineering', 'mathematics', 'physics', 'chemistry', 'business'].map(dept => (
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
                  <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="View Profile">
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Edit">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Message">
                    <EnvelopeIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

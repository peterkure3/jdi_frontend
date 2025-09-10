import { useState } from 'react';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Students</h1>
          <p className="text-neutral-600 mt-1">Manage student records and information</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <ArrowUpTrayIcon className="w-4 h-4" />
            Import
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
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
                      <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="View Profile">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Edit">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-status-warning hover:bg-status-warning/10 rounded-lg transition-colors" title="Suspend">
                        <PauseIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-status-error hover:bg-status-error/10 rounded-lg transition-colors" title="Delete">
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
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDownTrayIcon,
  UserPlusIcon,
  AcademicCapIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  PaperAirplaneIcon,
  PresentationChartLineIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';

export default function Students() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const downloadTextFile = (filename, text) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const rows = filteredStudents
      .map(s => `${s.studentId}\t${s.name}\t${s.course}\t${s.grade}\t${s.attendance}%\t${s.status}`)
      .join('\n');
    downloadTextFile(
      'lecturer-students-export-demo.txt',
      `JDI Demo Students Export\n\nGenerated: ${new Date().toISOString()}\n\nID\tName\tCourse\tGrade\tAttendance\tStatus\n${rows}\n`
    );
  };

  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@student.edu',
      studentId: 'STU2024001',
      course: 'CS101',
      courseName: 'Computer Science 101',
      grade: 'B+',
      attendance: 92,
      assignments: { completed: 8, total: 10 },
      lastActivity: '2024-03-15',
      status: 'active',
      avatar: 'AJ'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@student.edu',
      studentId: 'STU2024002',
      course: 'CS201',
      courseName: 'Data Structures & Algorithms',
      grade: 'A',
      attendance: 98,
      assignments: { completed: 12, total: 12 },
      lastActivity: '2024-03-16',
      status: 'active',
      avatar: 'BS'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol.davis@student.edu',
      studentId: 'STU2024003',
      course: 'CS301',
      courseName: 'Web Development',
      grade: 'A-',
      attendance: 88,
      assignments: { completed: 6, total: 8 },
      lastActivity: '2024-03-14',
      status: 'active',
      avatar: 'CD'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@student.edu',
      studentId: 'STU2024004',
      course: 'CS101',
      courseName: 'Computer Science 101',
      grade: 'C+',
      attendance: 76,
      assignments: { completed: 6, total: 10 },
      lastActivity: '2024-03-10',
      status: 'at_risk',
      avatar: 'DW'
    },
    {
      id: 5,
      name: 'Eva Martinez',
      email: 'eva.martinez@student.edu',
      studentId: 'STU2024005',
      course: 'CS201',
      courseName: 'Data Structures & Algorithms',
      grade: 'B',
      attendance: 94,
      assignments: { completed: 11, total: 12 },
      lastActivity: '2024-03-15',
      status: 'active',
      avatar: 'EM'
    },
    {
      id: 6,
      name: 'Frank Brown',
      email: 'frank.brown@student.edu',
      studentId: 'STU2024006',
      course: 'CS301',
      courseName: 'Web Development',
      grade: 'D+',
      attendance: 65,
      assignments: { completed: 4, total: 8 },
      lastActivity: '2024-03-08',
      status: 'at_risk',
      avatar: 'FB'
    }
  ];

  // const courses = ['all', 'CS101', 'CS201', 'CS301'];

  const filteredStudents = students.filter(student => {
    const matchesFilter = filter === 'all' || student.status === filter;
    const matchesCourse = selectedCourse === 'all' || student.course === selectedCourse;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesCourse && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-status-success/10 text-status-success';
      case 'at_risk': return 'bg-status-error/10 text-status-error';
      case 'inactive': return 'bg-neutral-100 text-neutral-600';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-status-success';
    if (grade.startsWith('B')) return 'text-accent-skyStrong';
    if (grade.startsWith('C')) return 'text-status-warning';
    return 'text-status-error';
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return 'text-status-success';
    if (attendance >= 80) return 'text-status-warning';
    return 'text-status-error';
  };

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    atRisk: students.filter(s => s.status === 'at_risk').length,
    avgAttendance: Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">My Students</h1>
          <p className="text-neutral-600 mt-1">Monitor student progress and performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export Data
          </button>
          <button
            onClick={() => navigate('/lecturer/messages')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <EnvelopeIcon className="w-4 h-4" />
            Send Message
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{stats.total}</div>
              <div className="text-sm text-neutral-500">Total Students</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{stats.active}</div>
              <div className="text-sm text-neutral-500">Active Students</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-error to-status-error rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{stats.atRisk}</div>
              <div className="text-sm text-neutral-500">At Risk</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <CalculatorIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{stats.avgAttendance}%</div>
              <div className="text-sm text-neutral-500">Avg Attendance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
            >
              <option value="all">All Courses</option>
              <option value="CS101">CS101</option>
              <option value="CS201">CS201</option>
              <option value="CS301">CS301</option>
            </select>
            {['all', 'active', 'at_risk', 'inactive'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  filter === status
                    ? 'bg-red-800 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {status === 'at_risk' ? 'At Risk' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl shadow-card p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-xl flex items-center justify-center text-white font-semibold">
                  {student.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">{student.name}</h3>
                  <p className="text-sm text-neutral-500">{student.studentId}</p>
                  <p className="text-sm text-neutral-500">{student.courseName}</p>
                </div>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(student.status)}`}>
                {student.status === 'at_risk' ? 'At Risk' : student.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <div className={`text-lg font-bold ${getGradeColor(student.grade)}`}>
                  {student.grade}
                </div>
                <div className="text-xs text-neutral-500">Current Grade</div>
              </div>
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <div className={`text-lg font-bold ${getAttendanceColor(student.attendance)}`}>
                  {student.attendance}%
                </div>
                <div className="text-xs text-neutral-500">Attendance</div>
              </div>
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <div className="text-lg font-bold text-neutral-800">
                  {student.assignments.completed}/{student.assignments.total}
                </div>
                <div className="text-xs text-neutral-500">Assignments</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Email</span>
                <span className="font-medium text-neutral-800">{student.email}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Last Activity</span>
                <span className="font-medium text-neutral-800">{new Date(student.lastActivity).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Assignment Progress</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-neutral-100 rounded-full h-2">
                    <div 
                      className="bg-brand-primary h-2 rounded-full transition-all"
                      style={{ width: `${(student.assignments.completed / student.assignments.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-neutral-500">
                    {Math.round((student.assignments.completed / student.assignments.total) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.alert('Student details are not implemented in demo mode.')}
                  className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate('/lecturer/messages')}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  title="Send Message"
                >
                  <EnvelopeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/lecturer/grades')}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  title="View Grades"
                >
                  <ChartBarIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* At Risk Students Alert */}
      {stats.atRisk > 0 && (
        <div className="bg-gradient-to-r from-status-error/10 to-status-error/5 border border-status-error/20 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-status-error rounded-xl flex items-center justify-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-800 mb-1">Students Need Attention</h3>
              <p className="text-sm text-neutral-600">
                {stats.atRisk} student{stats.atRisk > 1 ? 's are' : ' is'} at risk and may need additional support.
              </p>
            </div>
            <button
              onClick={() => window.alert('Review workflow is not implemented in demo mode.')}
              className="bg-status-error text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-status-error/90 transition-colors"
            >
              Review Students
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-pink rounded-xl flex items-center justify-center mx-auto mb-3">
            <PaperAirplaneIcon className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Send Announcement</h4>
          <p className="text-sm text-neutral-600 mb-4">Send messages to all or selected students</p>
          <button
            onClick={() => navigate('/lecturer/messages')}
            className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all"
          >
            Compose Message
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-status-success to-accent-lime rounded-xl flex items-center justify-center mx-auto mb-3">
            <PresentationChartLineIcon className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Performance Report</h4>
          <p className="text-sm text-neutral-600 mb-4">Generate detailed performance analytics</p>
          <button
            onClick={() => window.alert('Report generation is not implemented in demo mode.')}
            className="w-full bg-status-success hover:bg-status-success/90 text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all"
          >
            Generate Report
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-xl flex items-center justify-center mx-auto mb-3">
            <UserPlusIcon className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Add Student</h4>
          <p className="text-sm text-neutral-600 mb-4">Enroll new students in your courses</p>
          <button
            onClick={() => window.alert('Student enrollment is not implemented in demo mode.')}
            className="w-full bg-accent-cyan hover:bg-accent-cyan-dark text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all"
          >
            Enroll Student
          </button>
        </div>
      </div>
    </div>
  );
}

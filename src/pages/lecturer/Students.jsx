import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormModal, ViewModal } from '../../components/shared/modals';
import BaseModal from '../../components/shared/modals/BaseModal';
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
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetailsModal, setShowStudentDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [reviewedAtRiskIds, setReviewedAtRiskIds] = useState([]);

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

  const handleExport = (rows) => {
    const body = rows
      .map(s => `${s.studentId}\t${s.name}\t${s.course}\t${s.grade}\t${s.attendance}%\t${s.status}`)
      .join('\n');
    downloadTextFile(
      'lecturer-students-export-demo.txt',
      `JDI Demo Students Export\n\nGenerated: ${new Date().toISOString()}\n\nID\tName\tCourse\tGrade\tAttendance\tStatus\n${body}\n`
    );
  };

  const handleGenerateReport = () => {
    const header = ['student_id', 'name', 'course', 'grade', 'attendance', 'status', 'last_activity'];
    const csv = [header.join(',')]
      .concat(
        filteredStudents.map(s => [
          s.studentId,
          `"${String(s.name).replace(/"/g, '""')}"`,
          s.course,
          s.grade,
          s.attendance,
          s.status,
          s.lastActivity
        ].join(','))
      )
      .join('\n');
    downloadTextFile('lecturer-students-performance-report.csv', csv);
  };

  const initialStudents = [
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

  const [students, setStudents] = useState(initialStudents);

  // const courses = ['all', 'CS101', 'CS201', 'CS301'];

  const filteredStudents = students.filter(student => {
    const matchesFilter = filter === 'all' || student.status === filter;
    const matchesCourse = selectedCourse === 'all' || student.course === selectedCourse;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesCourse && matchesSearch;
  });

  const atRiskStudents = students.filter(s => s.status === 'at_risk');

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

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowStudentDetailsModal(true);
  };

  const handleToggleReviewed = (studentId) => {
    setReviewedAtRiskIds(prev => (
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    ));
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
            onClick={() => handleExport(filteredStudents)}
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
                  onClick={() => handleViewDetails(student)}
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
              onClick={() => setShowReviewModal(true)}
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
            onClick={handleGenerateReport}
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
            onClick={() => setShowEnrollModal(true)}
            className="w-full bg-accent-cyan hover:bg-accent-cyan-dark text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all"
          >
            Enroll Student
          </button>
        </div>
      </div>

      <ViewModal
        isOpen={showStudentDetailsModal}
        onClose={() => setShowStudentDetailsModal(false)}
        title="Student Details"
        subtitle={selectedStudent ? `${selectedStudent.name} • ${selectedStudent.studentId}` : ''}
        data={selectedStudent ? {
          ...selectedStudent,
          assignments: `${selectedStudent.assignments.completed}/${selectedStudent.assignments.total}`
        } : {}}
        fields={[
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'studentId', label: 'Student ID', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'courseName', label: 'Course', type: 'text' },
          { name: 'grade', label: 'Grade', type: 'text' },
          { name: 'attendance', label: 'Attendance', type: 'percentage' },
          { name: 'status', label: 'Status', type: 'status' },
          { name: 'lastActivity', label: 'Last Activity', type: 'date' },
          { name: 'assignments', label: 'Assignments', type: 'multiline', fullWidth: true }
        ]}
        actions={[
          {
            label: 'Message',
            onClick: () => {
              setShowStudentDetailsModal(false);
              navigate('/lecturer/messages');
            },
            variant: 'secondary'
          },
          {
            label: 'View Grades',
            onClick: () => {
              setShowStudentDetailsModal(false);
              navigate('/lecturer/grades');
            },
            variant: 'primary'
          }
        ]}
      />

      <BaseModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="At-Risk Students"
        subtitle="Review and track follow-ups"
        size="lg"
      >
        <div className="space-y-4">
          <div className="text-sm text-neutral-600">
            {atRiskStudents.length} student{atRiskStudents.length === 1 ? '' : 's'} currently flagged as at risk.
          </div>

          <div className="space-y-3">
            {atRiskStudents.map(s => (
              <div key={s.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                <div>
                  <div className="font-medium text-neutral-800">{s.name}</div>
                  <div className="text-sm text-neutral-600">{s.studentId} • {s.course}</div>
                  <div className="text-xs text-neutral-500">Grade: {s.grade} • Attendance: {s.attendance}%</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewDetails(s)}
                    className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleToggleReviewed(s.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      reviewedAtRiskIds.includes(s.id)
                        ? 'bg-status-success/10 text-status-success'
                        : 'bg-status-warning/10 text-status-warning'
                    }`}
                  >
                    {reviewedAtRiskIds.includes(s.id) ? 'Reviewed' : 'Mark Reviewed'}
                  </button>
                </div>
              </div>
            ))}

            {atRiskStudents.length === 0 && (
              <div className="text-neutral-500">No at-risk students.</div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
            <button
              onClick={() => setShowReviewModal(false)}
              className="px-6 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </BaseModal>

      <FormModal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        onSubmit={async (data) => {
          await new Promise(resolve => setTimeout(resolve, 600));
          const newStudent = {
            id: Date.now(),
            name: data.name,
            email: data.email,
            studentId: data.studentId,
            course: data.course,
            courseName:
              data.course === 'CS101' ? 'Computer Science 101'
              : data.course === 'CS201' ? 'Data Structures & Algorithms'
              : 'Web Development',
            grade: 'N/A',
            attendance: 0,
            assignments: { completed: 0, total: 0 },
            lastActivity: new Date().toISOString().slice(0, 10),
            status: 'active',
            avatar: (data.name || 'S').split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()
          };
          setStudents(prev => [newStudent, ...prev]);
          setSelectedCourse('all');
          setFilter('all');
        }}
        title="Enroll Student"
        subtitle="Add a new student to your course roster"
        submitText="Enroll"
        mode="create"
        fields={[
          { name: 'name', label: 'Full Name', type: 'text', required: true, fullWidth: true },
          { name: 'email', label: 'Email', type: 'email', required: true, fullWidth: true },
          { name: 'studentId', label: 'Student ID', type: 'text', required: true },
          { name: 'course', label: 'Course', type: 'select', required: true, options: [
            { value: 'CS101', label: 'CS101' },
            { value: 'CS201', label: 'CS201' },
            { value: 'CS301', label: 'CS301' }
          ]}
        ]}
        initialData={{
          name: '',
          email: '',
          studentId: '',
          course: 'CS101'
        }}
      />
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormModal } from '../../components/shared/modals';
import BaseModal from '../../components/shared/modals/BaseModal';
import {
  PlusIcon,
  UsersIcon,
  PercentBadgeIcon,
  StarIcon,
  ListBulletIcon,
  PencilIcon,
  EyeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function Grades() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [view, setView] = useState('overview');
  const [showEditAssignmentModal, setShowEditAssignmentModal] = useState(false);
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const courses = [
    { code: 'CS101', name: 'Computer Science 101', students: 45 },
    { code: 'CS201', name: 'Data Structures & Algorithms', students: 38 },
    { code: 'CS301', name: 'Web Development', students: 32 }
  ];

  const initialGradeData = {
    CS101: {
      assignments: [
        { id: 1, name: 'Assignment 1: Basic Programming', weight: 15, avgGrade: 85, submissions: 43, due: '2024-02-15' },
        { id: 2, name: 'Midterm Exam', weight: 30, avgGrade: 78, submissions: 45, due: '2024-03-01' },
        { id: 3, name: 'Assignment 2: Data Types', weight: 15, avgGrade: 88, submissions: 41, due: '2024-03-10' },
        { id: 4, name: 'Final Project', weight: 40, avgGrade: 0, submissions: 0, due: '2024-04-15' }
      ],
      students: [
        { id: 1, name: 'Alice Johnson', studentId: 'STU001', grades: { 1: 92, 2: 85, 3: 90, 4: null }, total: 88.5 },
        { id: 2, name: 'Bob Smith', studentId: 'STU002', grades: { 1: 78, 2: 72, 3: 85, 4: null }, total: 76.2 },
        { id: 3, name: 'Carol Davis', studentId: 'STU003', grades: { 1: 95, 2: 88, 3: 92, 4: null }, total: 91.1 },
        { id: 4, name: 'David Wilson', studentId: 'STU004', grades: { 1: 65, 2: 58, 3: 70, 4: null }, total: 62.7 }
      ],
      stats: {
        avgGPA: 3.2,
        passRate: 87,
        highestGrade: 95,
        lowestGrade: 58
      }
    }
    ,
    CS201: {
      assignments: [],
      students: [],
      stats: { avgGPA: 0, passRate: 0, highestGrade: 0, lowestGrade: 0 }
    },
    CS301: {
      assignments: [],
      students: [],
      stats: { avgGPA: 0, passRate: 0, highestGrade: 0, lowestGrade: 0 }
    }
  };

  const [gradeData, setGradeData] = useState(initialGradeData);

  const currentCourseData = gradeData[selectedCourse] || { assignments: [], students: [], stats: { avgGPA: 0, passRate: 0, highestGrade: 0, lowestGrade: 0 } };

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

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-status-success';
    if (grade >= 80) return 'text-accent-skyStrong';
    if (grade >= 70) return 'text-status-warning';
    return 'text-status-error';
  };

  const getLetterGrade = (grade) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  const calculateWeightedGrade = (student) => {
    let totalWeighted = 0;
    let totalWeight = 0;
    
    currentCourseData.assignments.forEach(assignment => {
      const grade = student.grades[assignment.id];
      if (grade !== null && grade !== undefined) {
        totalWeighted += grade * (assignment.weight / 100);
        totalWeight += assignment.weight / 100;
      }
    });
    
    return totalWeight > 0 ? totalWeighted / totalWeight : 0;
  };

  const recalcAssignmentStats = (courseData) => {
    const nextAssignments = courseData.assignments.map(a => {
      const grades = courseData.students
        .map(s => s.grades?.[a.id])
        .filter(g => g !== null && g !== undefined);
      const submissions = grades.length;
      const avg = submissions > 0 ? Math.round(grades.reduce((sum, g) => sum + g, 0) / submissions) : 0;
      return { ...a, submissions, avgGrade: avg };
    });

    const nextStudents = courseData.students.map(s => ({
      ...s,
      total: calculateWeightedGrade(s)
    }));

    return {
      ...courseData,
      assignments: nextAssignments,
      students: nextStudents
    };
  };

  const handleOpenEditAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowEditAssignmentModal(true);
  };

  const handleOpenSubmissions = (assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissionsModal(true);
  };

  const handleUpdateStudentGrade = (assignmentId, studentRowId, value) => {
    const parsed = value === '' ? null : Number(value);
    const clamped = parsed === null ? null : Math.max(0, Math.min(100, parsed));

    setGradeData(prev => {
      const courseData = prev[selectedCourse];
      const nextCourseData = {
        ...courseData,
        students: courseData.students.map(s =>
          s.id === studentRowId
            ? { ...s, grades: { ...s.grades, [assignmentId]: clamped } }
            : s
        )
      };

      return {
        ...prev,
        [selectedCourse]: recalcAssignmentStats(nextCourseData)
      };
    });
  };

  const handleExportSubmissionsCsv = () => {
    if (!selectedAssignment || !currentCourseData) return;
    const header = ['student_id', 'student_name', 'grade'];
    const csv = [header.join(',')]
      .concat(
        currentCourseData.students.map(s => [
          s.studentId,
          `"${String(s.name).replace(/"/g, '""')}"`,
          s.grades?.[selectedAssignment.id] ?? ''
        ].join(','))
      )
      .join('\n');

    const safe = (selectedAssignment.name || 'assignment').replace(/[^a-z0-9-_]+/gi, '_');
    downloadTextFile(`submissions-${selectedCourse}-${safe}.csv`, csv);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Grade Management</h1>
          <p className="text-neutral-600 mt-1">Track and manage student grades across your courses</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
          >
            {courses.map(course => (
              <option key={course.code} value={course.code}>
                {course.code} - {course.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => navigate('/lecturer/assignments')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            Add Assignment
          </button>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{courses.find(c => c.code === selectedCourse)?.students}</div>
              <div className="text-sm text-neutral-500">Students</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <PercentBadgeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{currentCourseData?.stats.passRate}%</div>
              <div className="text-sm text-neutral-500">Pass Rate</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <StarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{currentCourseData?.stats.avgGPA}</div>
              <div className="text-sm text-neutral-500">Average GPA</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <ListBulletIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{currentCourseData?.assignments.length}</div>
              <div className="text-sm text-neutral-500">Assignments</div>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'overview' ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Assignment Overview
          </button>
          <button
            onClick={() => setView('gradebook')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'gradebook' ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Student Gradebook
          </button>
          <button
            onClick={() => setView('analytics')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'analytics' ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Grade Analytics
          </button>
        </div>
      </div>

      {view === 'overview' && (
        /* Assignment Overview */
        <div className="space-y-4">
          {currentCourseData?.assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800">{assignment.name}</h3>
                  <p className="text-sm text-neutral-500">Weight: {assignment.weight}% • Due: {new Date(assignment.due).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditAssignment(assignment)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Edit Assignment"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenSubmissions(assignment)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="View Submissions"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <div className={`text-2xl font-bold ${getGradeColor(assignment.avgGrade)}`}>
                    {assignment.avgGrade > 0 ? assignment.avgGrade : 'N/A'}
                  </div>
                  <div className="text-sm text-neutral-500">Average Grade</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <div className="text-2xl font-bold text-neutral-800">
                    {assignment.submissions}/{courses.find(c => c.code === selectedCourse)?.students}
                  </div>
                  <div className="text-sm text-neutral-500">Submissions</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <div className="text-2xl font-bold text-neutral-800">{assignment.weight}%</div>
                  <div className="text-sm text-neutral-500">Course Weight</div>
                </div>
              </div>

              {assignment.submissions > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600">Submission Progress</span>
                    <span className="text-sm font-medium text-neutral-800">
                      {Math.round((assignment.submissions / courses.find(c => c.code === selectedCourse)?.students) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-brand-primary to-brand-primary-dark h-2 rounded-full transition-all"
                      style={{ width: `${(assignment.submissions / courses.find(c => c.code === selectedCourse)?.students) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {view === 'gradebook' && (
        /* Student Gradebook */
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100">
            <h3 className="text-lg font-semibold text-neutral-800">Student Gradebook</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Student</th>
                  {currentCourseData?.assignments.map(assignment => (
                    <th key={assignment.id} className="text-center px-4 py-4 text-sm font-medium text-neutral-600 min-w-[100px]">
                      {assignment.name.split(':')[0]}
                      <div className="text-xs text-neutral-400">({assignment.weight}%)</div>
                    </th>
                  ))}
                  <th className="text-center px-6 py-4 text-sm font-medium text-neutral-600">Total</th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-neutral-600">Letter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {currentCourseData?.students.map((student) => {
                  const weightedGrade = calculateWeightedGrade(student);
                  return (
                    <tr key={student.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-800">{student.name}</div>
                        <div className="text-sm text-neutral-500">{student.studentId}</div>
                      </td>
                      {currentCourseData.assignments.map(assignment => {
                        const grade = student.grades[assignment.id];
                        return (
                          <td key={assignment.id} className="px-4 py-4 text-center">
                            {grade !== null && grade !== undefined ? (
                              <span className={`font-medium ${getGradeColor(grade)}`}>
                                {grade}
                              </span>
                            ) : (
                              <span className="text-neutral-400">-</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="px-6 py-4 text-center">
                        <span className={`font-bold ${getGradeColor(weightedGrade)}`}>
                          {weightedGrade.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-bold ${getGradeColor(weightedGrade)}`}>
                          {getLetterGrade(weightedGrade)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === 'analytics' && (
        /* Grade Analytics */
        <div className="space-y-6">
          {/* Grade Distribution */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Grade Distribution</h3>
            <div className="grid grid-cols-5 gap-4">
              {['A', 'B', 'C', 'D', 'F'].map(grade => {
                const count = currentCourseData?.students.filter(student => {
                  const weightedGrade = calculateWeightedGrade(student);
                  return getLetterGrade(weightedGrade) === grade;
                }).length || 0;
                const percentage = currentCourseData ? (count / currentCourseData.students.length) * 100 : 0;
                
                return (
                  <div key={grade} className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className={`text-2xl font-bold ${getGradeColor(grade === 'A' ? 95 : grade === 'B' ? 85 : grade === 'C' ? 75 : grade === 'D' ? 65 : 55)}`}>
                      {count}
                    </div>
                    <div className="text-sm text-neutral-500">Grade {grade}</div>
                    <div className="text-xs text-neutral-400">{percentage.toFixed(1)}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Trends */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Assignment Performance Trends</h3>
            <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-neutral-500">
                <ChartBarIcon className="w-16 h-16 mb-3" />
                <div>Performance Chart</div>
                <div className="text-sm">Assignment performance trends would be displayed here</div>
              </div>
            </div>
          </div>

          {/* At-Risk Students */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Students Needing Attention</h3>
            <div className="space-y-3">
              {currentCourseData?.students
                .filter(student => calculateWeightedGrade(student) < 70)
                .map(student => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-status-error/5 border border-status-error/20 rounded-lg">
                    <div>
                      <div className="font-medium text-neutral-800">{student.name}</div>
                      <div className="text-sm text-neutral-600">{student.studentId}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${getGradeColor(calculateWeightedGrade(student))}`}>
                        {calculateWeightedGrade(student).toFixed(1)}% ({getLetterGrade(calculateWeightedGrade(student))})
                      </div>
                      <button
                        onClick={() => navigate('/lecturer/messages')}
                        className="text-sm text-brand-primary hover:text-brand-primaryDark transition-colors"
                      >
                        Contact Student
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <FormModal
        isOpen={showEditAssignmentModal}
        onClose={() => setShowEditAssignmentModal(false)}
        onSubmit={async (data) => {
          await new Promise(resolve => setTimeout(resolve, 500));
          if (!selectedAssignment) return;

          setGradeData(prev => {
            const courseData = prev[selectedCourse];
            const updatedAssignment = {
              ...selectedAssignment,
              name: data.name,
              weight: Number(data.weight),
              due: data.due
            };

            const nextCourseData = {
              ...courseData,
              assignments: courseData.assignments.map(a => (a.id === updatedAssignment.id ? updatedAssignment : a))
            };

            return {
              ...prev,
              [selectedCourse]: recalcAssignmentStats(nextCourseData)
            };
          });
        }}
        title="Edit Assignment"
        subtitle="Update assignment metadata"
        submitText="Save"
        mode="edit"
        fields={[
          { name: 'name', label: 'Name', type: 'text', required: true, fullWidth: true },
          { name: 'weight', label: 'Weight (%)', type: 'number', required: true, min: 0, max: 100 },
          { name: 'due', label: 'Due Date', type: 'date', required: true }
        ]}
        initialData={selectedAssignment ? {
          name: selectedAssignment.name,
          weight: selectedAssignment.weight,
          due: selectedAssignment.due
        } : {}}
      />

      <BaseModal
        isOpen={showSubmissionsModal}
        onClose={() => setShowSubmissionsModal(false)}
        title="Submissions"
        subtitle={selectedAssignment ? `${selectedCourse} • ${selectedAssignment.name}` : ''}
        size="lg"
      >
        {selectedAssignment && currentCourseData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-600">
                Average: {selectedAssignment.avgGrade > 0 ? `${selectedAssignment.avgGrade}%` : 'N/A'} • Submissions: {selectedAssignment.submissions}
              </div>
              <button
                onClick={handleExportSubmissionsCsv}
                className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
              >
                Export CSV
              </button>
            </div>

            <div className="overflow-x-auto border border-neutral-200 rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-neutral-700">Student</th>
                    <th className="text-left px-4 py-3 font-medium text-neutral-700">ID</th>
                    <th className="text-left px-4 py-3 font-medium text-neutral-700">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourseData.students.map(s => (
                    <tr key={s.id} className="border-t border-neutral-100">
                      <td className="px-4 py-3 font-medium text-neutral-800">{s.name}</td>
                      <td className="px-4 py-3 text-neutral-600">{s.studentId}</td>
                      <td className="px-4 py-3">
                        <input
                          value={s.grades?.[selectedAssignment.id] ?? ''}
                          onChange={(e) => handleUpdateStudentGrade(selectedAssignment.id, s.id, e.target.value)}
                          className="w-28 px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                          type="number"
                          min={0}
                          max={100}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </BaseModal>
    </div>
  );
}

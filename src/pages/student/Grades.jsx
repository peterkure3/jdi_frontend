import { useState } from 'react';
import { 
  ArrowDownTrayIcon,
  PrinterIcon,
  StarIcon,
  TrophyIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function Grades() {
  const [semesterFilter, setSemesterFilter] = useState('current');

  const grades = [
    { id: 1, course: 'Computer Science 101', code: 'CS101', grade: 'B+', points: 87, credits: 4, semester: 'Fall 2024', assignments: [
      { name: 'Assignment 1', grade: 'A', points: 95, weight: 20 },
      { name: 'Midterm Exam', grade: 'B+', points: 88, weight: 30 },
      { name: 'Final Project', grade: 'B', points: 85, weight: 40 },
      { name: 'Participation', grade: 'A-', points: 92, weight: 10 }
    ]},
    { id: 2, course: 'Mathematics for CS', code: 'MATH201', grade: 'A', points: 94, credits: 3, semester: 'Fall 2024', assignments: [
      { name: 'Quiz 1', grade: 'A', points: 96, weight: 15 },
      { name: 'Quiz 2', grade: 'A-', points: 92, weight: 15 },
      { name: 'Midterm', grade: 'A', points: 95, weight: 35 },
      { name: 'Final Exam', grade: 'A', points: 94, weight: 35 }
    ]},
    { id: 3, course: 'Physics I', code: 'PHYS101', grade: 'B', points: 82, credits: 4, semester: 'Fall 2024', assignments: [
      { name: 'Lab Reports', grade: 'B+', points: 88, weight: 25 },
      { name: 'Midterm 1', grade: 'B-', points: 80, weight: 25 },
      { name: 'Midterm 2', grade: 'B', points: 83, weight: 25 },
      { name: 'Final Exam', grade: 'B', points: 81, weight: 25 }
    ]},
    { id: 4, course: 'English Literature', code: 'ENG201', grade: 'A-', points: 91, credits: 3, semester: 'Fall 2024', assignments: [
      { name: 'Essay 1', grade: 'A', points: 95, weight: 30 },
      { name: 'Essay 2', grade: 'A-', points: 90, weight: 30 },
      { name: 'Final Paper', grade: 'A-', points: 89, weight: 40 }
    ]},
    { id: 5, course: 'Data Structures', code: 'CS201', grade: 'A+', points: 98, credits: 4, semester: 'Spring 2024', assignments: [
      { name: 'Programming Assignments', grade: 'A+', points: 99, weight: 50 },
      { name: 'Midterm Exam', grade: 'A', points: 96, weight: 25 },
      { name: 'Final Exam', grade: 'A+', points: 98, weight: 25 }
    ]}
  ];

  const filteredGrades = grades.filter(grade => {
    if (semesterFilter === 'all') return true;
    if (semesterFilter === 'current') return grade.semester === 'Fall 2024';
    return grade.semester === semesterFilter;
  });

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-status-success';
    if (grade.startsWith('B')) return 'text-accent-skyStrong';
    if (grade.startsWith('C')) return 'text-status-warning';
    return 'text-status-error';
  };

  const calculateGPA = (courses) => {
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(course => {
      totalPoints += gradePoints[course.grade] * course.credits;
      totalCredits += course.credits;
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Grades</h1>
          <p className="text-neutral-600 mt-1">Track your academic performance and progress</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download Transcript
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
            <PrinterIcon className="w-4 h-4" />
            Print Transcript
          </button>
        </div>
      </div>

      {/* GPA Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-status-success to-accent-lime rounded-xl flex items-center justify-center">
              <StarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{calculateGPA(filteredGrades)}</div>
              <div className="text-sm text-neutral-500">Current GPA</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-pink rounded-xl flex items-center justify-center">
              <TrophyIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">3.85</div>
              <div className="text-sm text-neutral-500">Cumulative GPA</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-xl flex items-center justify-center">
              <BookOpenIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{filteredGrades.reduce((sum, grade) => sum + grade.credits, 0)}</div>
              <div className="text-sm text-neutral-500">Credits This Semester</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-status-info to-accent-skyStrong rounded-xl flex items-center justify-center">
              <AcademicCapIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">84</div>
              <div className="text-sm text-neutral-500">Total Credits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Semester Filter */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-wrap gap-2">
          {['current', 'Fall 2024', 'Spring 2024', 'Fall 2023', 'all'].map(semester => (
            <button
              key={semester}
              onClick={() => setSemesterFilter(semester)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                semesterFilter === semester
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {semester === 'current' ? 'Current Semester' : semester}
            </button>
          ))}
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h3 className="text-lg font-semibold text-neutral-800">Course Grades</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Course</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Code</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Credits</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Points</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Grade</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Semester</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredGrades.map((grade) => (
                <tr key={grade.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-800">{grade.course}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{grade.code}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{grade.credits}</td>
                  <td className="px-6 py-4 text-sm font-medium text-neutral-800">{grade.points}%</td>
                  <td className="px-6 py-4">
                    <span className={`text-lg font-bold ${getGradeColor(grade.grade)}`}>
                      {grade.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{grade.semester}</td>
                  <td className="px-6 py-4">
                    <button className="text-brand-primary hover:text-brand-primaryDark text-sm transition-colors">
                      View Breakdown
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Breakdown for First Course (Example) */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Grade Breakdown - {filteredGrades[0]?.course}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredGrades[0]?.assignments.map((assignment, index) => (
            <div key={index} className="border border-neutral-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-neutral-800">{assignment.name}</h4>
                <span className={`text-lg font-bold ${getGradeColor(assignment.grade)}`}>
                  {assignment.grade}
                </span>
              </div>
              <div className="text-sm text-neutral-600 mb-2">{assignment.points}% • {assignment.weight}% weight</div>
              <div className="w-full bg-neutral-100 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    assignment.points >= 90 ? 'bg-status-success' :
                    assignment.points >= 80 ? 'bg-accent-skyStrong' :
                    assignment.points >= 70 ? 'bg-status-warning' : 'bg-status-error'
                  }`}
                  style={{ width: `${assignment.points}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Performance Trend</h3>
        <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-neutral-500">
            <ChartBarIcon className="w-16 h-16 mb-3" />
            <div>Performance Chart</div>
            <div className="text-sm">GPA trend over semesters would be displayed here</div>
          </div>
        </div>
      </div>
    </div>
  );
}

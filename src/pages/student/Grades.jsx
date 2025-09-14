import { useState } from 'react';
import { FormModal, ViewModal, ConfirmationModal } from '../../components/shared/modals';
import { 
  ArrowDownTrayIcon,
  PrinterIcon,
  StarIcon,
  TrophyIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  EyeIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function Grades() {
  const [semesterFilter, setSemesterFilter] = useState('current');
  const [showGradeBreakdownModal, setShowGradeBreakdownModal] = useState(false);
  const [showGradeDisputeModal, setShowGradeDisputeModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showContactInstructorModal, setShowContactInstructorModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  // Handler functions
  const handleViewGradeBreakdown = (course) => {
    setSelectedCourse(course);
    setShowGradeBreakdownModal(true);
  };

  const handleDownloadTranscript = () => {
    console.log('Downloading transcript for period:', semesterFilter);
    // Generate and download PDF transcript
  };

  const handlePrintTranscript = () => {
    console.log('Printing transcript for period:', semesterFilter);
    // Open print dialog
  };

  const handleGradeDispute = async (disputeData) => {
    console.log('Submitting grade dispute for course:', selectedCourse?.id, disputeData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowGradeDisputeModal(false);
  };

  const handleViewProgress = (course) => {
    setSelectedCourse(course);
    setShowProgressModal(true);
  };

  const handleContactInstructor = async (contactData) => {
    console.log('Contacting instructor for course:', selectedCourse?.id, contactData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowContactInstructorModal(false);
  };

  const handleRequestGradeReport = () => {
    console.log('Requesting detailed grade report');
    // Request comprehensive grade analysis
  };

  // Field definitions
  const gradeBreakdownFields = [
    { name: 'course', label: 'Course', type: 'text' },
    { name: 'code', label: 'Course Code', type: 'text' },
    { name: 'instructor', label: 'Instructor', type: 'text' },
    { name: 'semester', label: 'Semester', type: 'text' },
    { name: 'credits', label: 'Credits', type: 'text' },
    { name: 'grade', label: 'Final Grade', type: 'text' },
    { name: 'points', label: 'Percentage', type: 'text' },
    { name: 'gpa_contribution', label: 'GPA Contribution', type: 'text' }
  ];

  const disputeFields = [
    { name: 'assignment', label: 'Assignment/Exam', type: 'select', required: true, options: [
      { value: 'assignment1', label: 'Assignment 1' },
      { value: 'midterm', label: 'Midterm Exam' },
      { value: 'final', label: 'Final Project' },
      { value: 'participation', label: 'Participation' },
      { value: 'final_grade', label: 'Final Grade' }
    ]},
    { name: 'current_grade', label: 'Current Grade', type: 'text', required: true },
    { name: 'expected_grade', label: 'Expected Grade', type: 'text', required: true },
    { name: 'reason', label: 'Reason for Dispute', type: 'select', required: true, options: [
      { value: 'calculation_error', label: 'Calculation Error' },
      { value: 'missing_work', label: 'Missing Work Not Recorded' },
      { value: 'grading_criteria', label: 'Grading Criteria Disagreement' },
      { value: 'technical_issue', label: 'Technical Issue' },
      { value: 'other', label: 'Other' }
    ]},
    { name: 'explanation', label: 'Detailed Explanation', type: 'textarea', rows: 4, required: true, fullWidth: true },
    { name: 'evidence', label: 'Supporting Evidence', type: 'file', multiple: true }
  ];

  const progressFields = [
    { name: 'course', label: 'Course', type: 'text' },
    { name: 'current_grade', label: 'Current Grade', type: 'text' },
    { name: 'assignments_completed', label: 'Assignments Completed', type: 'text' },
    { name: 'assignments_remaining', label: 'Assignments Remaining', type: 'text' },
    { name: 'attendance', label: 'Attendance Rate', type: 'text' },
    { name: 'participation', label: 'Participation Score', type: 'text' },
    { name: 'projected_grade', label: 'Projected Final Grade', type: 'text' },
    { name: 'improvement_areas', label: 'Areas for Improvement', type: 'text', fullWidth: true }
  ];

  const contactInstructorFields = [
    { name: 'subject', label: 'Subject', type: 'select', required: true, options: [
      { value: 'grade_inquiry', label: 'Grade Inquiry' },
      { value: 'assignment_help', label: 'Assignment Help' },
      { value: 'office_hours', label: 'Office Hours Request' },
      { value: 'extra_credit', label: 'Extra Credit Opportunity' },
      { value: 'other', label: 'Other' }
    ]},
    { name: 'priority', label: 'Priority', type: 'select', required: true, options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' }
    ]},
    { name: 'message', label: 'Message', type: 'textarea', rows: 5, required: true, fullWidth: true },
    { name: 'request_meeting', label: 'Request in-person meeting', type: 'checkbox' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Grades</h1>
          <p className="text-neutral-600 mt-1">Track your academic performance and progress</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button 
            onClick={handleDownloadTranscript}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download Transcript
          </button>
          <button 
            onClick={handlePrintTranscript}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
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
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewGradeBreakdown(grade)}
                        className="text-brand-primary hover:text-brand-primary-dark text-sm transition-colors"
                        title="View Grade Breakdown"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleViewProgress(grade)}
                        className="text-accent-purple hover:text-accent-purple/80 text-sm transition-colors"
                        title="View Progress"
                      >
                        <ChartBarIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedCourse(grade);
                          setShowContactInstructorModal(true);
                        }}
                        className="text-accent-cyan hover:text-accent-cyan/80 text-sm transition-colors"
                        title="Contact Instructor"
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      </button>
                    </div>
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800">Performance Trend</h3>
          <button 
            onClick={handleRequestGradeReport}
            className="inline-flex items-center gap-2 px-3 py-2 bg-brand-primary/10 text-brand-primary rounded-lg hover:bg-brand-primary/20 transition-colors text-sm"
          >
            <DocumentTextIcon className="w-4 h-4" />
            Request Detailed Report
          </button>
        </div>
        <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-neutral-500">
            <ChartBarIcon className="w-16 h-16 mb-3" />
            <div>Performance Chart</div>
            <div className="text-sm">GPA trend over semesters would be displayed here</div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <ViewModal
        isOpen={showGradeBreakdownModal}
        onClose={() => setShowGradeBreakdownModal(false)}
        title="Grade Breakdown"
        subtitle={`Detailed grade information for ${selectedCourse?.course || 'course'}`}
        data={{
          ...selectedCourse,
          instructor: 'Dr. Smith',
          gpa_contribution: selectedCourse ? (selectedCourse.credits * 4.0).toFixed(2) : '0.00'
        }}
        fields={gradeBreakdownFields}
        actions={[
          {
            label: 'Dispute Grade',
            onClick: () => {
              setShowGradeBreakdownModal(false);
              setShowGradeDisputeModal(true);
            },
            variant: 'secondary'
          },
          {
            label: 'Contact Instructor',
            onClick: () => {
              setShowGradeBreakdownModal(false);
              setShowContactInstructorModal(true);
            },
            variant: 'primary'
          }
        ]}
      />

      <FormModal
        isOpen={showGradeDisputeModal}
        onClose={() => setShowGradeDisputeModal(false)}
        onSubmit={handleGradeDispute}
        title="Grade Dispute"
        subtitle={`Submit a grade dispute for ${selectedCourse?.course || 'course'}`}
        fields={disputeFields}
        submitText="Submit Dispute"
        mode="create"
      />

      <ViewModal
        isOpen={showProgressModal}
        onClose={() => setShowProgressModal(false)}
        title="Course Progress"
        subtitle={`Progress tracking for ${selectedCourse?.course || 'course'}`}
        data={{
          ...selectedCourse,
          assignments_completed: '8/12',
          assignments_remaining: '4',
          attendance: '95%',
          participation: '92%',
          projected_grade: 'B+',
          improvement_areas: 'Focus on final project and exam preparation'
        }}
        fields={progressFields}
        actions={[
          {
            label: 'Contact Instructor',
            onClick: () => {
              setShowProgressModal(false);
              setShowContactInstructorModal(true);
            },
            variant: 'primary'
          }
        ]}
      />

      <FormModal
        isOpen={showContactInstructorModal}
        onClose={() => setShowContactInstructorModal(false)}
        onSubmit={handleContactInstructor}
        title="Contact Instructor"
        subtitle={`Send a message to the instructor of ${selectedCourse?.course || 'course'}`}
        fields={contactInstructorFields}
        submitText="Send Message"
        mode="create"
      />
    </div>
  );
}

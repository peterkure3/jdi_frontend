import { useState } from 'react';
import {
  CalendarIcon,
  PlusIcon,
  BookOpenIcon,
  PlayIcon,
  StarIcon,
  ListBulletIcon,
  FolderIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export default function Courses() {
  const [filter, setFilter] = useState('all');

  const courses = [
    { 
      id: 1, 
      name: 'Computer Science 101', 
      code: 'CS101', 
      instructor: 'Dr. Smith', 
      progress: 78, 
      grade: 'B+', 
      credits: 4, 
      status: 'active',
      nextClass: 'Tomorrow 9:00 AM',
      assignments: 3,
      description: 'Introduction to programming concepts and problem-solving techniques.'
    },
    { 
      id: 2, 
      name: 'Mathematics for CS', 
      code: 'MATH201', 
      instructor: 'Prof. Johnson', 
      progress: 92, 
      grade: 'A', 
      credits: 3, 
      status: 'active',
      nextClass: 'Today 2:00 PM',
      assignments: 1,
      description: 'Mathematical foundations for computer science including discrete mathematics.'
    },
    { 
      id: 3, 
      name: 'Physics I', 
      code: 'PHYS101', 
      instructor: 'Dr. Brown', 
      progress: 65, 
      grade: 'B', 
      credits: 4, 
      status: 'active',
      nextClass: 'Wed 10:00 AM',
      assignments: 5,
      description: 'Classical mechanics, thermodynamics, and wave phenomena.'
    },
    { 
      id: 4, 
      name: 'English Literature', 
      code: 'ENG201', 
      instructor: 'Ms. Davis', 
      progress: 88, 
      grade: 'A-', 
      credits: 3, 
      status: 'active',
      nextClass: 'Thu 11:00 AM',
      assignments: 2,
      description: 'Survey of major works in English literature from various periods.'
    },
    { 
      id: 5, 
      name: 'Data Structures', 
      code: 'CS201', 
      instructor: 'Dr. Wilson', 
      progress: 100, 
      grade: 'A+', 
      credits: 4, 
      status: 'completed',
      nextClass: 'Completed',
      assignments: 0,
      description: 'Advanced programming concepts including arrays, linked lists, trees, and graphs.'
    },
    { 
      id: 6, 
      name: 'Statistics', 
      code: 'STAT101', 
      instructor: 'Prof. Miller', 
      progress: 45, 
      grade: 'C+', 
      credits: 3, 
      status: 'active',
      nextClass: 'Fri 1:00 PM',
      assignments: 4,
      description: 'Introduction to statistical methods and data analysis.'
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-status-success';
    if (grade.startsWith('B')) return 'text-accent-skyStrong';
    if (grade.startsWith('C')) return 'text-status-warning';
    return 'text-status-error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-status-success/10 text-status-success';
      case 'completed': return 'bg-status-info/10 text-status-info';
      case 'dropped': return 'bg-status-error/10 text-status-error';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">My Courses</h1>
          <p className="text-neutral-600 mt-1">Track your course progress and continue learning</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <CalendarIcon className="w-4 h-4" />
            View Schedule
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
            <PlusIcon className="w-4 h-4" />
            Enroll Course
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">6</div>
              <div className="text-sm text-neutral-500">Total Courses</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <PlayIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">5</div>
              <div className="text-sm text-neutral-500">Active Courses</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <StarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">3.85</div>
              <div className="text-sm text-neutral-500">Average GPA</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-warning to-accent-amber rounded-lg flex items-center justify-center">
              <ListBulletIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">15</div>
              <div className="text-sm text-neutral-500">Pending Tasks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-wrap gap-2">
          {['all', 'active', 'completed', 'dropped'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                filter === status
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-neutral-300 shadow-card p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-pink rounded-xl flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">{course.name}</h3>
                  <p className="text-sm text-neutral-500">{course.code} • {course.instructor}</p>
                </div>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(course.status)}`}>
                {course.status}
              </span>
            </div>

            <p className="text-sm text-neutral-600 mb-4">{course.description}</p>

            {course.status === 'active' && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">Progress</span>
                  <span className="text-sm font-medium text-neutral-800">{course.progress}%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div 
                    className="bg-brand-primary hover:bg-brand-primary-dark h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Grade</span>
                <span className={`font-semibold ${getGradeColor(course.grade)}`}>{course.grade}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Credits</span>
                <span className="font-medium text-neutral-800">{course.credits}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Next Class</span>
                <span className="font-medium text-neutral-800">{course.nextClass}</span>
              </div>
              {course.assignments > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Pending Assignments</span>
                  <span className="inline-block px-2 py-1 bg-status-warning/10 text-status-warning rounded-full text-xs font-medium">
                    {course.assignments}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                {course.status === 'active' ? (
                  <>
                    <button className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all">
                      Continue Learning
                    </button>
                    <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="View Materials">
                      <FolderIcon className="w-4 h-4" />
                    </button>
                  </>
                ) : course.status === 'completed' ? (
                  <>
                    <button className="flex-1 bg-status-success text-white rounded-lg py-2 text-sm font-medium">
                      Completed
                    </button>
                    <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="View Certificate">
                      <AcademicCapIcon className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button className="w-full bg-neutral-100 text-neutral-600 rounded-lg py-2 text-sm font-medium">
                    Course Dropped
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

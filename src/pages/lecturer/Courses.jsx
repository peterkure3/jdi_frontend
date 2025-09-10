import { useState } from 'react';
import MessageComposeModal from '../../components/shared/MessageComposeModal';
import {
  EnvelopeIcon,
  CalendarIcon,
  PlusIcon,
  AcademicCapIcon,
  PlayIcon,
  UsersIcon,
  ListBulletIcon,
  BookOpenIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  ChartPieIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function Courses() {
  const [filter, setFilter] = useState('active');
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);

  const courses = [
    {
      id: 1,
      name: 'Computer Science 101',
      code: 'CS101',
      semester: 'Fall 2024',
      students: 45,
      capacity: 50,
      schedule: 'Mon/Wed 9:00-10:30',
      room: 'Room 201',
      status: 'active',
      progress: 65,
      assignments: 3,
      nextClass: 'Tomorrow 9:00 AM',
      description: 'Introduction to programming concepts and problem-solving techniques using Python.'
    },
    {
      id: 2,
      name: 'Data Structures & Algorithms',
      code: 'CS201',
      semester: 'Fall 2024',
      students: 38,
      capacity: 40,
      schedule: 'Tue/Thu 11:00-12:30',
      room: 'Room 305',
      status: 'active',
      progress: 72,
      assignments: 2,
      nextClass: 'Today 11:00 AM',
      description: 'Advanced programming concepts including arrays, linked lists, trees, and sorting algorithms.'
    },
    {
      id: 3,
      name: 'Web Development',
      code: 'CS301',
      semester: 'Fall 2024',
      students: 32,
      capacity: 35,
      schedule: 'Wed/Fri 2:00-3:30',
      room: 'Lab 101',
      status: 'active',
      progress: 58,
      assignments: 4,
      nextClass: 'Wed 2:00 PM',
      description: 'Modern web development using HTML, CSS, JavaScript, and popular frameworks.'
    },
    {
      id: 4,
      name: 'Database Systems',
      code: 'CS202',
      semester: 'Spring 2024',
      students: 42,
      capacity: 45,
      schedule: 'Mon/Wed/Fri 10:00-11:00',
      room: 'Room 150',
      status: 'completed',
      progress: 100,
      assignments: 0,
      nextClass: 'Completed',
      description: 'Database design, SQL, and database management systems.'
    },
    {
      id: 5,
      name: 'Software Engineering',
      code: 'CS401',
      semester: 'Spring 2025',
      students: 0,
      capacity: 30,
      schedule: 'TBD',
      room: 'TBD',
      status: 'upcoming',
      progress: 0,
      assignments: 0,
      nextClass: 'Starts Jan 15',
      description: 'Software development lifecycle, project management, and team collaboration.'
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-status-success/10 text-status-success';
      case 'completed': return 'bg-status-info/10 text-status-info';
      case 'upcoming': return 'bg-status-warning/10 text-status-warning';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  const getCapacityColor = (students, capacity) => {
    const percentage = (students / capacity) * 100;
    if (percentage >= 90) return 'text-status-error';
    if (percentage >= 75) return 'text-status-warning';
    return 'text-status-success';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">My Courses</h1>
          <p className="text-neutral-600 mt-1">Manage your teaching assignments and course materials</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsComposeModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <EnvelopeIcon className="w-4 h-4" />
            Compose Message
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <CalendarIcon className="w-4 h-4" />
            View Schedule
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
            <PlusIcon className="w-4 h-4" />
            Create Course
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-lg flex items-center justify-center">
              <AcademicCapIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{courses.length}</div>
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
              <div className="text-2xl font-bold text-neutral-800">{courses.filter(c => c.status === 'active').length}</div>
              <div className="text-sm text-neutral-500">Active Courses</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{courses.reduce((sum, c) => sum + c.students, 0)}</div>
              <div className="text-sm text-neutral-500">Total Students</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <ListBulletIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{courses.reduce((sum, c) => sum + c.assignments, 0)}</div>
              <div className="text-sm text-neutral-500">Active Assignments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-wrap gap-2">
          {['all', 'active', 'completed', 'upcoming'].map(status => (
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-neutral-200 shadow-card p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-xl flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">{course.name}</h3>
                  <p className="text-sm text-neutral-500">{course.code} • {course.semester}</p>
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
                  <span className="text-sm text-neutral-600">Course Progress</span>
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

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <div className={`text-lg font-bold ${getCapacityColor(course.students, course.capacity)}`}>
                  {course.students}/{course.capacity}
                </div>
                <div className="text-xs text-neutral-500">Students</div>
              </div>
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <div className="text-lg font-bold text-neutral-800">{course.assignments}</div>
                <div className="text-xs text-neutral-500">Active Tasks</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Schedule</span>
                <span className="font-medium text-neutral-800">{course.schedule}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Room</span>
                <span className="font-medium text-neutral-800">{course.room}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Next Class</span>
                <span className="font-medium text-neutral-800">{course.nextClass}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                {course.status === 'active' ? (
                  <>
                    <button className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all">
                      Manage Course
                    </button>
                    <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="View Students">
                      <UsersIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Gradebook">
                      <ChartBarIcon className="w-4 h-4" />
                    </button>
                  </>
                ) : course.status === 'completed' ? (
                  <>
                    <button className="flex-1 bg-status-info text-white rounded-lg py-2 text-sm font-medium">
                      View Archive
                    </button>
                    <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Course Report">
                      <DocumentTextIcon className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 bg-status-warning text-white rounded-lg py-2 text-sm font-medium">
                      Prepare Course
                    </button>
                    <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Course Setup">
                      <CogIcon className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-pink rounded-xl flex items-center justify-center mx-auto mb-3">
            <PlusIcon className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Create Assignment</h4>
          <p className="text-sm text-neutral-600 mb-4">Add new assignments for your courses</p>
          <button className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all">
            New Assignment
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-status-success to-accent-lime rounded-xl flex items-center justify-center mx-auto mb-3">
            <ChartPieIcon className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Analytics</h4>
          <p className="text-sm text-neutral-600 mb-4">View course performance and statistics</p>
          <button className="w-full bg-status-success hover:bg-status-success/90 text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all">
            View Analytics
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-xl flex items-center justify-center mx-auto mb-3">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Communication</h4>
          <p className="text-sm text-neutral-600 mb-4">Send announcements to students</p>
          <button className="w-full bg-accent-cyan hover:bg-accent-cyan-dark text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all">
            Send Message
          </button>
        </div>
      </div>

      {/* Message Compose Modal */}
      <MessageComposeModal 
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
        userType="lecturer"
      />
    </div>
  );
}

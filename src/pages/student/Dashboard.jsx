import OverviewCard from '../../components/shared/OverviewCard.jsx';
import {
  AcademicCapIcon,
  BookOpenIcon,
  StarIcon,
  ClipboardDocumentListIcon,
  TrophyIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  BeakerIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-brand-primary rounded-xl p-6 ">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-white font-bold mb-2">Welcome Back, Student!</h1>
            <p className="text-white">Ready to continue your learning journey?</p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <AcademicCapIcon className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard
          title="Enrolled Courses"
          value="6"
          icon={BookOpenIcon}
          color="from-accent-purple to-accent-pink"
        />
        <OverviewCard
          title="Current GPA"
          value="3.85"
          icon={StarIcon}
          color="from-status-success to-accent-lime"
        />
        <OverviewCard
          title="Assignments Due"
          value="4"
          icon={ClipboardDocumentListIcon}
          color="from-status-warning to-accent-amber"
        />
        <OverviewCard
          title="Credits Earned"
          value="84/120"
          icon={TrophyIcon}
          color="from-accent-cyan to-accent-cyanDark"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Courses */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-800">Your Courses</h3>
            <button className="text-sm text-brand-primary hover:text-brand-primaryDark transition-colors">
              View All Courses
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: '3D Architectural Design', progress: 78, instructor: 'Prof. Rodriguez', nextClass: 'Tomorrow 9:00 AM' },
              { name: 'Interior Design', progress: 92, instructor: 'Dr. Chen', nextClass: 'Today 10:00 AM' },
              { name: 'Landscape Design', progress: 65, instructor: 'Prof. Green', nextClass: 'Wed 2:00 PM' },
              { name: 'Graphics Design', progress: 88, instructor: 'Dr. Thompson', nextClass: 'Thu 1:00 PM' },
            ].map((course, i) => (
              <div key={i} className="p-4 border border-neutral-100 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-neutral-800">{course.name}</h4>
                    <p className="text-sm text-neutral-500">{course.instructor}</p>
                  </div>
                  <span className="text-xs text-neutral-400">{course.progress}%</span>
                </div>
                <div className="mb-3">
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div 
                      className="bg-brand-primary h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">Next: {course.nextClass}</span>
                  <button className="text-xs text-brand-primary hover:text-brand-primaryDark transition-colors">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {[
                { title: 'Design Portfolio Review', date: 'Today', time: '2:00 PM', type: 'review' },
                { title: '3D Model Assignment Due', date: 'Tomorrow', time: '11:59 PM', type: 'assignment' },
                { title: 'Landscape Site Visit', date: 'Wednesday', time: '2:00 PM', type: 'fieldwork' },
                { title: 'Graphics Project Presentation', date: 'Friday', time: '1:00 PM', type: 'presentation' },
              ].map((event, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                    event.type === 'quiz' ? 'bg-status-warning/10 text-status-warning' :
                    event.type === 'assignment' ? 'bg-status-info/10 text-status-info' :
                    event.type === 'review' ? 'bg-accent-purple/10 text-accent-purple' :
                    event.type === 'fieldwork' ? 'bg-accent-cyan/10 text-accent-cyan' :
                    'bg-accent-pink/10 text-accent-pink'
                  }`}>
                    {event.type === 'quiz' ? <QuestionMarkCircleIcon className="w-4 h-4" /> :
                     event.type === 'assignment' ? <DocumentTextIcon className="w-4 h-4" /> :
                     <BeakerIcon className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-neutral-800">{event.title}</div>
                    <div className="text-xs text-neutral-500">{event.date} at {event.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-brand-primary rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <p className="text-white/80 text-sm mb-4">Access your student tools</p>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center">
                <BookOpenIcon className="w-4 h-4 mr-2" />
                E-Library
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center">
                <ChartBarIcon className="w-4 h-4 mr-2" />
                View Grades
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                My Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

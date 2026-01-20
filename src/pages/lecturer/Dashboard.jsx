import OverviewCard from '../../components/shared/OverviewCard.jsx';
import { useNavigate } from 'react-router-dom';
import {
  CalendarIcon,
  PlusIcon,
  ClockIcon,
  ArrowUpTrayIcon,
  StarIcon,
  EnvelopeIcon,
  CheckIcon,
  ChartBarIcon,
  SpeakerWaveIcon,
  AcademicCapIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function LecturerDashboard() {
  const navigate = useNavigate();

  const handleMarkAttendance = (classInfo) => {
    window.alert(`Attendance marking is not implemented in demo mode.\n\n${classInfo.course} • ${classInfo.time}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Lecturer Dashboard</h1>
          <p className="text-neutral-600 mt-1">Manage your courses and students</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/lecturer/schedule')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <CalendarIcon className="w-4 h-4" />
            View Schedule
          </button>
          <button
            onClick={() => navigate('/lecturer/assignments')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary  text-white rounded-xl hover:shadow-lg transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            New Assignment
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard
          title="Today's Classes"
          value="4"
          icon={AcademicCapIcon}
          color="from-accent-purple to-accent-pink"
        />
        <OverviewCard
          title="Active Students"
          value="127"
          icon={UsersIcon}
          color="from-accent-cyan to-accent-cyanDark"
        />
        <OverviewCard
          title="Pending Grades"
          value="23"
          icon={ClipboardDocumentCheckIcon}
          color="from-status-warning to-accent-amber"
        />
        <OverviewCard
          title="Course Progress"
          value="78%"
          icon={ArrowTrendingUpIcon}
          color="from-status-success to-accent-lime"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-800">Today's Schedule</h3>
            <button
              onClick={() => navigate('/lecturer/schedule')}
              className="text-sm text-brand-primary hover:text-brand-primaryDark transition-colors"
            >
              View Full Schedule
            </button>
          </div>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', course: 'Computer Science 101', room: 'Room A-204', students: 45, status: 'upcoming' },
              { time: '11:00 AM', course: 'Data Structures', room: 'Room B-301', students: 32, status: 'current' },
              { time: '02:00 PM', course: 'Algorithms', room: 'Room A-204', students: 28, status: 'upcoming' },
              { time: '04:00 PM', course: 'Database Systems', room: 'Room C-105', students: 35, status: 'upcoming' },
            ].map((class_, i) => (
              <div key={i} className={`p-4 border rounded-lg transition-colors ${
                class_.status === 'current' ? 'border-brand-primary bg-brand-primary/5' : 'border-neutral-100 hover:bg-neutral-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      class_.status === 'current' ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      <ClockIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-800">{class_.course}</div>
                      <div className="text-sm text-neutral-500">{class_.room} • {class_.students} students</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-neutral-700">{class_.time}</span>
                    {class_.status === 'current' && (
                      <button
                        onClick={() => handleMarkAttendance(class_)}
                        className="px-3 py-1 bg-brand-primary text-white text-xs rounded-full hover:bg-brand-primaryDark transition-colors"
                      >
                        Mark Attendance
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'Assignment submitted', student: 'Sarah Johnson', time: '2 min ago', type: 'submission' },
                { action: 'Grade updated', student: 'Michael Chen', time: '15 min ago', type: 'grade' },
                { action: 'Message received', student: 'Emma Davis', time: '1 hour ago', type: 'message' },
                { action: 'Attendance marked', student: 'Class CS101', time: '2 hours ago', type: 'attendance' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                    activity.type === 'submission' ? 'bg-status-info/10 text-status-info' :
                    activity.type === 'grade' ? 'bg-status-success/10 text-status-success' :
                    activity.type === 'message' ? 'bg-accent-purple/10 text-accent-purple' :
                    'bg-status-warning/10 text-status-warning'
                  }`}>
                    {activity.type === 'submission' ? <ArrowUpTrayIcon className="w-4 h-4" /> :
                     activity.type === 'grade' ? <StarIcon className="w-4 h-4" /> :
                     activity.type === 'message' ? <EnvelopeIcon className="w-4 h-4" /> :
                     <CheckIcon className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-neutral-800">{activity.action}</div>
                    <div className="text-xs text-neutral-500">{activity.student} • {activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-primary rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <p className="text-white/80 text-sm mb-4">Manage your classes efficiently</p>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/lecturer/assignments')}
                className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Create Assignment
              </button>
              <button
                onClick={() => navigate('/lecturer/grades')}
                className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center"
              >
                <ChartBarIcon className="w-4 h-4 mr-2" />
                View Gradebook
              </button>
              <button
                onClick={() => navigate('/lecturer/messages')}
                className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center"
              >
                <SpeakerWaveIcon className="w-4 h-4 mr-2" />
                Send Announcement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

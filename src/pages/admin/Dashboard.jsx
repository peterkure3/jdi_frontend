import OverviewCard from '../../components/shared/OverviewCard.jsx';
import {
  ArrowDownTrayIcon,
  PlusIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  HeartIcon,
  UserIcon,
  UserPlusIcon,
  SpeakerWaveIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Admin Dashboard</h1>
          <p className="text-neutral-600 mt-1">Welcome back, manage your institution</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export Data
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
            <PlusIcon className="w-4 h-4" />
            Quick Action
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard
          title="Total Applications"
          value="1,247"
          icon={DocumentTextIcon}
          color="from-accent-purple to-accent-pink"
        />
        <OverviewCard
          title="Active Students"
          value="3,892"
          icon={AcademicCapIcon}
          color="from-accent-cyan to-accent-cyanDark"
        />
        <OverviewCard
          title="Total Revenue"
          value="$284,590"
          icon={CurrencyDollarIcon}
          color="from-accent-lime to-accent-limeDark"
        />
        <OverviewCard
          title="System Health"
          value="98.5%"
          icon={HeartIcon}
          color="from-status-success to-accent-lime"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-300 shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-800">Recent Applications</h3>
            <button className="text-sm text-brand-primary hover:text-brand-primaryDark transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Sarah Johnson', course: 'Computer Science', status: 'pending', time: '2 hours ago' },
              { name: 'Michael Chen', course: 'Engineering', status: 'approved', time: '4 hours ago' },
              { name: 'Emma Davis', course: 'Business Admin', status: 'review', time: '6 hours ago' },
              { name: 'James Wilson', course: 'Mathematics', status: 'pending', time: '8 hours ago' },
            ].map((app, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-neutral-600" />
                  </div>
                  <div>
                    <div className="font-medium text-neutral-800">{app.name}</div>
                    <div className="text-sm text-neutral-500">{app.course}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    app.status === 'approved' ? 'bg-status-success/10 text-status-success' :
                    app.status === 'pending' ? 'bg-status-warning/10 text-status-warning' :
                    'bg-status-info/10 text-status-info'
                  }`}>
                    {app.status}
                  </span>
                  <span className="text-xs text-neutral-400">{app.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">System Status</h3>
            <div className="space-y-4">
              {[
                { label: 'Server Uptime', value: '99.9%', color: 'text-status-success' },
                { label: 'Database Health', value: '98.5%', color: 'text-status-success' },
                { label: 'Active Sessions', value: '1,247', color: 'text-accent-skyStrong' },
                { label: 'Pending Tasks', value: '23', color: 'text-status-warning' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">{stat.label}</span>
                  <span className={`text-sm font-medium ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-primary rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <p className="text-white/80 text-sm mb-4">Manage your institution efficiently</p>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center">
                <UserPlusIcon className="w-4 h-4 mr-2" />
                Add New Student
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center">
                <SpeakerWaveIcon className="w-4 h-4 mr-2" />
                Send Announcement
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center">
                <ArrowTrendingUpIcon className="w-4 h-4 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

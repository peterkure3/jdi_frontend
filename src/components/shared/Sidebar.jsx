import { Link, NavLink, useNavigate } from 'react-router-dom';
import { storage } from '../../lib/storage.js';
import {
  HomeIcon,
  UserIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CalendarIcon,
  EnvelopeIcon,
  CogIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  ArrowRightOnRectangleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ChartPieIcon,
  SpeakerWaveIcon,
  AdjustmentsHorizontalIcon,
  IdentificationIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  CloudArrowUpIcon,
  ListBulletIcon,
  TableCellsIcon,
  ArrowRightCircleIcon,
  ArrowRightEndOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const NAVS = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: HomeIcon },
    { to: '/admin/applications', label: 'Applications', icon: DocumentTextIcon },
    { to: '/admin/students', label: 'Students', icon: AcademicCapIcon },
    { to: '/admin/lecturers', label: 'Lecturers', icon: UserGroupIcon },
    { to: '/admin/courses', label: 'Courses', icon: BookOpenIcon },
    { to: '/admin/finance', label: 'Finance', icon: CurrencyDollarIcon },
    { to: '/admin/reports', label: 'Reports', icon: ChartPieIcon },
    { to: '/admin/communications', label: 'Comms', icon: SpeakerWaveIcon },
    { to: '/admin/settings', label: 'Settings', icon: CogIcon },
  ],
  lecturer: [
    { to: '/lecturer', label: 'Dashboard', icon: HomeIcon },
    { to: '/lecturer/profile', label: 'Profile', icon: IdentificationIcon },
    { to: '/lecturer/courses', label: 'Courses', icon: BookOpenIcon },
    { to: '/lecturer/schedule', label: 'Schedule', icon: CalendarIcon },
    { to: '/lecturer/students', label: 'Students', icon: UsersIcon },
    { to: '/lecturer/student-results', label: 'Student Results', icon: ClipboardDocumentCheckIcon },
    { to: '/lecturer/materials', label: 'Materials', icon: CloudArrowUpIcon },
    { to: '/lecturer/e-library', label: 'E-Library', icon: BookOpenIcon },
    { to: '/lecturer/assignments', label: 'Assignments', icon: ListBulletIcon },
    { to: '/lecturer/gradebook', label: 'Gradebook', icon: TableCellsIcon },
    { to: '/lecturer/messages', label: 'Messages', icon: EnvelopeIcon },
    { to: '/lecturer/settings', label: 'Settings', icon: CogIcon },
  ],
  student: [
    { to: '/student', label: 'Dashboard', icon: HomeIcon },
    { to: '/student/profile', label: 'Profile', icon: UserIcon },
    { to: '/student/courses', label: 'Courses', icon: BookOpenIcon },
    { to: '/student/resources', label: 'Resources', icon: ArchiveBoxIcon },
    { to: '/student/e-library', label: 'E-Library', icon: BookOpenIcon },
    { to: '/student/grades', label: 'Grades', icon: ChartBarIcon },
    { to: '/student/schedule', label: 'Schedule', icon: CalendarIcon },
    { to: '/student/messages', label: 'Messages', icon: EnvelopeIcon },
    { to: '/student/financial', label: 'Financial', icon: CurrencyDollarIcon },
    { to: '/student/settings', label: 'Settings', icon: CogIcon },
  ],
};

export default function Sidebar({ role = 'student', collapsed = false, onToggleCollapsed, onItemClick }) {
  const navigate = useNavigate();
  function handleLogout() {
    storage.clear();
    navigate('/');
  }
  const menu = NAVS[role] || [];
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-red-600 to-red-800" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' }}>
      <div className={`border-b border-white/20 ${collapsed ? 'p-4' : 'p-6'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-3`}>
          <Link to="/" className={`flex items-center group ${collapsed ? 'gap-0 justify-center' : 'gap-3'}`}>
          <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <AcademicCapIcon className="w-8 h-8 text-white" />
            {/* <img src="/favicon.ico" alt="" className='w-16 h-16' /> */}
          </div>
          {!collapsed && (
            <div>
              <div className="font-bold text-xl tracking-wide text-white">JDI</div>
              <div className="text-white/70 text-xs uppercase tracking-wider">{role} portal</div>
            </div>
          )}
          </Link>

          {typeof onToggleCollapsed === 'function' && (
            <button
              type="button"
              onClick={onToggleCollapsed}
              className={`rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-colors ${collapsed ? 'hidden' : 'p-2'}`}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!collapsed}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {typeof onToggleCollapsed === 'function' && collapsed && (
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={onToggleCollapsed}
              className="p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Expand sidebar"
              aria-expanded={!collapsed}
              title="Expand sidebar"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <nav className={`flex-1 overflow-y-auto space-y-1 ${collapsed ? 'p-3' : 'p-4'}`}>
        {menu.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.label === 'Dashboard'}
            title={collapsed ? item.label : undefined}
            onClick={() => {
              if (typeof onItemClick === 'function') onItemClick();
            }}
            className={({ isActive }) => 
              `group flex items-center ${collapsed ? 'justify-center px-3' : 'gap-3 px-4'} py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 ${
                isActive ? 'bg-white/15 text-white shadow-lg' : ''
              }`
            }
          >
            <div className="flex items-center justify-center w-5 h-5">
              <item.icon className="w-5 h-5" />
            </div>
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className={`border-t border-white/20 ${collapsed ? 'p-3' : 'p-4'}`}>
        <button 
          onClick={handleLogout} 
          title={collapsed ? 'Logout' : undefined}
          className={`w-full flex items-center ${collapsed ? 'justify-center px-3' : 'gap-3 px-4'} py-3 rounded-xl text-white/90 hover:text-white hover:bg-red-500/20 transition-all duration-200 group`}
        >
          <div className="flex items-center justify-center w-5 h-5">
            <ArrowRightEndOnRectangleIcon className="w-5 h-5 group-hover:text-red-300" />
          </div>
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}

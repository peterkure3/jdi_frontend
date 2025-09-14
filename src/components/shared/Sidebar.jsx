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
  ArrowRightEndOnRectangleIcon
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

export default function Sidebar({ role = 'student' }) {
  const navigate = useNavigate();
  function handleLogout() {
    storage.clear();
    navigate('/');
  }
  const menu = NAVS[role] || [];
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-red-600 to-red-800" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' }}>
      <div className="p-6 border-b border-white/20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <AcademicCapIcon className="w-8 h-8 text-white" />
            {/* <img src="/favicon.ico" alt="" className='w-16 h-16' /> */}
          </div>
          <div>
            <div className="font-bold text-xl tracking-wide text-white">JDI</div>
            <div className="text-white/70 text-xs uppercase tracking-wider">{role} portal</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menu.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.label === 'Dashboard'}
            className={({ isActive }) => 
              `group flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 ${
                isActive ? 'bg-white/15 text-white shadow-lg' : ''
              }`
            }
          >
            <div className="flex items-center justify-center w-5 h-5">
              <item.icon className="w-5 h-5" />
            </div>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/20">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-red-500/20 transition-all duration-200 group"
        >
          <div className="flex items-center justify-center w-5 h-5">
            <ArrowRightEndOnRectangleIcon className="w-5 h-5 group-hover:text-red-300" />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

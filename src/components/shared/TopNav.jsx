import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, KEYS } from '../../lib/storage.js';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function TopNav({ isMobileSidebarOpen = false, onToggleMobileSidebar }) {
  const navigate = useNavigate();
  const email = storage.get(KEYS.email, 'user@example.com');
  const role = storage.get(KEYS.role, 'user');

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  const notifications = [
    { id: 1, title: 'System update scheduled', detail: 'Maintenance tonight at 2:00 AM', time: '1h ago' },
    { id: 2, title: 'New message received', detail: 'You have a new message in Inbox', time: '3h ago' },
    { id: 3, title: 'Report generated', detail: 'Monthly report is ready to download', time: 'Yesterday' }
  ];

  const getProfilePath = () => {
    if (role === 'admin') return '/admin/settings';
    if (role === 'lecturer') return '/lecturer/profile';
    if (role === 'student') return '/student/profile';
    return '/';
  };

  const handleLogout = () => {
    storage.remove(KEYS.isAuthenticated);
    storage.remove(KEYS.role);
    storage.remove(KEYS.email);
    storage.remove(KEYS.userId);
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const onPointerDown = (e) => {
      const target = e.target;
      if (showNotifications && notificationsRef.current && !notificationsRef.current.contains(target)) {
        setShowNotifications(false);
      }
      if (showUserMenu && userMenuRef.current && !userMenuRef.current.contains(target)) {
        setShowUserMenu(false);
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [showNotifications, showUserMenu]);
  
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        {typeof onToggleMobileSidebar === 'function' && (
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 transition-colors"
            aria-label={isMobileSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            aria-expanded={isMobileSidebarOpen}
          >
            {isMobileSidebarOpen ? (
              <XMarkIcon className="w-5 h-5 text-neutral-700" />
            ) : (
              <Bars3Icon className="w-5 h-5 text-neutral-700" />
            )}
          </button>
        )}
        <h1 className="text-xl font-semibold text-neutral-800">JDI Portal</h1>
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-sm text-neutral-500">Welcome back,</span>
          <span className="text-sm font-medium text-neutral-700 capitalize">{role}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2 focus-within:border-accent-skyStrong focus-within:bg-white transition-all">
          <MagnifyingGlassIcon className="w-4 h-4 text-neutral-400 mr-3" />
          <input 
            className="bg-transparent outline-none text-sm placeholder-neutral-400 w-64" 
            placeholder="Search..." 
          />
        </div>
        
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setShowNotifications(v => !v);
              setShowUserMenu(false);
            }}
            className="relative p-2 rounded-xl hover:bg-neutral-100 transition-colors group"
            aria-label="Notifications"
          >
            <BellIcon className="w-5 h-5 text-neutral-600 group-hover:text-neutral-800" />
            <span className="absolute -top-1 -right-1 bg-status-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">{notifications.length}</span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-neutral-100">
                <div className="text-sm font-semibold text-neutral-800">Notifications</div>
                <div className="text-xs text-neutral-500">Demo notifications feed</div>
              </div>
              <div className="max-h-80 overflow-auto">
                {notifications.map(n => (
                  <button
                    key={n.id}
                    onClick={() => {
                      setShowNotifications(false);
                      navigate(getProfilePath());
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-neutral-800 truncate">{n.title}</div>
                        <div className="text-xs text-neutral-500 mt-0.5 line-clamp-2">{n.detail}</div>
                      </div>
                      <div className="text-xs text-neutral-400 shrink-0">{n.time}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-neutral-100 bg-neutral-50">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    window.alert('Notifications center is not implemented in demo mode.');
                  }}
                  className="text-sm text-brand-primary hover:text-brand-primaryDark transition-colors"
                >
                  View all
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-neutral-200" ref={userMenuRef}>
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium text-neutral-700">{email}</div>
            <div className="text-xs text-neutral-500 capitalize">{role} Account</div>
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(v => !v);
                setShowNotifications(false);
              }}
              className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyanDark flex items-center justify-center text-white shadow-sm hover:shadow-md transition-all"
              aria-label="User menu"
            >
              <UserIcon className="w-4 h-4" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-neutral-100">
                  <div className="text-sm font-semibold text-neutral-800 truncate">{email}</div>
                  <div className="text-xs text-neutral-500 capitalize">{role} account</div>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate(getProfilePath());
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors text-sm text-neutral-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      window.alert('Preferences are not implemented in demo mode.');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors text-sm text-neutral-700"
                  >
                    Preferences
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors text-sm text-status-error"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

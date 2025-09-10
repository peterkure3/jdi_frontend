import { storage, KEYS } from '../../lib/storage.js';
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function TopNav() {
  const email = storage.get(KEYS.email, 'user@example.com');
  const role = storage.get(KEYS.role, 'user');
  
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
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
        <button className="relative p-2 rounded-xl hover:bg-neutral-100 transition-colors group">
          <BellIcon className="w-5 h-5 text-neutral-600 group-hover:text-neutral-800" />
          <span className="absolute -top-1 -right-1 bg-status-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">3</span>
        </button>
        
        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-neutral-200">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium text-neutral-700">{email}</div>
            <div className="text-xs text-neutral-500 capitalize">{role} Account</div>
          </div>
          <div className="relative">
            <button className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyanDark flex items-center justify-center text-white shadow-sm hover:shadow-md transition-all">
              <UserIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

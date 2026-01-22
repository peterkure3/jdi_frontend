import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar.jsx';
import TopNav from '../components/shared/TopNav.jsx';
import { storage, KEYS } from '../lib/storage.js';

export default function PortalLayout({ role }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => storage.get(KEYS.sidebarCollapsed, false));
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const sidebarWidthClass = sidebarCollapsed ? 'w-20' : 'w-72';
  const contentMarginClass = sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72';

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed(prev => {
      const next = !prev;
      storage.set(KEYS.sidebarCollapsed, next);
      return next;
    });
  };

  useEffect(() => {
    if (!isMobileSidebarOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileSidebarOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileSidebarOpen]);

  return (
    <div className="min-h-screen flex bg-surface-primary">
      <aside className={`hidden lg:block fixed left-0 top-0 h-full ${sidebarWidthClass} text-white bg-gradient-to-br from-brand-primary to-brand-primaryDark shadow-xl z-40 transition-[width] duration-200`}>
        <Sidebar role={role} collapsed={sidebarCollapsed} onToggleCollapsed={toggleSidebarCollapsed} />
      </aside>

      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="Close sidebar"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 text-white bg-gradient-to-br from-brand-primary to-brand-primaryDark shadow-xl">
            <Sidebar
              role={role}
              collapsed={false}
              onToggleCollapsed={toggleSidebarCollapsed}
              onItemClick={() => setIsMobileSidebarOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className={`flex-1 ${contentMarginClass} flex flex-col min-h-screen transition-[margin] duration-200`}>
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-neutral-100">
          <TopNav
            isMobileSidebarOpen={isMobileSidebarOpen}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(v => !v)}
          />
        </header>
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
        <footer className="px-6 py-4 bg-white border-t border-neutral-100">
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <div>© 2025 JDI Portal. All rights reserved.</div>
            <Link className="text-accent-skyStrong hover:text-accent-skyStrong/80 transition-colors" to="/">
              Back to landing
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

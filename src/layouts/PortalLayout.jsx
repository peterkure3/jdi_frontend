import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar.jsx';
import TopNav from '../components/shared/TopNav.jsx';

export default function PortalLayout({ role }) {
  return (
    <div className="min-h-screen flex bg-surface-primary">
      <aside className="fixed left-0 top-0 h-full w-72 text-white bg-gradient-to-br from-brand-primary to-brand-primaryDark shadow-xl z-40">
        <Sidebar role={role} />
      </aside>
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-neutral-100">
          <TopNav />
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

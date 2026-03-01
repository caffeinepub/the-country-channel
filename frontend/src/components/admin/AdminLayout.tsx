import { Outlet, Link, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, Radio, Mic2, ChevronLeft, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/admin/shows', label: 'Manage Shows', icon: Radio, exact: false },
    { href: '/admin/djs', label: 'Manage DJs', icon: Mic2, exact: false },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) return currentPath === href;
    return currentPath === href;
  };

  return (
    <div className="min-h-screen bg-admin-bg flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-admin-sidebar border-r border-amber/10 flex-shrink-0">
        <SidebarContent navItems={navItems} isActive={isActive} />
      </aside>

      {/* Sidebar - Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-64 bg-admin-sidebar border-r border-amber/10 z-10">
            <button
              className="absolute top-4 right-4 text-tan/60 hover:text-amber"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent navItems={navItems} isActive={isActive} onNavClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-admin-sidebar border-b border-amber/10 px-4 sm:px-6 h-14 flex items-center gap-4">
          <button
            className="lg:hidden text-tan/60 hover:text-amber transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-tan/40 uppercase tracking-widest">Admin</span>
            <span className="text-tan/20">/</span>
            <span className="font-body text-sm text-tan/70">
              {navItems.find((n) => isActive(n.href, n.exact))?.label ?? 'Dashboard'}
            </span>
          </div>
          <div className="ml-auto">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-tan/50 hover:text-amber font-body text-xs transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Back to Site
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact: boolean;
}

function SidebarContent({
  navItems,
  isActive,
  onNavClick,
}: {
  navItems: NavItem[];
  isActive: (href: string, exact: boolean) => boolean;
  onNavClick?: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-amber/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center flex-shrink-0">
            <Radio className="w-4 h-4 text-wood-dark" />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-amber leading-tight">The Country Channel</p>
            <p className="font-body text-xs text-tan/40">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-amber text-wood-dark shadow-md shadow-amber/20'
                  : 'text-tan/70 hover:text-amber hover:bg-amber/10'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-amber/10">
        <p className="font-body text-xs text-tan/30 text-center">
          © {new Date().getFullYear()} The Country Channel
        </p>
      </div>
    </>
  );
}

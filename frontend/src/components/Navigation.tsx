import { Link, useRouterState } from '@tanstack/react-router';
import { Radio, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCurrentShow } from '../hooks/useQueries';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { data: currentShow } = useCurrentShow();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shows', label: 'Shows' },
    { href: '/djs', label: 'DJs' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <header className="bg-wood-dark border-b border-amber/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-amber flex items-center justify-center shadow-md group-hover:bg-amber-light transition-colors">
              <Radio className="w-5 h-5 text-wood-dark" />
            </div>
            <span className="font-display text-xl font-bold text-amber tracking-wide hidden sm:block">
              The Country Channel
            </span>
            <span className="font-display text-lg font-bold text-amber tracking-wide sm:hidden">
              TCC
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded font-body text-sm font-medium tracking-wide transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-amber text-wood-dark'
                    : 'text-tan hover:text-amber hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* On Air indicator — desktop */}
            {currentShow && (
              <div className="ml-3 flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-full px-3 py-1.5">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="font-display font-black text-xs tracking-widest uppercase text-red-400">
                  On Air
                </span>
                <span className="font-body text-xs text-tan/70 max-w-[140px] truncate hidden lg:block">
                  {currentShow.title}
                </span>
              </div>
            )}

            <Link
              to="/admin"
              className="ml-4 px-4 py-2 rounded border border-amber/40 text-amber/70 hover:text-amber hover:border-amber font-body text-sm font-medium tracking-wide transition-all duration-200"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile: On Air pill + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {currentShow && (
              <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/25 rounded-full px-2.5 py-1">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="font-display font-black text-xs tracking-widest uppercase text-red-400">
                  On Air
                </span>
              </div>
            )}
            <button
              className="p-2 text-tan hover:text-amber transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-wood-dark border-t border-amber/20 px-4 py-3 space-y-1">
          {/* On Air show name in mobile menu */}
          {currentShow && (
            <div className="flex items-center gap-2 px-4 py-2 mb-1 bg-red-500/5 border border-red-500/15 rounded">
              <Radio className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span className="font-body text-xs text-tan/60">Now playing:</span>
              <span className="font-body text-xs text-amber font-medium truncate">{currentShow.title}</span>
            </div>
          )}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 rounded font-body text-sm font-medium tracking-wide transition-all ${
                isActive(link.href)
                  ? 'bg-amber text-wood-dark'
                  : 'text-tan hover:text-amber hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-2 rounded border border-amber/40 text-amber/70 hover:text-amber font-body text-sm font-medium tracking-wide transition-all"
          >
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}

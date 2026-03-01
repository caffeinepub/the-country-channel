import { Radio, Heart } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'the-country-channel');

  return (
    <footer className="bg-wood-dark border-t border-amber/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center">
                <Radio className="w-4 h-4 text-wood-dark" />
              </div>
              <span className="font-display text-lg font-bold text-amber">The Country Channel</span>
            </div>
            <p className="font-body text-sm text-tan/70 leading-relaxed">
              Your home for authentic country music, heartfelt stories, and the voices of the heartland.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-bold text-amber uppercase tracking-widest">Quick Links</h3>
            <nav className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/shows', label: 'Shows' },
                { href: '/djs', label: 'DJs' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block font-body text-sm text-tan/70 hover:text-amber transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Tune In */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-bold text-amber uppercase tracking-widest">Tune In</h3>
            <p className="font-body text-sm text-tan/70">
              Broadcasting live 24/7 — pure country, all day, every day.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-body text-sm text-green-400 font-medium">Live Now</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-amber/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-tan/50">
            © {year} The Country Channel. All rights reserved.
          </p>
          <p className="font-body text-xs text-tan/50 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-amber fill-amber" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:text-amber-light transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

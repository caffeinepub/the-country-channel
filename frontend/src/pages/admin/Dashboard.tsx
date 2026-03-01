import { Radio, Mic2, TrendingUp } from 'lucide-react';
import { useGetAllShows, useGetAllDJs } from '../../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@tanstack/react-router';

export default function Dashboard() {
  const { data: shows = [], isLoading: showsLoading } = useGetAllShows();
  const { data: djs = [], isLoading: djsLoading } = useGetAllDJs();

  const stats = [
    {
      label: 'Total Shows',
      value: shows.length,
      icon: Radio,
      href: '/admin/shows',
      loading: showsLoading,
      description: 'Active radio programs',
    },
    {
      label: 'Total DJs',
      value: djs.length,
      icon: Mic2,
      href: '/admin/djs',
      loading: djsLoading,
      description: 'On-air personalities',
    },
    {
      label: 'Assigned Shows',
      value: shows.filter((s) => s.djId !== undefined).length,
      icon: TrendingUp,
      href: '/admin/shows',
      loading: showsLoading,
      description: 'Shows with a DJ assigned',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-black text-amber">Dashboard</h1>
        <p className="font-body text-tan/60 mt-1">Welcome to The Country Channel admin panel.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              to={stat.href}
              className="bg-admin-card border border-amber/20 rounded-xl p-6 hover:border-amber/50 transition-all duration-200 hover:shadow-lg hover:shadow-amber/10 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber/15 flex items-center justify-center group-hover:bg-amber/25 transition-colors">
                  <Icon className="w-5 h-5 text-amber" />
                </div>
              </div>
              {stat.loading ? (
                <Skeleton className="h-9 w-16 bg-amber/10 mb-1" />
              ) : (
                <p className="font-display text-4xl font-black text-amber mb-1">{stat.value}</p>
              )}
              <p className="font-display text-sm font-bold text-tan/80">{stat.label}</p>
              <p className="font-body text-xs text-tan/40 mt-0.5">{stat.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Shows */}
      <div className="bg-admin-card border border-amber/20 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-amber/10 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-amber">Recent Shows</h2>
          <Link to="/admin/shows" className="font-body text-xs text-amber/60 hover:text-amber transition-colors">
            Manage →
          </Link>
        </div>
        <div className="divide-y divide-amber/10">
          {showsLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-8 bg-amber/5" />)}
            </div>
          ) : shows.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-body text-tan/40 text-sm">No shows created yet.</p>
            </div>
          ) : (
            shows.slice(0, 5).map((show) => {
              const dj = show.djId !== undefined ? djs.find((d) => d.id === show.djId) : null;
              return (
                <div key={show.id.toString()} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="font-body text-sm font-medium text-tan/90">{show.title}</p>
                    <p className="font-body text-xs text-tan/40">{show.scheduleDay} · {show.scheduleTime}</p>
                  </div>
                  {dj && (
                    <span className="font-body text-xs text-amber/70 bg-amber/10 px-2 py-0.5 rounded">
                      {dj.name}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Recent DJs */}
      <div className="bg-admin-card border border-amber/20 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-amber/10 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-amber">Recent DJs</h2>
          <Link to="/admin/djs" className="font-body text-xs text-amber/60 hover:text-amber transition-colors">
            Manage →
          </Link>
        </div>
        <div className="divide-y divide-amber/10">
          {djsLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-8 bg-amber/5" />)}
            </div>
          ) : djs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-body text-tan/40 text-sm">No DJs added yet.</p>
            </div>
          ) : (
            djs.slice(0, 5).map((dj) => (
              <div key={dj.id.toString()} className="px-6 py-3 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xs font-bold text-amber">
                    {dj.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-tan/90">{dj.name}</p>
                  <p className="font-body text-xs text-tan/40 line-clamp-1">{dj.bio || 'No bio'}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

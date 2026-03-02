import { Link } from '@tanstack/react-router';
import { Play, Radio, ChevronRight } from 'lucide-react';
import { useGetAllShows, useGetAllDJs } from '../hooks/useQueries';
import ShowCard from '../components/ShowCard';
import DJCard from '../components/DJCard';
import OnAirNow from '../components/OnAirNow';
import WaysToListen from '../components/WaysToListen';
import RecentlyPlayed from '../components/RecentlyPlayed';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { data: shows = [], isLoading: showsLoading } = useGetAllShows();
  const { data: djs = [], isLoading: djsLoading } = useGetAllDJs();

  const featuredShows = shows.slice(0, 3);
  const featuredDJs = djs.slice(0, 4);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/hero-banner.dim_1440x600.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-wood-dark/95 via-wood-dark/80 to-wood-dark/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-body text-sm text-green-400 font-medium uppercase tracking-widest">Live Now</span>
            </div>
            
            <img
              src="/assets/generated/country-channel-logo.dim_400x200.png"
              alt="The Country Channel"
              className="h-20 w-auto mb-6 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            
            <h1 className="font-display text-5xl sm:text-6xl font-black text-amber leading-tight mb-4 tracking-tight">
              The Country<br />Channel
            </h1>
            <p className="font-body text-lg text-tan/80 mb-8 leading-relaxed max-w-lg">
              Your home for authentic country music, heartfelt stories, and the voices of the heartland — broadcasting live 24/7.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                className="flex items-center gap-3 bg-amber hover:bg-amber-light text-wood-dark font-display font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-amber/30 hover:shadow-amber/50 hover:scale-105 active:scale-95"
                onClick={() => {/* non-functional placeholder */}}
              >
                <div className="w-8 h-8 rounded-full bg-wood-dark/20 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-wood-dark text-wood-dark ml-0.5" />
                </div>
                Listen Live
              </button>
              
              <Link
                to="/shows"
                className="flex items-center gap-2 text-amber hover:text-amber-light font-body font-medium transition-colors group"
              >
                View Schedule
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/generated/divider-texture.dim_1440x40.png')" }}
      />

      {/* On Air Now */}
      <OnAirNow />

      {/* Featured Shows */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Radio className="w-4 h-4 text-burnt-orange" />
                <span className="font-body text-xs text-burnt-orange uppercase tracking-widest font-medium">On Air</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-amber">Featured Shows</h2>
            </div>
            <Link
              to="/shows"
              className="hidden sm:flex items-center gap-1.5 text-amber/70 hover:text-amber font-body text-sm font-medium transition-colors group"
            >
              All Shows
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {showsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-lg bg-card" />
              ))}
            </div>
          ) : featuredShows.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-amber/20 rounded-lg">
              <Radio className="w-10 h-10 text-amber/30 mx-auto mb-3" />
              <p className="font-body text-tan/50">No shows yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredShows.map((show) => (
                <ShowCard key={show.id.toString()} show={show} djs={djs} />
              ))}
            </div>
          )}

          <div className="mt-6 sm:hidden text-center">
            <Link
              to="/shows"
              className="inline-flex items-center gap-1.5 text-amber font-body text-sm font-medium"
            >
              View All Shows <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-10 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/assets/generated/divider-texture.dim_1440x40.png')" }}
      />

      {/* DJ Roster */}
      <section className="py-16 bg-wood-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-body text-xs text-burnt-orange uppercase tracking-widest font-medium">Meet The Team</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-amber">Our DJs</h2>
            </div>
            <Link
              to="/djs"
              className="hidden sm:flex items-center gap-1.5 text-amber/70 hover:text-amber font-body text-sm font-medium transition-colors group"
            >
              All DJs
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {djsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-56 rounded-lg bg-card" />
              ))}
            </div>
          ) : featuredDJs.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-amber/20 rounded-lg">
              <p className="font-body text-tan/50">No DJs yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredDJs.map((dj) => (
                <DJCard key={dj.id.toString()} dj={dj} shows={shows} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-10 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/assets/generated/divider-texture.dim_1440x40.png')" }}
      />

      {/* Ways to Listen */}
      <WaysToListen />

      {/* Divider */}
      <div
        className="h-10 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/assets/generated/divider-texture.dim_1440x40.png')" }}
      />

      {/* Recently Played */}
      <RecentlyPlayed />
    </div>
  );
}

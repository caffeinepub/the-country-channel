import { Mic2 } from 'lucide-react';
import { useGetAllShows, useGetAllDJs } from '../hooks/useQueries';
import DJCard from '../components/DJCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function DJs() {
  const { data: shows = [], isLoading: showsLoading } = useGetAllShows();
  const { data: djs = [], isLoading: djsLoading } = useGetAllDJs();

  const isLoading = showsLoading || djsLoading;

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <div className="bg-wood-dark border-b border-amber/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Mic2 className="w-4 h-4 text-burnt-orange" />
            <span className="font-body text-xs text-burnt-orange uppercase tracking-widest font-medium">The Voices</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-amber">Our DJs</h1>
          <p className="font-body text-tan/70 mt-3 max-w-xl">
            Meet the talented voices behind The Country Channel — passionate about country music and connecting with listeners.
          </p>
        </div>
      </div>

      {/* DJs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64 rounded-lg bg-card" />
            ))}
          </div>
        ) : djs.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-amber/20 rounded-lg">
            <Mic2 className="w-12 h-12 text-amber/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-amber/50 mb-2">No DJs Yet</h3>
            <p className="font-body text-tan/40">Our team is coming soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {djs.map((dj) => (
              <DJCard key={dj.id.toString()} dj={dj} shows={shows} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { Radio } from 'lucide-react';
import { useGetAllShows, useGetAllDJs } from '../hooks/useQueries';
import ShowCard from '../components/ShowCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Shows() {
  const { data: shows = [], isLoading: showsLoading } = useGetAllShows();
  const { data: djs = [], isLoading: djsLoading } = useGetAllDJs();

  const isLoading = showsLoading || djsLoading;

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <div className="bg-wood-dark border-b border-amber/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-4 h-4 text-burnt-orange" />
            <span className="font-body text-xs text-burnt-orange uppercase tracking-widest font-medium">Programming</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-amber">Our Shows</h1>
          <p className="font-body text-tan/70 mt-3 max-w-xl">
            From morning wake-up calls to late-night classics — there's always something great on The Country Channel.
          </p>
          <p className="font-body text-xs text-tan/40 mt-2">
            All show times are in Central Standard Time (CST).
          </p>
        </div>
      </div>

      {/* Shows Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 rounded-lg bg-card" />
            ))}
          </div>
        ) : shows.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-amber/20 rounded-lg">
            <Radio className="w-12 h-12 text-amber/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-amber/50 mb-2">No Shows Yet</h3>
            <p className="font-body text-tan/40">Check back soon for our programming schedule.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show) => (
              <ShowCard key={show.id.toString()} show={show} djs={djs} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

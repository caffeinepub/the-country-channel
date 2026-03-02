import { Radio, Clock, Mic2 } from 'lucide-react';
import { useCurrentShow } from '../hooks/useQueries';
import { useGetAllDJs } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function OnAirNow() {
  const { data: currentShow, isLoading, isError } = useCurrentShow();
  const { data: djs = [] } = useGetAllDJs();

  const dj = currentShow?.djId !== undefined
    ? djs.find((d) => d.id === currentShow.djId)
    : undefined;

  if (isLoading) {
    return (
      <section className="py-8 bg-wood-dark/60 border-y border-amber/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-24 rounded-xl bg-wood-dark/80" />
        </div>
      </section>
    );
  }

  if (isError) return null;

  return (
    <section className="py-8 bg-wood-dark/60 border-y border-amber/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
          {/* Show info / On Air badge */}
          <div className="flex-1 w-full">
            {currentShow ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-wood-dark rounded-xl px-6 py-5 shadow-lg border border-amber/20 h-full">
                {/* ON AIR badge */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                  </span>
                  <span className="font-display font-black text-xs tracking-widest uppercase text-red-400 bg-red-500/10 border border-red-500/30 px-2.5 py-1 rounded-full">
                    On Air
                  </span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-10 bg-amber/20" />

                {/* Show info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-bold text-amber leading-tight truncate">
                    {currentShow.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <span className="flex items-center gap-1.5 font-body text-sm text-tan/70">
                      <Clock className="w-3.5 h-3.5 text-burnt-orange flex-shrink-0" />
                      {currentShow.scheduleDay} · {currentShow.scheduleTime}
                    </span>
                    {dj && (
                      <span className="flex items-center gap-1.5 font-body text-sm text-tan/70">
                        <Mic2 className="w-3.5 h-3.5 text-burnt-orange flex-shrink-0" />
                        {dj.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Radio icon decoration */}
                <div className="hidden lg:flex flex-shrink-0 w-12 h-12 rounded-full bg-amber/10 border border-amber/20 items-center justify-center">
                  <Radio className="w-5 h-5 text-amber" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 bg-wood-dark rounded-xl px-6 py-5 border border-amber/10 h-full">
                <div className="w-10 h-10 rounded-full bg-amber/5 border border-amber/15 flex items-center justify-center flex-shrink-0">
                  <Radio className="w-5 h-5 text-amber/40" />
                </div>
                <div>
                  <p className="font-display text-base font-semibold text-tan/60">Nothing on air right now</p>
                  <p className="font-body text-sm text-tan/40 mt-0.5">Stay tuned — great country music is coming your way!</p>
                </div>
              </div>
            )}
          </div>

          {/* Live365 Player */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end flex-shrink-0">
            <div className="w-full max-w-[450px] overflow-hidden rounded-xl border border-amber/20 shadow-lg">
              <iframe
                width="450"
                height="316"
                frameBorder="0"
                src="https://live365.com/embeds/v1/player/a57949?s=md&m=dark&c=mp3"
                className="block w-full"
                title="Live365 Radio Player"
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

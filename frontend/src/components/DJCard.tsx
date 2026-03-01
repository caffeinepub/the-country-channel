import type { DJ, Show } from '../backend';
import { Mic2, Radio } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface DJCardProps {
  dj: DJ;
  shows: Show[];
}

export default function DJCard({ dj, shows }: DJCardProps) {
  const djShows = shows.filter((s) => s.djId === dj.id);
  const initials = dj.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-card border border-amber/20 rounded-lg overflow-hidden hover:border-amber/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber/10 group">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16 border-2 border-amber/30 flex-shrink-0">
            {dj.photoUrl ? (
              <AvatarImage src={dj.photoUrl} alt={dj.name} className="object-cover" />
            ) : null}
            <AvatarFallback className="bg-amber/20 text-amber font-display font-bold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-bold text-amber group-hover:text-amber-light transition-colors leading-tight">
              {dj.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Mic2 className="w-3.5 h-3.5 text-burnt-orange" />
              <span className="font-body text-xs text-tan/60 uppercase tracking-wide">On-Air DJ</span>
            </div>
          </div>
        </div>

        <p className="font-body text-sm text-tan/80 leading-relaxed mb-4 line-clamp-3">
          {dj.bio || 'No bio available.'}
        </p>

        {djShows.length > 0 && (
          <div className="border-t border-amber/10 pt-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Radio className="w-3.5 h-3.5 text-amber/70" />
              <span className="font-body text-xs text-tan/50 uppercase tracking-wide">Shows</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {djShows.map((show) => (
                <span
                  key={show.id.toString()}
                  className="px-2 py-0.5 bg-amber/10 border border-amber/20 rounded text-xs font-body text-amber/80"
                >
                  {show.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

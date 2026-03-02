import type { Show, DJ } from '../backend';
import { Clock, Calendar, Mic2 } from 'lucide-react';

interface ShowCardProps {
  show: Show;
  djs: DJ[];
}

export default function ShowCard({ show, djs }: ShowCardProps) {
  const dj = show.djId !== undefined ? djs.find((d) => d.id === show.djId) : null;

  return (
    <div className="bg-card border border-amber/20 rounded-lg overflow-hidden hover:border-amber/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber/10 group">
      {/* Color bar */}
      <div className="h-1 bg-gradient-to-r from-amber via-burnt-orange to-amber" />
      
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-amber group-hover:text-amber-light transition-colors leading-tight mb-2">
          {show.title}
        </h3>
        
        <p className="font-body text-sm text-tan/80 leading-relaxed mb-4 line-clamp-2">
          {show.description || 'No description available.'}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-tan/60">
            <Calendar className="w-3.5 h-3.5 text-amber/70 flex-shrink-0" />
            <span className="font-body text-xs">{show.scheduleDay}</span>
          </div>
          <div className="flex items-center gap-2 text-tan/60">
            <Clock className="w-3.5 h-3.5 text-amber/70 flex-shrink-0" />
            <span className="font-body text-xs">{show.scheduleTime} <span className="text-tan/40">CST</span></span>
          </div>
          {dj && (
            <div className="flex items-center gap-2 text-tan/60">
              <Mic2 className="w-3.5 h-3.5 text-amber/70 flex-shrink-0" />
              <span className="font-body text-xs font-medium text-tan/80">{dj.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

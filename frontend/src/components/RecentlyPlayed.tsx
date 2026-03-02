import { Music2 } from 'lucide-react';

export default function RecentlyPlayed() {
  return (
    <section className="py-16 bg-wood-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Music2 className="w-4 h-4 text-burnt-orange" />
            <span className="font-body text-xs text-burnt-orange uppercase tracking-widest font-medium">
              Just Played
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-amber mb-3">
            Recently Played
          </h2>
          <p className="font-body text-tan/70 max-w-md mx-auto text-base leading-relaxed">
            Check out the latest tracks we've been spinning on The Country Channel.
          </p>
        </div>

        {/* iframe Container */}
        <div className="flex justify-center">
          <div className="w-full max-w-[450px] overflow-hidden rounded-xl border border-amber/20 shadow-lg shadow-amber/10">
            <iframe
              width="450"
              height="511"
              frameBorder="0"
              src="https://live365.com/embeds/v1/played/a57949?s=md&m=dark"
              title="Recently Played on The Country Channel"
              className="block w-full"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

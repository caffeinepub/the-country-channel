import { ExternalLink, Radio } from 'lucide-react';

const platforms = [
  {
    name: 'Live365',
    description: 'Stream us live on the world\'s largest internet radio network',
    url: 'https://live365.com',
    icon: '📻',
    accent: 'from-amber/20 to-amber/5',
    border: 'border-amber/30 hover:border-amber/60',
  },
  {
    name: 'Radioline',
    description: 'Listen anywhere with Radioline\'s global radio platform',
    url: 'https://radioline.co',
    icon: '🎙️',
    accent: 'from-burnt-orange/20 to-burnt-orange/5',
    border: 'border-burnt-orange/30 hover:border-burnt-orange/60',
  },
  {
    name: 'OnlineRadioBox',
    description: 'Find us on OnlineRadioBox — your online radio directory',
    url: 'https://onlineradiobox.com',
    icon: '🎵',
    accent: 'from-tan/20 to-tan/5',
    border: 'border-tan/30 hover:border-tan/60',
  },
  {
    name: 'GetMeRadio',
    description: 'Tune in through GetMeRadio for easy access on any device',
    url: 'https://getmeradio.com',
    icon: '🤠',
    accent: 'from-amber/15 to-burnt-orange/5',
    border: 'border-amber/25 hover:border-amber/55',
  },
];

export default function WaysToListen() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Radio className="w-4 h-4 text-burnt-orange" />
            <span className="font-body text-xs text-burnt-orange uppercase tracking-widest font-medium">
              Tune In
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-amber mb-3">
            Ways to Listen
          </h2>
          <p className="font-body text-tan/70 max-w-md mx-auto text-base leading-relaxed">
            Catch The Country Channel on your favorite streaming platform — wherever you are.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Listen on ${platform.name} — opens in a new tab`}
              className={`
                group relative flex flex-col items-center text-center
                bg-gradient-to-b ${platform.accent}
                border ${platform.border}
                rounded-xl p-6 transition-all duration-300
                hover:shadow-lg hover:shadow-amber/10 hover:-translate-y-1
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-background
              `}
            >
              {/* Icon */}
              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {platform.icon}
              </div>

              {/* Platform Name */}
              <h3 className="font-display text-xl font-bold text-amber mb-2 leading-tight">
                {platform.name}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-tan/65 leading-relaxed mb-5 flex-1">
                {platform.description}
              </p>

              {/* Listen Button */}
              <span
                className="
                  inline-flex items-center gap-1.5
                  font-body text-sm font-semibold
                  text-wood-dark bg-amber
                  px-4 py-2 rounded-full
                  transition-all duration-200
                  group-hover:bg-amber-light group-hover:shadow-md group-hover:shadow-amber/30
                "
              >
                Listen Now
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

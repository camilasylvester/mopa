import { STATS } from '../data/index.js'

// Replace values with live data from your API
export default function StatsPanel({ className = '' }) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {STATS.map((stat, i) => (
        <div
          key={i}
          className="group bg-white/[0.035] hover:bg-white/[0.055] border border-white/[0.06] hover:border-mopar-blue/30 backdrop-blur-sm rounded-[2px] px-4 py-3.5 transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <span className="text-white/35 text-[0.68rem] font-medium tracking-label uppercase leading-tight">
              {stat.label}
            </span>
            <span
              className={`text-[0.68rem] font-semibold shrink-0 ${
                stat.positive === true
                  ? 'text-mopar-blue'
                  : stat.positive === false
                  ? 'text-red-400/70'
                  : 'text-white/35'
              }`}
            >
              {stat.delta}
            </span>
          </div>
          <div className="font-condensed font-black text-white text-3xl leading-none tracking-tight group-hover:text-mopar-blue transition-colors duration-300">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  )
}

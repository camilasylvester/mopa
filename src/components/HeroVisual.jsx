// Decorative SVG for the hero: illuminated goal + Mopar ball
// Pure SVG — no external images required
export default function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" aria-hidden="true">
      <svg
        viewBox="0 0 340 460"
        className="w-full h-full"
        style={{ maxHeight: 460 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ── Flood light glows ── */}
          <radialGradient id="floodL" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="floodR" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          {/* ── Centre blue accent light ── */}
          <radialGradient id="centreLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0057A8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0057A8" stopOpacity="0"    />
          </radialGradient>
          {/* ── Ball body gradient ── */}
          <radialGradient id="ballBody" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)"          />
          </radialGradient>
          {/* ── Ground reflection under ball ── */}
          <radialGradient id="groundGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0057A8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0057A8" stopOpacity="0"    />
          </radialGradient>
          {/* ── Atmospheric haze behind goal ── */}
          <radialGradient id="haze" cx="50%" cy="55%" r="55%">
            <stop offset="0%"   stopColor="#0057A8" stopOpacity="0.065" />
            <stop offset="100%" stopColor="#0057A8" stopOpacity="0"     />
          </radialGradient>
          {/* ── Glow filter for lights + Ω ── */}
          <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* ── Soft blur for light beams ── */}
          <filter id="beamBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
          </filter>
        </defs>

        {/* ─────────────────────────────────
            ATMOSPHERIC HAZE
        ───────────────────────────────── */}
        <rect x="0" y="0" width="340" height="460" fill="url(#haze)" />

        {/* ─────────────────────────────────
            LIGHT BEAMS (behind everything)
        ───────────────────────────────── */}
        <polygon points="45,45  170,440  130,440" fill="rgba(255,255,255,0.022)" filter="url(#beamBlur)" />
        <polygon points="295,45 170,440  210,440" fill="rgba(255,255,255,0.022)" filter="url(#beamBlur)" />

        {/* ─────────────────────────────────
            FLOOD LIGHTS (top corners)
        ───────────────────────────────── */}
        {/* Left lamp soft glow */}
        <circle cx="45" cy="45" r="18" fill="url(#floodL)" opacity="0.55" />
        {/* Left lamp core */}
        <circle cx="45" cy="45" r="5"  fill="#ffffff" filter="url(#glow)" opacity="0.95" />
        <circle cx="45" cy="45" r="2"  fill="#ffffff" opacity="1" />

        {/* Right lamp soft glow */}
        <circle cx="295" cy="45" r="18" fill="url(#floodR)" opacity="0.55" />
        {/* Right lamp core */}
        <circle cx="295" cy="45" r="5"  fill="#ffffff" filter="url(#glow)" opacity="0.95" />
        <circle cx="295" cy="45" r="2"  fill="#ffffff" opacity="1" />

        {/* Centre top — Mopar blue accent lamp */}
        <circle cx="170" cy="28" r="10" fill="url(#centreLight)" opacity="0.7" />
        <circle cx="170" cy="28" r="3"  fill="#0057A8" filter="url(#glow)" opacity="0.95" />

        {/* ─────────────────────────────────
            GOAL FRAME
        ───────────────────────────────── */}
        {/* Soft post glow (behind posts) */}
        <line x1="80"  y1="390" x2="80"  y2="155" stroke="rgba(255,255,255,0.07)" strokeWidth="14" strokeLinecap="round" />
        <line x1="260" y1="390" x2="260" y2="155" stroke="rgba(255,255,255,0.07)" strokeWidth="14" strokeLinecap="round" />
        <line x1="80"  y1="155" x2="260" y2="155" stroke="rgba(255,255,255,0.07)" strokeWidth="14" strokeLinecap="round" />

        {/* Crisp post lines */}
        <line x1="80"  y1="390" x2="80"  y2="155" stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" />
        <line x1="260" y1="390" x2="260" y2="155" stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" />
        <line x1="80"  y1="155" x2="260" y2="155" stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" />

        {/* Corner joints accent */}
        <circle cx="80"  cy="155" r="3.5" fill="rgba(255,255,255,0.6)" />
        <circle cx="260" cy="155" r="3.5" fill="rgba(255,255,255,0.6)" />

        {/* ─────────────────────────────────
            NET PATTERN
        ───────────────────────────────── */}
        {/* Vertical threads */}
        {[1,2,3,4,5,6,7,8,9].map((n) => (
          <line
            key={`nv${n}`}
            x1={80 + (180 / 10) * n}
            y1="155"
            x2={80 + (180 / 10) * n}
            y2="390"
            stroke="rgba(255,255,255,0.045)"
            strokeWidth="0.8"
          />
        ))}
        {/* Horizontal threads */}
        {[1,2,3,4,5,6,7,8,9].map((n) => (
          <line
            key={`nh${n}`}
            x1="80"
            y1={155 + (235 / 10) * n}
            x2="260"
            y2={155 + (235 / 10) * n}
            stroke="rgba(255,255,255,0.045)"
            strokeWidth="0.8"
          />
        ))}

        {/* ─────────────────────────────────
            GROUND LINE
        ───────────────────────────────── */}
        <line x1="20" y1="392" x2="320" y2="392" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Pitch centre mark */}
        <circle cx="170" cy="392" r="2" fill="rgba(255,255,255,0.2)" />

        {/* ─────────────────────────────────
            MOPAR BALL
        ───────────────────────────────── */}
        {/* Ground shadow / reflection */}
        <ellipse cx="170" cy="397" rx="38" ry="6" fill="url(#groundGlow)" />

        {/* Outer blue halo */}
        <circle cx="170" cy="374" r="42" fill="rgba(0,87,168,0.07)" />

        {/* Ball body */}
        <circle cx="170" cy="374" r="30" fill="#08080F" stroke="rgba(0,87,168,0.65)" strokeWidth="1.5" />
        {/* Highlight layer */}
        <circle cx="170" cy="374" r="30" fill="url(#ballBody)" />

        {/* Soccer panel hints — dark pentagons */}
        <circle cx="170" cy="374" r="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
        {/* Six surrounding panels at 60° */}
        {[0,60,120,180,240,300].map((deg) => {
          const r   = (deg * Math.PI) / 180
          const px  = 170 + Math.cos(r) * 17
          const py  = 374 + Math.sin(r) * 17
          return (
            <circle key={deg} cx={px} cy={py} r="5.5"
              fill="rgba(255,255,255,0.025)"
              stroke="rgba(255,255,255,0.055)"
              strokeWidth="0.7"
            />
          )
        })}

        {/* Mopar Ω on ball — blue only on the symbol, never the word */}
        <text
          x="170" y="381"
          textAnchor="middle"
          fill="#0057A8"
          fontSize="22"
          fontWeight="900"
          fontFamily="serif"
          filter="url(#glow)"
        >
          Ω
        </text>

        {/* Ball specular */}
        <ellipse cx="160" cy="362" rx="8" ry="5"
          fill="rgba(255,255,255,0.06)"
          transform="rotate(-25 160 362)"
        />
      </svg>
    </div>
  )
}

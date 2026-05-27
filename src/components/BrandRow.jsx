import { ArrowRight } from 'lucide-react'
import { BRANDS } from '../data/index.js'

// ─── Single brand card ─────────────────────────────────────────────
function BrandCard({ brand, onClick }) {
  return (
    <button
      onClick={() => onClick(brand.id)}
      className="group relative flex flex-col justify-between h-[120px] p-4 border border-white/[0.06] rounded-[2px] overflow-hidden transition-all duration-300 hover:border-white/[0.15] text-left"
      style={{
        background: `linear-gradient(145deg, ${brand.color}55 0%, ${brand.color}22 100%)`,
      }}
    >
      {/* Background tint on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(145deg, ${brand.color}88 0%, ${brand.color}33 100%)`,
        }}
      />

      {/* Top row: brand name + arrow */}
      <div className="relative flex items-center justify-between">
        {/* Replace text with actual brand logo SVG */}
        <span className="font-condensed font-black text-white/85 group-hover:text-white text-xl tracking-wide transition-colors duration-300 uppercase">
          {brand.name}
        </span>
        <div
          className="w-6 h-6 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10"
        >
          <ArrowRight size={11} className="text-white/35 group-hover:text-white/80 transition-colors duration-300" />
        </div>
      </div>

      {/* Bottom: tagline */}
      <span className="relative text-white/28 group-hover:text-white/45 text-[0.65rem] font-medium uppercase tracking-label transition-colors duration-300">
        {brand.tagline}
      </span>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: brand.colorAccent }}
      />
    </button>
  )
}

// ─── Section ───────────────────────────────────────────────────────
export default function BrandRow({ onBrandSelect }) {
  return (
    <section
      id="marcas"
      className="bg-[#07070C] pb-24"
    >
      <div className="max-w-[1360px] mx-auto px-6">

        {/* Section header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-px bg-mopar-blue shrink-0" />
            <span className="text-mopar-blue text-[0.68rem] font-semibold tracking-label uppercase">
              Marcas participantes
            </span>
          </div>
          <h2 className="font-display leading-none">
            <span
              className="block text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              ELEGÍ TU MARCA
            </span>
          </h2>
          <p className="text-white/35 text-sm mt-2 max-w-md">
            Acceso rápido por marca al módulo de Material POP.
          </p>
        </div>

        {/* Brand cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BRANDS.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              onClick={onBrandSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

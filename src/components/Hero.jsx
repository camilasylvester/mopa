import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[45vh] sm:min-h-[52vh] flex flex-col overflow-hidden"
    >
      {/* ── Imagen de fondo — desktop ── */}
      <div
        className="absolute inset-0 z-0 hidden sm:block"
        style={{
          backgroundImage: "url('/fondo.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* ── Imagen de fondo — mobile ── */}
      <div
        className="absolute inset-0 z-0 sm:hidden"
        style={{
          backgroundImage: "url('/cancha.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── Overlay mínimo general ── */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'rgba(7,7,12,0.08)' }}
      />

      {/* ── Vignette superior para el header ── */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '130px',
          background: 'linear-gradient(to bottom, rgba(7,7,12,0.55) 0%, transparent 100%)',
        }}
      />

      {/* ── Degradado esquina inferior izquierda ── */}
      <div
        className="absolute bottom-0 left-0 z-10 pointer-events-none"
        style={{
          width: '55%',
          height: '55%',
          background: `radial-gradient(
            ellipse at 0% 100%,
            rgba(7,7,12,0.97) 0%,
            rgba(7,7,12,0.90) 20%,
            rgba(7,7,12,0.65) 40%,
            rgba(7,7,12,0.25) 60%,
            transparent 80%
          )`,
        }}
      />

      {/* ── Vignette inferior (transición a la siguiente sección) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '80px',
          background: 'linear-gradient(to top, rgba(7,7,12,1) 0%, transparent 100%)',
        }}
      />

      {/* ── Título: arriba en mobile / abajo-izquierda en desktop ── */}
      <div className="relative z-20 flex-1 flex flex-col justify-end pb-8 sm:pb-10 max-w-[1360px] mx-auto w-full px-8">
        <h1 className="font-display leading-[0.88]">
          <span
            className="reveal-up block text-white"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              animationDelay: '0.15s',
              textShadow: '0 2px 24px rgba(0,0,0,0.9)',
            }}
          >
            CAMPAÑA
          </span>
          <span
            className="reveal-up flex items-baseline gap-x-4"
            style={{
              fontSize: 'clamp(2.5rem, 7.5vw, 7rem)',
              animationDelay: '0.35s',
              textShadow: '0 2px 24px rgba(0,0,0,0.9)',
            }}
          >
            {/* MOPAR siempre blanco — jamás azul */}
            <span className="text-white">MOPAR</span>
            <span className="text-mopar-blue">2026</span>
          </span>
        </h1>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="relative z-20 flex justify-start px-8 pb-5 pointer-events-none">
        <div className="flex flex-col items-start gap-1 opacity-35">
          <span className="text-white text-[0.54rem] tracking-label uppercase font-medium">Scroll</span>
          <ChevronDown size={12} className="text-white animate-bounce" />
        </div>
      </div>
    </section>
  )
}

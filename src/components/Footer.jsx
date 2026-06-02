export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/[0.04]">
      <div className="max-w-[1360px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Logo oficial */}
          <img
            src="/Logo_Mopar-NEGBlanco-02.png"
            alt="MOPAR®"
            className="h-14 w-auto object-contain opacity-80"
            draggable={false}
          />

          {/* Legal note */}
          <p className="text-white/20 text-[0.68rem] text-center">
            Campaña Lubricantes MOPAR {year} — Uso interno. Todos los derechos reservados.
          </p>

          {/* Version / metadata — replace with build info */}
          <span className="text-white/18 text-[0.65rem] font-mono">
            v1.0.0 · Mayo {year}
          </span>
        </div>
      </div>
    </footer>
  )
}

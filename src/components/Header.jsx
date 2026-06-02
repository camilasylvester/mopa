import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/index.js'

export default function Header({ onNavClick }) {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, link) => {
    if (link.moduleId) {
      e.preventDefault()
      onNavClick?.(link.moduleId)
      document.getElementById('modulos')?.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    } else {
      setMobileOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/75 backdrop-blur-2xl border-b border-white/[0.05]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 h-[60px] flex items-center justify-between gap-8">

        {/* ── Logo oficial Mopar ── */}
        <a href="#inicio" className="flex items-center shrink-0">
          <img
            src="/Logo_Mopar-NEGBlanco-02.png"
            alt="MOPAR®"
            className="h-16 w-auto object-contain select-none"
            style={{ maxWidth: 260 }}
            draggable={false}
          />
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="relative text-white/55 hover:text-white text-[0.78rem] font-medium tracking-wide transition-colors duration-200 group pb-0.5"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-mopar-blue group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className="lg:hidden text-white/70 hover:text-white transition-colors duration-200 p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t border-white/[0.05] bg-black/90 backdrop-blur-2xl px-6 py-4"
          style={{ animation: 'slideDown 0.25s cubic-bezier(0.22,1,0.36,1) forwards' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="flex items-center justify-between py-3.5 text-white/60 hover:text-white text-sm font-medium border-b border-white/[0.05] last:border-0 transition-colors duration-150"
            >
              {link.label}
              <span className="text-white/20">›</span>
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

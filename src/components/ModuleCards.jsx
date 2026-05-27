import { ChevronDown, FolderOpen, Clock, FileText, Loader, Download, Eye } from 'lucide-react'
import { MODULES, BRANDS, getMockContent, BBCC_LINKS } from '../data/index.js'
import EvidenciaForm from './EvidenciaForm.jsx'

// ─── Botón de acción reutilizable ─────────────────────────────────
function ActionBtn({ href, icon: Icon, label, accent = false, disabled = false }) {
  const base = 'group flex items-center gap-3 rounded-[2px] px-4 py-3.5 border transition-all duration-200'
  const styles = disabled
    ? { borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', cursor: 'not-allowed' }
    : accent
      ? { borderColor: 'rgba(0,102,179,0.35)', background: 'rgba(0,102,179,0.08)' }
      : { borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }

  if (disabled) {
    return (
      <div className={base} style={styles} title="Próximamente">
        <Loader size={17} className="text-white/20 shrink-0" />
        <span className="text-white/25 text-sm font-medium">{label}</span>
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${accent ? 'hover:bg-mopar-blue/25 hover:border-mopar-blue/60' : 'hover:bg-white/[0.08] hover:border-white/[0.18]'}`}
      style={styles}
    >
      <Icon
        size={17}
        className={`shrink-0 transition-colors ${accent ? 'text-mopar-blue/70 group-hover:text-mopar-blue' : 'text-white/40 group-hover:text-white/80'}`}
      />
      <span className="text-white/55 group-hover:text-white/85 text-sm font-medium transition-colors">
        {label}
      </span>
    </a>
  )
}

// ─── BBCC: documento único para todas las marcas ──────────────────
function BBCCContent() {
  const { pdfUrl, viewUrl, vigencia } = BBCC_LINKS
  return (
    <div style={{ animation: 'slideDown 0.3s cubic-bezier(0.22,1,0.36,1) forwards' }}>
      <p className="text-white/35 text-xs mb-5 max-w-xl leading-relaxed">
        Las bases y condiciones aplican a todas las marcas participantes de la Promo Mundialista MOPAR 2026.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ActionBtn href={pdfUrl} icon={Download} label="Descargar PDF" accent disabled={!pdfUrl} />
        <ActionBtn href={viewUrl} icon={Eye} label="Ver documento" disabled={!viewUrl} />
        <div className="flex items-center gap-2 px-4 py-3.5 border border-white/[0.04] rounded-[2px]">
          <Clock size={13} className="text-white/25 shrink-0" />
          <span className="text-white/30 text-xs">Vigencia: {vigencia}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Contenido de marca seleccionada ──────────────────────────────
function BrandContent({ moduleId, brandId }) {
  const content = getMockContent(moduleId, brandId)
  if (!content) return null

  const { folderUrl, lastUpdate } = content

  return (
    <div
      className="mt-4 rounded-[2px] border border-white/[0.08] bg-white/[0.04] p-5"
      style={{ animation: 'slideDown 0.3s cubic-bezier(0.22,1,0.36,1) forwards' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <FileText size={13} className="text-white/40" />
          <span className="text-white/50 text-xs font-medium uppercase tracking-label">
            {folderUrl ? 'Materiales disponibles' : 'Próximamente disponible'}
          </span>
        </div>
        {lastUpdate && (
          <div className="flex items-center gap-1.5 text-white/30 text-xs">
            <Clock size={12} />
            <span>Últ. actualización: {lastUpdate}</span>
          </div>
        )}
      </div>

      <ActionBtn href={folderUrl} icon={FolderOpen} label="Abrir en Drive" accent disabled={!folderUrl} />
    </div>
  )
}

// ─── Selector de marcas ────────────────────────────────────────────
function BrandSelector({ moduleId, selected, onSelect }) {
  return (
    <div style={{ animation: 'slideDown 0.3s cubic-bezier(0.22,1,0.36,1) forwards' }}>
      <p className="text-white/30 text-[0.68rem] uppercase tracking-label font-medium mb-3">
        Seleccioná la marca
      </p>
      <div className="flex flex-wrap gap-2">
        {BRANDS.map((brand) => {
          const isSel = selected === brand.id
          return (
            <button
              key={brand.id}
              onClick={() => onSelect(isSel ? null : brand.id)}
              className="flex items-center px-5 py-2.5 border rounded-[2px] transition-all duration-200"
              style={{
                borderColor: isSel ? brand.colorAccent : 'rgba(255,255,255,0.10)',
                background: isSel
                  ? `linear-gradient(135deg, ${brand.color}cc, ${brand.colorMid}88)`
                  : 'rgba(255,255,255,0.04)',
              }}
              onMouseEnter={(e) => {
                if (!isSel) {
                  e.currentTarget.style.borderColor = brand.colorAccent + '80'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSel) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }
              }}
            >
              <span
                className="text-[0.78rem] font-semibold transition-colors duration-200"
                style={{ color: isSel ? '#ffffff' : 'rgba(255,255,255,0.50)' }}
              >
                {brand.name}
              </span>
            </button>
          )
        })}
      </div>
      {selected && <BrandContent moduleId={moduleId} brandId={selected} />}
    </div>
  )
}

// ─── Card individual ───────────────────────────────────────────────
function ModuleCard({ mod, isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-expanded={isOpen}
      className="relative flex flex-col items-center justify-center text-center w-full border transition-all duration-300 cursor-pointer rounded-[2px] group"
      style={{
        minHeight: 200,
        padding: '2rem 1.5rem',
        background: isOpen ? '#0066B3' : 'rgba(255,255,255,0.03)',
        borderColor: isOpen ? '#0066B3' : 'rgba(255,255,255,0.07)',
        boxShadow: isOpen ? '0 0 40px rgba(0,102,179,0.25)' : 'none',
      }}
    >
      {/* Hover state (solo cuando no está abierta) */}
      {!isOpen && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2px]"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        />
      )}

      {/* Número */}
      <span
        className="block font-condensed font-bold text-[0.65rem] tracking-[0.4em] uppercase mb-4 transition-colors duration-300"
        style={{ color: isOpen ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.18)' }}
      >
        {mod.number}
      </span>

      {/* Título centrado */}
      <h3
        className="font-condensed leading-tight transition-colors duration-300"
        style={{
          fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
          letterSpacing: '0.12em',
          color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.82)',
          textShadow: isOpen ? '0 1px 12px rgba(0,0,0,0.3)' : 'none',
          fontWeight: 700,
        }}
      >
        {mod.id === 'qrs' ? (
          <>QR<span style={{ fontSize: '0.6em', verticalAlign: 'baseline', letterSpacing: '0.08em' }}>S</span></>
        ) : (
          mod.title
        )}
      </h3>

      {/* Subtítulo */}
      <p
        className="text-xs leading-relaxed mt-2 mb-5 transition-colors duration-300"
        style={{ color: isOpen ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.25)' }}
      >
        {mod.subtitle}
      </p>

      {/* Chevron */}
      <ChevronDown
        size={14}
        className="transition-all duration-300"
        style={{
          color: isOpen ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.22)',
          transform: isOpen ? 'rotate(180deg)' : 'none',
        }}
      />

      {/* Línea inferior activa */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-300"
        style={{
          background: 'rgba(255,255,255,0.4)',
          opacity: isOpen ? 1 : 0,
        }}
      />
    </button>
  )
}

// ─── Sección principal ─────────────────────────────────────────────
export default function ModuleCards({ openModule, setOpenModule, selectedBrands, setSelectedBrands }) {
  const handleCardClick = (id) => {
    setOpenModule((prev) => (prev === id ? null : id))
  }

  const handleBrandSelect = (moduleId, brandId) => {
    setSelectedBrands((prev) => ({ ...prev, [moduleId]: brandId }))
  }

  return (
    <section id="modulos" className="bg-[#07070C] pt-10 pb-20">
      <div className="max-w-[1360px] mx-auto px-6">

        {/* Grid de 5 cards — sin header, directo al grano */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {MODULES.map((mod) => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              isOpen={openModule === mod.id}
              onClick={() => handleCardClick(mod.id)}
            />
          ))}
        </div>

        {/* Panel inferior */}
        {openModule && (
          <div
            className="mt-3 border border-white/[0.06] bg-white/[0.02] rounded-[2px] px-6 py-6"
            style={{ animation: 'slideDown 0.3s cubic-bezier(0.22,1,0.36,1) forwards' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-px bg-mopar-blue" />
              <span className="text-white/40 text-[0.68rem] uppercase tracking-label font-semibold">
                {MODULES.find((m) => m.id === openModule)?.title}
              </span>
            </div>

            {/* Contenido según módulo */}
            {openModule === 'bbcc' ? (
              <BBCCContent />
            ) : openModule === 'evidencia-pop' ? (
              <EvidenciaForm />
            ) : (
              <BrandSelector
                moduleId={openModule}
                selected={selectedBrands[openModule] ?? null}
                onSelect={(brandId) => handleBrandSelect(openModule, brandId)}
              />
            )}
          </div>
        )}

        <div className="divider mt-16" />
      </div>
    </section>
  )
}

import { useState, useRef, useEffect } from 'react'
import { Upload, CheckCircle, AlertCircle, Loader, FolderOpen, ChevronDown } from 'lucide-react'
import { APPS_SCRIPT_URL } from '../data/index.js'
import { DEALERS } from '../data/dealers.js'

const FORM_BRANDS = ['Jeep / RAM', 'Fiat', 'Peugeot', 'Citroën']

function dealerKey(marca) {
  return marca === 'Jeep / RAM' ? 'Jeep' : marca
}

// ─── Dropdown custom (reemplaza <select> nativo) ──────────────────
function CustomSelect({ label, value, options, placeholder, onChange, disabled }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Cerrar al hacer click afuera
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = value || null

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      <label className="text-white/30 text-[0.63rem] uppercase tracking-label font-semibold">
        {label}
      </label>
      <div className="relative">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => !disabled && setOpen(v => !v)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-[2px] border text-sm text-left transition-all duration-150"
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderColor: open ? 'rgba(0,102,179,0.6)' : 'rgba(255,255,255,0.10)',
            color: selected ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.30)',
            opacity: disabled ? 0.4 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <span className="truncate">{selected || placeholder}</span>
          <ChevronDown
            size={14}
            className="shrink-0 ml-2 transition-transform duration-200"
            style={{
              color: 'rgba(255,255,255,0.35)',
              transform: open ? 'rotate(180deg)' : 'none',
            }}
          />
        </button>

        {/* Lista */}
        {open && !disabled && (
          <div
            className="absolute left-0 right-0 z-50 mt-1 rounded-[2px] border overflow-y-auto"
            style={{
              background: '#141420',
              borderColor: 'rgba(0,102,179,0.4)',
              maxHeight: 220,
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
              animation: 'slideDown 0.15s cubic-bezier(0.22,1,0.36,1) forwards',
            }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false) }}
                className="w-full text-left px-3 py-2.5 text-sm transition-colors duration-100"
                style={{
                  color: opt === value ? '#ffffff' : 'rgba(255,255,255,0.70)',
                  background: opt === value ? 'rgba(0,102,179,0.35)' : 'transparent',
                }}
                onMouseEnter={e => { if (opt !== value) e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
                onMouseLeave={e => { if (opt !== value) e.currentTarget.style.background = 'transparent' }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function EvidenciaForm() {
  const [form, setForm]         = useState({ marca: '', provincia: '', concesionaria: '' })
  const [status, setStatus]     = useState('idle')
  const [folderUrl, setFolderUrl] = useState(null)
  const [errorMsg, setErrorMsg]   = useState('')

  const key            = dealerKey(form.marca)
  const provincias     = form.marca     ? Object.keys(DEALERS[key] || {}).sort() : []
  const concesionarias = form.provincia ? (DEALERS[key]?.[form.provincia] || []) : []

  const setField = (k, v) => {
    if (k === 'marca')     return setForm(p => ({ ...p, marca: v,    provincia: '', concesionaria: '' }))
    if (k === 'provincia') return setForm(p => ({ ...p, provincia: v, concesionaria: '' }))
    setForm(p => ({ ...p, [k]: v }))
  }

  const isValid = form.marca && form.provincia && form.concesionaria

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid || status === 'sending') return
    setStatus('sending')
    setErrorMsg('')
    try {
      const params = new URLSearchParams(form)
      const res  = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, { redirect: 'follow' })
      const json = await res.json()
      if (json.ok) { setFolderUrl(json.folderUrl); setStatus('success') }
      else throw new Error(json.error || 'Error al crear la carpeta.')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'No se pudo conectar. Verificá tu conexión e intentá de nuevo.')
    }
  }

  // ─── Éxito ────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div
        className="flex flex-col items-center justify-center py-10 gap-4 text-center"
        style={{ animation: 'slideDown 0.3s cubic-bezier(0.22,1,0.36,1) forwards' }}
      >
        <CheckCircle size={36} className="text-green-400/80" />
        <div>
          <p className="text-white/80 font-semibold text-base mb-1">¡Carpeta creada!</p>
          <p className="text-white/35 text-xs max-w-sm leading-relaxed">
            Se creó la carpeta en Drive para{' '}
            <span className="text-white/60">{form.concesionaria} — {form.provincia}</span>.
            Hacé click abajo para subir tus fotos y videos directamente ahí, sin límite de tamaño.
          </p>
        </div>
        {folderUrl && (
          <a
            href={folderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-[2px] text-sm font-semibold transition-all duration-200 mt-1"
            style={{ background: '#0066B3', color: '#fff' }}
          >
            <FolderOpen size={16} />
            Subir fotos / videos a Drive
          </a>
        )}
        <button
          onClick={() => { setStatus('idle'); setFolderUrl(null); setForm({ marca: '', provincia: '', concesionaria: '' }) }}
          className="text-white/30 hover:text-white/60 text-xs transition-colors underline underline-offset-2"
        >
          Registrar otra concesionaria
        </button>
      </div>
    )
  }

  // ─── Form ─────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} style={{ animation: 'slideDown 0.3s cubic-bezier(0.22,1,0.36,1) forwards' }}>
      <p className="text-white/30 text-xs mb-4 leading-relaxed max-w-xl">
        Completá los datos de tu concesionario y subí la evidencia a la carpeta Drive correspondiente.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <CustomSelect
          label="Marca"
          value={form.marca}
          options={FORM_BRANDS}
          placeholder="Seleccioná"
          onChange={v => setField('marca', v)}
          disabled={false}
        />
        <CustomSelect
          label="Provincia"
          value={form.provincia}
          options={provincias}
          placeholder={form.marca ? 'Seleccioná' : 'Elegí una marca primero'}
          onChange={v => setField('provincia', v)}
          disabled={!form.marca}
        />
        <CustomSelect
          label="Concesionaria"
          value={form.concesionaria}
          options={concesionarias}
          placeholder={form.provincia ? 'Seleccioná' : 'Elegí una provincia primero'}
          onChange={v => setField('concesionaria', v)}
          disabled={!form.provincia}
        />
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 text-red-400/75 text-xs mb-4">
          <AlertCircle size={13} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || !APPS_SCRIPT_URL || status === 'sending'}
        className="flex items-center gap-2.5 px-6 py-2.5 rounded-[2px] text-sm font-semibold transition-all duration-200"
        style={{
          background: isValid && APPS_SCRIPT_URL && status !== 'sending' ? '#0066B3' : 'rgba(255,255,255,0.05)',
          color:      isValid && APPS_SCRIPT_URL && status !== 'sending' ? '#ffffff' : 'rgba(255,255,255,0.22)',
          cursor:     isValid && APPS_SCRIPT_URL && status !== 'sending' ? 'pointer' : 'not-allowed',
        }}
      >
        {status === 'sending' ? (
          <><Loader size={14} className="animate-spin" /> Creando carpeta...</>
        ) : !APPS_SCRIPT_URL ? (
          <><Loader size={14} /> Próximamente disponible</>
        ) : (
          <><Upload size={14} /> Generar carpeta en Drive</>
        )}
      </button>
    </form>
  )
}

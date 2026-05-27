import { useState } from 'react'
import { Upload, CheckCircle, AlertCircle, Loader, FolderOpen } from 'lucide-react'
import { APPS_SCRIPT_URL } from '../data/index.js'
import { DEALERS } from '../data/dealers.js'

// Jeep y RAM aparecen juntos como una sola opción en el formulario
const FORM_BRANDS = ['Jeep / RAM', 'Fiat', 'Peugeot', 'Citroën']

// Mapea la opción del form al key del DEALERS
function dealerKey(marca) {
  return marca === 'Jeep / RAM' ? 'Jeep' : marca
}

// ─── Input / Select base styles ───────────────────────────────────
const inputCls =
  'w-full bg-white/[0.05] border border-white/[0.10] rounded-[2px] px-3 py-2.5 ' +
  'text-sm text-white/70 placeholder:text-white/20 ' +
  'focus:outline-none focus:border-mopar-blue/60 focus:bg-white/[0.07] ' +
  'transition-all duration-150 appearance-none'

export default function EvidenciaForm() {
  const [form, setForm]       = useState({ marca: '', provincia: '', concesionaria: '' })
  const [status, setStatus]   = useState('idle')   // idle | sending | success | error
  const [folderUrl, setFolderUrl] = useState(null)
  const [errorMsg, setErrorMsg]   = useState('')

  // ─── Opciones dinámicas ────────────────────────────────────────
  const key            = dealerKey(form.marca)
  const provincias     = form.marca     ? Object.keys(DEALERS[key] || {}).sort() : []
  const concesionarias = form.provincia ? (DEALERS[key]?.[form.provincia] || [])  : []

  const setField = (k, v) => {
    if (k === 'marca')    return setForm(p => ({ ...p, marca: v,    provincia: '', concesionaria: '' }))
    if (k === 'provincia') return setForm(p => ({ ...p, provincia: v, concesionaria: '' }))
    setForm(p => ({ ...p, [k]: v }))
  }

  const isValid = form.marca && form.provincia && form.concesionaria

  // ─── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid || status === 'sending') return
    setStatus('sending')
    setErrorMsg('')

    try {
      const params = new URLSearchParams(form)
      const res = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
        redirect: 'follow',
      })
      const json = await res.json()
      if (json.ok) {
        setFolderUrl(json.folderUrl)
        setStatus('success')
      } else {
        throw new Error(json.error || 'Error al crear la carpeta.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'No se pudo conectar. Verificá tu conexión e intentá de nuevo.')
    }
  }

  // ─── Pantalla de éxito ─────────────────────────────────────────
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
          onClick={() => {
            setStatus('idle')
            setFolderUrl(null)
            setForm({ marca: '', provincia: '', concesionaria: '' })
          }}
          className="text-white/30 hover:text-white/60 text-xs transition-colors underline underline-offset-2"
        >
          Registrar otra concesionaria
        </button>
      </div>
    )
  }

  // ─── Form ──────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      style={{ animation: 'slideDown 0.3s cubic-bezier(0.22,1,0.36,1) forwards' }}
    >
      <p className="text-white/30 text-xs mb-4 leading-relaxed max-w-xl">
        Completá los datos de tu concesionario y subí la evidencia a la carpeta Drive correspondiente.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">

        {/* Marca */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white/30 text-[0.63rem] uppercase tracking-label font-semibold">
            Marca
          </label>
          <select
            value={form.marca}
            onChange={e => setField('marca', e.target.value)}
            required
            className={inputCls}
            style={{ colorScheme: 'dark' }}
          >
            <option value="" disabled>Seleccioná</option>
            {FORM_BRANDS.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Provincia */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white/30 text-[0.63rem] uppercase tracking-label font-semibold">
            Provincia
          </label>
          <select
            value={form.provincia}
            onChange={e => setField('provincia', e.target.value)}
            required
            disabled={!form.marca}
            className={inputCls}
            style={{ colorScheme: 'dark', opacity: form.marca ? 1 : 0.4 }}
          >
            <option value="" disabled>
              {form.marca ? 'Seleccioná' : 'Elegí una marca primero'}
            </option>
            {provincias.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Concesionaria */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white/30 text-[0.63rem] uppercase tracking-label font-semibold">
            Concesionaria
          </label>
          <select
            value={form.concesionaria}
            onChange={e => setField('concesionaria', e.target.value)}
            required
            disabled={!form.provincia}
            className={inputCls}
            style={{ colorScheme: 'dark', opacity: form.provincia ? 1 : 0.4 }}
          >
            <option value="" disabled>
              {form.provincia ? 'Seleccioná' : 'Elegí una provincia primero'}
            </option>
            {concesionarias.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {errorMsg && (
        <div className="flex items-center gap-2 text-red-400/75 text-xs mb-4">
          <AlertCircle size={13} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || !APPS_SCRIPT_URL || status === 'sending'}
        className="flex items-center gap-2.5 px-6 py-2.5 rounded-[2px] text-sm font-semibold transition-all duration-200"
        style={{
          background: isValid && APPS_SCRIPT_URL && status !== 'sending'
            ? '#0066B3'
            : 'rgba(255,255,255,0.05)',
          color: isValid && APPS_SCRIPT_URL && status !== 'sending'
            ? '#ffffff'
            : 'rgba(255,255,255,0.22)',
          cursor: isValid && APPS_SCRIPT_URL && status !== 'sending' ? 'pointer' : 'not-allowed',
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

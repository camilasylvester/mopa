import { useState, useEffect, useMemo } from 'react'
import { Download, LogOut, Users, TrendingUp, MapPin, RefreshCw, AlertCircle } from 'lucide-react'
import { supabase, TABLE } from '../lib/supabase.js'

const PASSWORD  = 'promomopar'
const PAGE_SIZE = 50

const MARCA_TABS = [
  { id: 'all',     label: 'Todas',      marcas: null },
  { id: 'jeepram', label: 'Jeep y RAM', marcas: ['jeep', 'ram', 'jeep / ram'] },
  { id: 'peugeot', label: 'Peugeot',    marcas: ['peugeot'] },
  { id: 'citroen', label: 'Citroën',    marcas: ['citroën', 'citroen'] },
  { id: 'fiat',    label: 'Fiat',       marcas: ['fiat'] },
]

// ─── CSV ───────────────────────────────────────────────────────
function downloadCSV(rows, filename) {
  const headers = ['Nombre', 'Email', 'Patente', 'Marca', 'Provincia', 'Concesionario', 'Resultado', 'Chances', 'Fecha']
  const esc     = v => `"${String(v ?? '').replace(/"/g, '""')}"`
  const lines   = [
    headers.join(','),
    ...rows.map(r => [r.nombre, r.email, r.patente, r.marca, r.provincia, r.concesionario, r.resultado, r.chances, r.created_at].map(esc).join(',')),
  ]
  const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function filterByMarca(data, tabId) {
  const tab = MARCA_TABS.find(t => t.id === tabId)
  if (!tab?.marcas) return data
  return data.filter(r => tab.marcas.includes(r.marca?.toLowerCase()))
}

function fmt(n) { return (n || 0).toLocaleString('es-AR') }

// ─── Password Gate ─────────────────────────────────────────────
function PasswordGate({ onAuth }) {
  const [pw, setPw]   = useState('')
  const [err, setErr] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (pw === PASSWORD) { sessionStorage.setItem('mopa_auth', '1'); onAuth() }
    else { setErr(true); setPw('') }
  }
  return (
    <div className="bg-[#07070C] min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[360px]">
        <img src="/Logo_Mopar-NEGBlanco-02.png" alt="MOPAR" className="h-12 w-auto mb-8 opacity-85" />
        <h1 className="font-display text-3xl text-white tracking-wide mb-1">PANEL INTERNO</h1>
        <p className="text-white/35 text-sm mb-8">Campaña Lubricantes MOPAR 2026</p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input type="password" value={pw} autoFocus onChange={e => { setPw(e.target.value); setErr(false) }}
            placeholder="Contraseña"
            className="w-full rounded-[2px] px-4 py-3 text-white text-sm placeholder:text-white/25 bg-white/[0.05] focus:outline-none transition-colors"
            style={{ border: `1px solid ${err ? 'rgba(239,68,68,0.55)' : 'rgba(255,255,255,0.10)'}` }} />
          {err && <div className="flex items-center gap-1.5 text-red-400/75 text-xs"><AlertCircle size={12} /> Contraseña incorrecta</div>}
          <button type="submit" className="w-full py-3 rounded-[2px] text-sm font-semibold text-white" style={{ background: '#0066B3' }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Metric Card ───────────────────────────────────────────────
function MetricCard({ label, value, sub, icon: Icon, accent = '#0066B3' }) {
  return (
    <div className="rounded-[2px] border border-white/[0.08] bg-white/[0.03] px-5 py-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon size={13} style={{ color: accent }} />
        <span className="text-[0.62rem] uppercase tracking-widest font-semibold text-white/30">{label}</span>
      </div>
      <span className="font-display text-white" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.6rem)' }}>{value}</span>
      {sub && <span className="text-white/30 text-[0.65rem]">{sub}</span>}
    </div>
  )
}

// ─── Marca Card (clickeable) ───────────────────────────────────
function MarcaCard({ tab, count, isActive, onClick }) {
  return (
    <button onClick={onClick}
      className="rounded-[2px] border px-4 py-3.5 flex flex-col gap-1.5 text-left transition-all duration-200"
      style={{
        borderColor: isActive ? '#0066B3' : 'rgba(255,255,255,0.08)',
        background:  isActive ? 'rgba(0,102,179,0.12)' : 'rgba(255,255,255,0.03)',
        boxShadow:   isActive ? '0 0 20px rgba(0,102,179,0.15)' : 'none',
      }}>
      <span className="text-[0.62rem] uppercase tracking-widest font-semibold"
        style={{ color: isActive ? 'rgba(0,102,179,0.9)' : 'rgba(255,255,255,0.28)' }}>
        {tab.label}
      </span>
      <span className="font-display text-white text-2xl">{fmt(count)}</span>
    </button>
  )
}

// ─── Bar List ──────────────────────────────────────────────────
function BarList({ title, icon: Icon, items, accent = '#0066B3' }) {
  const max = items[0]?.[1] || 1
  return (
    <div className="rounded-[2px] border border-white/[0.08] bg-white/[0.03] px-5 py-4">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon size={13} className="text-white/30" />}
        <p className="text-white/30 text-[0.62rem] uppercase tracking-widest font-semibold">{title}</p>
      </div>
      {items.length === 0 && <p className="text-white/20 text-xs">Sin datos</p>}
      <div className="flex flex-col gap-3">
        {items.map(([name, count]) => (
          <div key={name}>
            <div className="flex justify-between mb-1">
              <span className="text-white/70 text-xs truncate max-w-[75%]">{name}</span>
              <span className="text-white/40 text-xs font-mono">{fmt(count)}</span>
            </div>
            <div className="h-[3px] rounded-full overflow-hidden bg-white/[0.06]">
              <div className="h-full rounded-full" style={{ width: `${(count / max) * 100}%`, background: accent, transition: 'width 0.5s ease' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Engagement: registros por día ────────────────────────────
function EngagementChart({ data }) {
  const days = useMemo(() => {
    const counts = {}
    const today  = new Date()
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today); d.setDate(today.getDate() - i)
      const key = d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })
      counts[key] = 0
    }
    data.forEach(r => {
      if (!r.created_at) return
      const key = new Date(r.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })
      if (key in counts) counts[key]++
    })
    return Object.entries(counts)
  }, [data])

  const max = Math.max(...days.map(([, v]) => v), 1)

  return (
    <div className="rounded-[2px] border border-white/[0.08] bg-white/[0.03] px-5 py-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={13} className="text-white/30" />
        <p className="text-white/30 text-[0.62rem] uppercase tracking-widest font-semibold">Engagement — Registros últimos 14 días</p>
      </div>
      <div className="flex items-end gap-1.5 h-20">
        {days.map(([label, count]) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1 group">
            <span className="text-white/0 group-hover:text-white/50 text-[0.5rem] transition-colors">{count || ''}</span>
            <div className="w-full rounded-sm transition-all duration-300" style={{
              height: `${Math.max((count / max) * 64, count > 0 ? 4 : 0)}px`,
              background: count > 0 ? '#0066B3' : 'rgba(255,255,255,0.06)',
            }} />
            <span className="text-white/25 text-[0.48rem] rotate-0 whitespace-nowrap">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Result Badge ──────────────────────────────────────────────
function ResultBadge({ value }) {
  const v = (value || 'pendiente').toLowerCase()
  const s = { gol: { label: 'Gol', bg: 'rgba(34,197,94,0.15)', color: '#4ade80' }, atajada: { label: 'Atajada', bg: 'rgba(0,102,179,0.20)', color: '#60a5fa' }, pendiente: { label: 'Pendiente', bg: 'rgba(234,179,8,0.12)', color: '#facc15' } }
  const st = s[v] || s.pendiente
  return <span className="px-2 py-0.5 rounded text-[0.62rem] font-semibold whitespace-nowrap" style={{ background: st.bg, color: st.color }}>{st.label}</span>
}

// ─── Dashboard principal ───────────────────────────────────────
export default function Dashboard() {
  const [authed,  setAuthed]  = useState(() => sessionStorage.getItem('mopa_auth') === '1')
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [tab,     setTab]     = useState('all')
  const [page,    setPage]    = useState(0)

  const fetchData = async () => {
    setLoading(true); setError(null)
    const { data: rows, error: err } = await supabase.from(TABLE).select('*').order('created_at', { ascending: false })
    if (err) setError(`Error al conectar con Supabase: ${err.message}`)
    else     setData(rows || [])
    setLoading(false)
  }

  useEffect(() => { if (authed) fetchData() }, [authed])

  const filtered = useMemo(() => filterByMarca(data, tab), [data, tab])

  // ── Métricas del brief ────────────────────────────────────────
  const participantes = filtered.length
  const conversion    = useMemo(() => {
    const jugaron = filtered.filter(r => r.resultado?.toLowerCase() !== 'pendiente').length
    return participantes > 0 ? Math.round((jugaron / participantes) * 100) : 0
  }, [filtered, participantes])

  const topProvincias = useMemo(() => {
    const c = {}
    filtered.forEach(r => { if (r.provincia) c[r.provincia] = (c[r.provincia] || 0) + 1 })
    return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 8)
  }, [filtered])

  const topConcs = useMemo(() => {
    const c = {}
    filtered.forEach(r => { if (r.concesionario) c[r.concesionario] = (c[r.concesionario] || 0) + 1 })
    return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 8)
  }, [filtered])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged      = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const handleDownload = (tabId) => {
    const rows  = filterByMarca(data, tabId)
    const label = MARCA_TABS.find(t => t.id === tabId)?.label || 'todo'
    downloadCSV(rows, `mopar-2026-${label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.csv`)
  }

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />

  return (
    <div className="bg-[#07070C] min-h-screen text-white font-sans">

      {/* ── Header ── */}
      <header className="border-b border-white/[0.06] px-6 h-[60px] flex items-center justify-between sticky top-0 z-40"
        style={{ background: 'rgba(7,7,12,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-4">
          <img src="/Logo_Mopar-NEGBlanco-02.png" alt="MOPAR" className="h-8 w-auto opacity-85" />
          <div className="w-px h-5 bg-white/10" />
          <div>
            <p className="font-condensed text-white/85 text-[0.78rem] tracking-widest uppercase leading-none">Panel Interno</p>
            <p className="text-white/28 text-[0.58rem] uppercase tracking-wider leading-none mt-0.5">Campaña Lubricantes 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={fetchData} className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs transition-colors">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Actualizar
          </button>
          <button onClick={() => { sessionStorage.removeItem('mopa_auth'); setAuthed(false) }}
            className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs transition-colors">
            <LogOut size={12} /> Salir
          </button>
        </div>
      </header>

      <main className="max-w-[1360px] mx-auto px-6 py-8 flex flex-col gap-6">

        {error && (
          <div className="flex items-center gap-2 text-red-400/75 text-sm p-4 border border-red-400/20 rounded-[2px] bg-red-400/5">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        {/* ── 1. Métricas principales ── */}
        <div>
          <p className="text-white/20 text-[0.6rem] uppercase tracking-widest font-semibold mb-3">Métricas de performance</p>
          <div className="grid grid-cols-2 gap-3 max-w-lg">
            <MetricCard label="Participantes" value={fmt(participantes)} icon={Users}      accent="#0066B3" />
            <MetricCard label="Conversión"    value={`${conversion}%`}  icon={TrendingUp} accent="#fb923c" sub="Jugaron del total" />
          </div>
        </div>

        {/* ── 2. Distribución por marca (clickeable = filtro) ── */}
        <div>
          <p className="text-white/20 text-[0.6rem] uppercase tracking-widest font-semibold mb-3">Por marca — hacé click para filtrar</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {MARCA_TABS.map(t => (
              <MarcaCard
                key={t.id}
                tab={t}
                count={t.marcas ? data.filter(r => t.marcas.includes(r.marca?.toLowerCase())).length : data.length}
                isActive={tab === t.id}
                onClick={() => { setTab(t.id); setPage(0) }}
              />
            ))}
          </div>
        </div>

        {/* ── 3. Distribución geográfica ── */}
        <div>
          <p className="text-white/20 text-[0.6rem] uppercase tracking-widest font-semibold mb-3">Distribución geográfica por concesionario</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <BarList title="Top Provincias"     icon={MapPin} items={topProvincias} />
            <BarList title="Top Concesionarias" icon={MapPin} items={topConcs}      />
          </div>
        </div>

        {/* ── 4. Engagement ── */}
        <EngagementChart data={filtered} />

        {/* ── 5. Tabla + descargas ── */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <p className="text-white/20 text-[0.6rem] uppercase tracking-widest font-semibold">
              Registros {tab !== 'all' ? `— ${MARCA_TABS.find(t => t.id === tab)?.label}` : '— Todos'} ({fmt(filtered.length)})
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-white/25 text-xs flex items-center gap-1"><Download size={11} /> Descargar CSV:</span>
              {MARCA_TABS.map(t => (
                <button key={t.id} onClick={() => handleDownload(t.id)}
                  className="px-3 py-1.5 rounded-[2px] text-xs border border-white/[0.08] text-white/45 hover:text-white/75 hover:bg-white/[0.05] transition-all">
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2px] border border-white/[0.08] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)' }} className="border-b border-white/[0.08]">
                    {['Nombre', 'Email', 'Patente', 'Marca', 'Provincia', 'Concesionario', 'Resultado', 'Chances', 'Fecha'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-white/30 text-[0.62rem] uppercase tracking-widest font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={9} className="text-center py-14 text-white/25 text-sm">Cargando datos...</td></tr>
                  ) : paged.length === 0 ? (
                    <tr><td colSpan={9} className="text-center py-14 text-white/20 text-sm">Sin registros</td></tr>
                  ) : paged.map(r => (
                    <tr key={r.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-white/80 whitespace-nowrap">{r.nombre        || '—'}</td>
                      <td className="px-4 py-3 text-white/40 text-xs">{r.email                  || '—'}</td>
                      <td className="px-4 py-3 text-white/55 font-mono text-xs">{r.patente       || '—'}</td>
                      <td className="px-4 py-3 text-white/65">{r.marca                           || '—'}</td>
                      <td className="px-4 py-3 text-white/55">{r.provincia                       || '—'}</td>
                      <td className="px-4 py-3 text-white/45 text-xs max-w-[180px] truncate">{r.concesionario || '—'}</td>
                      <td className="px-4 py-3"><ResultBadge value={r.resultado} /></td>
                      <td className="px-4 py-3 text-white/50 text-center">{r.chances             || '—'}</td>
                      <td className="px-4 py-3 text-white/30 text-xs whitespace-nowrap">
                        {r.created_at ? new Date(r.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' }) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <span className="text-white/28 text-xs">{fmt(filtered.length)} registros · Pág. {page + 1}/{totalPages}</span>
                <div className="flex gap-2">
                  <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
                    className="px-3 py-1.5 rounded-[2px] text-xs border border-white/[0.08] text-white/45 disabled:opacity-25 hover:bg-white/[0.05] transition-colors">
                    ← Anterior
                  </button>
                  <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}
                    className="px-3 py-1.5 rounded-[2px] text-xs border border-white/[0.08] text-white/45 disabled:opacity-25 hover:bg-white/[0.05] transition-colors">
                    Siguiente →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-8" />
      </main>
    </div>
  )
}

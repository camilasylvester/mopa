import { useState, useEffect, useMemo } from 'react'
import { Download, LogOut, Users, TrendingUp, MapPin, RefreshCw, AlertCircle, Store } from 'lucide-react'
import { supabase, TABLE } from '../lib/supabase.js'
import { DEALERS } from '../data/dealers.js'

const PASSWORD  = 'promomopar'
const PAGE_SIZE = 50

const MARCA_TABS = [
  { id: 'all',     label: 'Todas',      marcas: null },
  { id: 'jeepram', label: 'Jeep y RAM', marcas: ['jeep', 'ram', 'jeep / ram'] },
  { id: 'peugeot', label: 'Peugeot',    marcas: ['peugeot'] },
  { id: 'citroen', label: 'Citroën',    marcas: ['citroën', 'citroen'] },
  { id: 'fiat',    label: 'Fiat',       marcas: ['fiat'] },
]

// DEALERS keys por tab
const DEALERS_KEY = {
  jeepram: ['Jeep'],
  peugeot: ['Peugeot'],
  citroen: ['Citroën'],
  fiat:    ['Fiat'],
  all:     ['Jeep', 'Peugeot', 'Citroën', 'Fiat'],
}

// Lista plana de concesionarios de DEALERS para un tab
function getDealerList(tabId) {
  const keys = DEALERS_KEY[tabId] || []
  return keys.flatMap(key =>
    Object.entries(DEALERS[key] || {}).flatMap(([provincia, concs]) =>
      concs.map(c => ({ concesionario: c, provincia, marca: key === 'Jeep' && tabId === 'jeepram' ? 'Jeep / RAM' : key }))
    )
  )
}

// Normalizar nombre para comparación flexible
const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()

// ─── CSV concesionarios (para el cliente) ─────────────────────
function downloadConcesionariosCSV(allData, tabId) {
  const tab      = MARCA_TABS.find(t => t.id === tabId)
  const filtered = filterByMarca(allData, tabId)

  // Contar registros por concesionario (normalizado)
  const countMap = {}
  filtered.forEach(r => {
    if (r.concesionario) {
      const k = norm(r.concesionario)
      countMap[k] = (countMap[k] || 0) + 1
    }
  })

  const dealers = getDealerList(tabId)
  const esc = v => `"${String(v ?? '').replace(/"/g, '""')}"`

  // Asignar estado a cada concesionario del DEALERS
  const rows = dealers.map(d => {
    const dn  = norm(d.concesionario)
    const key = Object.keys(countMap).find(k => k.includes(dn) || dn.includes(k)) || null
    const cnt = key ? countMap[key] : 0
    return { ...d, count: cnt, registered: cnt > 0 }
  })

  // Registrados primero, luego no registrados
  rows.sort((a, b) => {
    if (a.registered && !b.registered) return -1
    if (!a.registered && b.registered) return 1
    return b.count - a.count
  })

  const lines = [
    ['Marca', 'Provincia', 'Concesionario', 'Estado', 'Registros'].join(','),
    ...rows.map(r => [
      r.marca, r.provincia, r.concesionario,
      r.registered ? 'REGISTRADO' : 'NO REGISTRADO',
      r.count
    ].map(esc).join(','))
  ]

  const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url
  a.download = `concesionarios-${tab?.label || 'todos'}.csv`
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function filterByMarca(data, tabId) {
  const tab = MARCA_TABS.find(t => t.id === tabId)
  if (!tab?.marcas) return data
  return data.filter(r => tab.marcas.includes(r.marca?.toLowerCase()))
}

function fmt(n) { return (n || 0).toLocaleString('es-AR') }

// Conversión de concesionarios: activos / total
function useConversionConcs(data, tabId) {
  return useMemo(() => {
    const filtered = filterByMarca(data, tabId)
    const registeredNorms = new Set(filtered.map(r => norm(r.concesionario)).filter(Boolean))
    const dealers = getDealerList(tabId)
    const active = dealers.filter(d => {
      const dn = norm(d.concesionario)
      return [...registeredNorms].some(k => k.includes(dn) || dn.includes(k))
    }).length
    return { active, total: dealers.length, pct: dealers.length > 0 ? Math.round((active / dealers.length) * 100) : 0 }
  }, [data, tabId])
}

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
    <div className="rounded-[2px] px-6 py-5 flex flex-col gap-2"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${accent}40`,
        boxShadow: `0 0 30px ${accent}18`,
        backdropFilter: 'blur(10px)',
      }}>
      <div className="flex items-center gap-2">
        <Icon size={13} style={{ color: accent }} />
        <span className="font-condensed text-[0.68rem] uppercase tracking-[0.2em] font-semibold" style={{ color: `${accent}cc` }}>{label}</span>
      </div>
      <span className="font-display text-white" style={{ fontSize: 'clamp(2.2rem, 3vw, 3rem)', textShadow: `0 0 40px ${accent}55` }}>{value}</span>
      {sub && <span className="text-white/35 text-[0.65rem]">{sub}</span>}
    </div>
  )
}

// Logos por tab
const TAB_LOGOS = {
  all:     ['/Logo_Mopar-NEGBlanco-02.png'],
  jeepram: ['/logos/jeep.png', '/logos/ram.png'],
  peugeot: [],
  citroen: ['/logos/citroen.png'],
  fiat:    ['/logos/fiat.png'],
}

// ─── Marca Card (clickeable) ───────────────────────────────────
function MarcaCard({ tab, count, conv, isActive, onClick }) {
  const logos = TAB_LOGOS[tab.id] || []
  return (
    <button onClick={onClick}
      className="rounded-[2px] px-4 py-4 flex flex-col gap-2 text-left transition-all duration-300 w-full"
      style={{
        background:     isActive ? 'rgba(0,102,179,0.12)' : 'rgba(255,255,255,0.04)',
        border:         `1px solid ${isActive ? 'rgba(0,102,179,0.55)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow:      isActive ? '0 0 30px rgba(0,102,179,0.18)' : 'none',
        backdropFilter: 'blur(10px)',
      }}>

      {/* Logos */}
      <div className="flex items-center gap-2 h-6">
        {logos.length > 0 ? logos.map((src, i) => (
          <img key={i} src={src} alt="" className="h-5 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)', opacity: isActive ? 0.9 : 0.3 }} />
        )) : (
          <span className="font-condensed text-[0.6rem] uppercase tracking-widest"
            style={{ color: isActive ? 'rgba(0,102,179,0.9)' : 'rgba(255,255,255,0.25)' }}>
            {tab.label}
          </span>
        )}
      </div>

      {/* Participantes */}
      <span className="font-display text-white" style={{ fontSize: 'clamp(1.6rem, 2vw, 2.2rem)' }}>
        {fmt(count)}
        <span className="text-white/30 text-sm font-sans ml-1.5">participantes</span>
      </span>

      {/* Conversión — solo cuando está activa */}
      {isActive && conv && (
        <div className="border-t border-white/[0.08] pt-2 mt-0.5 flex items-center justify-between">
          <span className="text-white/40 text-xs">{conv.active} de {conv.total} concesionarios</span>
          <span className="font-display text-[#0066B3] text-xl">{conv.pct}%</span>
        </div>
      )}
    </button>
  )
}

// ─── Bar List ──────────────────────────────────────────────────
function BarList({ title, icon: Icon, items, accent = '#0066B3' }) {
  const max = items[0]?.[1] || 1
  return (
    <div className="rounded-[2px] px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
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
    <div className="rounded-[2px] px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
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
  const convGeneral   = useConversionConcs(data, tab)
  const convJeepRam   = useConversionConcs(data, 'jeepram')
  const convPeugeot   = useConversionConcs(data, 'peugeot')
  const convCitroen   = useConversionConcs(data, 'citroen')
  const convFiat      = useConversionConcs(data, 'fiat')

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
    <div className="relative bg-[#07070C] min-h-screen text-white font-sans">

      {/* ── Imagen de fondo con overlay ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/fondo.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
        }} />
        <div className="absolute inset-0" style={{ background: 'rgba(7,7,12,0.88)' }} />
        {/* Degradado inferior para que la tabla sea legible */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(7,7,12,0.6) 50%, rgba(7,7,12,0.97) 75%)'
        }} />
      </div>

      {/* ── Header ── */}
      <header className="relative z-40 border-b border-white/[0.08] px-6 h-[64px] flex items-center justify-between sticky top-0"
        style={{ background: 'rgba(7,7,12,0.80)', backdropFilter: 'blur(20px)' }}>
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

      <main className="relative z-10 max-w-[1360px] mx-auto px-6 py-8 flex flex-col gap-6">

        {error && (
          <div className="flex items-center gap-2 text-red-400/75 text-sm p-4 border border-red-400/20 rounded-[2px] bg-red-400/5">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        {/* ── 1. Métricas principales ── */}
        <div>
          <div className="flex items-center gap-3 mb-4"><span className="w-5 h-px bg-mopar-blue" /><p className="font-condensed text-white/40 text-[0.68rem] uppercase tracking-[0.2em] font-semibold">Métricas de performance</p></div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <MetricCard label="Participantes"            value={fmt(participantes)}                          icon={Users}      accent="#0066B3" />
            <MetricCard label="Concesionarios activos"   value={`${convGeneral.active} / ${convGeneral.total}`} icon={Store}      accent="#4ade80" sub="Con al menos 1 registro" />
            <MetricCard label="Conversión concesionarios" value={`${convGeneral.pct}%`}                      icon={TrendingUp} accent="#fb923c" sub={`${convGeneral.active} de ${convGeneral.total} concesionarios`} />
          </div>

          {/* Conversión por marca */}
        </div>

        {/* ── 2. Distribución por marca (clickeable = filtro) ── */}
        <div>
          <div className="flex items-center gap-3 mb-4"><span className="w-5 h-px bg-mopar-blue" /><p className="font-condensed text-white/40 text-[0.68rem] uppercase tracking-[0.2em] font-semibold">Por marca — hacé click para filtrar</p></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {MARCA_TABS.map(t => {
              const convMap = { all: convGeneral, jeepram: convJeepRam, peugeot: convPeugeot, citroen: convCitroen, fiat: convFiat }
              return (
                <MarcaCard
                  key={t.id}
                  tab={t}
                  count={t.marcas ? data.filter(r => t.marcas.includes(r.marca?.toLowerCase())).length : data.length}
                  conv={convMap[t.id]}
                  isActive={tab === t.id}
                  onClick={() => { setTab(t.id); setPage(0) }}
                />
              )
            })}
          </div>
        </div>

        {/* ── 3. Descargas por marca ── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px bg-mopar-blue" />
            <p className="font-condensed text-white/40 text-[0.68rem] uppercase tracking-[0.2em] font-semibold">Descargar concesionarios por marca</p>
          </div>

          {/* Card general — solo cuando están "Todas" */}
          {tab === 'all' && <div className="rounded-[2px] border border-mopar-blue/40 px-6 py-5 mb-3 flex flex-wrap items-center justify-between gap-4"
            style={{ background: 'rgba(0,102,179,0.08)', backdropFilter: 'blur(10px)' }}>
            <div>
              <p className="font-condensed text-white text-lg uppercase tracking-wide mb-1">Todas las marcas</p>
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-sm" style={{ color: '#4ade80' }}>
                  <span className="w-2 h-2 rounded-full bg-current" /> {convGeneral.active} registrados
                </span>
                <span className="flex items-center gap-1.5 text-sm text-white/35">
                  <span className="w-2 h-2 rounded-full bg-current" /> {convGeneral.total - convGeneral.active} sin registrar
                </span>
              </div>
            </div>
            <button onClick={() => downloadConcesionariosCSV(data, 'all')}
              className="flex items-center gap-2.5 px-6 py-3 rounded-[2px] text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: '#0066B3' }}>
              <Download size={15} /> Descargar CSV — Todas
            </button>
          </div>}

          {/* Cards por marca — filtra según tab activo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { tabId: 'jeepram', label: 'Jeep y RAM', conv: convJeepRam, logos: ['/logos/jeep.png', '/logos/ram.png'] },
              { tabId: 'peugeot', label: 'Peugeot',    conv: convPeugeot, logos: [] },
              { tabId: 'citroen', label: 'Citroën',    conv: convCitroen, logos: ['/logos/citroen.png'] },
              { tabId: 'fiat',    label: 'Fiat',       conv: convFiat,    logos: ['/logos/fiat.png'] },
            ].filter(({ tabId }) => tab === 'all' || tab === tabId).map(({ tabId, label, conv, logos }) => (
              <div key={tabId} className="rounded-[2px] border border-white/[0.14] px-5 py-5 flex flex-col gap-4"
                style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}>

                {/* Logo + nombre */}
                <div className="flex items-center gap-3">
                  {logos.map((src, i) => (
                    <img key={i} src={src} alt="" className="h-6 w-auto object-contain"
                      style={{ filter: 'brightness(0) invert(1)', opacity: 0.75 }} />
                  ))}
                  {logos.length === 0 && (
                    <span className="font-condensed text-white/60 text-sm uppercase tracking-wider">{label}</span>
                  )}
                </div>

                {/* Números grandes */}
                <div className="flex gap-4">
                  <div>
                    <span className="font-display block" style={{ fontSize: '2.4rem', color: '#4ade80', lineHeight: 1 }}>{conv.active}</span>
                    <span className="text-white/35 text-xs">registrados</span>
                  </div>
                  <div>
                    <span className="font-display block" style={{ fontSize: '2.4rem', color: 'rgba(255,255,255,0.25)', lineHeight: 1 }}>{conv.total - conv.active}</span>
                    <span className="text-white/25 text-xs">sin registrar</span>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
                  <div className="h-full rounded-full" style={{ width: `${conv.pct}%`, background: '#4ade80', transition: 'width 0.5s ease' }} />
                </div>
                <span className="text-white/30 text-xs -mt-2">{conv.pct}% de {conv.total} concesionarios</span>

                {/* Botón */}
                <button onClick={() => downloadConcesionariosCSV(data, tabId)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-[2px] text-sm font-semibold text-white/80 border border-white/[0.10] hover:border-mopar-blue hover:text-white hover:bg-mopar-blue/10 transition-all">
                  <Download size={14} /> Descargar CSV
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Distribución geográfica ── */}
        <div>
          <div className="flex items-center gap-3 mb-4"><span className="w-5 h-px bg-mopar-blue" /><p className="font-condensed text-white/40 text-[0.68rem] uppercase tracking-[0.2em] font-semibold">Distribución geográfica por concesionario</p></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <BarList title="Top Provincias"     icon={MapPin} items={topProvincias} />
            <BarList title="Top Concesionarias" icon={MapPin} items={topConcs}      />
          </div>
        </div>

        {/* ── 5. Engagement ── */}
        <EngagementChart data={filtered} />

        <div className="h-8" />
      </main>
    </div>
  )
}

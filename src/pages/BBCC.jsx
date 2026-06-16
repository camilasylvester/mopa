import { useState } from 'react'
import { Download, FileText, ChevronDown } from 'lucide-react'

const DOCS = [
  {
    id: 'bbcc',
    title: 'Bases y Condiciones',
    subtitle: 'BBCC Mopar Invierno 2026 — Clientes',
    file: '/bbcc-clientes.pdf',
  },
  {
    id: 'anexo',
    title: 'Anexo 1',
    subtitle: 'Cliente Final',
    file: '/anexo-1-clientes.pdf',
  },
]

function DocCard({ doc }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}>
      {/* Header */}
      <div className="bg-[#0066B3] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-white/80" />
          <div>
            <p className="font-condensed font-bold text-white uppercase tracking-widest text-sm">{doc.title}</p>
            <p className="text-white/60 text-xs mt-0.5">{doc.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={doc.file}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-[#0066B3] bg-white hover:bg-white/90 transition-colors"
          >
            <Download size={12} /> Descargar
          </a>
          <button
            onClick={() => setOpen(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
          >
            {open ? 'Cerrar' : 'Ver'}
            <ChevronDown size={12} className="transition-transform" style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* PDF embed */}
      {open && (
        <div className="bg-[#1a1a2e]">
          <iframe
            src={doc.file}
            title={doc.title}
            className="w-full"
            style={{ height: '80vh', border: 'none' }}
          />
        </div>
      )}
    </div>
  )
}

export default function BBCC() {
  return (
    <div className="min-h-screen font-sans" style={{ background: '#07070C' }}>
      {/* Header */}
      <header className="bg-[#07070C] px-6 h-[64px] flex items-center sticky top-0 z-40"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
        <div className="max-w-[860px] mx-auto w-full flex items-center gap-4">
          <div className="bg-[#07070C] rounded-md px-3 py-1.5">
            <img src="/Logo_Mopar-NEGBlanco-02.png" alt="MOPAR" className="h-7 w-auto" />
          </div>
          <div className="w-px h-5 bg-white/15" />
          <div>
            <p className="font-condensed text-white text-[0.78rem] tracking-widest uppercase leading-none">Bases y Condiciones</p>
            <p className="text-white/40 text-[0.58rem] uppercase tracking-wider leading-none mt-0.5">Campaña Lubricantes MOPAR 2026</p>
          </div>
        </div>
      </header>

      <main className="max-w-[860px] mx-auto px-6 py-10 flex flex-col gap-5">
        <div className="mb-2">
          <h1 className="font-condensed text-white text-3xl uppercase tracking-wide mb-1">Documentación oficial</h1>
          <p className="text-white/40 text-sm">Campaña Lubricantes Mopar — Invierno 2026</p>
        </div>

        {DOCS.map(doc => <DocCard key={doc.id} doc={doc} />)}
      </main>
    </div>
  )
}

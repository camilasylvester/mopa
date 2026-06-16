import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ModuleCards from './components/ModuleCards.jsx'
import Footer from './components/Footer.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BBCC from './pages/BBCC.jsx'

export default function App() {
  if (window.location.search.includes('dashboard') ||
      window.location.pathname.startsWith('/dashboard') ||
      window.location.hash === '#dashboard') return <Dashboard />

  if (window.location.pathname.startsWith('/byc') ||
      window.location.hostname === 'byc.serviciomopar.com') return <BBCC />

  // Lifted state: which module card is open + selected brands per module
  const [openModule, setOpenModule]       = useState(null)
  const [selectedBrands, setSelectedBrands] = useState({})

  // Called from the nav or BrandRow for quick-access by brand
  const handleNavModuleOpen = (moduleId) => {
    setOpenModule(moduleId)
    // Scroll handled at call site
  }

  const handleBrandQuickAccess = (brandId) => {
    // Opens Material POP with the chosen brand pre-selected
    setOpenModule('material-pop')
    setSelectedBrands((prev) => ({ ...prev, 'material-pop': brandId }))
    document.getElementById('modulos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#07070C] min-h-screen text-white font-sans">
      <Header onNavClick={handleNavModuleOpen} />
      <Hero />
      <ModuleCards
        openModule={openModule}
        setOpenModule={setOpenModule}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
      />
      <Footer />
    </div>
  )
}

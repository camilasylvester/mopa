import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ModuleCards from './components/ModuleCards.jsx'
import Footer from './components/Footer.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App() {
  const path = window.location.pathname
  const hash = window.location.hash
  if (path.startsWith('/dashboard') || hash === '#dashboard') return <Dashboard />

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

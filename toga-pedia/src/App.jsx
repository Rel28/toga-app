import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import KatalogToga from './pages/KatalogToga'
import RekomendasiSPK from './pages/RekomendasiSPK'
import HasilSPK from './pages/HasilSPK'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/katalog-toga" element={<KatalogToga />} />
        <Route path="/rekomendasi" element={<RekomendasiSPK />} />
        <Route path="/hasil-spk" element={<HasilSPK />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
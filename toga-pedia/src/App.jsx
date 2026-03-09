import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import KatalogToga from './pages/KatalogToga'
import RekomendasiSPK from './pages/RekomendasiSPK'
import HasilSPK from './pages/HasilSPK'
import DetailToga from './pages/DetailToga'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import DataTabel from './pages/admin/DataTabel'
import Tentang from './pages/Tentang'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/katalog-toga" element={<KatalogToga />} />
        <Route path="/rekomendasi" element={<RekomendasiSPK />} />
        <Route path="/katalog-toga/:id" element={<DetailToga />} />
        <Route path="/hasil-spk" element={<HasilSPK />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/table-data" element={<DataTabel />} />
        <Route path="/tentang" element={<Tentang />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
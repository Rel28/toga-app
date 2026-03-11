import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ecoImage from '../../assets/eco.svg'
import kategoriImage from '../../assets/kategori.svg'
import criteriaImage from '../../assets/criteria.svg'
import AdminNav from '../../components/admin/AdminNav'

const StatCard = ({ icon, value, label, accent, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
  >
    <div className="flex items-center justify-between">
      <div className={`w-14 h-14 ${accent} rounded-xl flex items-center justify-center`}>
        <img src={icon} alt={label} className="w-7 h-7" />
      </div>
      <svg className="w-5 h-5 text-gray-300 group-hover:text-[#357C23] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
    <div>
      <p className="font-lexend text-4xl font-semibold text-[#2C2C2C]">{value}</p>
      <p className="font-lexend text-sm text-[#ACACAC] mt-1">{label}</p>
    </div>
    <div className={`h-1 w-full rounded-full ${accent} opacity-40`}></div>
  </div>
)

const DashboardAdmin = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ tanaman: 0, kategori: 0, kriteria: 0 })
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
  const fetchAll = async () => {
    try {
      const [tanamanRes, kategoriRes, kriteriaRes, feedbackRes] = await Promise.all([
        fetch('http://localhost:5000/api/tanaman'),
        fetch('http://localhost:5000/admin/kategori'),
        fetch('http://localhost:5000/admin/kriteria'),
        fetch('http://localhost:5000/api/feedback')
      ])
      const [tanaman, kategori, kriteria, feedback] = await Promise.all([
        tanamanRes.json(),
        kategoriRes.json(),
        kriteriaRes.json(),
        feedbackRes.json()
      ])
      setStats({
        tanaman: tanaman.length,
        kategori: kategori.length,
        kriteria: kriteria.length,
      })
      setFeedbacks(feedback)
    } catch (err) {
      console.error('Gagal mengambil data statistik:', err)
    }
  }

  fetchAll()
}, [])

  const medalColors = ['bg-yellow-400', 'bg-gray-300', 'bg-amber-600']
  const medalLabel = ['🥇', '🥈', '🥉']

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <AdminNav />

      <div className="ml-16 transition-all duration-300">
        {/* Welcome Banner */}
        <div className="bg-gray-400 px-8 md:px-16 py-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-lexend text-white text-sm mb-1">Selamat datang kembali</p>
              <h1 className="font-lexend text-2xl md:text-3xl font-bold text-white">Halo, Admin!</h1>
              <p className="font-lexend text-sm text-white mt-1">
                Pantau dan kelola seluruh konten Toga-Pedia dari panel ini.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-16 py-8 space-y-8">

          {/* Stat Cards */}
          <div>
            <h2 className="font-lexend font-semibold mb-4 uppercase tracking-wide text-xs text-gray-400">
              Ringkasan Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <StatCard
                icon={ecoImage}
                value={stats.tanaman}
                label="Total Tanaman"
                accent="bg-[#DCFCE7]"
                onClick={() => navigate('/admin/table-data')}
              />
              <StatCard
                icon={kategoriImage}
                value={stats.kategori}
                label="Total Kategori"
                accent="bg-[#DBEAFE]"
                onClick={() => navigate('/admin/table-data')}
              />
              <StatCard
                icon={criteriaImage}
                value={stats.kriteria}
                label="Total Kriteria"
                accent="bg-[#FEF9C3]"
                onClick={() => navigate('/admin/table-data')}
              />
            </div>
          </div>

          {/* Bottom Section: Top 3 + Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            {/* Feedback */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-lexend text-base font-semibold text-[#2C2C2C]">Feedback Terbaru</h2>
                <span className="text-xs font-lexend text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{feedbacks.length} pesan</span>
              </div>
              <div className="space-y-3">
                {feedbacks.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 bg-[#357C23] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {item.nama.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-lexend text-sm font-medium text-[#2C2C2C]">{item.nama}</p>
                        <p className="font-lexend text-xs text-[#ACACAC] shrink-0">{item.tanggal}</p>
                      </div>
                      <p className="font-lexend text-xs text-[#ACACAC] mt-0.5 truncate">{item.pesan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin
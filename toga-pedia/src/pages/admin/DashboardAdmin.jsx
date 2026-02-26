import React,  { useState, useEffect } from 'react'
import ecoImage from '../../assets/eco.svg'
import AdminNav from '../../components/admin/AdminNav'

const DashboardAdmin = () => {
    // State untuk menyimpan data yang akan ditampilkan di dashboard
    const [stats, setStats] = useState({
        tanaman: 0,
        kategori: 0,
        kriteria: 0
    })
    const [riwayatTop, setRiwayatTop] = useState([])
    const [feedbacks, setFeedbacks] = useState([])

    // Set nilai sementara untuk ditampilkan
    useEffect(() => {
    // Mock Data Statistik
        setStats({ tanaman: 25, kategori: 3, kriteria: 6 });

        // Mock Data Top 3 Tanaman (Sering Menang)
        setRiwayatTop([
        { peringkat: 1, nama_tanaman: 'Kunyit', total_kemenangan: 142 },
        { peringkat: 2, nama_tanaman: 'Jahe Merah', total_kemenangan: 98 },
        { peringkat: 3, nama_tanaman: 'Sambiloto', total_kemenangan: 45 },
        ]);

        // Mock Data Feedback
        setFeedbacks([
        { id: 1, nama: 'Budi', pesan: 'Sistemnya sangat membantu untuk tugas sekolah!', tanggal: '2026-02-24' },
        { id: 2, nama: 'Siti', pesan: 'Tolong tambahkan data tanaman Kumis Kucing.', tanggal: '2026-02-23' },
        ]);
    }, []);
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
        {/* Navbar */}
        <AdminNav />
        <div className="ml-12">
            {/* Title */}
            <section className="pt-12 pb-12 px-6 md:px-16">
                <h1 className="font-lexend text-2xl md:text-3xl font-semibold text-[#2C2C2C]">Halo, Admin!</h1>
                <p className="font-lexend text-sm md:text-base font-normal text-[#ACACAC]">Pantau dan atur seluruh konten aplikasi TOGA Anda <br />dari panel ini.</p>
            </section>

            {/* Statistik Data */}
            <section className="px-6 md:px-16">
                {/* Title */}
                <h2 className="font-lexend text-xl md:text-3xl font-semibold text-[#2C2C2C] mb-3">Dashboard</h2>

                {/* Statistik Card */}
                <div className="flex flex-col md:flex-row gap-6 max-w-300">
                    {/* Card Tanaman */}
                    <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 w-full">
                        <div className="flex mb-6">
                            {/* Icon */}
                            <div className="w-18 h-18 bg-[#92E3B8] rounded-lg flex items-center justify-center">
                                <img src={ecoImage} alt="Tanaman Icon" class="w-10 h-10"></img>
                            </div>
                            {/* Text */}
                            <div className="ml-4">
                                <h1 className="font-lexend text-4xl font-medium text-[#2C2C2C]">{stats.tanaman}</h1>
                                <p className="font-lexend text-lg font-normal text-[#ACACAC]">Data Tanaman</p>
                            </div>
                        </div>
                        <div className="w-full h-0.5 bg-[#E4E4E4] mb-6"></div>
                        <div className="flex">
                            {/* Lihat Detail */}
                            <button className="flex items-center justify-between w-full text-base font-lexend font-normal text-[#A4A4A4] hover:underline cursor-pointer">
                                <span>Lihat Detail</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="stroke-current ml-auto">
                                    <path d="M7.5 15L12.5 10L7.5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Card Kategori */}
                    <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 w-full">
                        <div className="flex mb-6">
                            {/* Icon */}
                            <div className="w-18 h-18 bg-[#92E3B8] rounded-lg flex items-center justify-center">
                                <img src={ecoImage} alt="Tanaman Icon" class="w-10 h-10"></img>
                            </div>
                            {/* Text */}
                            <div className="ml-4">
                                <h1 className="font-lexend text-4xl font-medium text-[#2C2C2C]">{stats.kategori}</h1>
                                <p className="font-lexend text-lg font-normal text-[#ACACAC]">Data Kategori</p>
                            </div>
                        </div>
                        <div className="w-full h-0.5 bg-[#E4E4E4] mb-6"></div>
                        <div className="flex">
                            {/* Lihat Detail */}
                            <button className="flex items-center justify-between w-full text-base font-lexend font-normal text-[#A4A4A4] hover:underline cursor-pointer">
                                <span>Lihat Detail</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="stroke-current ml-auto">
                                    <path d="M7.5 15L12.5 10L7.5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Card Kriteria */}
                    <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 w-full">
                        <div className="flex mb-6">
                            {/* Icon */}
                            <div className="w-18 h-18 bg-[#92E3B8] rounded-lg flex items-center justify-center">
                                <img src={ecoImage} alt="Tanaman Icon" class="w-10 h-10"></img>
                            </div>
                            {/* Text */}
                            <div className="ml-4">
                                <h1 className="font-lexend text-4xl font-medium text-[#2C2C2C]">{stats.kriteria}</h1>
                                <p className="font-lexend text-lg font-normal text-[#ACACAC]">Data Kriteria</p>
                            </div>
                        </div>
                        <div className="w-full h-0.5 bg-[#E4E4E4] mb-6"></div>
                        <div className="flex">
                            {/* Lihat Detail */}
                            <button className="flex items-center justify-between w-full text-base font-lexend font-normal text-[#A4A4A4] hover:underline cursor-pointer">
                                <span>Lihat Detail</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="stroke-current ml-auto">
                                    <path d="M7.5 15L12.5 10L7.5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Riwayat Konsultasi */}
            <section className="px-6 md:px-16 mt-10 mb-10">
                {/* Title */}
                <h2 className="font-lexend text-xl md:text-3xl font-semibold text-[#2C2C2C] mb-3">Riwayat Konsultasi</h2>

                <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">Ranking</th>
                                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">Nama Tanaman</th>
                                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">Total Kemenangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riwayatTop.map((item) => (
                                <tr key={item.peringkat} className="border-b-2 border-gray-200 last:border-b-0">
                                    <td className="font-lexend text-sm text-[#ACACAC] py-4 text-center">{item.peringkat}</td>
                                    <td className="font-lexend text-sm text-[#ACACAC] py-4 text-center">{item.nama_tanaman}</td>
                                    <td className="font-lexend text-sm text-[#ACACAC] py-4 text-center">{item.total_kemenangan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Feedback */}
            <section className="px-6 md:px-16 mt-10 mb-10">
                {/* Title */}
                <h2 className="font-lexend text-xl md:text-3xl font-semibold text-[#2C2C2C] mb-3">Feedback</h2>

                <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">Tanggal Feedback</th>
                                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">Pesan Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((item) => (
                                <tr key={item.tanggal} className="border-b-2 border-gray-200 last:border-b-0">
                                    <td className="font-lexend text-sm text-[#ACACAC] py-4 text-center">{item.tanggal}</td>
                                    <td className="font-lexend text-sm text-[#ACACAC] py-4 text-center">{item.pesan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>
  )
}

export default DashboardAdmin
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import togaImage from '../assets/images/toga-image.jpg'

const Home = () => {
    // 1. Placeholder Data
    const [trendingToga, setTrendingToga] = useState([
        {
        id: 1,
        name: "Jahe Merah",
        category: "Rimpang",
        desc: "Efektif untuk menghangatkan tubuh dan meningkatkan imunitas alami.",
        image: "https://placehold.co/600x400/png"
        },
        {
        id: 2,
        name: "Lidah Buaya",
        category: "Daun",
        desc: "Dikenal luas untuk perawatan kulit, rambut, dan meredakan panas dalam.",
        image: "https://placehold.co/600x400/png"
        },
        {
        id: 3,
        name: "Kumis Kucing",
        category: "Bunga & Daun",
        desc: "Sering digunakan untuk membantu mengobati infeksi saluran kencing.",
        image: "https://placehold.co/600x400/png"
        }
    ]);

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
        {/* Navbar */}
        <Navbar />

        {/* Section Utama */}
        <motion.section 
        className="min-h-screen max-w-screen mx-auto px-6 md:px-16 py-25 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        >
            {/* Teks Kiri */}
            <div className="space-y-4 md:space-y-6"
            >
                <h1 className="text-[20px] md:text-[40px] font-lexend font-bold text-gray-800 leading-tight w-full">
                    Temukan Tanaman Obat (TOGA) <br /> <span className="text-[#357C23] text-[18px] md:text-[35px]">yang Paling Sesuai Untuk Anda</span>
                </h1>

                <p className="text-gray-600 text-[16px] md:text-[20px] leading-relaxed max-w-200">
                Sistem ini membantu Anda memilih TOGA terbaik di Indonesia. 
                Rekomendasi didasarkan pada 6 kriteria seperti masa panen, 
                biaya perawatan, dan harga jual.
                </p>

                <button className="mt-4 bg-[#357C23] text-white px-8 py-4 font-lexend rounded-full font-medium text-lg md:text-xl hover:bg-[#446325] transition shadow-lg cursor-pointer">
                Mulai Rekomendasi
                </button>
            </div>

            {/* Gambar Kanan */}
            <img 
                src={togaImage} 
                alt="Gambar Toga" 
                className="w-full h-auto border border-gray-200 rounded-2xl flex mx-auto shadow-sm relative overflow-hidden order-first md:order-0"
            />
        </motion.section>
        
        {/* Section Rekomendasi */}
        <div className="min-h-screen bg-[#F5F5F5] py-16 md:py-20">
        <motion.section 
        className="flex items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        >
            <div className="max-w-screen mx-auto px-6 md:px-16 w-full">
            
                {/* Judul */}
                <div className="text-center">
                    <h2 className="text-[30px] md:text-[50px] font-lexend font-medium text-black">
                        Jalur <span className="text-[#557C2F]">Rekomendasi</span>
                    </h2>
                </div>

                {/* Grid Konten */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-16">
                    {/* Konten 1: Rekomendasi Cepat */}
                    <div className="flex items-start">
                        <div className="hidden md:block w-3 h-18 bg-[#357C23] rounded-l-[10px] mt-6
                         shrink-0"></div>
                        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm">
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                <h3 className="text-[25px] md:text-[30px] font-lexend font-medium text-[#357C23] md:mx-4 mt-2">Rekomendasi Cepat</h3>
                                </div>

                                <div className="flex md:flex-row flex-col items-start md:gap-14 gap-4 mt-6 mb-6 mx-4">
                                    <p className="text-gray-600 text-[14px] md:text-[18px] leading-relaxed text-justify">
                                    Telusuri kelompok tanaman yang sudah dikategorikan secara otomatis oleh sistem. Cocok jika Anda ingin melihat gambaran besar atau belum yakin kriteria apa yang penting bagi Anda. (Misalnya: "Kelompok Tanaman Bernilai Jual Tinggi" atau "Kelompok Tanaman Perawatan Murah").
                                    </p>
                                    <img src={togaImage} alt="" className="w-44 h-34 rounded-lg mx-auto md:mx-0 order-first md:order-0" />
                                </div>
                        </div>   
                    </div>

                    {/* Konten 2: Rekomendasi Spesifik */}
                    <div className="flex items-start">
                        <div className="hidden md:block w-3 h-18 bg-[#357C23] rounded-l-[10px] mt-6
                         shrink-0"></div>
                        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm">
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                <h3 className="text-[25px] md:text-[30px] font-lexend font-medium text-[#357C23] md:mx-4 mt-2">Rekomendasi Spesifik</h3>
                                </div>

                                <div className="flex md:flex-row flex-col items-start md:gap-14 gap-4 mt-6 mb-6 mx-4">
                                    <p className="text-gray-600 text-[14px] md:text-[18px] leading-relaxed text-justify">
                                    Tentukan sendiri tingkat kepentingan (bobot) untuk setiap kriteria. Sistem akan menghitung rekomendasi paling akurat untuk Anda menggunakan metode SAW dan TOPSIS. Anda dapat mengatur prioritas untuk 6 kriteria seperti Masa Panen, Biaya Perawatan, dan Harga Jual.
                                    </p>
                                    <img src={togaImage} alt="" className="w-44 h-34 rounded-lg mx-auto md:mx-0 order-first md:order-0" />
                                </div>
                        </div>   
                    </div>
                </div>
            </div>
        </motion.section>
        </div>

        {/* Section Item */}
        <motion.section 
        className="min-h-screen py-16 md:py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        >
            <div className="max-w-screen mx-auto px-6 md:px-16 w-full">

                {/* Judul */}
                <div className="text-center">
                    <h2 className="text-[30px] md:text-[50px] font-lexend font-medium text-black">
                        Telusuri <span className="text-[#357C23]">TOGA</span>
                    </h2>
                </div>

                {/* Grid Item */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-24">
                    {trendingToga.map((toga) => (
                        <div key={toga.id} className="border border-gray-200 rounded-lg p-6 md:p-10 shadow-sm transition duration-300 bg-white">
                            {/* Gambar */}
                            <img src={toga.image} alt={toga.name} className="w-full h-80 object-cover rounded-md mb-4" />

                            {/* Nama Toga */}
                            <div className="mb-6">
                                <h3 className="text-[20px] md:text-[25px] font-lexend font-semibold text-gray-800">{toga.name}</h3>
                                <p className="text-gray-500 text-[16px] md:text-[20px] font-lexend font-normal">{toga.category}</p>
                                <p className="text-gray-500 md:text-[18px] text-[15px] mt-5">{toga.desc}</p>
                            </div>

                            {/* Tombol Detail */}
                            <button className="flex items-center gap-2 bg-[#357C23] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-base md:text-lg font-semibold hover:bg-[#2a5d1a] transition cursor-pointer w-full md:w-auto justify-center">
                            Telusuri 
                            {/* Ikon Panah Kecil */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                            </button>                           
                        </div>
                    ))}

                    {/* Tombol Lihat Semua */}
                </div>
                <div className="mt-12 md:mt-18 flex justify-center">
                        <button className="bg-[#357C23] text-white px-8 py-4 rounded-full font-medium text-lg md:text-xl hover:bg-[#446325] transition shadow-md cursor-pointer w-full md:w-auto">
                        Lihat Semua
                        </button>
                    </div>
            </div>
        </motion.section>
    </div>
  )
}

export default Home
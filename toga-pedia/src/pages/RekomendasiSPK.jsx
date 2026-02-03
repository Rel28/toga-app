import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import SectionKuisioner from '../components/SectionKuisioner';

const RekomendasiSPK = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
        <Navbar />

    {/* Title Section */}
      <section className="pt-38 md:pb-12 pb-4 px-6 md:px-16">
        <div className="max-w-screen mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-lexend font-normal text-black">
            Rekomendasi <span className="text-[#357C23]">Spesifik</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-lg mx-auto mt-2 md:mt-3">
            Sesuaikan preferensi di bawah ini, dan kami akan merekomendasikan tanaman yang paling cocok untuk kondisi Anda.
          </p>
        </div>
      </section>

      {/* Questionaire Section */}
      <section className="py-4">
        <SectionKuisioner />
        <div className="mt-12 flex justify-center">
                <button
                    onClick={() => navigate('/hasil-spk')}
                    className="bg-[#357C23] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#2a5d1a] transition shadow-lg flex items-center gap-2 cursor-pointer font-lexend"
                >
                    Cari Rekomendasi
                </button>
        </div>
      </section>
    </div>
  )
}

export default RekomendasiSPK
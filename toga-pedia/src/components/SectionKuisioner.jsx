import React, { useState } from 'react';


const SectionKuisioner = ({ onAnswerChange }) => {
    const questions = [
    {
      id: 1,
      text: "Seberapa luas lahan yang Anda miliki?",
      placeholder: "Pilih luas lahan...",
      options: ["Sangat Sempit (Pot)", "Sempit (< 10m²)", "Sedang (10m² - 50m²)", "Luas (> 50m²)"]
    },
    {
      id: 2,
      text: "Seberapa banyak waktu luang Anda untuk merawat tanaman?",
      placeholder: "Pilih ketersediaan waktu...",
      options: ["Sedikit / Saya Sibuk", "Cukup (Akhir Pekan)", "Banyak (Setiap Hari)"]
    },
    {
      id: 3,
      text: "Apakah Anda ingin cepat memanen hasilnya?",
      placeholder: "Pilih target panen...",
      options: ["Cepat (< 3 Bulan)", "Sedang (3 - 6 Bulan)", "Tidak Terburu-buru (> 6 Bulan)"]
    },
    {
      id: 4,
      text: "Bagaimana preferensi Anda dalam mengolah obat?",
      placeholder: "Pilih metode pengolahan...",
      options: ["Ingin Praktis (Seduh/Lalap/Rebus)", "Bisa Sedikit Ribet (Tumbuk/Parut)", "Suka Meracik/Eksperimen (Ekstrak/Fermentasi)"]
    },
    {
      id: 5, // Mapping ke Bobot C6 (Harga Jual - Benefit)
      text: "Apakah Anda menanam untuk tujuan Bisnis/Ekonomi?",
      placeholder: "Pilih tujuan menanam...",
      options: [
        "Tidak, hanya untuk Konsumsi Pribadi", 
        "Mungkin, untuk sampingan", 
        "Ya, untuk Bisnis (Cari Harga Jual Tinggi)"
        ]
    },
    {
      id: 6,
      type: "text", // Penanda ini input text
      text: "Apa keluhan kesehatan utama Anda? (Opsional)",
      placeholder: "Contoh: Batuk, Diabetes, Asam Urat...",
      options: [] // Tidak ada opsi karena input manual
    }
  ];

  return (
    <section className="py-4 bg-white">
        <div className="md:max-w-10xl w-full md:mx-auto md:px-6">
            <div className="md:rounded-lg overflow-hidden border md:border-2 border-gray-200">
                {questions.map((q, index) => (
                    // Section pertanyaan
                    <div
                    className={`p-6 md:p-10 flex gap-6 md:gap-8 items-start ${index % 2 === 0 ? 'bg-gray-200' : 'bg-[#FDFDFD]'}`}
                    key={q.id}
                    >
                        {/* Nomor Pertanyaan */}
                        <div className="shrink-0 w-8 h-8 md:w-12 md:h-12 bg-[#357C23] rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-md">
                            {index + 1}
                        </div>

                        <div className="flex flex-col gap-1">
                            {/* Konten Pertanyaan */}
                            <div className="flex-1 w-full">
                                <label className="block text-base md:text-lg font-medium text-gray-800 font-lexend mb-4">
                                    {q.text}
                                </label>
                            </div>

                            {/* Dropdown Jawaban */}
                            <div className="relative">
                                {/* Input Text */}
                                {q.type === "text" ? (
                                    <input 
                                    type="text"
                                    placeholder={q.placeholder}
                                    onChange={(e) => onAnswerChange(q.id, e.target.value)} 
                                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl leading-tight focus:outline-none focus:border-[#357C23] transition"/>
                                ) : (
                                <>
                                {/* Input Dropdown */}
                                <select
                                onChange={(e) => onAnswerChange(q.id, e.target.value)} 
                                className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:border-[#357C23] cursor-pointer transition"
                                defaultValue=""
                                >
                                    <option value="" disabled className="text-gray-400 md:text-base text-xs">
                                        {q.placeholder}
                                    </option>
                                    {q.options.map((option, idx) => (
                                        <option key={idx} value={option} className='text-xs md:text-base'>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                                </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default SectionKuisioner
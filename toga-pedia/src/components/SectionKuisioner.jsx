import React from 'react';

const SectionKuisioner = ({ onAnswerChange }) => {
  const questions = [
    {
      id: 1,
      text: "Seberapa luas lahan yang Anda miliki?",
      helperText: "*Penyaring tambahan agar tanaman yang disarankan bisa tumbuh subur di ukuran lahan Anda.",
      placeholder: "Pilih luas lahan...",
      options: ["Sangat Sempit (Pot)", "Sempit (< 10m²)", "Sedang (10m² - 50m²)", "Luas (> 50m²)"]
    },
    {
      id: 2,
      text: "Seberapa banyak waktu luang Anda untuk merawat tanaman?",
      helperText: "*Penyaring tambahan untuk menyesuaikan tingkat perawatan dengan kesibukan Anda.",
      placeholder: "Pilih ketersediaan waktu...",
      options: ["Sedikit / Saya Sibuk", "Cukup (Akhir Pekan)", "Banyak (Setiap Hari)"]
    },
    {
      id: 3,
      text: "Apakah Anda ingin cepat memanen hasilnya?",
      helperText: "*Catatan: Kecocokan khasiat obat tetap akan diprioritaskan di atas kecepatan panen.",
      placeholder: "Pilih target panen...",
      options: ["Cepat (< 3 Bulan)", "Sedang (3 - 6 Bulan)", "Tidak Terburu-buru (> 6 Bulan)"]
    },
    {
      id: 4,
      text: "Bagaimana preferensi Anda dalam mengolah obat?",
      helperText: "*Sangat diutamakan untuk memastikan cara peracikan aman, praktis, dan minim risiko.",
      placeholder: "Pilih metode pengolahan...",
      options: ["Ingin Praktis (Seduh/Lalap/Rebus)", "Bisa Sedikit Ribet (Tumbuk/Parut)", "Suka Meracik/Eksperimen (Ekstrak/Fermentasi)"]
    },
    {
      id: 5,
      text: "Apakah Anda menanam untuk tujuan Bisnis/Ekonomi?",
      helperText: "*Pertimbangan tambahan jika Anda menginginkan tanaman dengan nilai jual tinggi di pasaran.",
      placeholder: "Pilih tujuan menanam...",
      options: [
        "Tidak, hanya untuk Konsumsi Pribadi", 
        "Mungkin, untuk sampingan", 
        "Ya, untuk Bisnis (Cari Harga Jual Tinggi)"
      ]
    },
    {
      id: 6,
      type: "text",
      text: "Apa keluhan kesehatan utama Anda? (Opsional)",
      helperText: "*Prioritas utama. Kosongkan jika Anda hanya ingin rekomendasi tanaman untuk kesehatan umum/pencegahan.",
      placeholder: "Contoh: Batuk, Diabetes, Asam Urat...",
      options: []
    }
  ];

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200">
      {questions.map((q, index) => (
        <div
          key={q.id}
          className={`flex items-start gap-3 px-4 py-5 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
        >
          {/* Nomor */}
          <div className="shrink-0 w-8 h-8 bg-[#357C23] rounded-md flex items-center justify-center text-white font-bold text-sm shadow-sm mt-0.5">
            {index + 1}
          </div>

          {/* Pertanyaan + Helper Text + Input */}
          <div className="flex-1 flex flex-col gap-1">
            {/* Label Pertanyaan */}
            <label className="text-md font-medium text-gray-800 font-lexend leading-snug">
              {q.text}
            </label>
            
            {/* Teks Bantuan / Penjelasan (Inline Helper Text) */}
            {q.helperText && (
              <p className="text-xs text-gray-500 italic leading-relaxed">
                {q.helperText}
              </p>
            )}

            <div className="relative">
              {q.type === 'text' ? (
                <input
                  type="text"
                  placeholder={q.placeholder}
                  onChange={(e) => onAnswerChange(q.id, e.target.value)}
                  className="w-full bg-white border border-gray-300 text-gray-700 text-sm py-2 px-3 rounded-lg focus:outline-none focus:border-[#357C23] focus:ring-1 focus:ring-[#357C23] transition"
                />
              ) : (
                <>
                  <select
                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                    defaultValue=""
                    className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-sm py-2 px-3 rounded-lg focus:outline-none focus:border-[#357C23] focus:ring-1 focus:ring-[#357C23] cursor-pointer transition"
                  >
                    <option value="" disabled className="text-gray-400">
                      {q.placeholder}
                    </option>
                    {q.options.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                  {/* Ikon Dropdown Custom */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionKuisioner;
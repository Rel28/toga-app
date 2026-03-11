import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
  viewport: { once: false, amount: 0.2 },
};

const Tentang = () => {
  const navigate = useNavigate();

  const kriteria = [
    { kode: 'C1', nama: 'Masa Panen', tipe: 'Cost', desc: 'Semakin cepat panen, semakin tinggi skor.' },
    { kode: 'C2', nama: 'Jumlah Manfaat', tipe: 'Benefit', desc: 'Semakin banyak manfaat kesehatan, semakin baik.' },
    { kode: 'C3', nama: 'Tingkat Kesulitan', tipe: 'Cost', desc: 'Perawatan mudah mendapat skor lebih tinggi.' },
    { kode: 'C4', nama: 'Kebutuhan Lahan', tipe: 'Cost', desc: 'Tanaman yang butuh sedikit lahan lebih diutamakan.' },
    { kode: 'C5', nama: 'Kemudahan Pengolahan', tipe: 'Cost', desc: 'Pengolahan praktis mendapat nilai lebih.' },
    { kode: 'C6', nama: 'Harga Jual', tipe: 'Benefit', desc: 'Nilai ekonomi hasil panen diperhitungkan.' },
  ];

  const langkah = [
    {
      no: '01',
      judul: 'Isi Kuisioner',
      desc: 'Jawab 6 pertanyaan singkat tentang kondisi lahan, waktu, dan tujuan menanam Anda.',
    },
    {
      no: '02',
      judul: 'Sistem Menghitung',
      desc: 'Bobot kriteria dikalkulasi otomatis menggunakan metode SAW dan TOPSIS Hybrid.',
    },
    {
      no: '03',
      judul: 'Lihat Rekomendasi',
      desc: 'Dapatkan tanaman terbaik yang paling cocok beserta detail lengkapnya.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Navbar />

      {/* Hero */}
      <motion.section
        className="min-h-[60vh] max-w-screen mx-auto px-6 md:px-16 pt-32 md:pt-40 pb-16 flex flex-col items-center justify-center text-center gap-5"
        {...fadeUp}
      >
        <h1 className="text-[28px] md:text-[52px] font-lexend font-bold text-gray-800 leading-tight max-w-3xl">
          Tentang <span className="text-[#357C23]">TogaPed</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl">
          Sistem Pendukung Keputusan pemilihan Tanaman Obat Keluarga (TOGA) 
          berbasis metode <strong>SAW & TOPSIS</strong>, dirancang untuk membantu 
          masyarakat memilih tanaman yang paling sesuai kondisi mereka.
        </p>
        <button
          onClick={() => navigate('/rekomendasi')}
          className="mt-2 bg-[#357C23] text-white px-8 py-3 rounded-xl font-lexend font-medium text-base hover:bg-[#2a5d1a] transition shadow-lg cursor-pointer"
        >
          Coba Sekarang
        </button>
      </motion.section>

      {/* Tentang Sistem */}
      <div className="bg-[#F5F5F5]">
      <motion.section
        className="py-16 md:py-20"
        {...fadeUp}
      >
        <div className="max-w-screen mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Kiri: Teks */}
          <div className="space-y-4">
            <h2 className="text-[22px] md:text-[34px] font-lexend font-bold text-gray-800 leading-tight">
              Mengapa <span className="text-[#357C23]">TogaPed</span> Dibuat?
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Banyak masyarakat ingin menanam TOGA di rumah, namun bingung memilih tanaman 
              yang sesuai dengan luas lahan, waktu yang dimiliki, dan tujuan mereka, apakah 
              untuk konsumsi pribadi atau nilai ekonomi.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Toga Pedia hadir sebagai solusi berbasis teknologi SPK yang menyederhanakan 
              proses pemilihan tanaman secara ilmiah namun tetap mudah digunakan oleh siapa saja.
            </p>
          </div>

          {/* Kanan: Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { angka: '40+', label: 'Jenis Tanaman' },
              { angka: '6', label: 'Kriteria Penilaian' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 md:p-6 text-center border border-gray-200 shadow-sm hover:border-[#357C23] transition">
                <p className="text-[#357C23] font-lexend font-bold text-3xl md:text-4xl">{stat.angka}</p>
                <p className="text-gray-500 text-sm mt-1 font-lexend">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      </div>

      {/* Kriteria */}
      <motion.section className="py-16 md:py-20" {...fadeUp}>
        <div className="max-w-screen mx-auto px-6 md:px-16">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-[22px] md:text-[34px] font-lexend font-medium text-gray-800">
              Kriteria <span className="text-[#357C23]">Penilaian</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              6 kriteria yang digunakan sistem untuk menilai setiap tanaman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {kriteria.map((k, i) => (
              <div key={i} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4 md:p-5 hover:border-[#357C23] hover:shadow-sm transition">
                <div className="shrink-0 w-10 h-10 bg-[#357C23] rounded-lg flex items-center justify-center text-white font-bold text-sm font-mono">
                  {k.kode}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-lexend font-semibold text-gray-800 text-sm">{k.nama}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      k.tipe === 'Benefit' ? 'bg-green-100 text-[#357C23]' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {k.tipe}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{k.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Cara Kerja */}
      <div className="bg-[#F5F5F5]">
      <motion.section className="py-16 md:py-20" {...fadeUp}>
        <div className="max-w-screen mx-auto px-6 md:px-16">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-[22px] md:text-[34px] font-lexend font-medium text-gray-800">
              Cara <span className="text-[#357C23]">Kerja</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              Tiga langkah sederhana untuk mendapatkan rekomendasi terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {langkah.map((l, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-[#357C23] hover:shadow-md transition">
                <span className="font-lexend font-bold text-5xl text-green-100 absolute top-4 right-5 select-none">
                  {l.no}
                </span>
                <div className="w-10 h-10 bg-[#357C23] rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4 relative z-10">
                  {i + 1}
                </div>
                <h3 className="font-lexend font-semibold text-gray-800 text-base mb-2">{l.judul}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      </div>

      {/* Developer */}
      <motion.section className="py-16 md:py-20" {...fadeUp}>
        <div className="max-w-screen mx-auto px-6 md:px-16 flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#357C23" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <div>
            <h2 className="font-lexend font-bold text-gray-800 text-xl">Verel Aditya</h2>
            <p className="text-[#357C23] text-sm font-medium mt-0.5">Developer · Mahasiswa Universitas Udayana</p>
          </div>
          <p className="text-gray-500 text-sm md:text-base max-w-lg leading-relaxed">
            Proyek ini dikembangkan sebagai Tugas Akhir dengan tujuan membangun sistem 
            berbasis web yang dapat membantu masyarakat dalam memilih Tanaman Obat Keluarga 
            secara tepat dan berbasis data ilmiah.
          </p>
          <a
            href="mailto:verel@example.com"
            className="mt-2 border border-[#357C23] text-[#357C23] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#357C23] hover:text-white transition cursor-pointer font-lexend"
          >
            Hubungi Saya
          </a>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Tentang;
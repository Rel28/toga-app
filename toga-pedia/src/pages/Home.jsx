import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import togaImage from "../assets/images/toga-image.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import TogaImage from "../assets/images/toga_image.jpg";

const Home = () => {
  // 1. Placeholder Data
  const navigate = useNavigate();
  const [togaData, setTogaData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/tanaman",
      )
      .then((res) => setTogaData(res.data.slice(0, 3)))
      .catch((err) => console.error(err));
  }, []);

  const langkah = [
    {
      no: "01",
      judul: "Isi Kuisioner",
      desc: "Jawab 6 pertanyaan singkat tentang kondisi lahan, waktu, dan tujuan menanam Anda.",
    },
    {
      no: "02",
      judul: "Sistem Menghitung",
      desc: "Bobot kriteria dikalkulasi otomatis menggunakan metode SAW dan TOPSIS Hybrid.",
    },
    {
      no: "03",
      judul: "Lihat Rekomendasi",
      desc: "Dapatkan tanaman terbaik yang paling cocok beserta detail lengkapnya.",
    },
  ];

  return (
    <div className="bg-[#FDFDFD]">
      {/* Navbar */}
      <Navbar />

      {/* Section Utama */}
      <motion.section
        className="min-h-screen mx-auto px-6 md:px-16 py-30 md:py-20 qhd:px-50 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Teks Kiri */}
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-[20px] md:text-[32px] qhd:text-[50px] font-lexend font-bold text-gray-800 leading-tight w-full">
            Temukan Tanaman Obat (TOGA) <br />{" "}
            <span className="text-[#357C23] text-[18px] md:text-[28px] qhd:text-[36px]">
              yang Paling Sesuai Untuk Anda
            </span>
          </h1>

          <p className="text-gray-400 text-[16px] md:text-[18px] qhd:text-[20px] leading-relaxed max-w-200">
            Sistem ini membantu Anda memilih TOGA terbaik di Indonesia.
            Rekomendasi didasarkan pada 6 kriteria seperti masa panen, jumlah
            kegunaan tanaman, harga jual, dll.
          </p>

          <button
            className="mt-4 bg-[#357C23] text-white px-8 py-4 font-lexend rounded-xl font-medium text-lg qhd:text-2xl hover:bg-[#2a5d1a] transition shadow-lg cursor-pointer"
            onClick={() => navigate("/rekomendasi")}
          >
            Mulai Rekomendasi
          </button>
        </div>

        {/* Gambar Kanan */}
        <img
          src={togaImage}
          alt="Gambar Toga"
          className="w-xl qhd:w-2xl ml-auto order-first md:order-last"
        />
      </motion.section>

      {/* Section Penjelasan TOGA */}
      <div className=" bg-[#F5F5F5]">
        <motion.section
          className=" py-16 md:py-20 px-6 md:px-16 qhd:px-50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-12 justify-between items-center">
            {/* Bagian Gambar */}
            <div className="relative w-full md:w-xl qhd:w-2xl rounded-lg overflow-hidden shadow-lg">
              <img
                src={TogaImage}
                alt="Tanaman Obat Keluarga"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Bagian Teks & Konten */}
            <div className="w-full md:w-[52%] max-w-2xl">
              {/* Judul & Deskripsi */}
              <h2 className="text-[22px] md:text-[34px] font-lexend font-medium text-gray-800 leading-tight">
                Apa itu <span className="text-[#357C23]">TOGA</span>?
              </h2>
              <p className="text-gray-500 text-sm md:text-base mt-3 leading-relaxed text-justify">
                TOGA adalah singkatan dari <span className="font-bold text-[#357C23]">Tanaman Obat Keluarga</span>. Ini adalah sekumpulan tanaman hasil budidaya rumahan yang berkhasiat sebagai <span className="font-bold text-[#357C23]">obat kesehatan alami</span>. Memiliki <span className="font-bold text-[#357C23]">"apotek hidup"</span> di pekarangan rumah merupakan langkah cerdas untuk <span className="font-bold text-[#357C23]">menjaga kesehatan keluarga secara mandiri</span> dan mencegah penyakit ringan sejak dini.
              </p>

              {/* Section Badges: Bagian Tanaman */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Bagian tanaman yang sering dimanfaatkan:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "🍃 Daun",
                    "🫚 Rimpang/Umbi",
                    "🍒 Buah",
                    "🎋 Batang",
                    "🌸 Bunga",
                    "🌱 Biji",
                  ].map((part, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] rounded-lg text-xs md:text-sm font-medium shadow-xs hover:bg-[#dcfce7] transition-colors cursor-default"
                    >
                      {part}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Section Manfaat TOGA */}
      <motion.section
        className="px-6 md:px-16 qhd:px-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="w-full mt-24 mb-16">
          {/* Judul Section */}
          <div className="text-center mb-12">
            <h2 className="text-[24px] md:text-[34px] font-lexend font-medium text-gray-800 leading-tight">
              Mengapa Anda Perlu Menanam{" "}
              <span className="text-[#357C23]">TOGA</span>?
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Hadirkan apotek hidup di pekarangan Anda dan rasakan langsung
              berbagai manfaat positifnya untuk keluarga.
            </p>
          </div>

          {/* Grid Cards (1 kolom di HP, 3 kolom di Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mx-auto">
            {/* Card 1: Pertolongan Pertama */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#357C23] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-[#357C23] mb-6 group-hover:bg-[#357C23] group-hover:text-white transition-colors duration-300 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Pertolongan Pertama
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Solusi cepat, alami, dan aman untuk meredakan gejala sakit
                ringan seperti batuk, demam, atau masalah pencernaan sebelum
                harus ke dokter.
              </p>
            </div>

            {/* Card 2: Hemat & Praktis */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#357C23] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Hemat & Praktis
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Mengurangi ketergantungan pada obat-obatan komersial. Anda bisa
                langsung memetik ramuan sehat dan segar langsung dari halaman
                rumah sendiri.
              </p>
            </div>

            {/* Card 3: Mudah Ditanam */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#357C23] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Sangat Mudah Ditanam
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Banyak jenis TOGA (seperti rimpang dan dedaunan) yang sangat
                adaptif, minim perawatan, dan bisa tumbuh subur meski ditanam di
                pot sempit.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section Kerja Rekomendasi */}
      <div className="bg-[#F5F5F5]">
      <motion.section
        className="py-16 md:py-20 qhd:px-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
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
              <div
                key={i}
                className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-[#357C23] hover:shadow-md transition"
              >
                <span className="font-lexend font-bold text-5xl text-green-100 absolute top-4 right-5 select-none">
                  {l.no}
                </span>
                <div className="w-10 h-10 bg-[#357C23] rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4 relative z-10">
                  {i + 1}
                </div>
                <h3 className="font-lexend font-semibold text-gray-800 text-base mb-2">
                  {l.judul}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {l.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      </div>

      {/* Section Item */}
      <motion.section
        className="py-16 md:py-20 qhd:px-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="max-w-screen mx-auto px-6 md:px-16 w-full">
          {/* Judul */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-[22px] md:text-[34px] font-lexend font-medium text-black">
              Telusuri <span className="text-[#357C23]">TOGA</span>
            </h2>
          </div>

          {/* Grid Item */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {togaData.map((toga) => (
              <div
                key={toga.id}
                className="border border-gray-200 rounded-xl p-4 shadow-sm transition duration-300 bg-white hover:border-[#357C23]"
              >
                {/* Gambar */}
                <img
                  src={toga.image}
                  alt={toga.nama}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />

                {/* Nama Toga */}
                <div className="mb-4">
                  <h3 className="text-[16px] md:text-[18px] font-lexend font-semibold text-gray-800">
                    {toga.nama}
                  </h3>
                  <p className="text-gray-500 text-[13px] md:text-[15px] font-lexend">
                    {toga.kategori}
                  </p>
                  <p className="text-gray-400 text-[13px] md:text-[14px] mt-2 line-clamp-2">
                    {toga.deskripsi}
                  </p>
                </div>

                {/* Tombol Detail */}
                <button
                  onClick={() => navigate(`/katalog-toga/${toga.id}`)}
                  className="flex items-center gap-2 bg-[#357C23] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#2a5d1a] transition cursor-pointer w-full justify-center"
                >
                  Telusuri
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-12 flex justify-center">
            <button
              onClick={() => navigate("/katalog-toga")}
              className="bg-[#357C23] text-white px-8 py-3 rounded-xl font-medium text-base md:text-md hover:bg-[#446325] transition shadow-md cursor-pointer w-full md:w-auto"
            >
              Lihat Semua
            </button>
          </div>
        </div>
      </motion.section>
      

      {/* Section Referensi */}
      <div className="bg-[#F5F5F5] ">
        {/* Section Referensi */}
        <motion.section
          className="py-16 md:py-20 qhd:px-50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="max-w-screen mx-auto px-6 md:px-16">
            {/* Judul */}
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-[22px] md:text-[34px] font-lexend font-medium text-black">
                Sumber <span className="text-[#357C23]">Referensi</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base mt-2">
                Data dan informasi tanaman bersumber dari literatur ilmiah
                terpercaya.
              </p>
            </div>

            {/* Grid Buku */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {[
                {
                  judul: "VADEMEKUM TANAMAN OBAT Jilid 1",
                  penulis: "Kementerian Kesehatan RI",
                  penerbit:
                    "Lembaga Penerbit Badan Litbangkes · Jakarta · 2012",
                  tipe: "buku",
                },
                {
                  judul: "VADEMEKUM TANAMAN OBAT Jilid 2",
                  penulis: "Kementerian Kesehatan RI",
                  penerbit:
                    "Lembaga Penerbit Badan Litbangkes · Jakarta · 2012",
                  tipe: "buku",
                },
                {
                  judul: "VADEMEKUM TANAMAN OBAT Jilid 3",
                  penulis: "Kementerian Kesehatan RI",
                  penerbit:
                    "Lembaga Penerbit Badan Litbangkes · Jakarta · 2012",
                  tipe: "buku",
                },
                {
                  judul: "Alodokter",
                  penulis: "Tim Medis Alodokter",
                  penerbit: "alodokter.com · Online",
                  tipe: "web",
                  url: "https://www.alodokter.com",
                },
                {
                  judul: "Socfindo Conservation",
                  penulis: "Tim Socfindo Conservation",
                  penerbit: "socfindoconservation.co.id · Online",
                  tipe: "web",
                  url: "https://www.socfindoconservation.co.id",
                },
                {
                  judul: "Wawancara Pakar Biologi Farmasi",
                  penulis: "Dosen Farmasi Universitas Udayana",
                  penerbit: "Universitas Udayana · Denpasar",
                  tipe: "wawancara",
                },
              ].map((ref, i) => (
                <div
                  key={i}
                  className="flex bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:border-[#357C23] hover:shadow-md transition duration-300"
                >
                  {/* Punggung — biru untuk web, hijau untuk buku */}
                  <div
                    className={`w-3 shrink-0 ${ref.tipe === "web" ? "bg-blue-500" : ref.tipe === "wawancara" ? "bg-amber-500" : "bg-[#357C23]"}`}
                  />

                  <div className="flex items-start gap-4 p-4 md:p-5 w-full">
                    {/* Ikon */}
                    <div
                      className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5 ${
                        ref.tipe === "web"
                          ? "bg-blue-50"
                          : ref.tipe === "wawancara"
                            ? "bg-amber-50"
                            : "bg-green-100"
                      }`}
                    >
                      {ref.tipe === "web" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#3b82f6"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253"
                          />
                        </svg>
                      ) : ref.tipe === "wawancara" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#f59e0b"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 9a3.375 3.375 0 1 1 6.75 0v.75a3.375 3.375 0 0 1-6.75 0V9Zm3.375 8.25v3m-3 0h6M5.25 10.5v.75a6.75 6.75 0 0 0 13.5 0v-.75"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#357C23"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-lexend font-semibold text-gray-800 text-sm md:text-base leading-snug">
                        {ref.judul}
                      </p>
                      <p
                        className={`text-xs font-medium mt-0.5 ${ref.tipe === "web" ? "text-blue-500" : ref.tipe === "wawancara" ? "text-amber-500" : "text-[#357C23]"}`}
                      >
                        {ref.penulis}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {ref.penerbit}
                      </p>
                    </div>

                    {/* Badge tipe */}
                    <span
                      className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full self-start ${ref.tipe === "web" ? "bg-blue-50 text-blue-400" : ref.tipe === "wawancara" ? "bg-amber-50 text-amber-400" : "bg-green-50 text-[#357C23]"}`}
                    >
                      {ref.tipe === "web"
                        ? "Web"
                        : ref.tipe === "wawancara"
                          ? "Wawancara"
                          : "Buku"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

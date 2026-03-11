import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import togaImage from "../assets/images/toga-image.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const Home = () => {
  // 1. Placeholder Data
  const navigate = useNavigate();
  const [togaData, setTogaData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/tanaman")
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
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Navbar */}
      <Navbar />

      {/* Section Utama */}
      <motion.section
        className="min-h-screen max-w-screen mx-auto px-6 md:px-16 py-30 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Teks Kiri */}
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-[20px] md:text-[32px] font-lexend font-bold text-gray-800 leading-tight w-full">
            Temukan Tanaman Obat (TOGA) <br />{" "}
            <span className="text-[#357C23] text-[18px] md:text-[28px]">
              yang Paling Sesuai Untuk Anda
            </span>
          </h1>

          <p className="text-gray-400 text-[16px] md:text-[18px] leading-relaxed max-w-200">
            Sistem ini membantu Anda memilih TOGA terbaik di Indonesia.
            Rekomendasi didasarkan pada 6 kriteria seperti masa panen, jumlah
            kegunaan tanaman, harga jual, dll.
          </p>

          <button
            className="mt-4 bg-[#357C23] text-white px-8 py-4 font-lexend rounded-xl font-medium text-lg hover:bg-[#2a5d1a] transition shadow-lg cursor-pointer"
            onClick={() => navigate("/rekomendasi")}
          >
            Mulai Rekomendasi
          </button>
        </div>

        {/* Gambar Kanan */}
        <img
          src={togaImage}
          alt="Gambar Toga"
          className="w-xl ml-auto order-first md:order-last"
        />
      </motion.section>

      {/* Section Kerja Rekomendasi */}
      <div className=" bg-[#F5F5F5]">
        <motion.section
          className=" py-16 md:py-20"
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
        className="py-16 md:py-20"
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
          className="py-16 md:py-20"
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
                  penerbit: "Lembaga Penerbit Badan Litbangkes · Jakarta",
                  tahun: "2012",
                  tipe: "buku",
                },
                {
                  judul: "VADEMEKUM TANAMAN OBAT Jilid 2",
                  penulis: "Kementerian Kesehatan RI",
                  penerbit: "Lembaga Penerbit Badan Litbangkes · Jakarta",
                  tahun: "2012",
                  tipe: "buku",
                },
                {
                  judul: "VADEMEKUM TANAMAN OBAT Jilid 3",
                  penulis: "Kementerian Kesehatan RI",
                  penerbit: "Lembaga Penerbit Badan Litbangkes · Jakarta",
                  tahun: "2012",
                  tipe: "buku",
                },
                {
                  judul: "Alodokter",
                  penulis: "Tim Medis Alodokter",
                  penerbit: "alodokter.com · Online",
                  tahun: "2024",
                  tipe: "web",
                  url: "https://www.alodokter.com",
                },
              ].map((ref, i) => (
                <div
                  key={i}
                  className="flex bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:border-[#357C23] hover:shadow-md transition duration-300"
                >
                  {/* Punggung — biru untuk web, hijau untuk buku */}
                  <div
                    className={`w-3 shrink-0 ${ref.tipe === "web" ? "bg-blue-500" : "bg-[#357C23]"}`}
                  />

                  <div className="flex items-start gap-4 p-4 md:p-5 w-full">
                    {/* Ikon */}
                    <div
                      className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5 ${ref.tipe === "web" ? "bg-blue-50" : "bg-green-100"}`}
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
                        className={`text-xs font-medium mt-0.5 ${ref.tipe === "web" ? "text-blue-500" : "text-[#357C23]"}`}
                      >
                        {ref.penulis}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {ref.penerbit} · {ref.tahun}
                      </p>
                    </div>

                    {/* Badge tipe */}
                    <span
                      className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full self-start ${ref.tipe === "web" ? "bg-blue-50 text-blue-400" : "bg-green-50 text-[#357C23]"}`}
                    >
                      {ref.tipe === "web" ? "Web" : "Buku"}
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

import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import SectionKuisioner from '../components/SectionKuisioner';

const RekomendasiSPK = () => {
  const navigate = useNavigate();

  // State Menyimpan Jawaban Kuisioner
  const [answers, setAnswers] = useState({});

  // Update Jawaban dari Komponen Anak
  const handleAnswerChange = (id, value) => {
    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Pengiriman ke Backend
  const handleCariRekomendasi = async () => {
    const payload = generatePayload();
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/rekomendasi', payload);

      navigate('/hasil-spk', { state: { result: response.data }});
    } catch (error) {
      console.error("Error SPK:", error);
      alert("Terjadi kesalahan saat mencari rekomendasi.");
    }
  }

  // Fungsi Konversi Jawaban ke Bobot
  const generatePayload = () => {
    // 1. Default Bobot
    let w_manfaat = 0.20;

    // 2. Logika C4: Lahan (Pertanyaan 1)
    let w_lahan = 0.20; // Default
    const ansLahan = answers[1];
    if (ansLahan?.includes("Sangat Sempit")) w_lahan = 0.40;
    else if (ansLahan?.includes("Sempit")) w_lahan = 0.30;
    else if (ansLahan?.includes("Sedang")) w_lahan = 0.20;
    else if (ansLahan?.includes("Luas")) w_lahan = 0.05;

    //  3. Logika C3: Waktu/Kesulitan (Pertanyaan 2)
    let w_kesulitan = 0.15; // Default
    const ansWaktu = answers[2];
    if (ansWaktu?.includes("Sedikit")) w_kesulitan = 0.35;
    else if (ansWaktu?.includes("Cukup")) w_kesulitan = 0.20;
    else if (ansWaktu?.includes("Banyak")) w_kesulitan = 0.05;

    // 4. Logika C1: Panen (Pertanyaan 3)
    let w_panen = 0.15; // Default
    const ansPanen = answers[3];
    if (ansPanen?.includes("Cepat")) w_panen = 0.30;
    else if (ansPanen?.includes("Sedang")) w_panen = 0.15;
    else if (ansPanen?.includes("Tidak Terburu-buru")) w_panen = 0.05;

    // 5. Logika C2: Pengolahan (Pertanyaan 4)
    let w_pengolahan = 0.10; // Default
    const ansOlah = answers[4];
    if (ansOlah?.includes("Praktis")) w_pengolahan = 0.30;
    else if (ansOlah?.includes("Ribet")) w_pengolahan = 0.15;
    else if (ansOlah?.includes("Eksperimen")) w_pengolahan = 0.05;

    // 6. Logika C6: Harga Jual (Pertanyaan 5)
    let w_harga = 0.20;
    const ansHarga = answers[5];
    if (ansHarga?.includes("Tidak")) w_harga = 0.05;
    else if (ansHarga?.includes("Mungkin")) w_harga = 0.15;
    else if (ansHarga?.includes("Ya")) w_harga = 0.30;

    // 7. Ambil Keluhan Kesehatan (Pertanyaan 6)
    const keywordPenyakit = answers[6] || "";

    // 8. Payload Akhir
    return {
      penyakit: keywordPenyakit,
      w_panen: w_panen,         // C1
      w_manfaat: w_manfaat,     // C2
      w_kesulitan: w_kesulitan, // C3
      w_lahan: w_lahan,         // C4
      w_pengolahan: w_pengolahan,// C5
      w_harga: w_harga          // C6
    };
  };

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
        <SectionKuisioner 
        onAnswerChange={handleAnswerChange}
        />

        {/* Tombol Submit Jawaban */}
        <div className="mt-12 flex justify-center">
                <button
                    onClick={handleCariRekomendasi}
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
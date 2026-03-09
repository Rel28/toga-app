import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import SectionKuisioner from '../components/SectionKuisioner';
import HasilTop3 from '../components/HasilTop3';

const RekomendasiSPK = () => {
  const navigate = useNavigate();

  // State Menyimpan Jawaban Kuisioner
  const [answers, setAnswers] = useState({});
  const location = useLocation();
  const [result, setResult] = useState(location.state?.result || null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/rekomendasi', payload);
      setResult(response.data);
    } catch (error) {
      console.error("Error SPK:", error);
      alert("Terjadi kesalahan saat mencari rekomendasi.");
    } finally {
      setLoading(false);
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

  const top3 = result?.data?.slice(0, 3) || [];

  const rankStyle = [
    'bg-yellow-400 text-yellow-900',
    'bg-gray-300 text-gray-700',
    'bg-amber-600 text-white',
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
        <Navbar />

    {/* Title Section */}
      <section className="pt-28 md:pt-38 md:pb-12 pb-8 px-6 md:px-16">
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
      <section className="px-6 md:px-16 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Kiri: Kuisioner */}
          <div className="w-full lg:w-1/2">
            <SectionKuisioner onAnswerChange={handleAnswerChange} />

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleCariRekomendasi}
                disabled={loading}
                className="bg-[#357C23] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#2a5d1a] transition shadow-lg flex items-center gap-2 cursor-pointer font-lexend disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Mencari...
                  </>
                ) : (
                  <>
                    Cari Rekomendasi
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Kanan: Hasil */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
            <HasilTop3 result={result} loading={loading} error={error} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default RekomendasiSPK
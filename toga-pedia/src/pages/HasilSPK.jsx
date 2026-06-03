import React from 'react'
import Navbar from '../components/Navbar'
import TogaCard from '../components/TogaCard'
import { useLocation, useNavigate } from 'react-router-dom';

const HasilSPK = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mengambil Data dari RekomendasiSPK
  const { result } = location.state || {};

  // Jika tidak ada data, tampilkan pesan
  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Data Tidak Ditemukan</h2>
        <p className="text-gray-500 mb-6">Silakan isi kuesioner terlebih dahulu.</p>
        <button 
          onClick={() => navigate('/rekomendasi')}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
        >
          Ke Halaman Rekomendasi
        </button>
      </div>
    );
  }

  // Olah Data Rekomendasi
  const { match_info, data } = result;

  // Rekomendasi Utama (3 Teratas)
  const recommendations = data.slice(0, 3);

  // Rekomendasi Lainnya
  const otherRecommendations = data.slice(3);

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
        <Navbar />

    <section className="pt-38 md:pb-18 pb-14 px-6 md:px-16">
        <div className="max-w-screen mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-lexend font-normal text-black">
            Hasil <span className="text-[#357C23]">Rekomendasi</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-lg mx-auto mt-2 md:mt-3">
            Sesuaikan preferensi di bawah ini, dan kami akan merekomendasikan tanaman yang paling cocok untuk kondisi Anda.
          </p>
        </div>
    </section>

    {/* Hasil Rekomendasi Section */}
    <section className="max-w-10xl mx-auto px-6 pb-14">
        {/* Rekomendasi Utama */}
        {recommendations.length > 0 ? (
        <div className="relative border border-[#557C2F] rounded-2xl p-6 md:px-10 md:py-14 bg-white shadow-sm">
          
          {/* Badge Hijau di Tengah Atas */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <span className="bg-[#357C23] text-white px-8 py-2 md:py-4 rounded-lg font-semibold shadow-md whitespace-nowrap md:text-2xl">
              Rekomendasi Tanaman Terbaik untuk Anda
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6">
                {recommendations.map((toga, index) => (
                  <TogaCard 
                    key={toga.id}
                    id={toga.id} 
                    nama={toga.nama}
                    image={toga.image}
                    kategori={toga.kategori || "Tanaman Obat"}
                    deskripsi={toga.deskripsi}
                  />
                ))}
          </div>
        </div>
        ) : (
          <p className="text-center text-gray-500">Tidak ada rekomendasi yang tersedia.</p>
        )}

        {/* Rekomendasi Lainnya */}
        {otherRecommendations.length > 0 && (
        <div className="mt-12">
            <h2 className="text-xl md:text-2xl font-lexend font-semibold text-gray-800 mb-6">
                Rekomendasi Lainnya
            </h2>
            <div className="grid grid-cols-1 gap-6">
                {otherRecommendations.map((toga, index) => (
                  <TogaCard 
                    key={toga.id}
                    id={toga.id}
                    nama={toga.nama}
                    image={toga.image}
                    kategori={toga.kategori || "Tanaman Obat"}
                    deskripsi={toga.deskripsi}
                  />
                ))}
            </div>
        </div>
        )}

        {/* Tombol Ulang */}
        <div className="text-center mt-16">
          <button 
            onClick={() => navigate('/rekomendasi')}
            className="border-2 border-[#357C23] text-[#357C23] px-8 py-3 rounded-full hover:bg-[#357C23] hover:text-white transition font-semibold"
          >
            Analisis Ulang
          </button>
        </div>
    </section>
    </div>
  )
}

export default HasilSPK
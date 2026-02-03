import React from 'react'
import Navbar from '../components/Navbar'
import TogaCard from '../components/TogaCard'

const HasilSPK = () => {
    const recommendations = [
    { id: 1, name: "Jahe Merah", category: "Zingiber officinale", desc: "Sangat cocok dengan lahan sempit dan iklim panas.", image: "https://placehold.co/600x400/png" },
    { id: 2, name: "Kunyit", category: "Curcuma longa", desc: "Perawatan mudah dan masa panen sesuai target Anda.", image: "https://placehold.co/600x400/png" },
    { id: 3, name: "Lidah Buaya", category: "Aloe vera", desc: "Cocok untuk pemula dengan kebutuhan air minim.", image: "https://placehold.co/600x400/png" },
  ];

  const otherRecommendations = [
    { id: 4, name: "Kencur", category: "Kaempferia galanga", desc: "Alternatif baik untuk dataran rendah.", image: "https://placehold.co/600x400/png" },
    { id: 5, name: "Sirih", category: "Piper betle", desc: "Membutuhkan rambatan namun khasiat tinggi.", image: "https://placehold.co/600x400/png" },
  ];

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
    <section className="max-w-10xl mx-auto px-6">
        <div className="relative border border-[#557C2F] rounded-2xl p-6 md:px-10 md:py-14 bg-white shadow-sm">
          
          {/* Badge Hijau di Tengah Atas */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <span className="bg-[#357C23] text-white px-8 py-2 md:py-4 rounded-lg font-semibold shadow-md whitespace-nowrap md:text-2xl">
              3 Rekomendasi Tanaman Terbaik
            </span>
          </div>

            {/* Rekomendasi Utama */}
            <div className="grid grid-cols-1 gap-6">
                {recommendations.map((toga) => (
                    <TogaCard key={toga.id} toga={toga} />
                ))}
            </div>
        </div>

        {/* Rekomendasi Lainnya */}
        <div className="mt-12">
            <h2 className="text-xl md:text-2xl font-lexend font-semibold text-gray-800 mb-6">
                Rekomendasi Lainnya
            </h2>
            <div className="grid grid-cols-1 gap-6">
                {otherRecommendations.map((toga) => (
                    <TogaCard key={toga.id} toga={toga} />
                ))}
            </div>
        </div>
    </section>
    </div>
  )
}

export default HasilSPK
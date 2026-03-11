import React from 'react'
import { useNavigate } from 'react-router-dom';

const TogaCard = ({ id, nama, image, kategori, deskripsi }) => {

  const navigate = useNavigate();

  return (
    <div className="border md:border-2 border-gray-200 rounded-lg p-2 md:p-4 hover:border-[#357C22] transition duration-300 bg-white md:flex">
        {/* Gambar */}
        <img src={image || "https://placehold.co/300x200"} alt={nama || "Tanaman"} className="w-full md:w-80 h-48 md:h-60 object-cover rounded-md" />

        {/* Info Toga */}
            <div className="w-full py-2 px-2 md:py-4 md:px-8">
                  <h3 className="text-xl md:text-2xl font-lexend font-medium text-gray-800">{nama || "Tanaman tidak tersedia"}</h3>
                  <h4 className="text-gray-500 text-base md:text-lg font-lexend">{kategori || "Tanaman tidak tersedia"}</h4>
                  <p className="text-gray-400 text-sm md:text-base mt-3">{deskripsi || "Tanaman tidak tersedia"}</p>

                  {/* Tombol Telusuri TOGA */}
                  <button 
                  onClick={() => navigate(`/katalog-toga/${id}`)}
                  className="flex items-center gap-2 bg-[#357C23] text-white px-6 md:px-8 py-2 mt-10 md:py-2.5 rounded-xl text-base md:text-base font-semibold hover:bg-[#2a5d1a] transition cursor-pointer w-full md:w-auto justify-center">
                  Telusuri 
                  {/* Ikon Panah Kecil */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  </button>
            </div>
    </div>
  )
}

export default TogaCard
import React from "react";
import { useNavigate } from "react-router-dom";
import ecoImage from "../assets/images/eco_green.svg";

const RANK_STYLE = [
  "bg-yellow-400 text-yellow-900",
  "bg-gray-300 text-gray-700",
  "bg-amber-600 text-white",
];

const HasilTop3 = ({ result, loading, error }) => {
  const navigate = useNavigate();
  const top3 = result?.data?.slice(0, 3) || [];

  // Empty state
  if (!result && !loading && !error) {
    return (
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center bg-gray-50 min-h-105">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <img src={ecoImage} alt="Tanaman Icon" className="w-10 h-10"></img>
        </div>
        <h3 className="text-lg font-lexend font-semibold text-gray-700 mb-2">
          Hasil Rekomendasi
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Isi kuisioner di sebelah kiri lalu tekan
          <br />
          <span className="font-semibold text-[#357C23]">Cari Rekomendasi</span>
        </p>
      </div>
    );
  }

  // Error state
  if (error && !loading) {
    return (
      <div className="flex flex-col items-center justify-center border-2 border-red-200 rounded-2xl p-10 bg-red-50 min-h-105">
        <p className="text-red-500 font-medium text-center">{error}</p>
      </div>
    );
  }

  // Results
  return (
    <div className="relative border-2 border-[#557C2F] rounded-2xl pt-12 pb-8 px-6 bg-white shadow-sm">
      {/* Badge */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <span className="bg-[#357C23] text-white px-6 py-2.5 rounded-lg font-semibold shadow-md whitespace-nowrap text-sm font-lexend">
          3 Tanaman Terbaik untuk Anda
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {top3.map((toga, index) => (
          <div
            key={toga.id}
            className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 bg-gray-50 hover:border-[#357C23] hover:shadow-sm transition"
          >
            {/* Rank badge */}
            <div
              className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${RANK_STYLE[index]}`}
            >
              {index + 1}
            </div>

            {/* Thumbnail */}
            <img
              src={toga.image || "https://placehold.co/64x64"}
              alt={toga.nama}
              className="shrink-0 w-16 h-16 object-cover rounded-lg"
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-lexend font-semibold text-gray-800 truncate text-sm md:text-base">
                  {toga.nama}
                </p>
                {/* Skor */}
                <span className="shrink-0 text-xs font-bold text-[#357C23] bg-green-100 px-2 py-0.5 rounded-md">
                  {toga.skor}%
                </span>
              </div>
              <p className="text-xs text-[#357C23] font-medium">
                {toga.kategori || "Tanaman Obat"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                {toga.deskripsi}
              </p>
            </div>

            {/* Detail button */}
            <button
              onClick={() => navigate(`/katalog-toga/${toga.id}`, { state: { result } })}
              className="shrink-0 bg-[#357C23] text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-[#2a5d1a] transition cursor-pointer"
            >
              Detail
            </button>
          </div>
        ))}
      </div>

      {/* Navigate to full results */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/hasil-spk", { state: { result } })}
          className="w-full bg-[#357C23] text-white py-3 rounded-xl font-semibold font-lexend hover:bg-[#2a5d1a] transition flex items-center justify-center gap-2 cursor-pointer"
        >
          Lihat Semua Hasil Rekomendasi
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HasilTop3;

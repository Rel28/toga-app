import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import closeIcon from "../assets/close.svg";
import searchIcon from "../assets/search.svg";
import TogaCard from "../components/TogaCard";
import Pagination from "../components/Pagination";
import axios from "axios";
import { motion } from "framer-motion";
import Cactus from "../assets/images/cactus.svg";

const KatalogToga = () => {
  const [togaData, setTogaData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);

  const itemsPerPage = 5;

  const categories = [
    "Semua",
    "Rimpang",
    "Daun & Herba",
    "Buah",
    "Bunga",
    "Batang",
    "Pohon",
    "Umbi",
  ];

  const fetchToga = async () => {
    try {
      // Panggil API Backend
      const response = await axios.get("http://127.0.0.1:5000/api/tanaman");
      setTogaData(response.data); // Simpan data ke state
      setLoading(false);
    } catch (error) {
      console.error("Gagal ambil data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToga();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  // Filter data berdasarkan pencarian dan kategori
  const filteredToga = togaData.filter((toga) => {
    const matchSearch = toga.nama
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "Semua" || toga.kategori === selectedCategory;
    return matchSearch && matchCategory;
  });

  {/* Sort Dropdown */}

const sortedToga = [...filteredToga].sort((a, b) => {
  switch (sortBy) {
    case 'az': return a.nama.localeCompare(b.nama);
    case 'za': return b.nama.localeCompare(a.nama);
    case 'panen_asc': return (a.scores?.panen ?? 99) - (b.scores?.panen ?? 99);
    case 'panen_desc': return (b.scores?.panen ?? 0) - (a.scores?.panen ?? 0);
    case 'mudah': return (a.scores?.kesulitan ?? 99) - (b.scores?.kesulitan ?? 99);
    case 'lahan_asc': return (a.scores?.lahan ?? 99) - (b.scores?.lahan ?? 99);
    case 'manfaat': return (b.scores?.manfaat ?? 0) - (a.scores?.manfaat ?? 0);
    default: return 0;
  }
});

const sortOptions = [
  { value: 'default', label: 'Default', group: null },
  { value: 'az',          label: 'A → Z',                group: 'Nama' },
  { value: 'za',          label: 'Z → A',                group: 'Nama' },
  { value: 'panen_asc',   label: 'Masa Panen Tercepat',  group: 'Kriteria' },
  { value: 'panen_desc',  label: 'Masa Panen Terlama',   group: 'Kriteria' },
  { value: 'mudah',       label: 'Termudah Dirawat',     group: 'Kriteria' },
  { value: 'lahan_asc',   label: 'Lahan Terkecil',       group: 'Kriteria' },
  { value: 'manfaat',     label: 'Manfaat Terbanyak',    group: 'Kriteria' },
];

  const totalPages = Math.ceil(sortedToga.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedToga.slice(startIndex, endIndex);

  // if (loading) return <div className="text-center p-10">Loading Data Tanaman...</div>;

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Navbar />

      {/* Title Section */}
      <section className="pt-38 md:pb-12 pb-8 px-6 md:px-16">
        <div className="max-w-screen mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-lexend font-normal text-black">
            Katalog <span className="text-[#357C23]">TOGA</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-lg mx-auto mt-2 md:mt-3">
            Jelajahi berbagai tanaman obat keluarga (TOGA) yang tersedia
          </p>
        </div>
      </section>

      {/* Filter Seaction */}
      <section className="py-8 px-6 md:px-32">
        <div className="max-w-screen mx-auto">
          <div className="flex flex-col gap-2 items-center justify-between">
            {/* Search Bar */}
            <div className="w-full md:w-3/4">
              <div className="flex items-center gap-2 px-3 py-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#357C23]">
                <input
                  type="text"
                  placeholder="Cari tanaman..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                />

                {/* X Button */}
                <button
                  onClick={() => setSearchTerm("")}
                  className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <img src={closeIcon} alt="Clear" className="w-2 h-2" />
                </button>

                <div className="w-px h-8 bg-gray-300 mx-2"></div>

                {/* Search Icon */}
                <button className="p-2.5 text-white bg-[#357C23] rounded-md hover:bg-[#2a5d1a] transition">
                  <img src={searchIcon} alt="Search" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide mt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-6 py-2 text-sm md:text-base rounded-md font-medium whitespace-nowrap transition shrink-0 ${selectedCategory === category ? "bg-[#357C23] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Katalog Konten */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.02 }}
        className="py-2 md:py-12 px-6 md:px-16"
      >
        {/* Sort Dropdown */}
        <div className="relative flex items-center gap-2 mb-6">
          <span className="text-sm text-gray-500 font-lexend shrink-0">
            Urutkan:
          </span>

          <button
            onClick={() => setSortOpen((prev) => !prev)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-lexend font-medium transition cursor-pointer ${
              sortBy !== "default"
                ? "border-[#357C23] bg-[#357C23] text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-[#357C23]"
            }`}
          >
            {/* Ikon sort */}
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
                d="M3 7h18M6 12h12M10 17h4"
              />
            </svg>
            {sortOptions.find((o) => o.value === sortBy)?.label || "Default"}
            <svg
              className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>

          {/* Reset badge */}
          {sortBy !== "default" && (
            <button
              onClick={() => setSortBy("default")}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-100 transition cursor-pointer"
            >
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Reset
            </button>
          )}

          {/* Dropdown Panel */}
          {sortOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setSortOpen(false)}
              />

              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                {/* Default */}
                <button
                  onClick={() => {
                    setSortBy("default");
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-lexend transition cursor-pointer ${
                    sortBy === "default"
                      ? "bg-green-50 text-[#357C23] font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Default
                </button>

                {/* Group: Nama */}
                <div className="px-4 pt-2 pb-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Nama
                  </p>
                </div>
                {sortOptions
                  .filter((o) => o.group === "Nama")
                  .map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-lexend flex items-center justify-between transition cursor-pointer ${
                        sortBy === opt.value
                          ? "bg-green-50 text-[#357C23] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                      {sortBy === opt.value && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="#357C23"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      )}
                    </button>
                  ))}

                {/* Group: Kriteria */}
                <div className="px-4 pt-3 pb-1 border-t border-gray-100 mt-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Kriteria
                  </p>
                </div>
                {sortOptions
                  .filter((o) => o.group === "Kriteria")
                  .map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-lexend flex items-center justify-between transition cursor-pointer ${
                        sortBy === opt.value
                          ? "bg-green-50 text-[#357C23] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                      {sortBy === opt.value && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="#357C23"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
              </div>
            </>
          )}
        </div>

        {/* Toga Cards */}
        <div className="max-w-screen mx-auto">
          {currentData.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {currentData.map((item) => (
                <TogaCard
                  key={item.id}
                  id={item.id}
                  nama={item.nama}
                  image={item.image}
                  kategori={item.kategori}
                  deskripsi={item.deskripsi}
                />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex items-center justify-center mb-5">
                <img src={Cactus} alt="No Results" className="w-40 h-40" />
              </div>
              <h3 className="font-lexend font-semibold text-gray-700 text-lg mb-1">
                Tanaman Tidak Ditemukan
              </h3>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                {searchTerm ? (
                  <>
                    Tidak ada tanaman dengan kata kunci{" "}
                    <span className="font-semibold text-gray-600">
                      "{searchTerm}"
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Tidak ada tanaman dalam kategori{" "}
                    <span className="font-semibold text-gray-600">
                      "{selectedCategory}"
                    </span>
                    .
                  </>
                )}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Semua");
                }}
                className="mt-5 bg-[#357C23] text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-[#2a5d1a] transition cursor-pointer font-lexend"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </motion.section>

      {/* Pagination Component */}
      {sortedToga.length > 0 && (
        <section className="py-8 px-6 md:px-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>
      )}
    </div>
  );
};

export default KatalogToga;
